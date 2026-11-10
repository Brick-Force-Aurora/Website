// Read-only archive of the old brick-force.com forum (vBulletin), global data "forum" (see .eleventy.js).
// Data: src/forum-data/*.json (forums.json, members.json, meta.json, threads-<forum id>.json), generated from the Wayback Machine captures.
// It lives outside src/_data on purpose: Eleventy would load every file of _data a second time as global data.
// This module returns flat page lists (forumPages, threadPages, memberPages) that the templates in src/forum/ paginate over (one item = one output page).
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "src", "forum-data");
const P = "/Website/forum";
const THREADS_PER_PAGE = 25;
const POSTS_PER_PAGE = 20;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function read(name, fallback) {
  const f = path.join(DIR, name);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : fallback;
}

// "2013-02-10 07:11" -> "10 Feb 2013, 07:11"
function label(d) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}:\d{2}))?/.exec(d || "");
  if (!m) return "";
  return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}` + (m[4] ? `, ${m[4]}` : "");
}

function captureLabel(ts) {
  return ts && ts.length >= 8 ? label(`${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`) : "";
}

function wayback(ts, cu) {
  return `https://web.archive.org/web/${ts}/http://www.brick-force.com/forum/${cu}`;
}

function pageUrl(base, page) {
  return page === 1 ? base : `${base}page/${page}/`;
}

function plain(html) {
  return html
    .replace(/<br>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m, e) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " }[e]))
    .replace(/\s+/g, " ")
    .trim();
}

let lastThreads = [];

// thread/post totals the original forum reported (sum over the forums directly below the categories)
function totalOrig(forums, key) {
  const by = new Map(forums.map((f) => [f.id, f]));
  let sum = 0;
  forums.forEach((f) => {
    const par = f.parent ? by.get(f.parent) : null;
    if (par && !par.parent && f[key]) sum += f[key];
  });
  return sum;
}

// Search index of the forum search page (written to /forum/search-index.json by the eleventy.after hook in .eleventy.js):
// [thread id, title, forum id, author, date, replies, url, opening text]
function searchIndex() {
  return {
    forums: lastForums.filter((f) => f.aThreads > 0).map((f) => [f.id, f.path.map((x) => x.title).join(" › ")]),
    threads: lastThreads
      .filter((t) => t.url)
      .map((t) => [t.id, t.title, t.f, t.by, (t.d || "").slice(0, 10), t.r, t.url.replace("/Website", ""), plain(t.posts[0] ? t.posts[0].h : "").slice(0, 180)]),
  };
}
let lastForums = [];

module.exports = function () {
  const forums = read("forums.json", []);
  const members = read("members.json", []);
  const hq = new Map(); // lower-case player name -> Brick HQ profile url
  try {
    JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "_data", "players.json"), "utf8")).forEach((pl) => {
      if (pl.slug && pl.name) {
        const ch = pl.charts || [];
        hq.set(String(pl.name).toLowerCase(), {
          url: `/Website/game/players/${pl.slug}/`,
          level: pl.level || "",
          rank: pl.rank || "",
          kd: ch[0] ? ch[0].v : "",
          wins: ch[2] ? ch[2].v : "",
          matches: ch[6] ? ch[6].v : "",
          captured: pl.ts_label || "",
          capUrl: pl.ts && pl.url ? `https://web.archive.org/web/${pl.ts}/${pl.url}` : "",
        });
      }
    });
  } catch (e) {
    /* no player data: no links */
  }
  const announcements = read("announcements.json", []);
  const sigs = read("signatures.json", []);
  const cards = read("cards.json", []);
  const cardCache = new Map();
  const meta = read("meta.json", {});
  const byId = new Map();
  const fthreads = new Map(); // forum id -> its threads (kept out of the forum objects so page data stays small)
  forums.forEach((f) => {
    f.children = [];
    fthreads.set(f.id, []);
    byId.set(f.id, f);
  });
  forums.forEach((f) => {
    if (f.parent && byId.has(f.parent)) byId.get(f.parent).children.push(f);
  });
  const memberById = new Map();
  members.forEach((m) => memberById.set(m.id, m));

  // threads of every forum
  const threadById = new Map();
  let files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((n) => /^threads-\d+\.json$/.test(n)) : [];
  files.forEach((n) => {
    const fid = parseInt(n.slice(8, -5), 10);
    const f = byId.get(fid);
    if (!f) return;
    read(n, []).forEach((t) => {
      t.url = t.posts.length ? `${P}/thread/${t.id}-${t.slug}/` : ""; // threads without archived posts get no page of their own
      t.dl = label(t.d);
      t.ldl = label(t.ld);
      t.pages = Math.max(1, Math.ceil(t.posts.length / POSTS_PER_PAGE));
      t.mu = t.u ? `${P}/member/${t.u}/` : "";
      fthreads.get(f.id).push(t);
      threadById.set(t.id, t);
    });
  });

  // forum path (breadcrumb) and totals including sub-forums
  function pathOf(f) {
    const out = [];
    for (let x = f; x; x = x.parent ? byId.get(x.parent) : null) out.unshift({ id: x.id, title: x.title, url: x.url });
    return out;
  }
  forums.forEach((f) => {
    f.path = pathOf(f);
    fthreads.get(f.id).sort((a, b) => (b.sticky || 0) - (a.sticky || 0) || (a.ld < b.ld ? 1 : a.ld > b.ld ? -1 : b.id - a.id));
  });
  function total(f) {
    if (f._tot) return f._tot;
    const ts = fthreads.get(f.id);
    let t = ts.length;
    let p = ts.reduce((s, x) => s + x.posts.length, 0);
    let last = ts.reduce((best, x) => (x.ld && (!best || x.ld > best.ld) ? x : best), null);
    f.children.forEach((c) => {
      const s = total(c);
      t += s.threads;
      p += s.posts;
      if (s.last && (!last || s.last.ld > last.ld)) last = s.last;
    });
    f._tot = { threads: t, posts: p, last };
    return f._tot;
  }
  forums.forEach((f) => {
    const s = total(f);
    f.aThreads = s.threads;
    f.aPosts = s.posts;
    f.lastThread = s.last
      ? {
          title: s.last.title,
          url: s.last.url,
          by: s.last.lb,
          date: s.last.ldl,
          ic: s.last.ic || 0,
          ica: s.last.ica || "",
          lu: s.last.url ? pageUrl(s.last.url, s.last.pages) + (s.last.posts.length && s.last.posts[s.last.posts.length - 1].i ? `#post${s.last.posts[s.last.posts.length - 1].i}` : "") : "",
        }
      : null;
    f.capLabel = captureLabel(f.cts);
    f.capUrl = f.cts && f.cu ? wayback(f.cts, f.cu) : "";
  });
  forums.forEach((f) => delete f._tot);
  lastThreads = Array.from(threadById.values());
  lastForums = forums;
  const roots = forums.filter((f) => !f.parent);

  // ---- forum pages (thread lists)
  const forumPages = [];
  forums.forEach((f) => {
    const all = fthreads.get(f.id);
    f.threadCount = all.length;
    const pages = Math.max(1, Math.ceil(all.length / THREADS_PER_PAGE));
    for (let i = 1; i <= pages; i++) {
      const slice = all.slice((i - 1) * THREADS_PER_PAGE, i * THREADS_PER_PAGE);
      forumPages.push({
        forum: f,
        page: i,
        pages,
        url: pageUrl(f.url, i),
        permalink: pageUrl(f.url, i).replace('/Website', ''),
        prev: i > 1 ? pageUrl(f.url, i - 1) : "",
        next: i < pages ? pageUrl(f.url, i + 1) : "",
        from: slice.length ? (i - 1) * THREADS_PER_PAGE + 1 : 0,
        to: (i - 1) * THREADS_PER_PAGE + slice.length,
        threads: slice,
      });
    }
  });

  // ---- thread pages
  const threadPages = [];
  threadById.forEach((t) => {
    if (!t.url) return;
    const f = byId.get(t.f);
    const pages = t.pages;
    t.forum = { id: f.id, title: f.title, url: f.url };
    t.capLabel = captureLabel(t.capts);
    t.capUrl = t.capts && t.cu ? wayback(t.capts, t.cu) : f.capUrl;
    t.missing = Math.max(t.tot - t.posts.length, 0);
    for (let i = 1; i <= pages; i++) {
      const slice = t.posts.slice((i - 1) * POSTS_PER_PAGE, i * POSTS_PER_PAGE);
      threadPages.push({
        thread: t,
        forum: f,
        path: f.path,
        page: i,
        pages,
        url: pageUrl(t.url, i),
        permalink: pageUrl(t.url, i).replace('/Website', ''),
        prev: i > 1 ? pageUrl(t.url, i - 1) : "",
        next: i < pages ? pageUrl(t.url, i + 1) : "",
        posts: slice,
        first: slice.length ? (i - 1) * POSTS_PER_PAGE + 1 : 0,
      });
    }
  });
  // sidebar card of a member (shared by all his posts)
  members.forEach((m) => {
    m.join = label(m.x && m.x["Join Date"]) || (m.x && m.x["Join Date"]) || "";
    m.extra = Object.keys(m.x || {})
      .filter((k) => k !== "Join Date" && k !== "Posts")
      .map((k) => ({ k, v: m.x[k] }));
    m.origPosts = (m.x && m.x["Posts"]) || "";
    m.avatar = m.av ? `/Website/images/forum/media/${m.av}` : "";
    m.ctsLabel = captureLabel(m.cts);
    m.sigLabel = captureLabel(m.sigts);
    m.titleLabel = captureLabel(m.titlets);
    const h = hq.get(String(m.name).toLowerCase());
    m.hq = h ? h.url : "";
    m.hqs = h || null;
    m.card = { title: m.title || "", join: m.join, extra: m.extra, posts: m.origPosts, av: m.avatar, hq: m.hq };
  });
  // post author -> member link, post date label (set once, shared by every page)
  threadById.forEach((t) =>
    t.posts.forEach((p) => {
      p.dl = label(p.d);
      p.mu = p.u && memberById.has(p.u) ? `${P}/member/${p.u}/` : "";
      if (p.cd !== undefined && cards[p.cd]) {
        // sidebar exactly as it was shown in the capture of this post (title, avatar and counters change over time)
        if (!cardCache.has(p.cd)) {
          const [u, title, av, join, extra, count] = cards[p.cd];
          const mem = memberById.get(u);
          cardCache.set(p.cd, {
            title,
            join: label(join) || join || "",
            extra: extra.map(([k, v]) => ({ k, v })),
            posts: count,
            av: av ? `/Website/images/forum/media/${av}` : "",
            hq: mem ? mem.hq : "",
          });
        }
        p.card = cardCache.get(p.cd);
      } else if (p.u && memberById.has(p.u)) p.card = memberById.get(p.u).card;
      p.sig = p.sg !== undefined ? sigs[p.sg] : "";
    })
  );

  // ---- member pages
  const memberPages = members.map((m) => {
    m.url = `${P}/member/${m.id}/`;
    m.startedThreads = (m.st || [])
      .map((tid) => {
        const t = threadById.get(tid);
        return t && t.url ? { title: t.title, url: t.url, forum: t.forum.title, date: t.dl, replies: t.r } : null;
      })
      .filter(Boolean);
    m.threads = (m.th || [])
      .map(([tid, c]) => {
        const t = threadById.get(tid);
        return t && t.url ? { title: t.title, url: t.url, count: c, forum: t.forum.title } : null;
      })
      .filter(Boolean);
    return { member: m, url: m.url, permalink: m.url.replace('/Website', '') };
  });

  announcements.forEach((a) => {
    a.dl = label(a.from);
    a.capLabel = captureLabel(a.ts);
    a.capUrl = a.cu ? wayback(a.ts, a.cu) : "";
    a.mu = a.u && memberById.has(a.u) ? `${P}/member/${a.u}/` : "";
    a.fu = a.f && byId.has(a.f) ? byId.get(a.f).url : "";
  });

  return {
    meta,
    announcements,
    roots,
    forums,
    forumPages,
    threadPages,
    memberPages,
    original: { threads: totalOrig(forums, "ot"), posts: totalOrig(forums, "op") },
    counts: { forums: forums.length, threads: threadById.size, threadPages: threadPages.length, posts: meta.posts || 0, members: members.length },
    stats: { forumPages: forumPages.length, threadPages: threadPages.length, memberPages: memberPages.length },
  };
};
module.exports.POSTS_PER_PAGE = POSTS_PER_PAGE;
module.exports.searchIndex = searchIndex;
