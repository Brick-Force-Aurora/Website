$(document).ready(function () {
  var _____WB$wombat$assign$function_____ = function (name) {
    return (
      (self._wb_wombat &&
        self._wb_wombat.local_init &&
        self._wb_wombat.local_init(name)) ||
      self[name]
    );
  };
  if (!self.__WB_pmw) {
    self.__WB_pmw = function (obj) {
      this.__WB_source = obj;
      return this;
    };
  }
  {
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    /*!
     * fancyBox - jQuery Plugin
     * version: 2.1.5 (Fri, 14 Jun 2013)
     * @requires jQuery v1.6 or later
     *
     * Examples at http://fancyapps.com/fancybox/
     * License: www.fancyapps.com/fancybox/#license
     *
     * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
     *
     */
    (function (l, o, i, e) {
      var p = i("html"),
        d = i(l),
        a = i(o),
        q = (i.fancybox = function () {
          q.open.apply(this, arguments);
        }),
        k = navigator.userAgent.match(/msie/i),
        c = null,
        f = o.createTouch !== e,
        j = function (r) {
          return r && r.hasOwnProperty && r instanceof i;
        },
        b = function (r) {
          return r && i.type(r) === "string";
        },
        m = function (r) {
          return b(r) && r.indexOf("%") > 0;
        },
        h = function (r) {
          return (
            r &&
            !(r.style.overflow && r.style.overflow === "hidden") &&
            ((r.clientWidth && r.scrollWidth > r.clientWidth) ||
              (r.clientHeight && r.scrollHeight > r.clientHeight))
          );
        },
        n = function (t, s) {
          var r = parseInt(t, 10) || 0;
          if (s && m(t)) {
            r = (q.getViewport()[s] / 100) * r;
          }
          return Math.ceil(r);
        },
        g = function (r, s) {
          return n(r, s) + "px";
        };
      i.extend(q, {
        version: "2.1.5",
        defaults: {
          padding: 15,
          margin: 20,
          width: 800,
          height: 600,
          minWidth: 100,
          minHeight: 100,
          maxWidth: 9999,
          maxHeight: 9999,
          pixelRatio: 1,
          autoSize: true,
          autoHeight: false,
          autoWidth: false,
          autoResize: true,
          autoCenter: !f,
          fitToView: true,
          aspectRatio: false,
          topRatio: 0.5,
          leftRatio: 0.5,
          scrolling: "auto",
          wrapCSS: "",
          arrows: true,
          closeBtn: true,
          closeClick: false,
          nextClick: false,
          mouseWheel: true,
          autoPlay: false,
          playSpeed: 3000,
          preload: 3,
          modal: false,
          loop: true,
          ajax: {
            dataType: "html",
            headers: {
              "X-fancyBox": true,
            },
          },
          iframe: {
            scrolling: "auto",
            preload: true,
          },
          swf: {
            wmode: "transparent",
            allowfullscreen: "true",
            allowscriptaccess: "always",
          },
          keys: {
            next: {
              13: "left",
              34: "up",
              39: "left",
              40: "up",
            },
            prev: {
              8: "right",
              33: "down",
              37: "right",
              38: "down",
            },
            close: [27],
            play: [32],
            toggle: [70],
          },
          direction: {
            next: "left",
            prev: "right",
          },
          scrollOutside: true,
          index: 0,
          type: null,
          href: null,
          content: null,
          title: null,
          tpl: {
            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
            image: '<img class="fancybox-image" src="{href}" alt="" />',
            iframe:
              '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
              (k ? ' allowtransparency="true"' : "") +
              "></iframe>",
            error:
              '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
            closeBtn:
              '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
          },
          openEffect: "fade",
          openSpeed: 250,
          openEasing: "swing",
          openOpacity: true,
          openMethod: "zoomIn",
          closeEffect: "fade",
          closeSpeed: 250,
          closeEasing: "swing",
          closeOpacity: true,
          closeMethod: "zoomOut",
          nextEffect: "elastic",
          nextSpeed: 250,
          nextEasing: "swing",
          nextMethod: "changeIn",
          prevEffect: "elastic",
          prevSpeed: 250,
          prevEasing: "swing",
          prevMethod: "changeOut",
          helpers: {
            overlay: true,
            title: true,
          },
          onCancel: i.noop,
          beforeLoad: i.noop,
          afterLoad: i.noop,
          beforeShow: i.noop,
          afterShow: i.noop,
          beforeChange: i.noop,
          beforeClose: i.noop,
          afterClose: i.noop,
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: false,
        isOpen: false,
        isOpened: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
          timer: null,
          isActive: false,
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (s, r) {
          if (!s) {
            return;
          }
          if (!i.isPlainObject(r)) {
            r = {};
          }
          if (false === q.close(true)) {
            return;
          }
          if (!i.isArray(s)) {
            s = j(s) ? i(s).get() : [s];
          }
          i.each(s, function (x, y) {
            var w = {},
              t,
              B,
              z,
              A,
              v,
              C,
              u;
            if (i.type(y) === "object") {
              if (y.nodeType) {
                y = i(y);
              }
              if (j(y)) {
                w = {
                  href: y.data("fancybox-href") || y.attr("href"),
                  title: y.data("fancybox-title") || y.attr("title"),
                  isDom: true,
                  element: y,
                };
                if (i.metadata) {
                  i.extend(true, w, y.metadata());
                }
              } else {
                w = y;
              }
            }
            t = r.href || w.href || (b(y) ? y : null);
            B = r.title !== e ? r.title : w.title || "";
            z = r.content || w.content;
            A = z ? "html" : r.type || w.type;
            if (!A && w.isDom) {
              A = y.data("fancybox-type");
              if (!A) {
                v = y.prop("class").match(/fancybox\.(\w+)/);
                A = v ? v[1] : null;
              }
            }
            if (b(t)) {
              if (!A) {
                if (q.isImage(t)) {
                  A = "image";
                } else {
                  if (q.isSWF(t)) {
                    A = "swf";
                  } else {
                    if (t.charAt(0) === "#") {
                      A = "inline";
                    } else {
                      if (b(y)) {
                        A = "html";
                        z = y;
                      }
                    }
                  }
                }
              }
              if (A === "ajax") {
                C = t.split(/\s+/, 2);
                t = C.shift();
                u = C.shift();
              }
            }
            if (!z) {
              if (A === "inline") {
                if (t) {
                  z = i(b(t) ? t.replace(/.*(?=#[^\s]+$)/, "") : t);
                } else {
                  if (w.isDom) {
                    z = y;
                  }
                }
              } else {
                if (A === "html") {
                  z = t;
                } else {
                  if (!A && !t && w.isDom) {
                    A = "inline";
                    z = y;
                  }
                }
              }
            }
            i.extend(w, {
              href: t,
              type: A,
              content: z,
              title: B,
              selector: u,
            });
            s[x] = w;
          });
          q.opts = i.extend(true, {}, q.defaults, r);
          if (r.keys !== e) {
            q.opts.keys = r.keys
              ? i.extend({}, q.defaults.keys, r.keys)
              : false;
          }
          q.group = s;
          return q._start(q.opts.index);
        },
        cancel: function () {
          var r = q.coming;
          if (!r || false === q.trigger("onCancel")) {
            return;
          }
          q.hideLoading();
          if (q.ajaxLoad) {
            q.ajaxLoad.abort();
          }
          q.ajaxLoad = null;
          if (q.imgPreload) {
            q.imgPreload.onload = q.imgPreload.onerror = null;
          }
          if (r.wrap) {
            r.wrap.stop(true, true).trigger("onReset").remove();
          }
          q.coming = null;
          if (!q.current) {
            q._afterZoomOut(r);
          }
        },
        close: function (r) {
          q.cancel();
          if (false === q.trigger("beforeClose")) {
            return;
          }
          q.unbindEvents();
          if (!q.isActive) {
            return;
          }
          if (!q.isOpen || r === true) {
            i(".fancybox-wrap").stop(true).trigger("onReset").remove();
            q._afterZoomOut();
          } else {
            q.isOpen = q.isOpened = false;
            q.isClosing = true;
            i(".fancybox-item, .fancybox-nav").remove();
            q.wrap.stop(true, true).removeClass("fancybox-opened");
            q.transitions[q.current.closeMethod]();
          }
        },
        play: function (t) {
          var r = function () {
              clearTimeout(q.player.timer);
            },
            v = function () {
              r();
              if (q.current && q.player.isActive) {
                q.player.timer = setTimeout(q.next, q.current.playSpeed);
              }
            },
            s = function () {
              r();
              a.unbind(".player");
              q.player.isActive = false;
              q.trigger("onPlayEnd");
            },
            u = function () {
              if (
                q.current &&
                (q.current.loop || q.current.index < q.group.length - 1)
              ) {
                q.player.isActive = true;
                a.bind({
                  "onCancel.player beforeClose.player": s,
                  "onUpdate.player": v,
                  "beforeLoad.player": r,
                });
                v();
                q.trigger("onPlayStart");
              }
            };
          if (t === true || (!q.player.isActive && t !== false)) {
            u();
          } else {
            s();
          }
        },
        next: function (s) {
          var r = q.current;
          if (r) {
            if (!b(s)) {
              s = r.direction.next;
            }
            q.jumpto(r.index + 1, s, "next");
          }
        },
        prev: function (s) {
          var r = q.current;
          if (r) {
            if (!b(s)) {
              s = r.direction.prev;
            }
            q.jumpto(r.index - 1, s, "prev");
          }
        },
        jumpto: function (s, u, r) {
          var t = q.current;
          if (!t) {
            return;
          }
          s = n(s);
          q.direction = u || t.direction[s >= t.index ? "next" : "prev"];
          q.router = r || "jumpto";
          if (t.loop) {
            if (s < 0) {
              s = t.group.length + (s % t.group.length);
            }
            s = s % t.group.length;
          }
          if (t.group[s] !== e) {
            q.cancel();
            q._start(s);
          }
        },
        reposition: function (u, r) {
          var t = q.current,
            s = t ? t.wrap : null,
            v;
          if (s) {
            v = q._getPosition(r);
            if (u && u.type === "scroll") {
              delete v.position;
              s.stop(true, true).animate(v, 200);
            } else {
              s.css(v);
              t.pos = i.extend({}, t.dim, v);
            }
          }
        },
        update: function (t) {
          var r = t && t.type,
            s = !r || r === "orientationchange";
          if (s) {
            clearTimeout(c);
            c = null;
          }
          if (!q.isOpen || c) {
            return;
          }
          c = setTimeout(
            function () {
              var u = q.current;
              if (!u || q.isClosing) {
                return;
              }
              q.wrap.removeClass("fancybox-tmp");
              if (s || r === "load" || (r === "resize" && u.autoResize)) {
                q._setDimension();
              }
              if (!(r === "scroll" && u.canShrink)) {
                q.reposition(t);
              }
              q.trigger("onUpdate");
              c = null;
            },
            s && !f ? 0 : 300
          );
        },
        toggle: function (r) {
          if (q.isOpen) {
            q.current.fitToView =
              i.type(r) === "boolean" ? r : !q.current.fitToView;
            if (f) {
              q.wrap.removeAttr("style").addClass("fancybox-tmp");
              q.trigger("onUpdate");
            }
            q.update();
          }
        },
        hideLoading: function () {
          a.unbind(".loading");
          i("#fancybox-loading").remove();
        },
        showLoading: function () {
          var s, r;
          q.hideLoading();
          s = i('<div id="fancybox-loading"><div></div></div>')
            .click(q.cancel)
            .appendTo("body");
          a.bind("keydown.loading", function (t) {
            if ((t.which || t.keyCode) === 27) {
              t.preventDefault();
              q.cancel();
            }
          });
          if (!q.defaults.fixed) {
            r = q.getViewport();
            s.css({
              position: "absolute",
              top: r.h * 0.5 + r.y,
              left: r.w * 0.5 + r.x,
            });
          }
        },
        getViewport: function () {
          var r = (q.current && q.current.locked) || false,
            s = {
              x: d.scrollLeft(),
              y: d.scrollTop(),
            };
          if (r) {
            s.w = r[0].clientWidth;
            s.h = r[0].clientHeight;
          } else {
            s.w = f && l.innerWidth ? l.innerWidth : d.width();
            s.h = f && l.innerHeight ? l.innerHeight : d.height();
          }
          return s;
        },
        unbindEvents: function () {
          if (q.wrap && j(q.wrap)) {
            q.wrap.unbind(".fb");
          }
          a.unbind(".fb");
          d.unbind(".fb");
        },
        bindEvents: function () {
          var s = q.current,
            r;
          if (!s) {
            return;
          }
          d.bind(
            "orientationchange.fb" +
              (f ? "" : " resize.fb") +
              (s.autoCenter && !s.locked ? " scroll.fb" : ""),
            q.update
          );
          r = s.keys;
          if (r) {
            a.bind("keydown.fb", function (v) {
              var t = v.which || v.keyCode,
                u = v.target || v.srcElement;
              if (t === 27 && q.coming) {
                return false;
              }
              if (
                !v.ctrlKey &&
                !v.altKey &&
                !v.shiftKey &&
                !v.metaKey &&
                !(u && (u.type || i(u).is("[contenteditable]")))
              ) {
                i.each(r, function (w, x) {
                  if (s.group.length > 1 && x[t] !== e) {
                    q[w](x[t]);
                    v.preventDefault();
                    return false;
                  }
                  if (i.inArray(t, x) > -1) {
                    q[w]();
                    v.preventDefault();
                    return false;
                  }
                });
              }
            });
          }
          if (i.fn.mousewheel && s.mouseWheel) {
            q.wrap.bind("mousewheel.fb", function (y, z, u, t) {
              var x = y.target || null,
                v = i(x),
                w = false;
              while (v.length) {
                if (w || v.is(".fancybox-skin") || v.is(".fancybox-wrap")) {
                  break;
                }
                w = h(v[0]);
                v = i(v).parent();
              }
              if (z !== 0 && !w) {
                if (q.group.length > 1 && !s.canShrink) {
                  if (t > 0 || u > 0) {
                    q.prev(t > 0 ? "down" : "left");
                  } else {
                    if (t < 0 || u < 0) {
                      q.next(t < 0 ? "up" : "right");
                    }
                  }
                  y.preventDefault();
                }
              }
            });
          }
        },
        trigger: function (s, u) {
          var r,
            t = u || q.coming || q.current;
          if (!t) {
            return;
          }
          if (i.isFunction(t[s])) {
            r = t[s].apply(t, Array.prototype.slice.call(arguments, 1));
          }
          if (r === false) {
            return false;
          }
          if (t.helpers) {
            i.each(t.helpers, function (w, v) {
              if (v && q.helpers[w] && i.isFunction(q.helpers[w][s])) {
                q.helpers[w][s](
                  i.extend(true, {}, q.helpers[w].defaults, v),
                  t
                );
              }
            });
          }
          a.trigger(s);
        },
        isImage: function (r) {
          return (
            b(r) &&
            r.match(
              /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i
            )
          );
        },
        isSWF: function (r) {
          return b(r) && r.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function (s) {
          var t = {},
            x,
            r,
            u,
            v,
            w;
          s = n(s);
          x = q.group[s] || null;
          if (!x) {
            return false;
          }
          t = i.extend(true, {}, q.opts, x);
          v = t.margin;
          w = t.padding;
          if (i.type(v) === "number") {
            t.margin = [v, v, v, v];
          }
          if (i.type(w) === "number") {
            t.padding = [w, w, w, w];
          }
          if (t.modal) {
            i.extend(true, t, {
              closeBtn: false,
              closeClick: false,
              nextClick: false,
              arrows: false,
              mouseWheel: false,
              keys: null,
              helpers: {
                overlay: {
                  closeClick: false,
                },
              },
            });
          }
          if (t.autoSize) {
            t.autoWidth = t.autoHeight = true;
          }
          if (t.width === "auto") {
            t.autoWidth = true;
          }
          if (t.height === "auto") {
            t.autoHeight = true;
          }
          t.group = q.group;
          t.index = s;
          q.coming = t;
          if (false === q.trigger("beforeLoad")) {
            q.coming = null;
            return;
          }
          u = t.type;
          r = t.href;
          if (!u) {
            q.coming = null;
            if (q.current && q.router && q.router !== "jumpto") {
              q.current.index = s;
              return q[q.router](q.direction);
            }
            return false;
          }
          q.isActive = true;
          if (u === "image" || u === "swf") {
            t.autoHeight = t.autoWidth = false;
            t.scrolling = "visible";
          }
          if (u === "image") {
            t.aspectRatio = true;
          }
          if (u === "iframe" && f) {
            t.scrolling = "scroll";
          }
          t.wrap = i(t.tpl.wrap)
            .addClass(
              "fancybox-" +
                (f ? "mobile" : "desktop") +
                " fancybox-type-" +
                u +
                " fancybox-tmp " +
                t.wrapCSS
            )
            .appendTo(t.parent || "body");
          i.extend(t, {
            skin: i(".fancybox-skin", t.wrap),
            outer: i(".fancybox-outer", t.wrap),
            inner: i(".fancybox-inner", t.wrap),
          });
          i.each(["Top", "Right", "Bottom", "Left"], function (z, y) {
            t.skin.css("padding" + y, g(t.padding[z]));
          });
          q.trigger("onReady");
          if (u === "inline" || u === "html") {
            if (!t.content || !t.content.length) {
              return q._error("content");
            }
          } else {
            if (!r) {
              return q._error("href");
            }
          }
          if (u === "image") {
            q._loadImage();
          } else {
            if (u === "ajax") {
              q._loadAjax();
            } else {
              if (u === "iframe") {
                q._loadIframe();
              } else {
                q._afterLoad();
              }
            }
          }
        },
        _error: function (r) {
          i.extend(q.coming, {
            type: "html",
            autoWidth: true,
            autoHeight: true,
            minWidth: 0,
            minHeight: 0,
            scrolling: "no",
            hasError: r,
            content: q.coming.tpl.error,
          });
          q._afterLoad();
        },
        _loadImage: function () {
          var r = (q.imgPreload = new Image());
          r.onload = function () {
            this.onload = this.onerror = null;
            q.coming.width = this.width / q.opts.pixelRatio;
            q.coming.height = this.height / q.opts.pixelRatio;
            q._afterLoad();
          };
          r.onerror = function () {
            this.onload = this.onerror = null;
            q._error("image");
          };
          r.src = q.coming.href;
          if (r.complete !== true) {
            q.showLoading();
          }
        },
        _loadAjax: function () {
          var r = q.coming;
          q.showLoading();
          q.ajaxLoad = i.ajax(
            i.extend({}, r.ajax, {
              url: r.href,
              error: function (s, t) {
                if (q.coming && t !== "abort") {
                  q._error("ajax", s);
                } else {
                  q.hideLoading();
                }
              },
              success: function (s, t) {
                if (t === "success") {
                  r.content = s;
                  q._afterLoad();
                }
              },
            })
          );
        },
        _loadIframe: function () {
          var r = q.coming,
            s = i(r.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
              .attr("scrolling", f ? "auto" : r.iframe.scrolling)
              .attr("src", r.href);
          i(r.wrap).bind("onReset", function () {
            try {
              i(this)
                .find("iframe")
                .hide()
                .attr("src", "http://about:blank")
                .end()
                .empty();
            } catch (t) {}
          });
          if (r.iframe.preload) {
            q.showLoading();
            s.one("load", function () {
              i(this).data("ready", 1);
              if (!f) {
                i(this).bind("load.fb", q.update);
              }
              i(this)
                .parents(".fancybox-wrap")
                .width("100%")
                .removeClass("fancybox-tmp")
                .show();
              q._afterLoad();
            });
          }
          r.content = s.appendTo(r.inner);
          if (!r.iframe.preload) {
            q._afterLoad();
          }
        },
        _preloadImages: function () {
          var w = q.group,
            v = q.current,
            r = w.length,
            t = v.preload ? Math.min(v.preload, r - 1) : 0,
            u,
            s;
          for (s = 1; s <= t; s += 1) {
            u = w[(v.index + s) % r];
            if (u.type === "image" && u.href) {
              new Image().src = u.href;
            }
          }
        },
        _afterLoad: function () {
          var s = q.coming,
            u = q.current,
            z = "fancybox-placeholder",
            w,
            x,
            y,
            t,
            r,
            v;
          q.hideLoading();
          if (!s || q.isActive === false) {
            return;
          }
          if (false === q.trigger("afterLoad", s, u)) {
            s.wrap.stop(true).trigger("onReset").remove();
            q.coming = null;
            return;
          }
          if (u) {
            q.trigger("beforeChange", u);
            u.wrap
              .stop(true)
              .removeClass("fancybox-opened")
              .find(".fancybox-item, .fancybox-nav")
              .remove();
          }
          q.unbindEvents();
          w = s;
          x = s.content;
          y = s.type;
          t = s.scrolling;
          i.extend(q, {
            wrap: w.wrap,
            skin: w.skin,
            outer: w.outer,
            inner: w.inner,
            current: w,
            previous: u,
          });
          r = w.href;
          switch (y) {
            case "inline":
            case "ajax":
            case "html":
              if (w.selector) {
                x = i("<div>").html(x).find(w.selector);
              } else {
                if (j(x)) {
                  if (!x.data(z)) {
                    x.data(
                      z,
                      i('<div class="' + z + '"></div>')
                        .insertAfter(x)
                        .hide()
                    );
                  }
                  x = x.show().detach();
                  w.wrap.bind("onReset", function () {
                    if (i(this).find(x).length) {
                      x.hide().replaceAll(x.data(z)).data(z, false);
                    }
                  });
                }
              }
              break;
            case "image":
              x = w.tpl.image.replace("{href}", r);
              break;
            case "swf":
              x =
                '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' +
                r +
                '"></param>';
              v = "";
              i.each(w.swf, function (A, B) {
                x += '<param name="' + A + '" value="' + B + '"></param>';
                v += " " + A + '="' + B + '"';
              });
              x +=
                '<embed src="' +
                r +
                '" type="application/x-shockwave-flash" width="100%" height="100%"' +
                v +
                "></embed></object>";
              break;
          }
          if (!(j(x) && x.parent().is(w.inner))) {
            w.inner.append(x);
          }
          q.trigger("beforeShow");
          w.inner.css(
            "overflow",
            t === "yes" ? "scroll" : t === "no" ? "hidden" : t
          );
          q._setDimension();
          q.reposition();
          q.isOpen = false;
          q.coming = null;
          q.bindEvents();
          if (!q.isOpened) {
            i(".fancybox-wrap")
              .not(w.wrap)
              .stop(true)
              .trigger("onReset")
              .remove();
          } else {
            if (u.prevMethod) {
              q.transitions[u.prevMethod]();
            }
          }
          q.transitions[q.isOpened ? w.nextMethod : w.openMethod]();
          q._preloadImages();
        },
        _setDimension: function () {
          var U = q.getViewport(),
            Q = 0,
            W = false,
            Y = false,
            C = q.wrap,
            O = q.skin,
            Z = q.inner,
            L = q.current,
            M = L.width,
            J = L.height,
            F = L.minWidth,
            y = L.minHeight,
            S = L.maxWidth,
            K = L.maxHeight,
            E = L.scrolling,
            w = L.scrollOutside ? L.scrollbarWidth : 0,
            I = L.margin,
            x = n(I[1] + I[3]),
            v = n(I[0] + I[2]),
            t,
            s,
            P,
            R,
            H,
            G,
            N,
            A,
            z,
            V,
            u,
            X,
            r,
            B,
            D;
          C.add(O)
            .add(Z)
            .width("auto")
            .height("auto")
            .removeClass("fancybox-tmp");
          t = n(O.outerWidth(true) - O.width());
          s = n(O.outerHeight(true) - O.height());
          P = x + t;
          R = v + s;
          H = m(M) ? ((U.w - P) * n(M)) / 100 : M;
          G = m(J) ? ((U.h - R) * n(J)) / 100 : J;
          if (L.type === "iframe") {
            B = L.content;
            if (L.autoHeight && B.data("ready") === 1) {
              try {
                if (B[0].contentWindow.document.location) {
                  Z.width(H).height(9999);
                  D = B.contents().find("body");
                  if (w) {
                    D.css("overflow-x", "hidden");
                  }
                  G = D.outerHeight(true);
                }
              } catch (T) {}
            }
          } else {
            if (L.autoWidth || L.autoHeight) {
              Z.addClass("fancybox-tmp");
              if (!L.autoWidth) {
                Z.width(H);
              }
              if (!L.autoHeight) {
                Z.height(G);
              }
              if (L.autoWidth) {
                H = Z.width();
              }
              if (L.autoHeight) {
                G = Z.height();
              }
              Z.removeClass("fancybox-tmp");
            }
          }
          M = n(H);
          J = n(G);
          z = H / G;
          F = n(m(F) ? n(F, "w") - P : F);
          S = n(m(S) ? n(S, "w") - P : S);
          y = n(m(y) ? n(y, "h") - R : y);
          K = n(m(K) ? n(K, "h") - R : K);
          N = S;
          A = K;
          if (L.fitToView) {
            S = Math.min(U.w - P, S);
            K = Math.min(U.h - R, K);
          }
          X = U.w - x;
          r = U.h - v;
          if (L.aspectRatio) {
            if (M > S) {
              M = S;
              J = n(M / z);
            }
            if (J > K) {
              J = K;
              M = n(J * z);
            }
            if (M < F) {
              M = F;
              J = n(M / z);
            }
            if (J < y) {
              J = y;
              M = n(J * z);
            }
          } else {
            M = Math.max(F, Math.min(M, S));
            if (L.autoHeight && L.type !== "iframe") {
              Z.width(M);
              J = Z.height();
            }
            J = Math.max(y, Math.min(J, K));
          }
          if (L.fitToView) {
            Z.width(M).height(J);
            C.width(M + t);
            V = C.width();
            u = C.height();
            if (L.aspectRatio) {
              while ((V > X || u > r) && M > F && J > y) {
                if (Q++ > 19) {
                  break;
                }
                J = Math.max(y, Math.min(K, J - 10));
                M = n(J * z);
                if (M < F) {
                  M = F;
                  J = n(M / z);
                }
                if (M > S) {
                  M = S;
                  J = n(M / z);
                }
                Z.width(M).height(J);
                C.width(M + t);
                V = C.width();
                u = C.height();
              }
            } else {
              M = Math.max(F, Math.min(M, M - (V - X)));
              J = Math.max(y, Math.min(J, J - (u - r)));
            }
          }
          if (w && E === "auto" && J < G && M + t + w < X) {
            M += w;
          }
          Z.width(M).height(J);
          C.width(M + t);
          V = C.width();
          u = C.height();
          W = (V > X || u > r) && M > F && J > y;
          Y = L.aspectRatio
            ? M < N && J < A && M < H && J < G
            : (M < N || J < A) && (M < H || J < G);
          i.extend(L, {
            dim: {
              width: g(V),
              height: g(u),
            },
            origWidth: H,
            origHeight: G,
            canShrink: W,
            canExpand: Y,
            wPadding: t,
            hPadding: s,
            wrapSpace: u - O.outerHeight(true),
            skinSpace: O.height() - J,
          });
          if (!B && L.autoHeight && J > y && J < K && !Y) {
            Z.height("auto");
          }
        },
        _getPosition: function (t) {
          var x = q.current,
            s = q.getViewport(),
            v = x.margin,
            u = q.wrap.width() + v[1] + v[3],
            r = q.wrap.height() + v[0] + v[2],
            w = {
              position: "absolute",
              top: v[0],
              left: v[3],
            };
          if (x.autoCenter && x.fixed && !t && r <= s.h && u <= s.w) {
            w.position = "fixed";
          } else {
            if (!x.locked) {
              w.top += s.y;
              w.left += s.x;
            }
          }
          w.top = g(Math.max(w.top, w.top + (s.h - r) * x.topRatio));
          w.left = g(Math.max(w.left, w.left + (s.w - u) * x.leftRatio));
          return w;
        },
        _afterZoomIn: function () {
          var r = q.current;
          if (!r) {
            return;
          }
          q.isOpen = q.isOpened = true;
          q.wrap.css("overflow", "visible").addClass("fancybox-opened");
          q.update();
          if (r.closeClick || (r.nextClick && q.group.length > 1)) {
            q.inner.css("cursor", "pointer").bind("click.fb", function (s) {
              if (!i(s.target).is("a") && !i(s.target).parent().is("a")) {
                s.preventDefault();
                q[r.closeClick ? "close" : "next"]();
              }
            });
          }
          if (r.closeBtn) {
            i(r.tpl.closeBtn)
              .appendTo(q.skin)
              .bind("click.fb", function (s) {
                s.preventDefault();
                q.close();
              });
          }
          if (r.arrows && q.group.length > 1) {
            if (r.loop || r.index > 0) {
              i(r.tpl.prev).appendTo(q.outer).bind("click.fb", q.prev);
            }
            if (r.loop || r.index < q.group.length - 1) {
              i(r.tpl.next).appendTo(q.outer).bind("click.fb", q.next);
            }
          }
          q.trigger("afterShow");
          if (!r.loop && r.index === r.group.length - 1) {
            q.play(false);
          } else {
            if (q.opts.autoPlay && !q.player.isActive) {
              q.opts.autoPlay = false;
              q.play();
            }
          }
        },
        _afterZoomOut: function (r) {
          r = r || q.current;
          i(".fancybox-wrap").trigger("onReset").remove();
          i.extend(q, {
            group: {},
            opts: {},
            router: false,
            current: null,
            isActive: false,
            isOpened: false,
            isOpen: false,
            isClosing: false,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
          });
          q.trigger("afterClose", r);
        },
      });
      q.transitions = {
        getOrigPosition: function () {
          var u = q.current,
            s = u.element,
            x = u.orig,
            w = {},
            r = 50,
            y = 50,
            v = u.hPadding,
            z = u.wPadding,
            t = q.getViewport();
          if (!x && u.isDom && s.is(":visible")) {
            x = s.find("img:first");
            if (!x.length) {
              x = s;
            }
          }
          if (j(x)) {
            w = x.offset();
            if (x.is("img")) {
              r = x.outerWidth();
              y = x.outerHeight();
            }
          } else {
            w.top = t.y + (t.h - y) * u.topRatio;
            w.left = t.x + (t.w - r) * u.leftRatio;
          }
          if (q.wrap.css("position") === "fixed" || u.locked) {
            w.top -= t.y;
            w.left -= t.x;
          }
          w = {
            top: g(w.top - v * u.topRatio),
            left: g(w.left - z * u.leftRatio),
            width: g(r + z),
            height: g(y + v),
          };
          return w;
        },
        step: function (s, t) {
          var v,
            x,
            y,
            r = t.prop,
            u = q.current,
            w = u.wrapSpace,
            z = u.skinSpace;
          if (r === "width" || r === "height") {
            v = t.end === t.start ? 1 : (s - t.start) / (t.end - t.start);
            if (q.isClosing) {
              v = 1 - v;
            }
            x = r === "width" ? u.wPadding : u.hPadding;
            y = s - x;
            q.skin[r](n(r === "width" ? y : y - w * v));
            q.inner[r](n(r === "width" ? y : y - w * v - z * v));
          }
        },
        zoomIn: function () {
          var v = q.current,
            s = v.pos,
            t = v.openEffect,
            u = t === "elastic",
            r = i.extend(
              {
                opacity: 1,
              },
              s
            );
          delete r.position;
          if (u) {
            s = this.getOrigPosition();
            if (v.openOpacity) {
              s.opacity = 0.1;
            }
          } else {
            if (t === "fade") {
              s.opacity = 0.1;
            }
          }
          q.wrap.css(s).animate(r, {
            duration: t === "none" ? 0 : v.openSpeed,
            easing: v.openEasing,
            step: u ? this.step : null,
            complete: q._afterZoomIn,
          });
        },
        zoomOut: function () {
          var u = q.current,
            s = u.closeEffect,
            t = s === "elastic",
            r = {
              opacity: 0.1,
            };
          if (t) {
            r = this.getOrigPosition();
            if (u.closeOpacity) {
              r.opacity = 0.1;
            }
          }
          q.wrap.animate(r, {
            duration: s === "none" ? 0 : u.closeSpeed,
            easing: u.closeEasing,
            step: t ? this.step : null,
            complete: q._afterZoomOut,
          });
        },
        changeIn: function () {
          var w = q.current,
            t = w.nextEffect,
            s = w.pos,
            r = {
              opacity: 1,
            },
            v = q.direction,
            x = 200,
            u;
          s.opacity = 0.1;
          if (t === "elastic") {
            u = v === "down" || v === "up" ? "top" : "left";
            if (v === "down" || v === "right") {
              s[u] = g(n(s[u]) - x);
              r[u] = "+=" + x + "px";
            } else {
              s[u] = g(n(s[u]) + x);
              r[u] = "-=" + x + "px";
            }
          }
          if (t === "none") {
            q._afterZoomIn();
          } else {
            q.wrap.css(s).animate(r, {
              duration: w.nextSpeed,
              easing: w.nextEasing,
              complete: q._afterZoomIn,
            });
          }
        },
        changeOut: function () {
          var t = q.previous,
            s = t.prevEffect,
            r = {
              opacity: 0.1,
            },
            u = q.direction,
            v = 200;
          if (s === "elastic") {
            r[u === "down" || u === "up" ? "top" : "left"] =
              (u === "up" || u === "left" ? "-" : "+") + "=" + v + "px";
          }
          t.wrap.animate(r, {
            duration: s === "none" ? 0 : t.prevSpeed,
            easing: t.prevEasing,
            complete: function () {
              i(this).trigger("onReset").remove();
            },
          });
        },
      };
      q.helpers.overlay = {
        defaults: {
          closeClick: true,
          speedOut: 200,
          showEarly: true,
          css: {},
          locked: !f,
          fixed: true,
        },
        overlay: null,
        fixed: false,
        el: i("html"),
        create: function (r) {
          r = i.extend({}, this.defaults, r);
          if (this.overlay) {
            this.close();
          }
          this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(
            q.coming ? q.coming.parent : r.parent
          );
          this.fixed = false;
          if (r.fixed && q.defaults.fixed) {
            this.overlay.addClass("fancybox-overlay-fixed");
            this.fixed = true;
          }
        },
        open: function (s) {
          var r = this;
          s = i.extend({}, this.defaults, s);
          if (this.overlay) {
            this.overlay.unbind(".overlay").width("auto").height("auto");
          } else {
            this.create(s);
          }
          if (!this.fixed) {
            d.bind("resize.overlay", i.proxy(this.update, this));
            this.update();
          }
          if (s.closeClick) {
            this.overlay.bind("click.overlay", function (t) {
              if (i(t.target).hasClass("fancybox-overlay")) {
                if (q.isActive) {
                  q.close();
                } else {
                  r.close();
                }
                return false;
              }
            });
          }
          this.overlay.css(s.css).show();
        },
        close: function () {
          var r, s;
          d.unbind("resize.overlay");
          if (this.el.hasClass("fancybox-lock")) {
            i(".fancybox-margin").removeClass("fancybox-margin");
            r = d.scrollTop();
            s = d.scrollLeft();
            this.el.removeClass("fancybox-lock");
            d.scrollTop(r).scrollLeft(s);
          }
          i(".fancybox-overlay").remove().hide();
          i.extend(this, {
            overlay: null,
            fixed: false,
          });
        },
        update: function () {
          var s = "100%",
            r;
          this.overlay.width(s).height("100%");
          if (k) {
            r = Math.max(o.documentElement.offsetWidth, o.body.offsetWidth);
            if (a.width() > r) {
              s = a.width();
            }
          } else {
            if (a.width() > d.width()) {
              s = a.width();
            }
          }
          this.overlay.width(s).height(a.height());
        },
        onReady: function (s, t) {
          var r = this.overlay;
          i(".fancybox-overlay").stop(true, true);
          if (!r) {
            this.create(s);
          }
          if (s.locked && this.fixed && t.fixed) {
            if (!r) {
              this.margin =
                a.height() > d.height()
                  ? i("html").css("margin-right").replace("px", "")
                  : false;
            }
            t.locked = this.overlay.append(t.wrap);
            t.fixed = false;
          }
          if (s.showEarly === true) {
            this.beforeShow.apply(this, arguments);
          }
        },
        beforeShow: function (t, u) {
          var r, s;
          if (u.locked) {
            if (this.margin !== false) {
              i("*")
                .filter(function () {
                  return (
                    i(this).css("position") === "fixed" &&
                    !i(this).hasClass("fancybox-overlay") &&
                    !i(this).hasClass("fancybox-wrap")
                  );
                })
                .addClass("fancybox-margin");
              this.el.addClass("fancybox-margin");
            }
            r = d.scrollTop();
            s = d.scrollLeft();
            this.el.addClass("fancybox-lock");
            d.scrollTop(r).scrollLeft(s);
          }
          this.open(t);
        },
        onUpdate: function () {
          if (!this.fixed) {
            this.update();
          }
        },
        afterClose: function (r) {
          if (this.overlay && !q.coming) {
            this.overlay.fadeOut(r.speedOut, i.proxy(this.close, this));
          }
        },
      };
      q.helpers.title = {
        defaults: {
          type: "float",
          position: "bottom",
        },
        beforeShow: function (s) {
          var u = q.current,
            w = u.title,
            r = s.type,
            v,
            t;
          if (i.isFunction(w)) {
            w = w.call(u.element, u);
          }
          if (!b(w) || i.trim(w) === "") {
            return;
          }
          v = i(
            '<div class="fancybox-title fancybox-title-' +
              r +
              '-wrap">' +
              w +
              "</div>"
          );
          switch (r) {
            case "inside":
              t = q.skin;
              break;
            case "outside":
              t = q.wrap;
              break;
            case "over":
              t = q.inner;
              break;
            default:
              t = q.skin;
              v.appendTo("body");
              if (k) {
                v.width(v.width());
              }
              v.wrapInner('<span class="child"></span>');
              q.current.margin[2] += Math.abs(n(v.css("margin-bottom")));
              break;
          }
          v[s.position === "top" ? "prependTo" : "appendTo"](t);
        },
      };
      i.fn.fancybox = function (t) {
        var s,
          u = i(this),
          r = this.selector || "",
          v = function (z) {
            var y = i(this).blur(),
              w = s,
              x,
              A;
            if (
              !(z.ctrlKey || z.altKey || z.shiftKey || z.metaKey) &&
              !y.is(".fancybox-wrap")
            ) {
              x = t.groupAttr || "data-fancybox-group";
              A = y.attr(x);
              if (!A) {
                x = "rel";
                A = y.get(0)[x];
              }
              if (A && A !== "" && A !== "nofollow") {
                y = r.length ? i(r) : u;
                y = y.filter("[" + x + '="' + A + '"]');
                w = y.index(this);
              }
              t.index = w;
              if (q.open(y, t) !== false) {
                z.preventDefault();
              }
            }
          };
        t = t || {};
        s = t.index || 0;
        if (!r || t.live === false) {
          u.unbind("click.fb-start").bind("click.fb-start", v);
        } else {
          a.undelegate(r, "click.fb-start").delegate(
            r + ":not('.fancybox-item, .fancybox-nav')",
            "click.fb-start",
            v
          );
        }
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this;
      };
      a.ready(function () {
        var s, r;
        if (i.scrollbarWidth === e) {
          i.scrollbarWidth = function () {
            var u = i(
                '<div style="width:50px;height:50px;overflow:auto"><div/></div>'
              ).appendTo("body"),
              v = u.children(),
              t = v.innerWidth() - v.height(99).innerWidth();
            u.remove();
            return t;
          };
        }
        if (i.support.fixedPosition === e) {
          i.support.fixedPosition = (function () {
            var u = i('<div style="position:fixed;top:20px;"></div>').appendTo(
                "body"
              ),
              t = u[0].offsetTop === 20 || u[0].offsetTop === 15;
            u.remove();
            return t;
          })();
        }
        i.extend(q.defaults, {
          scrollbarWidth: i.scrollbarWidth(),
          fixed: i.support.fixedPosition,
          parent: i("body"),
        });
        s = i(l).width();
        p.addClass("fancybox-lock-test");
        r = i(l).width();
        p.removeClass("fancybox-lock-test");
        i(
          "<style type='text/css'>.fancybox-margin{margin-right:" +
            (r - s) +
            "px;}</style>"
        ).appendTo("head");
      });
    })(window, document, jQuery);

    /*!
     * Media helper for fancyBox
     * version: 1.0.6 (Fri, 14 Jun 2013)
     * @requires fancyBox v2.0 or later
     *
     * Usage:
     *     $(".fancybox").fancybox({
     *         helpers : {
     *             media: true
     *         }
     *     });
     *
     * Set custom URL parameters:
     *     $(".fancybox").fancybox({
     *         helpers : {
     *             media: {
     *                 youtube : {
     *                     params : {
     *                         autoplay : 0
     *                     }
     *                 }
     *             }
     *         }
     *     });
     *
     * Or:
     *     $(".fancybox").fancybox({,
     *         helpers : {
     *             media: true
     *         },
     *         youtube : {
     *             autoplay: 0
     *         }
     *     });
     *
     *  Supports:
     *
     *      Youtube
     *          http://www.youtube.com/watch?v=opj24KnzrWo
     *          http://www.youtube.com/embed/opj24KnzrWo
     *          http://youtu.be/opj24KnzrWo
     *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
     *      Vimeo
     *          http://vimeo.com/40648169
     *          http://vimeo.com/channels/staffpicks/38843628
     *          http://vimeo.com/groups/surrealism/videos/36516384
     *          http://player.vimeo.com/video/45074303
     *      Metacafe
     *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
     *          http://www.metacafe.com/watch/7635964/
     *      Dailymotion
     *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
     *      Twitvid
     *          http://twitvid.com/QY7MD
     *      Twitpic
     *          http://twitpic.com/7p93st
     *      Instagram
     *          http://instagr.am/p/IejkuUGxQn/
     *          http://instagram.com/p/IejkuUGxQn/
     *      Google maps
     *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
     *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
     *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
     */
    (function (b) {
      var a = b.fancybox,
        c = function (d, e, f) {
          f = f || "";
          if (b.type(f) === "object") {
            f = b.param(f, true);
          }
          b.each(e, function (g, h) {
            d = d.replace("$" + g, h || "");
          });
          if (f.length) {
            d += (d.indexOf("?") > 0 ? "&" : "?") + f;
          }
          return d;
        };
    })(jQuery);
    /*!
     * Thumbnail helper for fancyBox
     * version: 1.0.7 (Mon, 01 Oct 2012)
     * @requires fancyBox v2.0 or later
     *
     * Usage:
     *     $(".fancybox").fancybox({
     *         helpers : {
     *             thumbs: {
     *                 width  : 50,
     *                 height : 50
     *             }
     *         }
     *     });
     *
     */
    (function (b) {
      var a = b.fancybox;
      a.helpers.thumbs = {
        defaults: {
          width: 50,
          height: 50,
          position: "bottom",
          source: function (d) {
            var c;
            if (d.element) {
              c = b(d.element).find("img").attr("src");
            }
            if (!c && d.type === "image" && d.href) {
              c = d.href;
            }
            return c;
          },
        },
        wrap: null,
        list: null,
        width: 0,
        init: function (f, i) {
          var e = this,
            g,
            c = f.width,
            h = f.height,
            d = f.source;
          g = "";
          for (var j = 0; j < i.group.length; j++) {
            g +=
              '<li><a style="width:' +
              c +
              "px;height:" +
              h +
              'px;" href="javascript:jQuery.fancybox.jumpto(' +
              j +
              ');"></a></li>';
          }
          this.wrap = b('<div id="fancybox-thumbs"></div>')
            .addClass(f.position)
            .appendTo("body");
          this.list = b("<ul>" + g + "</ul>").appendTo(this.wrap);
          b.each(i.group, function (l) {
            var k = d(i.group[l]);
            if (!k) {
              return;
            }
            b("<img />")
              .load(function () {
                var q = this.width,
                  m = this.height,
                  p,
                  n,
                  o;
                if (!e.list || !q || !m) {
                  return;
                }
                p = q / c;
                n = m / h;
                o = e.list.children().eq(l).find("a");
                if (p >= 1 && n >= 1) {
                  if (p > n) {
                    q = Math.floor(q / n);
                    m = h;
                  } else {
                    q = c;
                    m = Math.floor(m / p);
                  }
                }
                b(this).css({
                  width: q,
                  height: m,
                  top: Math.floor(h / 2 - m / 2),
                  left: Math.floor(c / 2 - q / 2),
                });
                o.width(c).height(h);
                b(this).hide().appendTo(o).fadeIn(300);
              })
              .attr("src", k);
          });
          this.width = this.list.children().eq(0).outerWidth(true);
          this.list
            .width(this.width * (i.group.length + 1))
            .css(
              "left",
              Math.floor(
                b(window).width() * 0.5 -
                  (i.index * this.width + this.width * 0.5)
              )
            );
        },
        beforeLoad: function (c, d) {
          if (d.group.length < 2) {
            d.helpers.thumbs = false;
            return;
          }
          d.margin[c.position === "top" ? 0 : 2] += c.height + 15;
        },
        afterShow: function (c, d) {
          if (this.list) {
            this.onUpdate(c, d);
          } else {
            this.init(c, d);
          }
          this.list
            .children()
            .removeClass("active")
            .eq(d.index)
            .addClass("active");
        },
        onUpdate: function (c, d) {
          if (this.list) {
            this.list.stop(true).animate(
              {
                left: Math.floor(
                  b(window).width() * 0.5 -
                    (d.index * this.width + this.width * 0.5)
                ),
              },
              150
            );
          }
        },
        beforeClose: function () {
          if (this.wrap) {
            this.wrap.remove();
          }
          this.wrap = null;
          this.list = null;
          this.width = 0;
        },
      };
    })(jQuery);
    /*!
     * jQuery Tools v1.2.6 - The missing UI library for the Web
     *
     * overlay/overlay.js
     * toolbox/toolbox.expose.js
     * tooltip/tooltip.js
     *
     * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
     *
     * http://flowplayer.org/tools/
     *
     */
    (function (D, C) {
      function x(d, c) {
        return new Date(d, c + 1, 0).getDate();
      }

      function w(d, c) {
        (d = "" + d), (c = c || 2);
        while (d.length < c) {
          d = "0" + d;
        }
        return d;
      }

      function t(G, F, E) {
        var o = G.getDate(),
          n = G.getDay(),
          j = G.getMonth(),
          i = G.getFullYear(),
          h = {
            d: o,
            dd: w(o),
            ddd: y[E].shortDays[n],
            dddd: y[E].days[n],
            m: j + 1,
            mm: w(j + 1),
            mmm: y[E].shortMonths[j],
            mmmm: y[E].months[j],
            yy: String(i).slice(2),
            yyyy: i,
          },
          f = F.replace(v, function (b) {
            return b in h ? h[b] : b.slice(1, b.length - 1);
          });
        return u.html(f).html();
      }

      function s(b) {
        return parseInt(b, 10);
      }

      function r(d, c) {
        return (
          d.getFullYear() === c.getFullYear() &&
          d.getMonth() == c.getMonth() &&
          d.getDate() == c.getDate()
        );
      }

      function q(b) {
        if (b === C) {
          return;
        }
        if (b.constructor == Date) {
          return b;
        }
        if (typeof b == "string") {
          var f = b.split("-");
          if (f.length == 3) {
            return new Date(s(f[0]), s(f[1]) - 1, s(f[2]));
          }
          if (!/^-?\d+$/.test(b)) {
            return;
          }
          b = s(b);
        }
        var e = new Date();
        return e.setDate(e.getDate() + b), e;
      }

      function p(ah, ag) {
        function b(d, i, h) {
          (f = d),
            (O = d.getFullYear()),
            (m = d.getMonth()),
            (k = d.getDate()),
            (h = h || D.Event("api")),
            (h.type = "beforeChange"),
            P.trigger(h, [d]);
          if (h.isDefaultPrevented()) {
            return;
          }
          ah.val(t(d, i.format, i.lang)),
            (h.type = "change"),
            P.trigger(h),
            ah.data("date", d),
            af.hide(h);
        }

        function a(d) {
          (d.type = "onShow"),
            P.trigger(d),
            D(document).bind("keydown.d", function (i) {
              if (i.ctrlKey) {
                return !0;
              }
              var F = i.keyCode;
              if (F == 8) {
                return ah.val(""), af.hide(i);
              }
              if (F == 27 || F == 9) {
                return af.hide(i);
              }
              if (D(z).index(F) >= 0) {
                if (!X) {
                  return af.show(i), i.preventDefault();
                }
                var E = D("#" + ac.weeks + " a"),
                  o = D("." + ac.focus),
                  j = E.index(o);
                o.removeClass(ac.focus);
                if (F == 74 || F == 40) {
                  j += 7;
                } else {
                  if (F == 75 || F == 38) {
                    j -= 7;
                  } else {
                    if (F == 76 || F == 39) {
                      j += 1;
                    } else {
                      if (F == 72 || F == 37) {
                        j -= 1;
                      }
                    }
                  }
                }
                return (
                  j > 41
                    ? (af.addMonth(),
                      (o = D("#" + ac.weeks + " a:eq(" + (j - 42) + ")")))
                    : j < 0
                    ? (af.addMonth(-1),
                      (o = D("#" + ac.weeks + " a:eq(" + (j + 42) + ")")))
                    : (o = E.eq(j)),
                  o.addClass(ac.focus),
                  i.preventDefault()
                );
              }
              return F == 34
                ? af.addMonth()
                : F == 33
                ? af.addMonth(-1)
                : F == 36
                ? af.today()
                : (F == 13 &&
                    (D(i.target).is("select") || D("." + ac.focus).click()),
                  D([16, 17, 18, 9]).index(F) >= 0);
            }),
            D(document).bind("click.d", function (h) {
              var i = h.target;
              !D(i).parents("#" + ac.root).length &&
                i != ah[0] &&
                (!U || i != U[0]) &&
                af.hide(h);
            });
        }
        var af = this,
          ae = new Date(),
          ad = ae.getFullYear(),
          ac = ag.css,
          aa = y[ag.lang],
          Y = D("#" + ac.root),
          W = Y.find("#" + ac.title),
          U,
          S,
          Q,
          O,
          m,
          k,
          f = ah.attr("data-value") || ag.value || ah.val(),
          ab = ah.attr("min") || ag.min,
          Z = ah.attr("max") || ag.max,
          X,
          V;
        ab === 0 && (ab = "0"),
          (f = q(f) || ae),
          (ab = q(ab || new Date(ad + ag.yearRange[0], 1, 1))),
          (Z = q(Z || new Date(ad + ag.yearRange[1] + 1, 1, -1)));
        if (!aa) {
          throw "Dateinput: invalid language: " + ag.lang;
        }
        if (ah.attr("type") == "date") {
          var V = ah.clone(),
            T = V.wrap("<div/>").parent().html(),
            R = D(T.replace(/type/i, "type=text data-orig-type"));
          ag.value && R.val(ag.value), ah.replaceWith(R), (ah = R);
        }
        ah.addClass(ac.input);
        var P = ah.add(af);
        if (!Y.length) {
          (Y = D("<div><div><a/><div/><a/></div><div><div/><div/></div></div>")
            .hide()
            .css({
              position: "absolute",
            })
            .attr("id", ac.root)),
            Y.children()
              .eq(0)
              .attr("id", ac.head)
              .end()
              .eq(1)
              .attr("id", ac.body)
              .children()
              .eq(0)
              .attr("id", ac.days)
              .end()
              .eq(1)
              .attr("id", ac.weeks)
              .end()
              .end()
              .end()
              .find("a")
              .eq(0)
              .attr("id", ac.prev)
              .end()
              .eq(1)
              .attr("id", ac.next),
            (W = Y.find("#" + ac.head)
              .find("div")
              .attr("id", ac.title));
          if (ag.selectors) {
            var n = D("<select/>").attr("id", ac.month),
              l = D("<select/>").attr("id", ac.year);
            W.html(n.add(l));
          }
          var g = Y.find("#" + ac.days);
          for (var e = 0; e < 7; e++) {
            g.append(D("<span/>").text(aa.shortDays[(e + ag.firstDay) % 7]));
          }
          D("body").append(Y);
        }
        ag.trigger &&
          (U = D("<a/>")
            .attr("href", "#")
            .addClass(ac.trigger)
            .click(function (d) {
              return ag.toggle ? af.toggle() : af.show(), d.preventDefault();
            })
            .insertAfter(ah));
        var c = Y.find("#" + ac.weeks);
        (l = Y.find("#" + ac.year)),
          (n = Y.find("#" + ac.month)),
          D.extend(af, {
            show: function (d) {
              if (ah.attr("readonly") || ah.attr("disabled") || X) {
                return;
              }
              (d = d || D.Event()), (d.type = "onBeforeShow"), P.trigger(d);
              if (d.isDefaultPrevented()) {
                return;
              }
              D.each(B, function () {
                this.hide();
              }),
                (X = !0),
                n.unbind("change").change(function () {
                  af.setValue(l.val(), D(this).val());
                }),
                l.unbind("change").change(function () {
                  af.setValue(D(this).val(), n.val());
                }),
                (S = Y.find("#" + ac.prev)
                  .unbind("click")
                  .click(function (i) {
                    return S.hasClass(ac.disabled) || af.addMonth(-1), !1;
                  })),
                (Q = Y.find("#" + ac.next)
                  .unbind("click")
                  .click(function (i) {
                    return Q.hasClass(ac.disabled) || af.addMonth(), !1;
                  })),
                af.setValue(f);
              var h = ah.offset();
              return (
                /iPad/i.test(navigator.userAgent) &&
                  (h.top -= D(window).scrollTop()),
                Y.css({
                  top:
                    h.top +
                    ah.outerHeight({
                      margins: !0,
                    }) +
                    ag.offset[0],
                  left: h.left + ag.offset[1],
                }),
                ag.speed
                  ? Y.show(ag.speed, function () {
                      a(d);
                    })
                  : (Y.show(), a(d)),
                af
              );
            },
            setValue: function (N, M, L) {
              var I =
                s(M) >= -1
                  ? new Date(s(N), s(M), s(L == C || isNaN(L) ? 1 : L))
                  : N || f;
              I < ab ? (I = ab) : I > Z && (I = Z),
                typeof N == "string" && (I = q(N)),
                (N = I.getFullYear()),
                (M = I.getMonth()),
                (L = I.getDate()),
                M == -1 ? ((M = 11), N--) : M == 12 && ((M = 0), N++);
              if (!X) {
                return b(I, ag), af;
              }
              (m = M), (O = N), (k = L);
              var H = new Date(N, M, 1 - ag.firstDay),
                j = H.getDay(),
                i = x(N, M),
                am = x(N, M - 1),
                h;
              if (ag.selectors) {
                n.empty(),
                  D.each(aa.months, function (o, E) {
                    ab < new Date(N, o + 1, 1) &&
                      Z > new Date(N, o, 0) &&
                      n.append(D("<option/>").html(E).attr("value", o));
                  }),
                  l.empty();
                var an = ae.getFullYear();
                for (
                  var al = an + ag.yearRange[0];
                  al < an + ag.yearRange[1];
                  al++
                ) {
                  ab < new Date(al + 1, 0, 1) &&
                    Z > new Date(al, 0, 0) &&
                    l.append(D("<option/>").text(al));
                }
                n.val(M), l.val(N);
              } else {
                W.html(aa.months[M] + " " + N);
              }
              c.empty(), S.add(Q).removeClass(ac.disabled);
              for (var ak = j ? 0 : -7, aj, ai; ak < (j ? 42 : 35); ak++) {
                (aj = D("<a/>")),
                  ak % 7 === 0 &&
                    ((h = D("<div/>").addClass(ac.week)), c.append(h)),
                  ak < j
                    ? (aj.addClass(ac.off),
                      (ai = am - j + ak + 1),
                      (I = new Date(N, M - 1, ai)))
                    : ak >= j + i
                    ? (aj.addClass(ac.off),
                      (ai = ak - i - j + 1),
                      (I = new Date(N, M + 1, ai)))
                    : ((ai = ak - j + 1),
                      (I = new Date(N, M, ai)),
                      r(f, I)
                        ? aj.attr("id", ac.current).addClass(ac.focus)
                        : r(ae, I) && aj.attr("id", ac.today)),
                  ab && I < ab && aj.add(S).addClass(ac.disabled),
                  Z && I > Z && aj.add(Q).addClass(ac.disabled),
                  aj
                    .attr("href", "#" + ai)
                    .text(ai)
                    .data("date", I),
                  h.append(aj);
              }
              return (
                c.find("a").click(function (d) {
                  var o = D(this);
                  return (
                    o.hasClass(ac.disabled) ||
                      (D("#" + ac.current).removeAttr("id"),
                      o.attr("id", ac.current),
                      b(o.data("date"), ag, d)),
                    !1
                  );
                }),
                ac.sunday &&
                  c.find(ac.week).each(function () {
                    var d = ag.firstDay ? 7 - ag.firstDay : 0;
                    D(this)
                      .children()
                      .slice(d, d + 1)
                      .addClass(ac.sunday);
                  }),
                af
              );
            },
            setMin: function (h, d) {
              return (ab = q(h)), d && f < ab && af.setValue(ab), af;
            },
            setMax: function (h, d) {
              return (Z = q(h)), d && f > Z && af.setValue(Z), af;
            },
            today: function () {
              return af.setValue(ae);
            },
            addDay: function (d) {
              return this.setValue(O, m, k + (d || 1));
            },
            addMonth: function (i) {
              var h = m + (i || 1),
                o = x(O, h),
                j = k <= o ? k : o;
              return this.setValue(O, h, j);
            },
            addYear: function (d) {
              return this.setValue(O + (d || 1), m, k);
            },
            destroy: function () {
              ah.add(document).unbind("click.d").unbind("keydown.d"),
                Y.add(U).remove(),
                ah.removeData("dateinput").removeClass(ac.input),
                V && ah.replaceWith(V);
            },
            hide: function (d) {
              if (X) {
                (d = D.Event()),
                  (d.type = "onHide"),
                  P.trigger(d),
                  D(document).unbind("click.d").unbind("keydown.d");
                if (d.isDefaultPrevented()) {
                  return;
                }
                Y.hide(), (X = !1);
              }
              return af;
            },
            toggle: function () {
              return af.isOpen() ? af.hide() : af.show();
            },
            getConf: function () {
              return ag;
            },
            getInput: function () {
              return ah;
            },
            getCalendar: function () {
              return Y;
            },
            getValue: function (d) {
              return d ? t(f, d, ag.lang) : f;
            },
            isOpen: function () {
              return X;
            },
          }),
          D.each(
            ["onBeforeShow", "onShow", "change", "onHide"],
            function (d, h) {
              D.isFunction(ag[h]) && D(af).bind(h, ag[h]),
                (af[h] = function (i) {
                  return i && D(af).bind(h, i), af;
                });
            }
          ),
          ag.editable ||
            ah.bind("focus.d click.d", af.show).keydown(function (d) {
              var h = d.keyCode;
              return !X && D(z).index(h) >= 0
                ? (af.show(d), d.preventDefault())
                : d.shiftKey || d.ctrlKey || d.altKey || h == 9
                ? !0
                : d.preventDefault();
            }),
          q(ah.val()) && b(f, ag);
      }
      D.tools = D.tools || {
        version: "1.2.6",
      };
      var B = [],
        A,
        z = [75, 76, 38, 39, 74, 72, 40, 37],
        y = {};
      (A = D.tools.dateinput =
        {
          conf: {
            format: "mm/dd/yy",
            selectors: !1,
            yearRange: [-5, 5],
            lang: "en",
            offset: [0, 0],
            speed: 0,
            firstDay: 0,
            min: C,
            max: C,
            trigger: 0,
            toggle: 0,
            editable: 0,
            css: {
              prefix: "cal",
              input: "date",
              root: 0,
              head: 0,
              title: 0,
              prev: 0,
              next: 0,
              month: 0,
              year: 0,
              days: 0,
              body: 0,
              weeks: 0,
              today: 0,
              current: 0,
              week: 0,
              off: 0,
              sunday: 0,
              focus: 0,
              disabled: 0,
              trigger: 0,
            },
          },
          localize: function (a, d) {
            D.each(d, function (e, c) {
              d[e] = c.split(",");
            }),
              (y[a] = d);
          },
        }),
        A.localize("en", {
          months:
            "January,February,March,April,May,June,July,August,September,October,November,December",
          shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
          days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
          shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
        });
      var v = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,
        u = D("<a/>");
      (D.expr[":"].date = function (a) {
        var d = a.getAttribute("type");
        return (d && d == "date") || !!D(a).data("dateinput");
      }),
        (D.fn.dateinput = function (a) {
          if (this.data("dateinput")) {
            return this;
          }
          (a = D.extend(!0, {}, A.conf, a)),
            D.each(a.css, function (b, d) {
              !d &&
                b != "prefix" &&
                (a.css[b] = (a.css.prefix || "") + (d || b));
            });
          var c;
          return (
            this.each(function () {
              var e = new p(D(this), a);
              B.push(e);
              var b = e.getInput().data("dateinput", e);
              c = c ? c.add(b) : b;
            }),
            c ? c : this
          );
        });
    })(jQuery),
      (function (f) {
        function g(v, u) {
          var t = this,
            s = v.add(t),
            r = f(window),
            q,
            p,
            o,
            c = f.tools.expose && (u.mask || u.expose),
            b = Math.random().toString().slice(10);
          c &&
            (typeof c == "string" &&
              (c = {
                color: c,
              }),
            (c.closeOnClick = c.closeOnEsc = !1));
          var a = u.target || v.attr("rel");
          p = a ? f(a) : null || v;
          if (!p.length) {
            throw "Could not find Overlay: " + a;
          }
          v &&
            v.index(p) == -1 &&
            v.click(function (d) {
              return t.load(d), d.preventDefault();
            }),
            f.extend(t, {
              load: function (w) {
                if (t.isOpened()) {
                  return t;
                }
                var j = h[u.effect];
                if (!j) {
                  throw 'Overlay: cannot find effect : "' + u.effect + '"';
                }
                u.oneInstance &&
                  f.each(e, function () {
                    this.close(w);
                  }),
                  (w = w || f.Event()),
                  (w.type = "onBeforeLoad"),
                  s.trigger(w);
                if (w.isDefaultPrevented()) {
                  return t;
                }
                (o = !0), c && f(p).expose(c);
                var x = u.top,
                  m = u.left,
                  l = p.outerWidth({
                    margin: !0,
                  }),
                  k = p.outerHeight({
                    margin: !0,
                  });
                return (
                  typeof x == "string" &&
                    (x =
                      x == "center"
                        ? Math.max((r.height() - k) / 2, 0)
                        : (parseInt(x, 10) / 100) * r.height()),
                  m == "center" && (m = Math.max((r.width() - l) / 2, 0)),
                  j[0].call(
                    t,
                    {
                      top: x,
                      left: m,
                    },
                    function () {
                      o && ((w.type = "onLoad"), s.trigger(w));
                    }
                  ),
                  c && u.closeOnClick && f.mask.getMask().one("click", t.close),
                  u.closeOnClick &&
                    f(document).bind("click." + b, function (d) {
                      f(d.target).parents(p).length || t.close(d);
                    }),
                  u.closeOnEsc &&
                    f(document).bind("keydown." + b, function (d) {
                      d.keyCode == 27 && t.close(d);
                    }),
                  t
                );
              },
              close: function (d) {
                if (!t.isOpened()) {
                  return t;
                }
                (d = d || f.Event()), (d.type = "onBeforeClose"), s.trigger(d);
                if (d.isDefaultPrevented()) {
                  return;
                }
                return (
                  (o = !1),
                  h[u.effect][1].call(t, function () {
                    (d.type = "onClose"), s.trigger(d);
                  }),
                  f(document)
                    .unbind("click." + b)
                    .unbind("keydown." + b),
                  c && f.mask.close(),
                  t
                );
              },
              getOverlay: function () {
                return p;
              },
              getTrigger: function () {
                return v;
              },
              getClosers: function () {
                return q;
              },
              isOpened: function () {
                return o;
              },
              getConf: function () {
                return u;
              },
            }),
            f.each(
              "onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),
              function (d, i) {
                f.isFunction(u[i]) && f(t).bind(i, u[i]),
                  (t[i] = function (j) {
                    return j && f(t).bind(i, j), t;
                  });
              }
            ),
            (q = p.find(u.close || ".close")),
            !q.length &&
              !u.close &&
              ((q = f('<a class="close"></a>')), p.prepend(q)),
            q.click(function (d) {
              t.close(d);
            }),
            u.load && t.load();
        }
        (f.tools = f.tools || {
          version: "1.2.6",
        }),
          (f.tools.overlay = {
            addEffect: function (i, c, j) {
              h[i] = [c, j];
            },
            conf: {
              close: null,
              closeOnClick: !0,
              closeOnEsc: !0,
              closeSpeed: "fast",
              effect: "default",
              fixed: !f.browser.msie || f.browser.version > 6,
              left: "center",
              load: !1,
              mask: null,
              oneInstance: !0,
              speed: "normal",
              target: null,
              top: "10%",
            },
          });
        var e = [],
          h = {};
        f.tools.overlay.addEffect(
          "default",
          function (a, k) {
            var j = this.getConf(),
              i = f(window);
            j.fixed || ((a.top += i.scrollTop()), (a.left += i.scrollLeft())),
              (a.position = j.fixed ? "fixed" : "absolute"),
              this.getOverlay().css(a).fadeIn(j.speed, k);
          },
          function (b) {
            this.getOverlay().fadeOut(this.getConf().closeSpeed, b);
          }
        ),
          (f.fn.overlay = function (b) {
            var a = this.data("overlay");
            return a
              ? a
              : (f.isFunction(b) &&
                  (b = {
                    onBeforeLoad: b,
                  }),
                (b = f.extend(!0, {}, f.tools.overlay.conf, b)),
                this.each(function () {
                  (a = new g(f(this), b)),
                    e.push(a),
                    f(this).data("overlay", a);
                }),
                b.api ? a : this);
          });
      })(jQuery),
      (function (h) {
        function k(d) {
          var c = d.offset();
          return {
            top: c.top + d.height() / 2,
            left: c.left + d.width() / 2,
          };
        }
        var g = h.tools.overlay,
          l = h(window);
        h.extend(g.conf, {
          start: {
            top: null,
            left: null,
          },
          fadeInSpeed: "fast",
          zIndex: 9999,
        });
        var j = function (z, y) {
            var x = this.getOverlay(),
              w = this.getConf(),
              v = this.getTrigger(),
              u = this,
              t = x.outerWidth({
                margin: !0,
              }),
              s = x.data("img"),
              r = w.fixed ? "fixed" : "absolute";
            if (!s) {
              var q = x.css("backgroundImage");
              if (!q) {
                throw "background-image CSS property not set for overlay";
              }
              (q = q
                .slice(q.indexOf("(") + 1, q.indexOf(")"))
                .replace(/\"/g, "")),
                x.css("backgroundImage", "none"),
                (s = h('<img src="' + q + '"/>')),
                s
                  .css({
                    border: 0,
                    display: "none",
                  })
                  .width(t),
                h("body").append(s),
                x.data("img", s);
            }
            var d = w.start.top || Math.round(l.height() / 2),
              c = w.start.left || Math.round(l.width() / 2);
            if (v) {
              var a = k(v);
              (d = a.top), (c = a.left);
            }
            w.fixed
              ? ((d -= l.scrollTop()), (c -= l.scrollLeft()))
              : ((z.top += l.scrollTop()), (z.left += l.scrollLeft())),
              s
                .css({
                  position: "absolute",
                  top: d,
                  left: c,
                  width: 0,
                  zIndex: w.zIndex,
                })
                .show(),
              (z.position = r),
              x.css(z),
              s
                .animate(
                  {
                    top: x.css("top"),
                    left: x.css("left"),
                    width: t,
                  },
                  w.speed,
                  function () {
                    x.css("zIndex", w.zIndex + 1).fadeIn(
                      w.fadeInSpeed,
                      function () {
                        u.isOpened() && !h(this).index(x) ? y.call() : x.hide();
                      }
                    );
                  }
                )
                .css("position", r);
          },
          i = function (a) {
            var o = this.getOverlay().hide(),
              n = this.getConf(),
              m = this.getTrigger(),
              d = o.data("img"),
              c = {
                top: n.start.top,
                left: n.start.left,
                width: 0,
              };
            m && h.extend(c, k(m)),
              n.fixed &&
                d
                  .css({
                    position: "absolute",
                  })
                  .animate(
                    {
                      top: "+=" + l.scrollTop(),
                      left: "+=" + l.scrollLeft(),
                    },
                    0
                  ),
              d.animate(c, n.closeSpeed, a);
          };
        g.addEffect("apple", j, i);
      })(jQuery),
      (function (j) {
        function n(e, d) {
          var f = Math.pow(10, d);
          return Math.round(e * f) / f;
        }

        function m(f, e) {
          var h = parseInt(f.css(e), 10);
          if (h) {
            return h;
          }
          var g = f[0].currentStyle;
          return g && g.width && parseInt(g.width, 10);
        }

        function l(d) {
          var c = d.data("events");
          return c && c.onSlide;
        }

        function k(T, S) {
          function e(c, u, s, r) {
            s === undefined ? (s = (u / L) * G) : r && (s -= S.min),
              F && (s = Math.round(s / F) * F);
            if (u === undefined || F) {
              u = (s * L) / G;
            }
            if (isNaN(s)) {
              return R;
            }
            (u = Math.max(0, Math.min(u, L))), (s = (u / L) * G);
            if (r || !O) {
              s += S.min;
            }
            O && (r ? (u = L - u) : (s = S.max - s)), (s = n(s, E));
            var q = c.type == "click";
            if (f && N !== undefined && !q) {
              (c.type = "onSlide"), g.trigger(c, [s, u]);
              if (c.isDefaultPrevented()) {
                return R;
              }
            }
            var b = q ? S.speed : 0,
              d = q
                ? function () {
                    (c.type = "change"), g.trigger(c, [s]);
                  }
                : null;
            return (
              O
                ? (J.animate(
                    {
                      top: u,
                    },
                    b,
                    d
                  ),
                  S.progress &&
                    I.animate(
                      {
                        height: L - u + J.height() / 2,
                      },
                      b
                    ))
                : (J.animate(
                    {
                      left: u,
                    },
                    b,
                    d
                  ),
                  S.progress &&
                    I.animate(
                      {
                        width: u + J.width() / 2,
                      },
                      b
                    )),
              (N = s),
              (K = u),
              T.val(s),
              R
            );
          }

          function a() {
            (O = S.vertical || m(P, "height") > m(P, "width")),
              O
                ? ((L = m(P, "height") - m(J, "height")),
                  (M = P.offset().top + L))
                : ((L = m(P, "width") - m(J, "width")), (M = P.offset().left));
          }

          function H() {
            a(), R.setValue(S.value !== undefined ? S.value : S.min);
          }
          var R = this,
            Q = S.css,
            P = j("<div><div/><a href='#'/></div>").data("rangeinput", R),
            O,
            N,
            M,
            L,
            K;
          T.before(P);
          var J = P.addClass(Q.slider).find("a").addClass(Q.handle),
            I = P.find("div").addClass(Q.progress);
          j.each("min,max,step,value".split(","), function (b, h) {
            var c = T.attr(h);
            parseFloat(c) && (S[h] = parseFloat(c, 10));
          });
          var G = S.max - S.min,
            F = S.step == "any" ? 0 : S.step,
            E = S.precision;
          if (E === undefined) {
            try {
              E = F.toString().split(".")[1].length;
            } catch (D) {
              E = 0;
            }
          }
          if (T.attr("type") == "range") {
            var C = T.clone().wrap("<div/>").parent().html(),
              B = j(C.replace(/type/i, "type=text data-orig-type"));
            B.val(S.value), T.replaceWith(B), (T = B);
          }
          T.addClass(Q.input);
          var g = j(R).add(T),
            f = !0;
          j.extend(R, {
            getValue: function () {
              return N;
            },
            setValue: function (d, h) {
              return a(), e(h || j.Event("api"), undefined, d, !0);
            },
            getConf: function () {
              return S;
            },
            getProgress: function () {
              return I;
            },
            getHandle: function () {
              return J;
            },
            getInput: function () {
              return T;
            },
            step: function (c, h) {
              h = h || j.Event();
              var d = S.step == "any" ? 1 : S.step;
              R.setValue(N + d * (c || 1), h);
            },
            stepUp: function (b) {
              return R.step(b || 1);
            },
            stepDown: function (b) {
              return R.step(-b || -1);
            },
          }),
            j.each("onSlide,change".split(","), function (c, d) {
              j.isFunction(S[d]) && j(R).bind(d, S[d]),
                (R[d] = function (h) {
                  return h && j(R).bind(d, h), R;
                });
            }),
            J.drag({
              drag: !1,
            })
              .bind("dragStart", function () {
                a(), (f = l(j(R)) || l(T));
              })
              .bind("drag", function (b, q, h) {
                if (T.is(":disabled")) {
                  return !1;
                }
                e(b, O ? q : h);
              })
              .bind("dragEnd", function (b) {
                b.isDefaultPrevented() ||
                  ((b.type = "change"), g.trigger(b, [N]));
              })
              .click(function (b) {
                return b.preventDefault();
              }),
            P.click(function (b) {
              if (T.is(":disabled") || b.target == J[0]) {
                return b.preventDefault();
              }
              a();
              var d = O ? J.height() / 2 : J.width() / 2;
              e(b, O ? L - M - d + b.pageY : b.pageX - M - d);
            }),
            S.keyboard &&
              T.keydown(function (q) {
                if (T.attr("readonly")) {
                  return;
                }
                var h = q.keyCode,
                  d = j([75, 76, 38, 33, 39]).index(h) != -1,
                  b = j([74, 72, 40, 34, 37]).index(h) != -1;
                if ((d || b) && !(q.shiftKey || q.altKey || q.ctrlKey)) {
                  return (
                    d
                      ? R.step(h == 33 ? 10 : 1, q)
                      : b && R.step(h == 34 ? -10 : -1, q),
                    q.preventDefault()
                  );
                }
              }),
            T.blur(function (d) {
              var h = j(this).val();
              h !== N && R.setValue(h, d);
            }),
            j.extend(T[0], {
              stepUp: R.stepUp,
              stepDown: R.stepDown,
            }),
            H(),
            L || j(window).load(H);
        }
        j.tools = j.tools || {
          version: "1.2.6",
        };
        var i;
        i = j.tools.rangeinput = {
          conf: {
            min: 0,
            max: 100,
            step: "any",
            steps: 0,
            value: 0,
            precision: undefined,
            vertical: 0,
            keyboard: !0,
            progress: !1,
            speed: 100,
            css: {
              input: "range",
              slider: "slider",
              progress: "progress",
              handle: "handle",
            },
          },
        };
        var p, o;
        (j.fn.drag = function (a) {
          return (
            (document.ondragstart = function () {
              return !1;
            }),
            (a = j.extend(
              {
                x: !0,
                y: !0,
                drag: !0,
              },
              a
            )),
            (p =
              p ||
              j(document).bind("mousedown mouseup", function (s) {
                var r = j(s.target);
                if (s.type == "mousedown" && r.data("drag")) {
                  var q = r.position(),
                    d = s.pageX - q.left,
                    c = s.pageY - q.top,
                    b = !0;
                  p.bind("mousemove.drag", function (f) {
                    var u = f.pageX - d,
                      t = f.pageY - c,
                      h = {};
                    a.x && (h.left = u),
                      a.y && (h.top = t),
                      b && (r.trigger("dragStart"), (b = !1)),
                      a.drag && r.css(h),
                      r.trigger("drag", [t, u]),
                      (o = r);
                  }),
                    s.preventDefault();
                } else {
                  try {
                    o && o.trigger("dragEnd");
                  } finally {
                    p.unbind("mousemove.drag"), (o = null);
                  }
                }
              })),
            this.data("drag", !0)
          );
        }),
          (j.expr[":"].range = function (a) {
            var d = a.getAttribute("type");
            return (
              (d && d == "range") || !!j(a).filter("input").data("rangeinput")
            );
          }),
          (j.fn.rangeinput = function (b) {
            if (this.data("rangeinput")) {
              return this;
            }
            b = j.extend(!0, {}, i.conf, b);
            var a;
            return (
              this.each(function () {
                var c = new k(j(this), j.extend(!0, {}, b)),
                  d = c.getInput().data("rangeinput", c);
                a = a ? a.add(d) : d;
              }),
              a ? a : this
            );
          });
      })(jQuery),
      (function (g) {
        function f(k, e) {
          var m = parseInt(k.css(e), 10);
          if (m) {
            return m;
          }
          var l = k[0].currentStyle;
          return l && l.width && parseInt(l.width, 10);
        }

        function j(a, k) {
          var e = g(k);
          return e.length < 2 ? e : a.parent().find(k);
        }

        function h(z, y) {
          var x = this,
            w = z.add(x),
            v = z.children(),
            u = 0,
            t = y.vertical;
          i || (i = x),
            v.length > 1 && (v = g(y.items, z)),
            y.size > 1 && (y.circular = !1),
            g.extend(x, {
              getConf: function () {
                return y;
              },
              getIndex: function () {
                return u;
              },
              getSize: function () {
                return x.getItems().size();
              },
              getNaviButtons: function () {
                return d.add(c);
              },
              getRoot: function () {
                return z;
              },
              getItemWrap: function () {
                return v;
              },
              getItems: function () {
                return v.find(y.item).not("." + y.clonedClass);
              },
              move: function (k, e) {
                return x.seekTo(u + k, e);
              },
              next: function (b) {
                return x.move(y.size, b);
              },
              prev: function (b) {
                return x.move(-y.size, b);
              },
              begin: function (b) {
                return x.seekTo(0, b);
              },
              end: function (b) {
                return x.seekTo(x.getSize() - 1, b);
              },
              focus: function () {
                return (i = x), x;
              },
              addItem: function (e) {
                return (
                  (e = g(e)),
                  y.circular
                    ? (v.children().last().before(e),
                      v
                        .children()
                        .first()
                        .replaceWith(e.clone().addClass(y.clonedClass)))
                    : (v.append(e), c.removeClass("disabled")),
                  w.trigger("onAddItem", [e]),
                  x
                );
              },
              seekTo: function (o, C, A) {
                o.jquery || (o *= 1);
                if (y.circular && o === 0 && u == -1 && C !== 0) {
                  return x;
                }
                if ((!y.circular && o < 0) || o > x.getSize() || o < -1) {
                  return x;
                }
                var p = o;
                o.jquery
                  ? (o = x.getItems().index(o))
                  : (p = x.getItems().eq(o));
                var e = g.Event("onBeforeSeek");
                if (!A) {
                  w.trigger(e, [o, C]);
                  if (e.isDefaultPrevented() || !p.length) {
                    return x;
                  }
                }
                var B = t
                  ? {
                      top: -p.position().top,
                    }
                  : {
                      left: -p.position().left,
                    };
                return (
                  (u = o),
                  (i = x),
                  C === undefined && (C = y.speed),
                  v.animate(
                    B,
                    C,
                    y.easing,
                    A ||
                      function () {
                        w.trigger("onSeek", [o]);
                      }
                  ),
                  x
                );
              },
            }),
            g.each(["onBeforeSeek", "onSeek", "onAddItem"], function (e, k) {
              g.isFunction(y[k]) && g(x).bind(k, y[k]),
                (x[k] = function (l) {
                  return l && g(x).bind(k, l), x;
                });
            });
          if (y.circular) {
            var s = x.getItems().slice(-1).clone().prependTo(v),
              r = x.getItems().eq(1).clone().appendTo(v);
            s.add(r).addClass(y.clonedClass),
              x.onBeforeSeek(function (k, e, l) {
                if (k.isDefaultPrevented()) {
                  return;
                }
                if (e == -1) {
                  return (
                    x.seekTo(s, l, function () {
                      x.end(0);
                    }),
                    k.preventDefault()
                  );
                }
                e == x.getSize() &&
                  x.seekTo(r, l, function () {
                    x.begin(0);
                  });
              });
            var q = z
              .parents()
              .add(z)
              .filter(function () {
                if (g(this).css("display") === "none") {
                  return !0;
                }
              });
            q.length
              ? (q.show(), x.seekTo(0, 0, function () {}), q.hide())
              : x.seekTo(0, 0, function () {});
          }
          var d = j(z, y.prev).click(function (b) {
              b.stopPropagation(), x.prev();
            }),
            c = j(z, y.next).click(function (b) {
              b.stopPropagation(), x.next();
            });
          y.circular ||
            (x.onBeforeSeek(function (k, e) {
              setTimeout(function () {
                k.isDefaultPrevented() ||
                  (d.toggleClass(y.disabledClass, e <= 0),
                  c.toggleClass(y.disabledClass, e >= x.getSize() - 1));
              }, 1);
            }),
            y.initialIndex || d.addClass(y.disabledClass)),
            x.getSize() < 2 && d.add(c).addClass(y.disabledClass),
            y.mousewheel &&
              g.fn.mousewheel &&
              z.mousewheel(function (k, e) {
                if (y.mousewheel) {
                  return x.move(e < 0 ? 1 : -1, y.wheelSpeed || 50), !1;
                }
              });
          if (y.touch) {
            var a = {};
            (v[0].ontouchstart = function (k) {
              var e = k.touches[0];
              (a.x = e.clientX), (a.y = e.clientY);
            }),
              (v[0].ontouchmove = function (k) {
                if (k.touches.length == 1 && !v.is(":animated")) {
                  var e = k.touches[0],
                    m = a.x - e.clientX,
                    l = a.y - e.clientY;
                  x[(t && l > 0) || (!t && m > 0) ? "next" : "prev"](),
                    k.preventDefault();
                }
              });
          }
          y.keyboard &&
            g(document).bind("keydown.scrollable", function (e) {
              if (
                !y.keyboard ||
                e.altKey ||
                e.ctrlKey ||
                e.metaKey ||
                g(e.target).is(":input")
              ) {
                return;
              }
              if (y.keyboard != "static" && i != x) {
                return;
              }
              var k = e.keyCode;
              if (!(!t || (k != 38 && k != 40))) {
                return x.move(k == 38 ? -1 : 1), e.preventDefault();
              }
              if (!t && (k == 37 || k == 39)) {
                return x.move(k == 37 ? -1 : 1), e.preventDefault();
              }
            }),
            y.initialIndex && x.seekTo(y.initialIndex, 0, function () {});
        }
        (g.tools = g.tools || {
          version: "1.2.6",
        }),
          (g.tools.scrollable = {
            conf: {
              activeClass: "active",
              circular: !1,
              clonedClass: "cloned",
              disabledClass: "disabled",
              easing: "swing",
              initialIndex: 0,
              item: "> *",
              items: ".items",
              keyboard: !0,
              mousewheel: !1,
              next: ".next",
              prev: ".prev",
              size: 1,
              speed: 400,
              vertical: !1,
              touch: !0,
              wheelSpeed: 0,
            },
          });
        var i;
        g.fn.scrollable = function (a) {
          var d = this.data("scrollable");
          return d
            ? d
            : ((a = g.extend({}, g.tools.scrollable.conf, a)),
              this.each(function () {
                (d = new h(g(this), a)), g(this).data("scrollable", d);
              }),
              a.api ? d : this);
        };
      })(jQuery),
      (function (d) {
        var c = d.tools.scrollable;
        (c.autoscroll = {
          conf: {
            autoplay: !0,
            interval: 3000,
            autopause: !0,
          },
        }),
          (d.fn.autoscroll = function (f) {
            typeof f == "number" &&
              (f = {
                interval: f,
              });
            var b = d.extend({}, c.autoscroll.conf, f),
              a;
            return (
              this.each(function () {
                function i() {
                  k = setTimeout(function () {
                    e.next();
                  }, b.interval);
                }
                var e = d(this).data("scrollable"),
                  l = e.getRoot(),
                  k,
                  j = !1;
                e && (a = e),
                  (e.play = function () {
                    if (k) {
                      return;
                    }
                    (j = !1), l.bind("onSeek", i), i();
                  }),
                  (e.pause = function () {
                    (k = clearTimeout(k)), l.unbind("onSeek", i);
                  }),
                  (e.resume = function () {
                    j || e.play();
                  }),
                  (e.stop = function () {
                    (j = !0), e.pause();
                  }),
                  b.autopause &&
                    l.add(e.getNaviButtons()).hover(e.pause, e.resume),
                  b.autoplay && e.play();
              }),
              b.api ? a : this
            );
          });
      })(jQuery),
      (function (e) {
        function f(a, h) {
          var g = e(h);
          return g.length < 2 ? g : a.parent().find(h);
        }
        var d = e.tools.scrollable;
        (d.navigator = {
          conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: !1,
            idPrefix: null,
            history: !1,
          },
        }),
          (e.fn.navigator = function (b) {
            typeof b == "string" &&
              (b = {
                navi: b,
              }),
              (b = e.extend({}, d.navigator.conf, b));
            var a;
            return (
              this.each(function () {
                function o(g, i, h) {
                  u.seekTo(i),
                    h.preventDefault(),
                    q &&
                      history.pushState({
                        i: i,
                      });
                }

                function n() {
                  return t.find(b.naviItem || "> *");
                }

                function c(g) {
                  var h = e("<" + (b.naviItem || "a") + "/>").click(function (
                    i
                  ) {
                    o(e(this), g, i);
                  });
                  return (
                    g === 0 && h.addClass(r),
                    b.indexed && h.text(g + 1),
                    b.idPrefix && h.attr("id", b.idPrefix + g),
                    h.appendTo(t)
                  );
                }
                var u = e(this).data("scrollable"),
                  t = b.navi.jquery ? b.navi : f(u.getRoot(), b.navi),
                  s = u.getNaviButtons(),
                  r = b.activeClass,
                  q = b.history && !!history.pushState,
                  p = u.getConf().size;
                u && (a = u),
                  (u.getNaviButtons = function () {
                    return s.add(t);
                  }),
                  q &&
                    (history.pushState({
                      i: 0,
                    }),
                    e(window).bind("popstate", function (g) {
                      var h = g.originalEvent.state;
                      h && u.seekTo(h.i);
                    })),
                  n().length
                    ? n().each(function (g) {
                        e(this).click(function (h) {
                          o(e(this), g, h);
                        });
                      })
                    : e.each(u.getItems(), function (g) {
                        g % p == 0 && c(g);
                      }),
                  u.onBeforeSeek(function (h, g) {
                    setTimeout(function () {
                      if (!h.isDefaultPrevented()) {
                        var j = g / p,
                          i = n().eq(j);
                        i.length && n().removeClass(r).eq(j).addClass(r);
                      }
                    }, 1);
                  }),
                  u.onAddItem(function (g, i) {
                    var h = u.getItems().index(i);
                    h % p == 0 && c(h);
                  });
              }),
              b.api ? a : this
            );
          });
      })(jQuery),
      (function (g) {
        function h(p, o, n) {
          var m = this,
            l = p.add(this),
            k = p.find(n.tabs),
            b = o.jquery ? o : p.children(o),
            a;
          k.length || (k = p.children()),
            b.length || (b = p.parent().find(o)),
            b.length || (b = g(o)),
            g.extend(this, {
              click: function (s, r) {
                var q = k.eq(s);
                typeof s == "string" &&
                  s.replace("#", "") &&
                  ((q = k.filter("[href*=" + s.replace("#", "") + "]")),
                  (s = Math.max(k.index(q), 0)));
                if (n.rotate) {
                  var e = k.length - 1;
                  if (s < 0) {
                    return m.click(e, r);
                  }
                  if (s > e) {
                    return m.click(0, r);
                  }
                }
                if (!q.length) {
                  if (a >= 0) {
                    return m;
                  }
                  (s = n.initialIndex), (q = k.eq(s));
                }
                if (s === a) {
                  return m;
                }
                (r = r || g.Event()),
                  (r.type = "onBeforeClick"),
                  l.trigger(r, [s]);
                if (r.isDefaultPrevented()) {
                  return;
                }
                return (
                  f[n.effect].call(m, s, function () {
                    (a = s), (r.type = "onClick"), l.trigger(r, [s]);
                  }),
                  k.removeClass(n.current),
                  q.addClass(n.current),
                  m
                );
              },
              getConf: function () {
                return n;
              },
              getTabs: function () {
                return k;
              },
              getPanes: function () {
                return b;
              },
              getCurrentPane: function () {
                return b.eq(a);
              },
              getCurrentTab: function () {
                return k.eq(a);
              },
              getIndex: function () {
                return a;
              },
              next: function () {
                return m.click(a + 1);
              },
              prev: function () {
                return m.click(a - 1);
              },
              destroy: function () {
                return (
                  k.unbind(n.event).removeClass(n.current),
                  b.find("a[href^=#]").unbind("click.T"),
                  m
                );
              },
            }),
            g.each("onBeforeClick,onClick".split(","), function (d, e) {
              g.isFunction(n[e]) && g(m).bind(e, n[e]),
                (m[e] = function (c) {
                  return c && g(m).bind(e, c), m;
                });
            }),
            n.history &&
              g.fn.history &&
              (g.tools.history.init(k), (n.event = "history")),
            k.each(function (c) {
              g(this).bind(n.event, function (d) {
                return m.click(c, d), d.preventDefault();
              });
            }),
            b.find("a[href^=#]").bind("click.T", function (c) {
              m.click(g(this).attr("href"), c);
            }),
            location.hash &&
            n.tabs == "a" &&
            p.find("[href=" + location.hash + "]").length
              ? m.click(location.hash)
              : (n.initialIndex === 0 || n.initialIndex > 0) &&
                m.click(n.initialIndex);
        }
        (g.tools = g.tools || {
          version: "1.2.6",
        }),
          (g.tools.tabs = {
            conf: {
              tabs: "a",
              current: "current",
              onBeforeClick: null,
              onClick: null,
              effect: "default",
              initialIndex: 0,
              event: "click",
              rotate: !1,
              slideUpSpeed: 400,
              slideDownSpeed: 400,
              history: !1,
            },
            addEffect: function (b, d) {
              f[b] = d;
            },
          });
        var f = {
            default: function (d, c) {
              this.getPanes().hide().eq(d).show(), c.call();
            },
            fade: function (l, k) {
              var o = this.getConf(),
                n = o.fadeOutSpeed,
                m = this.getPanes();
              n ? m.fadeOut(n) : m.hide(), m.eq(l).fadeIn(o.fadeInSpeed, k);
            },
            slide: function (e, d) {
              var k = this.getConf();
              this.getPanes().slideUp(k.slideUpSpeed),
                this.getPanes().eq(e).slideDown(k.slideDownSpeed, d);
            },
            ajax: function (d, c) {
              this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"), c);
            },
          },
          j,
          i;
        g.tools.tabs.addEffect("horizontal", function (a, k) {
          if (j) {
            return;
          }
          var d = this.getPanes().eq(a),
            c = this.getCurrentPane();
          i || (i = this.getPanes().eq(0).width()),
            (j = !0),
            d.show(),
            c.animate(
              {
                width: 0,
              },
              {
                step: function (b) {
                  d.css("width", i - b);
                },
                complete: function () {
                  g(this).hide(), k.call(), (j = !1);
                },
              }
            ),
            c.length || (k.call(), (j = !1));
        }),
          (g.fn.tabs = function (a, k) {
            var e = this.data("tabs");
            return (
              e && (e.destroy(), this.removeData("tabs")),
              g.isFunction(k) &&
                (k = {
                  onBeforeClick: k,
                }),
              (k = g.extend({}, g.tools.tabs.conf, k)),
              this.each(function () {
                (e = new h(g(this), a, k)), g(this).data("tabs", e);
              }),
              k.api ? e : this
            );
          });
      })(jQuery),
      (function (e) {
        function f(x, w) {
          function q(g) {
            var b = e(g);
            return b.length < 2 ? b : x.parent().find(g);
          }

          function n() {
            s = setTimeout(function () {
              t.next();
            }, w.interval);
          }
          var v = this,
            u = x.add(this),
            t = x.data("tabs"),
            s,
            r = !0,
            p = q(w.next).click(function () {
              t.next();
            }),
            o = q(w.prev).click(function () {
              t.prev();
            });
          e.extend(v, {
            getTabs: function () {
              return t;
            },
            getConf: function () {
              return w;
            },
            play: function () {
              if (s) {
                return v;
              }
              var c = e.Event("onBeforePlay");
              return (
                u.trigger(c),
                c.isDefaultPrevented()
                  ? v
                  : ((r = !1),
                    u.trigger("onPlay"),
                    u.bind("onClick", n),
                    n(),
                    v)
              );
            },
            pause: function () {
              if (!s) {
                return v;
              }
              var c = e.Event("onBeforePause");
              return (
                u.trigger(c),
                c.isDefaultPrevented()
                  ? v
                  : ((s = clearTimeout(s)),
                    u.trigger("onPause"),
                    u.unbind("onClick", n),
                    v)
              );
            },
            resume: function () {
              r || v.play();
            },
            stop: function () {
              v.pause(), (r = !0);
            },
          }),
            e.each(
              "onBeforePlay,onPlay,onBeforePause,onPause".split(","),
              function (c, g) {
                e.isFunction(w[g]) && e(v).bind(g, w[g]),
                  (v[g] = function (h) {
                    return e(v).bind(g, h);
                  });
              }
            ),
            w.autopause &&
              t
                .getTabs()
                .add(p)
                .add(o)
                .add(t.getPanes())
                .hover(v.pause, v.resume),
            w.autoplay && v.play(),
            w.clickable &&
              t.getPanes().click(function () {
                t.next();
              });
          if (!t.getConf().rotate) {
            var a = w.disabledClass;
            t.getIndex() || o.addClass(a),
              t.onBeforeClick(function (g, c) {
                o.toggleClass(a, !c),
                  p.toggleClass(a, c == t.getTabs().length - 1);
              });
          }
        }
        var d;
        (d = e.tools.tabs.slideshow =
          {
            conf: {
              next: ".forward",
              prev: ".backward",
              disabledClass: "disabled",
              autoplay: !1,
              autopause: !0,
              interval: 3000,
              clickable: !0,
              api: !1,
            },
          }),
          (e.fn.slideshow = function (b) {
            var a = this.data("slideshow");
            return a
              ? a
              : ((b = e.extend({}, d.conf, b)),
                this.each(function () {
                  (a = new f(e(this), b)), e(this).data("slideshow", a);
                }),
                b.api ? a : this);
          });
      })(jQuery),
      (function (r) {
        function p() {
          if (r.browser.msie) {
            var a = r(document).height(),
              d = r(window).height();
            return [
              window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth,
              a - d < 20 ? d : a,
            ];
          }
          return [r(document).width(), r(document).height()];
        }

        function o(a) {
          if (a) {
            return a.call(r.mask);
          }
        }
        r.tools = r.tools || {
          version: "1.2.6",
        };
        var q;
        q = r.tools.expose = {
          conf: {
            maskId: "exposeMask",
            loadSpeed: "slow",
            closeSpeed: "fast",
            closeOnClick: !0,
            closeOnEsc: !0,
            zIndex: 9998,
            opacity: 0.8,
            startOpacity: 0,
            color: "#fff",
            onLoad: null,
            onClose: null,
          },
        };
        var n, m, l, k, j;
        (r.mask = {
          load: function (c, b) {
            if (l) {
              return this;
            }
            typeof c == "string" &&
              (c = {
                color: c,
              }),
              (c = c || k),
              (k = c = r.extend(r.extend({}, q.conf), c)),
              (n = r("#" + c.maskId)),
              n.length ||
                ((n = r("<div/>").attr("id", c.maskId)), r("body").append(n));
            var a = p();
            return (
              n.css({
                position: "absolute",
                top: 0,
                left: 0,
                width: a[0],
                height: a[1],
                display: "none",
                opacity: c.startOpacity,
                zIndex: c.zIndex,
              }),
              c.color && n.css("backgroundColor", c.color),
              o(c.onBeforeLoad) === !1
                ? this
                : (c.closeOnEsc &&
                    r(document).bind("keydown.mask", function (d) {
                      d.keyCode == 27 && r.mask.close(d);
                    }),
                  c.closeOnClick &&
                    n.bind("click.mask", function (d) {
                      r.mask.close(d);
                    }),
                  r(window).bind("resize.mask", function () {
                    r.mask.fit();
                  }),
                  b &&
                    b.length &&
                    ((j = b.eq(0).css("zIndex")),
                    r.each(b, function () {
                      var d = r(this);
                      /relative|absolute|fixed/i.test(d.css("position")) ||
                        d.css("position", "relative");
                    }),
                    (m = b.css({
                      zIndex: Math.max(c.zIndex + 1, j == "auto" ? 0 : j),
                    }))),
                  n
                    .css({
                      display: "block",
                    })
                    .fadeTo(c.loadSpeed, c.opacity, function () {
                      r.mask.fit(), o(c.onLoad), (l = "full");
                    }),
                  (l = !0),
                  this)
            );
          },
          close: function () {
            if (l) {
              if (o(k.onBeforeClose) === !1) {
                return this;
              }
              n.fadeOut(k.closeSpeed, function () {
                o(k.onClose),
                  m &&
                    m.css({
                      zIndex: j,
                    }),
                  (l = !1);
              }),
                r(document).unbind("keydown.mask"),
                n.unbind("click.mask"),
                r(window).unbind("resize.mask");
            }
            return this;
          },
          fit: function () {
            if (l) {
              var b = p();
              n.css({
                width: b[0],
                height: b[1],
              });
            }
          },
          getMask: function () {
            return n;
          },
          isLoaded: function (b) {
            return b ? l == "full" : l;
          },
          getConf: function () {
            return k;
          },
          getExposed: function () {
            return m;
          },
        }),
          (r.fn.mask = function (a) {
            return r.mask.load(a), this;
          }),
          (r.fn.expose = function (a) {
            return r.mask.load(a, this), this;
          });
      })(jQuery),
      (function () {
        function o(e, d) {
          if (d) {
            for (var f in d) {
              d.hasOwnProperty(f) && (e[f] = d[f]);
            }
          }
          return e;
        }

        function n(f, e) {
          var h = [];
          for (var g in f) {
            f.hasOwnProperty(g) && (h[g] = e(f[g]));
          }
          return h;
        }

        function k(h, f, b) {
          if (m.isSupported(f.version)) {
            h.innerHTML = m.getHTML(f, b);
          } else {
            if (f.expressInstall && m.isSupported([6, 65])) {
              h.innerHTML = m.getHTML(
                o(f, {
                  src: f.expressInstall,
                }),
                {
                  MMredirectURL: location.href,
                  MMplayerType: "PlugIn",
                  MMdoctitle: document.title,
                }
              );
            } else {
              h.innerHTML.replace(/\s/g, "") ||
                ((h.innerHTML =
                  "<h2>Flash version " +
                  f.version +
                  " or greater is required</h2><h3>" +
                  (l[0] > 0
                    ? "Your version is " + l
                    : "You have no flash plugin installed") +
                  "</h3>" +
                  (h.tagName == "A"
                    ? "<p>Click here to download latest version</p>"
                    : "<p>Download latest version from <a href='" +
                      s +
                      "'>here</a></p>")),
                h.tagName == "A" &&
                  (h.onclick = function () {
                    location.href = s;
                  }));
              if (f.onFail) {
                var a = f.onFail.call(this);
                typeof a == "string" && (h.innerHTML = a);
              }
            }
          }
          t && (window[f.id] = document.getElementById(f.id)),
            o(this, {
              getRoot: function () {
                return h;
              },
              getOptions: function () {
                return f;
              },
              getConf: function () {
                return b;
              },
              getApi: function () {
                return h.firstChild;
              },
            });
        }
        var t = document.all,
          r = typeof jQuery == "function",
          q = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
          p = {
            width: "100%",
            height: "100%",
            id: "_" + ("" + Math.random()).slice(9),
            allowfullscreen: !0,
            allowscriptaccess: "always",
            quality: "high",
            version: [3, 0],
            onFail: null,
            expressInstall: null,
            w3c: !1,
            cachebusting: !1,
          };
        window.attachEvent &&
          window.attachEvent("onbeforeunload", function () {
            (__flash_unloadHandler = function () {}),
              (__flash_savedUnloadHandler = function () {});
          }),
          (window.flashembed = function (e, d, f) {
            typeof e == "string" &&
              (e = document.getElementById(e.replace("#", "")));
            if (!e) {
              return;
            }
            return (
              typeof d == "string" &&
                (d = {
                  src: d,
                }),
              new k(e, o(o({}, p), d), f)
            );
          });
        var m = o(window.flashembed, {
            conf: p,
            getVersion: function () {
              var g, d;
              try {
                d = navigator.plugins["Shockwave Flash"].description.slice(16);
              } catch (j) {
                try {
                  (g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")),
                    (d = g && g.GetVariable("$version"));
                } catch (i) {
                  try {
                    (g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")),
                      (d = g && g.GetVariable("$version"));
                  } catch (h) {}
                }
              }
              return (d = q.exec(d)), d ? [d[1], d[3]] : [0, 0];
            },
            asString: function (f) {
              if (f === null || f === undefined) {
                return null;
              }
              var e = typeof f;
              e == "object" && f.push && (e = "array");
              switch (e) {
                case "string":
                  return (
                    (f = f.replace(new RegExp('(["\\\\])', "g"), "\\$1")),
                    (f = f.replace(/^\s?(\d+\.?\d*)%/, "$1pct")),
                    '"' + f + '"'
                  );
                case "array":
                  return (
                    "[" +
                    n(f, function (b) {
                      return m.asString(b);
                    }).join(",") +
                    "]"
                  );
                case "function":
                  return '"function()"';
                case "object":
                  var h = [];
                  for (var g in f) {
                    f.hasOwnProperty(g) &&
                      h.push('"' + g + '":' + m.asString(f[g]));
                  }
                  return "{" + h.join(",") + "}";
              }
              return String(f).replace(/\s/g, " ").replace(/\'/g, '"');
            },
            getHTML: function (a, x) {
              a = o({}, a);
              var w =
                '<object width="' +
                a.width +
                '" height="' +
                a.height +
                '" id="' +
                a.id +
                '" name="' +
                a.id +
                '"';
              a.cachebusting &&
                (a.src +=
                  (a.src.indexOf("?") != -1 ? "&" : "?") + Math.random()),
                a.w3c || !t
                  ? (w +=
                      ' data="' +
                      a.src +
                      '" type="application/x-shockwave-flash"')
                  : (w +=
                      ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'),
                (w += ">");
              if (a.w3c || t) {
                w += '<param name="movie" value="' + a.src + '" />';
              }
              (a.width = a.height = a.id = a.w3c = a.src = null),
                (a.onFail = a.version = a.expressInstall = null);
              for (var v in a) {
                a[v] &&
                  (w += '<param name="' + v + '" value="' + a[v] + '" />');
              }
              var u = "";
              if (x) {
                for (var h in x) {
                  if (x[h]) {
                    var f = x[h];
                    u +=
                      h +
                      "=" +
                      encodeURIComponent(
                        /function|object/.test(typeof f) ? m.asString(f) : f
                      ) +
                      "&";
                  }
                }
                (u = u.slice(0, -1)),
                  (w += '<param name="flashvars" value=\'' + u + "' />");
              }
              return (w += "</object>"), w;
            },
            isSupported: function (b) {
              return l[0] > b[0] || (l[0] == b[0] && l[1] >= b[1]);
            },
          }),
          l = m.getVersion();
        r &&
          ((jQuery.tools = jQuery.tools || {
            version: "1.2.6",
          }),
          (jQuery.tools.flashembed = {
            conf: p,
          }),
          (jQuery.fn.flashembed = function (d, c) {
            return this.each(function () {
              jQuery(this).data("flashembed", flashembed(this, d, c));
            });
          }));
      })(),
      (function (h) {
        function i(d) {
          if (d) {
            var c = l.contentWindow.document;
            c.open().close(), (c.location.hash = d);
          }
        }
        var g, l, k, j;
        (h.tools = h.tools || {
          version: "1.2.6",
        }),
          (h.tools.history = {
            init: function (a) {
              if (j) {
                return;
              }
              h.browser.msie && h.browser.version < "8"
                ? l ||
                  ((l = h("<iframe/>")
                    .attr("src", "javascript:false;")
                    .hide()
                    .get(0)),
                  h("body").prepend(l),
                  setInterval(function () {
                    var c = l.contentWindow.document,
                      b = c.location.hash;
                    g !== b && h(window).trigger("hash", b);
                  }, 100),
                  i(location.hash || "#"))
                : setInterval(function () {
                    var b = location.hash;
                    b !== g && h(window).trigger("hash", b);
                  }, 100),
                (k = k ? k.add(a) : a),
                a.click(function (c) {
                  var e = h(this).attr("href");
                  l && i(e);
                  if (e.slice(0, 1) != "#") {
                    return (location.href = "#" + e), c.preventDefault();
                  }
                }),
                (j = !0);
            },
          }),
          h(window).bind("hash", function (b, a) {
            a
              ? k
                  .filter(function () {
                    var c = h(this).attr("href");
                    return c == a || c == a.replace("#", "");
                  })
                  .trigger("history", [a])
              : k.eq(0).trigger("history", [a]),
              (g = a);
          }),
          (h.fn.history = function (a) {
            return h.tools.history.init(this), this.bind("history", a);
          });
      })(jQuery),
      (function (e) {
        function f(a) {
          switch (a.type) {
            case "mousemove":
              return e.extend(a.data, {
                clientX: a.clientX,
                clientY: a.clientY,
                pageX: a.pageX,
                pageY: a.pageY,
              });
            case "DOMMouseScroll":
              e.extend(a, a.data), (a.delta = -a.detail / 3);
              break;
            case "mousewheel":
              a.delta = a.wheelDelta / 120;
          }
          return (a.type = "wheel"), e.event.handle.call(this, a, a.delta);
        }
        (e.fn.mousewheel = function (b) {
          return this[b ? "bind" : "trigger"]("wheel", b);
        }),
          (e.event.special.wheel = {
            setup: function () {
              e.event.add(this, d, f, {});
            },
            teardown: function () {
              e.event.remove(this, d, f);
            },
          });
        var d = e.browser.mozilla
          ? "DOMMouseScroll" + (e.browser.version < "1.9" ? " mousemove" : "")
          : "mousewheel";
      })(jQuery),
      (function (f) {
        function h(a, p, o) {
          var n = o.relative ? a.position().top : a.offset().top,
            m = o.relative ? a.position().left : a.offset().left,
            l = o.position[0];
          (n -= p.outerHeight() - o.offset[0]),
            (m += a.outerWidth() + o.offset[1]),
            /iPad/i.test(navigator.userAgent) && (n -= f(window).scrollTop());
          var k = p.outerHeight() + a.outerHeight();
          l == "center" && (n += k / 2),
            l == "bottom" && (n += k),
            (l = o.position[1]);
          var j = p.outerWidth() + a.outerWidth();
          return (
            l == "center" && (m -= j / 2),
            l == "left" && (m -= j),
            {
              top: n,
              left: m,
            }
          );
        }

        function g(D, C) {
          var B = this,
            A = D.add(B),
            z,
            y = 0,
            x = 0,
            w = D.attr("title"),
            v = D.attr("data-tooltip"),
            u = e[C.effect],
            t,
            s = D.is(":input"),
            c = s && D.is(":checkbox, :radio, select, :button, :submit"),
            b = D.attr("type"),
            a = C.events[b] || C.events[s ? (c ? "widget" : "input") : "def"];
          if (!u) {
            throw 'Nonexistent effect "' + C.effect + '"';
          }
          a = a.split(/,\s*/);
          if (a.length != 2) {
            throw "Tooltip: bad events configuration for " + b;
          }
          D.bind(a[0], function (d) {
            clearTimeout(y),
              C.predelay
                ? (x = setTimeout(function () {
                    B.show(d);
                  }, C.predelay))
                : B.show(d);
          }).bind(a[1], function (d) {
            clearTimeout(x),
              C.delay
                ? (y = setTimeout(function () {
                    B.hide(d);
                  }, C.delay))
                : B.hide(d);
          }),
            w && C.cancelDefault && (D.removeAttr("title"), D.data("title", w)),
            f.extend(B, {
              show: function (d) {
                if (!z) {
                  v
                    ? (z = f(v))
                    : C.tip
                    ? (z = f(C.tip).eq(0))
                    : w
                    ? (z = f(C.layout)
                        .addClass(C.tipClass)
                        .appendTo(document.body)
                        .hide()
                        .append(w))
                    : ((z = D.next()), z.length || (z = D.parent().next()));
                  if (!z.length) {
                    throw "Cannot find tooltip for " + D;
                  }
                }
                if (B.isShown()) {
                  return B;
                }
                z.stop(!0, !0);
                var j = h(D, z, C);
                C.tip && z.html(D.data("title")),
                  (d = f.Event()),
                  (d.type = "onBeforeShow"),
                  A.trigger(d, [j]);
                if (d.isDefaultPrevented()) {
                  return B;
                }
                (j = h(D, z, C)),
                  z.css({
                    position: "absolute",
                    top: j.top,
                    left: j.left,
                  }),
                  (t = !0),
                  u[0].call(B, function () {
                    (d.type = "onShow"), (t = "full"), A.trigger(d);
                  });
                var i = C.events.tooltip.split(/,\s*/);
                return (
                  z.data("__set") ||
                    (z.unbind(i[0]).bind(i[0], function () {
                      clearTimeout(y), clearTimeout(x);
                    }),
                    i[1] &&
                      !D.is("input:not(:checkbox, :radio), textarea") &&
                      z.unbind(i[1]).bind(i[1], function (k) {
                        k.relatedTarget != D[0] &&
                          D.trigger(a[1].split(" ")[0]);
                      }),
                    C.tip || z.data("__set", !0)),
                  B
                );
              },
              hide: function (d) {
                if (!z || !B.isShown()) {
                  return B;
                }
                (d = f.Event()), (d.type = "onBeforeHide"), A.trigger(d);
                if (d.isDefaultPrevented()) {
                  return;
                }
                return (
                  (t = !1),
                  e[C.effect][1].call(B, function () {
                    (d.type = "onHide"), A.trigger(d);
                  }),
                  B
                );
              },
              isShown: function (d) {
                return d ? t == "full" : t;
              },
              getConf: function () {
                return C;
              },
              getTip: function () {
                return z;
              },
              getTrigger: function () {
                return D;
              },
            }),
            f.each(
              "onHide,onBeforeShow,onShow,onBeforeHide".split(","),
              function (d, i) {
                f.isFunction(C[i]) && f(B).bind(i, C[i]),
                  (B[i] = function (j) {
                    return j && f(B).bind(i, j), B;
                  });
              }
            );
        }
        (f.tools = f.tools || {
          version: "1.2.6",
        }),
          (f.tools.tooltip = {
            conf: {
              effect: "toggle",
              fadeOutSpeed: "fast",
              predelay: 0,
              delay: 30,
              opacity: 1,
              tip: 0,
              fadeIE: !1,
              position: ["top", "center"],
              offset: [0, 0],
              relative: !1,
              cancelDefault: !0,
              events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave",
              },
              layout: "<div/>",
              tipClass: "tooltip",
            },
            addEffect: function (b, j, i) {
              e[b] = [j, i];
            },
          });
        var e = {
          toggle: [
            function (j) {
              var i = this.getConf(),
                l = this.getTip(),
                k = i.opacity;
              k < 1 &&
                l.css({
                  opacity: k,
                }),
                l.show(),
                j.call();
            },
            function (b) {
              this.getTip().hide(), b.call();
            },
          ],
          fade: [
            function (a) {
              var d = this.getConf();
              !f.browser.msie || d.fadeIE
                ? this.getTip().fadeTo(d.fadeInSpeed, d.opacity, a)
                : (this.getTip().show(), a());
            },
            function (a) {
              var d = this.getConf();
              !f.browser.msie || d.fadeIE
                ? this.getTip().fadeOut(d.fadeOutSpeed, a)
                : (this.getTip().hide(), a());
            },
          ],
        };
        f.fn.tooltip = function (a) {
          var d = this.data("tooltip");
          return d
            ? d
            : ((a = f.extend(!0, {}, f.tools.tooltip.conf, a)),
              typeof a.position == "string" &&
                (a.position = a.position.split(/,?\s/)),
              this.each(function () {
                (d = new g(f(this), a)), f(this).data("tooltip", d);
              }),
              a.api ? d : this);
        };
      })(jQuery),
      (function (f) {
        function h(a) {
          var k = f(window),
            j = k.width() + k.scrollLeft(),
            i = k.height() + k.scrollTop();
          return [
            a.offset().top <= k.scrollTop(),
            j <= a.offset().left + a.width(),
            i <= a.offset().top + a.height(),
            k.scrollLeft() >= a.offset().left,
          ];
        }

        function g(d) {
          var c = d.length;
          while (c--) {
            if (d[c]) {
              return !1;
            }
          }
          return !0;
        }
        var e = f.tools.tooltip;
        (e.dynamic = {
          conf: {
            classNames: "top right bottom left",
          },
        }),
          (f.fn.dynamic = function (d) {
            typeof d == "number" &&
              (d = {
                speed: d,
              }),
              (d = f.extend({}, e.dynamic.conf, d));
            var c = f.extend(!0, {}, d),
              b = d.classNames.split(/\s/),
              a;
            return (
              this.each(function () {
                var i = f(this)
                  .tooltip()
                  .onBeforeShow(function (m, r) {
                    var q = this.getTip(),
                      p = this.getConf();
                    a ||
                      (a = [
                        p.position[0],
                        p.position[1],
                        p.offset[0],
                        p.offset[1],
                        f.extend({}, p),
                      ]),
                      f.extend(p, a[4]),
                      (p.position = [a[0], a[1]]),
                      (p.offset = [a[2], a[3]]),
                      q
                        .css({
                          visibility: "hidden",
                          position: "absolute",
                          top: r.top,
                          left: r.left,
                        })
                        .show();
                    var o = f.extend(!0, {}, c),
                      n = h(q);
                    if (!g(n)) {
                      n[2] &&
                        (f.extend(p, o.top),
                        (p.position[0] = "top"),
                        q.addClass(b[0])),
                        n[3] &&
                          (f.extend(p, o.right),
                          (p.position[1] = "right"),
                          q.addClass(b[1])),
                        n[0] &&
                          (f.extend(p, o.bottom),
                          (p.position[0] = "bottom"),
                          q.addClass(b[2])),
                        n[1] &&
                          (f.extend(p, o.left),
                          (p.position[1] = "left"),
                          q.addClass(b[3]));
                      if (n[0] || n[2]) {
                        p.offset[0] *= -1;
                      }
                      if (n[1] || n[3]) {
                        p.offset[1] *= -1;
                      }
                    }
                    q.css({
                      visibility: "visible",
                    }).hide();
                  });
                i.onBeforeShow(function () {
                  var k = this.getConf(),
                    j = this.getTip();
                  setTimeout(function () {
                    (k.position = [a[0], a[1]]), (k.offset = [a[2], a[3]]);
                  }, 0);
                }),
                  i.onHide(function () {
                    var j = this.getTip();
                    j.removeClass(d.classNames);
                  }),
                  (ret = i);
              }),
              d.api ? ret : this
            );
          });
      })(jQuery),
      (function (e) {
        var d = e.tools.tooltip;
        e.extend(d.conf, {
          direction: "up",
          bounce: !1,
          slideOffset: 10,
          slideInSpeed: 200,
          slideOutSpeed: 200,
          slideFade: !e.browser.msie,
        });
        var f = {
          up: ["-", "top"],
          down: ["+", "top"],
          left: ["-", "left"],
          right: ["+", "left"],
        };
        d.addEffect(
          "slide",
          function (g) {
            var c = this.getConf(),
              j = this.getTip(),
              i = c.slideFade
                ? {
                    opacity: c.opacity,
                  }
                : {},
              h = f[c.direction] || f.up;
            (i[h[1]] = h[0] + "=" + c.slideOffset),
              c.slideFade &&
                j.css({
                  opacity: 0,
                }),
              j.show().animate(i, c.slideInSpeed, g);
          },
          function (a) {
            var l = this.getConf(),
              k = l.slideOffset,
              j = l.slideFade
                ? {
                    opacity: 0,
                  }
                : {},
              i = f[l.direction] || f.up,
              c = "" + i[0];
            l.bounce && (c = c == "+" ? "-" : "+"),
              (j[i[1]] = c + "=" + k),
              this.getTip().animate(j, l.slideOutSpeed, function () {
                e(this).hide(), a.call();
              });
          }
        );
      })(jQuery),
      (function (x) {
        function q(F, E, D) {
          var C = F.offset().top,
            B = F.offset().left,
            A = D.position.split(/,?\s+/),
            z = A[0],
            y = A[1];
          (C -= E.outerHeight() - D.offset[0]),
            (B += F.outerWidth() + D.offset[1]),
            /iPad/i.test(navigator.userAgent) && (C -= x(window).scrollTop());
          var l = E.outerHeight() + F.outerHeight();
          z == "center" && (C += l / 2), z == "bottom" && (C += l);
          var a = F.outerWidth();
          return (
            y == "center" && (B -= (a + E.outerWidth()) / 2),
            y == "left" && (B -= a),
            {
              top: C,
              left: B,
            }
          );
        }

        function p(d) {
          function c() {
            return this.getAttribute("type") == d;
          }
          return (c.key = "[type=" + d + "]"), c;
        }

        function m(d, y, k) {
          function g(e, A, z) {
            if (!k.grouped && e.length) {
              return;
            }
            var l;
            if (z === !1 || x.isArray(z)) {
              (l = r.messages[A.key || A] || r.messages["*"]),
                (l = l[k.lang] || r.messages["*"].en);
              var i = l.match(/\$\d/g);
              i &&
                x.isArray(z) &&
                x.each(i, function (b) {
                  l = l.replace(this, z[b]);
                });
            } else {
              l = z[k.lang] || z;
            }
            e.push(l);
          }
          var j = this,
            h = y.add(j);
          (d = d.not(":button, :image, :reset, :submit")),
            y.attr("novalidate", "novalidate"),
            x.extend(j, {
              getConf: function () {
                return k;
              },
              getForm: function () {
                return y;
              },
              getInputs: function () {
                return d;
              },
              reflow: function () {
                return (
                  d.each(function () {
                    var e = x(this),
                      i = e.data("msg.el");
                    if (i) {
                      var f = q(e, i, k);
                      i.css({
                        top: f.top,
                        left: f.left,
                      });
                    }
                  }),
                  j
                );
              },
              invalidate: function (f, e) {
                if (!e) {
                  var b = [];
                  x.each(f, function (i, z) {
                    var l = d.filter("[name='" + i + "']");
                    l.length &&
                      (l.trigger("OI", [z]),
                      b.push({
                        input: l,
                        messages: [z],
                      }));
                  }),
                    (f = b),
                    (e = x.Event());
                }
                return (
                  (e.type = "onFail"),
                  h.trigger(e, [f]),
                  e.isDefaultPrevented() || n[k.effect][0].call(j, f, e),
                  j
                );
              },
              reset: function (b) {
                return (
                  (b = b || d),
                  b
                    .removeClass(k.errorClass)
                    .each(function () {
                      var c = x(this).data("msg.el");
                      c && (c.remove(), x(this).data("msg.el", null));
                    })
                    .unbind(k.errorInputEvent || ""),
                  j
                );
              },
              destroy: function () {
                return (
                  y.unbind(k.formEvent + ".V").unbind("reset.V"),
                  d.unbind(k.inputEvent + ".V").unbind("change.V"),
                  j.reset()
                );
              },
              checkValidity: function (i, f) {
                (i = i || d), (i = i.not(":disabled"));
                if (!i.length) {
                  return !0;
                }
                (f = f || x.Event()),
                  (f.type = "onBeforeValidate"),
                  h.trigger(f, [i]);
                if (f.isDefaultPrevented()) {
                  return f.result;
                }
                var e = [];
                i.not(":radio:not(:checked)").each(function () {
                  var l = [],
                    A = x(this).data("messages", l),
                    z =
                      u && A.is(":date")
                        ? "onHide.v"
                        : k.errorInputEvent + ".v";
                  A.unbind(z),
                    x.each(o, function () {
                      var c = this,
                        D = c[0];
                      if (A.filter(D).length) {
                        var C = c[1].call(j, A, A.val());
                        if (C !== !0) {
                          (f.type = "onBeforeFail"), h.trigger(f, [A, D]);
                          if (f.isDefaultPrevented()) {
                            return !1;
                          }
                          var B = A.attr(k.messageAttr);
                          if (B) {
                            return (l = [B]), !1;
                          }
                          g(l, D, C);
                        }
                      }
                    }),
                    l.length &&
                      (e.push({
                        input: A,
                        messages: l,
                      }),
                      A.trigger("OI", [l]),
                      k.errorInputEvent &&
                        A.bind(z, function (c) {
                          j.checkValidity(A, c);
                        }));
                  if (k.singleError && e.length) {
                    return !1;
                  }
                });
                var b = n[k.effect];
                if (!b) {
                  throw 'Validator: cannot find effect "' + k.effect + '"';
                }
                return e.length
                  ? (j.invalidate(e, f), !1)
                  : (b[1].call(j, i, f),
                    (f.type = "onSuccess"),
                    h.trigger(f, [i]),
                    i.unbind(k.errorInputEvent + ".v"),
                    !0);
              },
            }),
            x.each(
              "onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),
              function (e, f) {
                x.isFunction(k[f]) && x(j).bind(f, k[f]),
                  (j[f] = function (c) {
                    return c && x(j).bind(f, c), j;
                  });
              }
            ),
            k.formEvent &&
              y.bind(k.formEvent + ".V", function (b) {
                if (!j.checkValidity(null, b)) {
                  return b.preventDefault();
                }
                (b.target = y), (b.type = k.formEvent);
              }),
            y.bind("reset.V", function () {
              j.reset();
            }),
            d[0] &&
              d[0].validity &&
              d.each(function () {
                this.oninvalid = function () {
                  return !1;
                };
              }),
            y[0] && (y[0].checkValidity = j.checkValidity),
            k.inputEvent &&
              d.bind(k.inputEvent + ".V", function (c) {
                j.checkValidity(x(this), c);
              }),
            d
              .filter(":checkbox, select")
              .filter("[required]")
              .bind("change.V", function (e) {
                var f = x(this);
                (this.checked || (f.is("select") && x(this).val())) &&
                  n[k.effect][1].call(j, f, e);
              });
          var a = d.filter(":radio").change(function (b) {
            j.checkValidity(a, b);
          });
          x(window).resize(function () {
            j.reflow();
          });
        }
        x.tools = x.tools || {
          version: "1.2.6",
        };
        var w = /\[type=([a-z]+)\]/,
          v = /^-?[0-9]*(\.[0-9]+)?$/,
          u = x.tools.dateinput,
          t = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
          s = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,
          r;
        r = x.tools.validator = {
          conf: {
            grouped: !1,
            effect: "default",
            errorClass: "invalid",
            inputEvent: null,
            errorInputEvent: "keyup",
            formEvent: "submit",
            lang: "en",
            message: "<div/>",
            messageAttr: "data-message",
            messageClass: "error",
            offset: [0, 0],
            position: "center right",
            singleError: !1,
            speed: "normal",
          },
          messages: {
            "*": {
              en: "Please correct this value",
            },
          },
          localize: function (a, d) {
            x.each(d, function (b, e) {
              (r.messages[b] = r.messages[b] || {}), (r.messages[b][a] = e);
            });
          },
          localizeFn: function (a, d) {
            (r.messages[a] = r.messages[a] || {}), x.extend(r.messages[a], d);
          },
          fn: function (h, g, b) {
            x.isFunction(g)
              ? (b = g)
              : (typeof g == "string" &&
                  (g = {
                    en: g,
                  }),
                (this.messages[h.key || h] = g));
            var a = w.exec(h);
            a && (h = p(a[1])), o.push([h, b]);
          },
          addEffect: function (e, d, f) {
            n[e] = [d, f];
          },
        };
        var o = [],
          n = {
            default: [
              function (a) {
                var d = this.getConf();
                x.each(a, function (c, k) {
                  var j = k.input;
                  j.addClass(d.errorClass);
                  var i = j.data("msg.el");
                  i ||
                    ((i = x(d.message)
                      .addClass(d.messageClass)
                      .appendTo(document.body)),
                    j.data("msg.el", i)),
                    i
                      .css({
                        visibility: "hidden",
                      })
                      .find("p")
                      .remove(),
                    x.each(k.messages, function (e, f) {
                      x("<p/>").html(f).appendTo(i);
                    }),
                    i.outerWidth() == i.parent().width() &&
                      i.add(i.find("p")).css({
                        display: "inline",
                      });
                  var h = q(j, i, d);
                  i.css({
                    visibility: "visible",
                    position: "absolute",
                    top: h.top,
                    left: h.left,
                  }).fadeIn(d.speed);
                });
              },
              function (a) {
                var d = this.getConf();
                a.removeClass(d.errorClass).each(function () {
                  var c = x(this).data("msg.el");
                  c &&
                    c.css({
                      visibility: "hidden",
                    });
                });
              },
            ],
          };
        x.each("email,url,number".split(","), function (a, d) {
          x.expr[":"][d] = function (b) {
            return b.getAttribute("type") === d;
          };
        }),
          (x.fn.oninvalid = function (b) {
            return this[b ? "bind" : "trigger"]("OI", b);
          }),
          r.fn(":email", "Please enter a valid email address", function (d, c) {
            return !c || t.test(c);
          }),
          r.fn(":url", "Please enter a valid URL", function (d, c) {
            return !c || s.test(c);
          }),
          r.fn(":number", "Please enter a numeric value.", function (d, c) {
            return v.test(c);
          }),
          r.fn(
            "[max]",
            "Please enter a value no larger than $1",
            function (e, d) {
              if (d === "" || (u && e.is(":date"))) {
                return !0;
              }
              var f = e.attr("max");
              return parseFloat(d) <= parseFloat(f) ? !0 : [f];
            }
          ),
          r.fn("[min]", "Please enter a value of at least $1", function (e, d) {
            if (d === "" || (u && e.is(":date"))) {
              return !0;
            }
            var f = e.attr("min");
            return parseFloat(d) >= parseFloat(f) ? !0 : [f];
          }),
          r.fn(
            "[required]",
            "Please complete this mandatory field.",
            function (d, c) {
              return d.is(":checkbox") ? d.is(":checked") : !!c;
            }
          ),
          r.fn("[pattern]", function (d) {
            var c = new RegExp("^" + d.attr("pattern") + "$");
            return c.test(d.val());
          }),
          (x.fn.validator = function (a) {
            var d = this.data("validator");
            return (
              d && (d.destroy(), this.removeData("validator")),
              (a = x.extend(!0, {}, r.conf, a)),
              this.is("form")
                ? this.each(function () {
                    var b = x(this);
                    (d = new m(b.find(":input"), b, a)), b.data("validator", d);
                  })
                : ((d = new m(this, this.eq(0).closest("form"), a)),
                  this.data("validator", d))
            );
          });
      })(jQuery);
    /*!
     * jCarousel - Riding carousels with jQuery
     *   http://sorgalla.com/jcarousel/
     *
     * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
     * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
     * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
     *
     * Built on top of the jQuery library
     *   http://jquery.com
     *
     * Inspired by the "Carousel Component" by Bill Scott
     *   http://billwscott.com/carousel/
     */
    (function (b) {
      var d = {
          vertical: !1,
          rtl: !1,
          start: 1,
          offset: 1,
          size: null,
          scroll: 3,
          visible: null,
          animation: "normal",
          easing: "swing",
          auto: 0,
          wrap: null,
          initCallback: null,
          setupCallback: null,
          reloadCallback: null,
          itemLoadCallback: null,
          itemFirstInCallback: null,
          itemFirstOutCallback: null,
          itemLastInCallback: null,
          itemLastOutCallback: null,
          itemVisibleInCallback: null,
          itemVisibleOutCallback: null,
          animationStepCallback: null,
          buttonNextHTML: "<div></div>",
          buttonPrevHTML: "<div></div>",
          buttonNextEvent: "click",
          buttonPrevEvent: "click",
          buttonNextCallback: null,
          buttonPrevCallback: null,
          itemFallbackDimension: null,
        },
        a = !1;
      b(window).bind("load.jcarousel", function () {
        a = !0;
      });
      b.jcarousel = function (r, p) {
        this.options = b.extend({}, d, p || {});
        this.autoStopped = this.locked = !1;
        this.buttonPrevState =
          this.buttonNextState =
          this.buttonPrev =
          this.buttonNext =
          this.list =
          this.clip =
          this.container =
            null;
        if (!p || p.rtl === void 0) {
          this.options.rtl =
            (b(r).attr("dir") || b("html").attr("dir") || "").toLowerCase() ==
            "rtl";
        }
        this.wh = !this.options.vertical ? "width" : "height";
        this.lt = !this.options.vertical
          ? this.options.rtl
            ? "right"
            : "left"
          : "top";
        for (var q = "", o = r.className.split(" "), m = 0; m < o.length; m++) {
          if (o[m].indexOf("jcarousel-skin") != -1) {
            b(r).removeClass(o[m]);
            q = o[m];
            break;
          }
        }
        r.nodeName.toUpperCase() == "UL" || r.nodeName.toUpperCase() == "OL"
          ? ((this.list = b(r)),
            (this.clip = this.list.parents(".jcarousel-clip")),
            (this.container = this.list.parents(".jcarousel-container")))
          : ((this.container = b(r)),
            (this.list = this.container.find("ul,ol").eq(0)),
            (this.clip = this.container.find(".jcarousel-clip")));
        if (this.clip.size() === 0) {
          this.clip = this.list.wrap("<div></div>").parent();
        }
        if (this.container.size() === 0) {
          this.container = this.clip.wrap("<div></div>").parent();
        }
        q !== "" &&
          this.container.parent()[0].className.indexOf("jcarousel-skin") ==
            -1 &&
          this.container.wrap('<div class=" ' + q + '"></div>');
        this.buttonPrev = b(".jcarousel-prev", this.container);
        if (
          this.buttonPrev.size() === 0 &&
          this.options.buttonPrevHTML !== null
        ) {
          this.buttonPrev = b(this.options.buttonPrevHTML).appendTo(
            this.container
          );
        }
        this.buttonPrev.addClass(this.className("jcarousel-prev"));
        this.buttonNext = b(".jcarousel-next", this.container);
        if (
          this.buttonNext.size() === 0 &&
          this.options.buttonNextHTML !== null
        ) {
          this.buttonNext = b(this.options.buttonNextHTML).appendTo(
            this.container
          );
        }
        this.buttonNext.addClass(this.className("jcarousel-next"));
        this.clip.addClass(this.className("jcarousel-clip")).css({
          position: "relative",
        });
        this.list
          .addClass(this.className("jcarousel-list"))
          .css({
            overflow: "hidden",
            position: "relative",
            top: 0,
            margin: 0,
            padding: 0,
          })
          .css(this.options.rtl ? "right" : "left", 0);
        this.container.addClass(this.className("jcarousel-container")).css({
          position: "relative",
        });
        !this.options.vertical &&
          this.options.rtl &&
          this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
        var g =
            this.options.visible !== null
              ? Math.ceil(this.clipping() / this.options.visible)
              : null,
          q = this.list.children("li"),
          n = this;
        if (q.size() > 0) {
          var l = 0,
            k = this.options.offset;
          q.each(function () {
            n.format(this, k++);
            l += n.dimension(this, g);
          });
          this.list.css(this.wh, l + 100 + "px");
          if (!p || p.size === void 0) {
            this.options.size = q.size();
          }
        }
        this.container.css("display", "block");
        this.buttonNext.css("display", "block");
        this.buttonPrev.css("display", "block");
        this.funcNext = function () {
          n.next();
        };
        this.funcPrev = function () {
          n.prev();
        };
        this.funcResize = function () {
          n.resizeTimer && clearTimeout(n.resizeTimer);
          n.resizeTimer = setTimeout(function () {
            n.reload();
          }, 100);
        };
        this.options.initCallback !== null &&
          this.options.initCallback(this, "init");
        !a && b.browser.safari
          ? (this.buttons(!1, !1),
            b(window).bind("load.jcarousel", function () {
              n.setup();
            }))
          : this.setup();
      };
      var c = b.jcarousel;
      c.fn = c.prototype = {
        jcarousel: "0.2.8",
      };
      c.fn.extend = c.extend = b.extend;
      c.fn.extend({
        setup: function () {
          this.prevLast = this.prevFirst = this.last = this.first = null;
          this.animating = !1;
          this.tail = this.resizeTimer = this.timer = null;
          this.inTail = !1;
          if (!this.locked) {
            this.list.css(this.lt, this.pos(this.options.offset) + "px");
            var e = this.pos(this.options.start, !0);
            this.prevFirst = this.prevLast = null;
            this.animate(e, !1);
            b(window)
              .unbind("resize.jcarousel", this.funcResize)
              .bind("resize.jcarousel", this.funcResize);
            this.options.setupCallback !== null &&
              this.options.setupCallback(this);
          }
        },
        reset: function () {
          this.list.empty();
          this.list.css(this.lt, "0px");
          this.list.css(this.wh, "10px");
          this.options.initCallback !== null &&
            this.options.initCallback(this, "reset");
          this.setup();
        },
        reload: function () {
          this.tail !== null &&
            this.inTail &&
            this.list.css(
              this.lt,
              c.intval(this.list.css(this.lt)) + this.tail
            );
          this.tail = null;
          this.inTail = !1;
          this.options.reloadCallback !== null &&
            this.options.reloadCallback(this);
          if (this.options.visible !== null) {
            var f = this,
              h = Math.ceil(this.clipping() / this.options.visible),
              e = 0,
              g = 0;
            this.list.children("li").each(function (i) {
              e += f.dimension(this, h);
              i + 1 < f.first && (g = e);
            });
            this.list.css(this.wh, e + "px");
            this.list.css(this.lt, -g + "px");
          }
          this.scroll(this.first, !1);
        },
        lock: function () {
          this.locked = !0;
          this.buttons();
        },
        unlock: function () {
          this.locked = !1;
          this.buttons();
        },
        size: function (e) {
          if (e !== void 0) {
            (this.options.size = e), this.locked || this.buttons();
          }
          return this.options.size;
        },
        has: function (f, h) {
          if (h === void 0 || !h) {
            h = f;
          }
          if (this.options.size !== null && h > this.options.size) {
            h = this.options.size;
          }
          for (var e = f; e <= h; e++) {
            var g = this.get(e);
            if (!g.length || g.hasClass("jcarousel-item-placeholder")) {
              return !1;
            }
          }
          return !0;
        },
        get: function (e) {
          return b(">.jcarousel-item-" + e, this.list);
        },
        add: function (g, m) {
          var f = this.get(g),
            l = 0,
            k = b(m);
          if (f.length === 0) {
            for (var h, i = c.intval(g), f = this.create(g); ; ) {
              if (((h = this.get(--i)), i <= 0 || h.length)) {
                i <= 0 ? this.list.prepend(f) : h.after(f);
                break;
              }
            }
          } else {
            l = this.dimension(f);
          }
          k.get(0).nodeName.toUpperCase() == "LI"
            ? (f.replaceWith(k), (f = k))
            : f.empty().append(m);
          this.format(
            f.removeClass(this.className("jcarousel-item-placeholder")),
            g
          );
          k =
            this.options.visible !== null
              ? Math.ceil(this.clipping() / this.options.visible)
              : null;
          l = this.dimension(f, k) - l;
          g > 0 &&
            g < this.first &&
            this.list.css(this.lt, c.intval(this.list.css(this.lt)) - l + "px");
          this.list.css(this.wh, c.intval(this.list.css(this.wh)) + l + "px");
          return f;
        },
        remove: function (f) {
          var g = this.get(f);
          if (g.length && !(f >= this.first && f <= this.last)) {
            var e = this.dimension(g);
            f < this.first &&
              this.list.css(
                this.lt,
                c.intval(this.list.css(this.lt)) + e + "px"
              );
            g.remove();
            this.list.css(this.wh, c.intval(this.list.css(this.wh)) - e + "px");
          }
        },
        next: function () {
          this.tail !== null && !this.inTail
            ? this.scrollTail(!1)
            : this.scroll(
                (this.options.wrap == "both" || this.options.wrap == "last") &&
                  this.options.size !== null &&
                  this.last == this.options.size
                  ? 1
                  : this.first + this.options.scroll
              );
        },
        prev: function () {
          this.tail !== null && this.inTail
            ? this.scrollTail(!0)
            : this.scroll(
                (this.options.wrap == "both" || this.options.wrap == "first") &&
                  this.options.size !== null &&
                  this.first == 1
                  ? this.options.size
                  : this.first - this.options.scroll
              );
        },
        scrollTail: function (e) {
          if (!this.locked && !this.animating && this.tail) {
            this.pauseAuto();
            var f = c.intval(this.list.css(this.lt)),
              f = !e ? f - this.tail : f + this.tail;
            this.inTail = !e;
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.animate(f);
          }
        },
        scroll: function (e, f) {
          !this.locked &&
            !this.animating &&
            (this.pauseAuto(), this.animate(this.pos(e), f));
        },
        pos: function (B, z) {
          var A = c.intval(this.list.css(this.lt));
          if (this.locked || this.animating) {
            return A;
          }
          this.options.wrap != "circular" &&
            (B =
              B < 1
                ? 1
                : this.options.size && B > this.options.size
                ? this.options.size
                : B);
          for (
            var y = this.first > B,
              w =
                this.options.wrap != "circular" && this.first <= 1
                  ? 1
                  : this.first,
              t = y ? this.get(w) : this.get(this.last),
              x = y ? w : w - 1,
              v = null,
              u = 0,
              s = !1,
              r = 0;
            y ? --x >= B : ++x < B;

          ) {
            v = this.get(x);
            s = !v.length;
            if (
              v.length === 0 &&
              ((v = this.create(x).addClass(
                this.className("jcarousel-item-placeholder")
              )),
              t[y ? "before" : "after"](v),
              this.first !== null &&
                this.options.wrap == "circular" &&
                this.options.size !== null &&
                (x <= 0 || x > this.options.size))
            ) {
              (t = this.get(this.index(x))),
                t.length && (v = this.add(x, t.clone(!0)));
            }
            t = v;
            r = this.dimension(v);
            s && (u += r);
            if (
              this.first !== null &&
              (this.options.wrap == "circular" ||
                (x >= 1 &&
                  (this.options.size === null || x <= this.options.size)))
            ) {
              A = y ? A + r : A - r;
            }
          }
          for (
            var w = this.clipping(),
              q = [],
              f = 0,
              p = 0,
              t = this.get(B - 1),
              x = B;
            ++f;

          ) {
            v = this.get(x);
            s = !v.length;
            if (v.length === 0) {
              v = this.create(x).addClass(
                this.className("jcarousel-item-placeholder")
              );
              if (t.length === 0) {
                this.list.prepend(v);
              } else {
                t[y ? "before" : "after"](v);
              }
              if (
                this.first !== null &&
                this.options.wrap == "circular" &&
                this.options.size !== null &&
                (x <= 0 || x > this.options.size)
              ) {
                (t = this.get(this.index(x))),
                  t.length && (v = this.add(x, t.clone(!0)));
              }
            }
            t = v;
            r = this.dimension(v);
            if (r === 0) {
              throw Error(
                "jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."
              );
            }
            this.options.wrap != "circular" &&
            this.options.size !== null &&
            x > this.options.size
              ? q.push(v)
              : s && (u += r);
            p += r;
            if (p >= w) {
              break;
            }
            x++;
          }
          for (v = 0; v < q.length; v++) {
            q[v].remove();
          }
          u > 0 &&
            (this.list.css(this.wh, this.dimension(this.list) + u + "px"),
            y &&
              ((A -= u),
              this.list.css(
                this.lt,
                c.intval(this.list.css(this.lt)) - u + "px"
              )));
          u = B + f - 1;
          if (
            this.options.wrap != "circular" &&
            this.options.size &&
            u > this.options.size
          ) {
            u = this.options.size;
          }
          if (x > u) {
            f = 0;
            x = u;
            for (p = 0; ++f; ) {
              v = this.get(x--);
              if (!v.length) {
                break;
              }
              p += this.dimension(v);
              if (p >= w) {
                break;
              }
            }
          }
          x = u - f + 1;
          this.options.wrap != "circular" && x < 1 && (x = 1);
          if (this.inTail && y) {
            (A += this.tail), (this.inTail = !1);
          }
          this.tail = null;
          if (
            this.options.wrap != "circular" &&
            u == this.options.size &&
            u - f + 1 >= 1 &&
            ((y = c.intval(
              this.get(u).css(
                !this.options.vertical ? "marginRight" : "marginBottom"
              )
            )),
            p - y > w)
          ) {
            this.tail = p - w - y;
          }
          if (z && B === this.options.size && this.tail) {
            (A -= this.tail), (this.inTail = !0);
          }
          for (; B-- > x; ) {
            A += this.dimension(this.get(B));
          }
          this.prevFirst = this.first;
          this.prevLast = this.last;
          this.first = x;
          this.last = u;
          return A;
        },
        animate: function (g, j) {
          if (!this.locked && !this.animating) {
            this.animating = !0;
            var e = this,
              i = function () {
                e.animating = !1;
                g === 0 && e.list.css(e.lt, 0);
                !e.autoStopped &&
                  (e.options.wrap == "circular" ||
                    e.options.wrap == "both" ||
                    e.options.wrap == "last" ||
                    e.options.size === null ||
                    e.last < e.options.size ||
                    (e.last == e.options.size &&
                      e.tail !== null &&
                      !e.inTail)) &&
                  e.startAuto();
                e.buttons();
                e.notify("onAfterAnimation");
                if (e.options.wrap == "circular" && e.options.size !== null) {
                  for (var f = e.prevFirst; f <= e.prevLast; f++) {
                    f !== null &&
                      !(f >= e.first && f <= e.last) &&
                      (f < 1 || f > e.options.size) &&
                      e.remove(f);
                  }
                }
              };
            this.notify("onBeforeAnimation");
            if (!this.options.animation || j === !1) {
              this.list.css(this.lt, g + "px"), i();
            } else {
              var h = !this.options.vertical
                  ? this.options.rtl
                    ? {
                        right: g,
                      }
                    : {
                        left: g,
                      }
                  : {
                      top: g,
                    },
                i = {
                  duration: this.options.animation,
                  easing: this.options.easing,
                  complete: i,
                };
              if (b.isFunction(this.options.animationStepCallback)) {
                i.step = this.options.animationStepCallback;
              }
              this.list.animate(h, i);
            }
          }
        },
        startAuto: function (e) {
          if (e !== void 0) {
            this.options.auto = e;
          }
          if (this.options.auto === 0) {
            return this.stopAuto();
          }
          if (this.timer === null) {
            this.autoStopped = !1;
            var f = this;
            this.timer = window.setTimeout(function () {
              f.next();
            }, this.options.auto * 1000);
          }
        },
        stopAuto: function () {
          this.pauseAuto();
          this.autoStopped = !0;
        },
        pauseAuto: function () {
          if (this.timer !== null) {
            window.clearTimeout(this.timer), (this.timer = null);
          }
        },
        buttons: function (f, g) {
          if (
            f == null &&
            ((f =
              !this.locked &&
              this.options.size !== 0 &&
              ((this.options.wrap && this.options.wrap != "first") ||
                this.options.size === null ||
                this.last < this.options.size)),
            !this.locked &&
              (!this.options.wrap || this.options.wrap == "first") &&
              this.options.size !== null &&
              this.last >= this.options.size)
          ) {
            f = this.tail !== null && !this.inTail;
          }
          if (
            g == null &&
            ((g =
              !this.locked &&
              this.options.size !== 0 &&
              ((this.options.wrap && this.options.wrap != "last") ||
                this.first > 1)),
            !this.locked &&
              (!this.options.wrap || this.options.wrap == "last") &&
              this.options.size !== null &&
              this.first == 1)
          ) {
            g = this.tail !== null && this.inTail;
          }
          var e = this;
          this.buttonNext.size() > 0
            ? (this.buttonNext.unbind(
                this.options.buttonNextEvent + ".jcarousel",
                this.funcNext
              ),
              f &&
                this.buttonNext.bind(
                  this.options.buttonNextEvent + ".jcarousel",
                  this.funcNext
                ),
              this.buttonNext[f ? "removeClass" : "addClass"](
                this.className("jcarousel-next-disabled")
              ).attr("disabled", f ? !1 : !0),
              this.options.buttonNextCallback !== null &&
                this.buttonNext.data("jcarouselstate") != f &&
                this.buttonNext
                  .each(function () {
                    e.options.buttonNextCallback(e, this, f);
                  })
                  .data("jcarouselstate", f))
            : this.options.buttonNextCallback !== null &&
              this.buttonNextState != f &&
              this.options.buttonNextCallback(e, null, f);
          this.buttonPrev.size() > 0
            ? (this.buttonPrev.unbind(
                this.options.buttonPrevEvent + ".jcarousel",
                this.funcPrev
              ),
              g &&
                this.buttonPrev.bind(
                  this.options.buttonPrevEvent + ".jcarousel",
                  this.funcPrev
                ),
              this.buttonPrev[g ? "removeClass" : "addClass"](
                this.className("jcarousel-prev-disabled")
              ).attr("disabled", g ? !1 : !0),
              this.options.buttonPrevCallback !== null &&
                this.buttonPrev.data("jcarouselstate") != g &&
                this.buttonPrev
                  .each(function () {
                    e.options.buttonPrevCallback(e, this, g);
                  })
                  .data("jcarouselstate", g))
            : this.options.buttonPrevCallback !== null &&
              this.buttonPrevState != g &&
              this.options.buttonPrevCallback(e, null, g);
          this.buttonNextState = f;
          this.buttonPrevState = g;
        },
        notify: function (e) {
          var f =
            this.prevFirst === null
              ? "init"
              : this.prevFirst < this.first
              ? "next"
              : "prev";
          this.callback("itemLoadCallback", e, f);
          this.prevFirst !== this.first &&
            (this.callback("itemFirstInCallback", e, f, this.first),
            this.callback("itemFirstOutCallback", e, f, this.prevFirst));
          this.prevLast !== this.last &&
            (this.callback("itemLastInCallback", e, f, this.last),
            this.callback("itemLastOutCallback", e, f, this.prevLast));
          this.callback(
            "itemVisibleInCallback",
            e,
            f,
            this.first,
            this.last,
            this.prevFirst,
            this.prevLast
          );
          this.callback(
            "itemVisibleOutCallback",
            e,
            f,
            this.prevFirst,
            this.prevLast,
            this.first,
            this.last
          );
        },
        callback: function (t, r, s, q, o, l, p) {
          if (
            !(
              this.options[t] == null ||
              (typeof this.options[t] != "object" && r != "onAfterAnimation")
            )
          ) {
            var n =
              typeof this.options[t] == "object"
                ? this.options[t][r]
                : this.options[t];
            if (b.isFunction(n)) {
              var m = this;
              if (q === void 0) {
                n(m, s, r);
              } else {
                if (o === void 0) {
                  this.get(q).each(function () {
                    n(m, this, q, s, r);
                  });
                } else {
                  for (
                    var t = function (e) {
                        m.get(e).each(function () {
                          n(m, this, e, s, r);
                        });
                      },
                      g = q;
                    g <= o;
                    g++
                  ) {
                    g !== null && !(g >= l && g <= p) && t(g);
                  }
                }
              }
            }
          }
        },
        create: function (e) {
          return this.format("<li></li>", e);
        },
        format: function (f, h) {
          for (
            var f = b(f), e = f.get(0).className.split(" "), g = 0;
            g < e.length;
            g++
          ) {
            e[g].indexOf("jcarousel-") != -1 && f.removeClass(e[g]);
          }
          f.addClass(this.className("jcarousel-item"))
            .addClass(this.className("jcarousel-item-" + h))
            .css({
              float: this.options.rtl ? "right" : "left",
              "list-style": "none",
            })
            .attr("jcarouselindex", h);
          return f;
        },
        className: function (e) {
          return (
            e + " " + e + (!this.options.vertical ? "-horizontal" : "-vertical")
          );
        },
        dimension: function (f, h) {
          var e = b(f);
          if (h == null) {
            return !this.options.vertical
              ? e.outerWidth(!0) || c.intval(this.options.itemFallbackDimension)
              : e.outerHeight(!0) ||
                  c.intval(this.options.itemFallbackDimension);
          } else {
            var g = !this.options.vertical
              ? h -
                c.intval(e.css("marginLeft")) -
                c.intval(e.css("marginRight"))
              : h -
                c.intval(e.css("marginTop")) -
                c.intval(e.css("marginBottom"));
            b(e).css(this.wh, g + "px");
            return this.dimension(e);
          }
        },
        clipping: function () {
          return !this.options.vertical
            ? this.clip[0].offsetWidth -
                c.intval(this.clip.css("borderLeftWidth")) -
                c.intval(this.clip.css("borderRightWidth"))
            : this.clip[0].offsetHeight -
                c.intval(this.clip.css("borderTopWidth")) -
                c.intval(this.clip.css("borderBottomWidth"));
        },
        index: function (e, f) {
          if (f == null) {
            f = this.options.size;
          }
          return Math.round(((e - 1) / f - Math.floor((e - 1) / f)) * f) + 1;
        },
      });
      c.extend({
        defaults: function (e) {
          return b.extend(d, e || {});
        },
        intval: function (e) {
          e = parseInt(e, 10);
          return isNaN(e) ? 0 : e;
        },
        windowLoaded: function () {
          a = !0;
        },
      });
      b.fn.jcarousel = function (f) {
        if (typeof f == "string") {
          var g = b(this).data("jcarousel"),
            e = Array.prototype.slice.call(arguments, 1);
          return g[f].apply(g, e);
        } else {
          return this.each(function () {
            var h = b(this).data("jcarousel");
            h
              ? (f && b.extend(h.options, f), h.reload())
              : b(this).data("jcarousel", new c(this, f));
          });
        }
      };
    })(jQuery);
    (function (a) {
      a.fn.slide = function (b) {
        b = a.extend(
          {
            speed: 150,
            className: "slide",
            trigger: "hover",
          },
          b || {}
        );
        this.each(function () {
          var d = this,
            h = 1000;
          a(d).addClass(b.className);
          a(d).find("li:has(> ul) > a").addClass("sublevel");

          function g(j) {
            if (j.nodeName.toLowerCase() == "li") {
              var i = a("> ul", j);
              return i.length ? i[0] : null;
            } else {
              return j;
            }
          }

          function e(i) {
            if (i.nodeName.toLowerCase() == "ul") {
              return a(i).parents("li")[0];
            } else {
              return i;
            }
          }

          function f() {
            var i = g(this);
            if (!i) {
              return;
            }
            a.data(i, "cancelHide", false);
            setTimeout(function () {
              if (!a.data(i, "cancelHide")) {
                a(i).slideUp(b.speed);
              }
            }, 500);
          }

          function c() {
            var j = g(this);
            if (!j) {
              return;
            }
            a.data(j, "cancelHide", true);
            a(j)
              .css({
                zIndex: h++,
              })
              .slideDown(b.speed);
            if (this.nodeName.toLowerCase() == "ul") {
              var i = e(this);
              a(i).addClass("hover");
              a("> a", i).addClass("hover");
            }
            return false;
          }
          if (b.trigger == "click") {
            a("> li", this).click(c);
            a("> li ul, > li li", this).hover(c, function () {});
            a("ul, li", this).hover(function () {}, f);
          } else {
            if (typeof a.fn.hoverIntent == "function") {
              a("ul, li", this).hoverIntent(
                a.extend(
                  {
                    sensitivity: 2,
                    interval: 50,
                    timeout: 100,
                  },
                  b.hoverIntent || {},
                  {
                    over: c,
                    out: f,
                  }
                )
              );
            } else {
              a("ul, li", this).hover(c, f);
            }
          }
          a("li", this).hover(
            function () {
              a(this).addClass("hover");
              a("> a", this).addClass("hover");
            },
            function () {
              a(this).removeClass("hover");
              a("> a", this).removeClass("hover");
            }
          );
        });
      };
    })(jQuery);
    (function (b, c) {
      b.fn.extend({
        countdown: function (d) {
          var e = {
            currentTime: null,
            targetDD: 31,
            targetMM: 12,
            targetYY: 2020,
            targetHH: 0,
          };
          d = b.extend({}, b.fn.countdown.defaults, d);
          return this.each(function () {
            var h = b(this);
            var g = d;
            var f = new Date(g.currentTime);
            setInterval(function () {
              f = new Date(f.getTime() + 1000);
              var i = a(
                f,
                g.targetMM +
                  "/" +
                  g.targetDD +
                  "/" +
                  g.targetYY +
                  " " +
                  g.targetHH +
                  ":00:00"
              );
              h.find(".dd").html(i.d);
              h.find(".hh").html(i.h);
              h.find(".mm").html(i.m);
              h.find(".ss").html(i.s);
            }, 1000);
          });
        },
      });

      function a(e, d) {
        var f = Date.parse(d) - Date.parse(e);
        return isNaN(f)
          ? NaN
          : {
              diff: f,
              ms: Math.floor(f % 1000),
              s: Math.floor((f / 1000) % 60),
              m: Math.floor((f / 60000) % 60),
              h: Math.floor((f / 3600000) % 24),
              d: Math.floor(f / 86400000),
            };
      }
    })(jQuery);
    (function (a) {
      a.fn.popupWindow = function (b) {
        return this.each(function () {
          a(this).click(function () {
            a.fn.popupWindow.defaultSettings = {
              centerBrowser: 0,
              centerScreen: 0,
              height: 500,
              left: 0,
              location: 0,
              menubar: 0,
              resizable: 0,
              scrollbars: 0,
              status: 0,
              width: 500,
              windowName: null,
              windowURL: null,
              top: 0,
              toolbar: 0,
              suppressEvent: true,
            };
            settings = a.extend({}, a.fn.popupWindow.defaultSettings, b || {});
            var c =
              "height=" +
              settings.height +
              ",width=" +
              settings.width +
              ",toolbar=" +
              settings.toolbar +
              ",scrollbars=" +
              settings.scrollbars +
              ",status=" +
              settings.status +
              ",resizable=" +
              settings.resizable +
              ",location=" +
              settings.location +
              ",menuBar=" +
              settings.menubar;
            settings.windowName = this.name || settings.windowName;
            settings.windowURL = this.href || settings.windowURL;
            var d, e;
            if (settings.centerBrowser) {
              if (a.browser.msie) {
                d =
                  window.screenTop -
                  120 +
                  ((document.documentElement.clientHeight + 120) / 2 -
                    settings.height / 2);
                e =
                  window.screenLeft +
                  ((document.body.offsetWidth + 20) / 2 - settings.width / 2);
              } else {
                d =
                  window.screenY +
                  (window.outerHeight / 2 - settings.height / 2);
                e =
                  window.screenX + (window.outerWidth / 2 - settings.width / 2);
              }
              window
                .open(
                  settings.windowURL,
                  settings.windowName,
                  c + ",left=" + e + ",top=" + d
                )
                .focus();
            } else {
              if (settings.centerScreen) {
                d = (screen.height - settings.height) / 2;
                e = (screen.width - settings.width) / 2;
                window
                  .open(
                    settings.windowURL,
                    settings.windowName,
                    c + ",left=" + e + ",top=" + d
                  )
                  .focus();
              } else {
                window
                  .open(
                    settings.windowURL,
                    settings.windowName,
                    c + ",left=" + settings.left + ",top=" + settings.top
                  )
                  .focus();
              }
            }
            return !settings.suppressEvent;
          });
        });
      };
    })(jQuery);
    /*!
     * jQuery Cookie Plugin v1.3
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */
    (function (f, b, g) {
      var a = /\+/g;

      function e(h) {
        return h;
      }

      function c(h) {
        return decodeURIComponent(h.replace(a, " "));
      }
      var d = (f.cookie = function (p, o, u) {
        if (o !== g) {
          u = f.extend({}, d.defaults, u);
          if (o === null) {
            u.expires = -1;
          }
          if (typeof u.expires === "number") {
            var q = u.expires,
              s = (u.expires = new Date());
            s.setDate(s.getDate() + q);
          }
          o = d.json ? JSON.stringify(o) : String(o);
          return (b.cookie = [
            encodeURIComponent(p),
            "=",
            d.raw ? o : encodeURIComponent(o),
            u.expires ? "; expires=" + u.expires.toUTCString() : "",
            u.path ? "; path=" + u.path : "",
            u.domain ? "; domain=" + u.domain : "",
            u.secure ? "; secure" : "",
          ].join(""));
        }
        var h = d.raw ? e : c;
        var r = b.cookie.split("; ");
        for (var n = 0, k = r.length; n < k; n++) {
          var m = r[n].split("=");
          if (h(m.shift()) === p) {
            var j = h(m.join("="));
            return d.json ? JSON.parse(j) : j;
          }
        }
        return null;
      });
      d.defaults = {};
      f.removeCookie = function (i, h) {
        if (f.cookie(i) !== null) {
          f.cookie(i, null, h);
          return true;
        }
        return false;
      };
    })(jQuery, document);
    /*!
     * jQuery "Brick-Force Webplayer" Plugin
     * @name jquery.brickforce.webplayer.js
     * @author (c) 2011-2012 Infernum Productions AG
     * @contact mailto:contact@infernum.com
     * @version 1.1
     * @date August 17, 2012
     * @category jQuery plugin
     * @copyright (c) 2011-2012 Infernum Productions AG
     */
    (function (a) {
      a.fn.brickforce = function (c) {
        var c = jQuery.extend(
          {
            httpProtocol: "",
            httpURLContent: "/webplayer",
            httpURLImagesPath: "/design/webplayer",
            relInit: "brickforce",
            overlayPosition: "fixed",
            overlayBgColor: "#000",
            overlayOpacity: 0.75,
            textBuyToken: "Buy Token",
            textSupport: "Support",
            textFAQ: "FAQ",
            textClose: "Close",
            textLoading: "Loading",
            onLoad: null,
            onClose: null,
          },
          c
        );
        a("body").append(
          '<div class="webplayer-overplay">&nbsp;</div><div class="webplayer-dialog"><div class="bf-decoration1"><div class="bf-decoration2"><div class="navi"><span class="billing"></span><img src="' +
            c.httpProtocol +
            c.httpURLImagesPath +
            '/close.png" alt="' +
            c.textClose +
            '" title="' +
            c.textClose +
            '" class="webplayer-close" /></div></div></div></div>'
        );
        var d = a(document).height();
        var e = a(window).height();
        var b = a(window).width();
        a(".webplayer-overplay, .webplayer-dialog").hide();
        a(".webplayer-overplay").css({
          backgroundColor: c.overlayBgColor,
          opacity: c.overlayOpacity,
          height: d,
        });
        a(".webplayer-dialog").ready(function () {
          function f() {
            var h = a(window).height();
            var g = a(window).width();
            a(this).css({
              position: c.overlayPosition,
              width: g - 74,
              height: h - 74,
            });
          }
          f();
          a(window).resize(f);
        });
        a("*[rel=" + c.relInit + "]").click(function () {
          a(".webplayer-overplay, .webplayer-dialog").fadeIn("slow");
          a(".bf-decoration2").append(
            '<img src="' +
              c.httpProtocol +
              c.httpURLImagesPath +
              '/loading.gif" class="webplayer-preload" alt="Brick-Force: ' +
              c.textLoading +
              '" title="Brick-Force: ' +
              c.textLoading +
              '" />'
          );
          a(".webplayer-preload")
            .css({
              left: b / 2 - 80,
              top: e / 2 - 70,
            })
            .delay(1800)
            .fadeOut("fast");
          a(".bf-decoration2").append(
            '<iframe class="webplayer-iframe" src="' +
              c.httpProtocol +
              c.httpURLContent +
              '#live"></iframe>'
          );
          a(".bf-decoration2 .navi .billing").replaceWith(a("#webplayer-navi"));

          function f() {
            var h = a(window).height();
            var g = a(window).width();
            a(".webplayer-iframe").css({
              width: g - 74,
              height: h - 126,
            });
          }
          f();
          a(window).resize(f);
          if (a.isFunction(c.onLoad)) {
            c.onLoad();
          }
          return false;
        });
        a(".webplayer-close").click(function () {
          a(".webplayer-iframe").remove();
          a(".webplayer-overplay, .webplayer-dialog").fadeOut();
          if (a.isFunction(c.onClose)) {
            c.onClose();
          }
        });
      };
    })(jQuery);
    (function (a) {
      a.fn.label2Value = function (c) {
        var b = "inactive";
        var f = "active";
        var e = "focused";
        var d = this;
        d.find(".field label").each(function () {
          var i = false;
          var j = document.getElementById(a(this).attr("for"));
          if (j && j.name == "register[captcha]") {
            return;
          }
          if (
            a(j).attr("type") == "text" ||
            a(j).attr("type") == "password" ||
            a(j).attr("type") == "email" ||
            a(j).attr("type") == "url" ||
            (a(j).attr("tagName") &&
              a(j).attr("tagName").toLowerCase() == "textarea")
          ) {
            var k = a(this).text();
            if (a(j).attr("type") == "password") {
              var g = a(j);
              var h = a(j).parent().find(".clear");
              g.addClass(f);
              h.addClass(b);
              h.val(k);
              if (a(j).val() == "") {
                g.css("display", "none");
                h.css("display", "inline");
              } else {
                g.css("display", "inline");
                h.css("display", "none");
              }
              h.focus(function () {
                h.css("display", "none");
                g.css("display", "inline").addClass(e);
                g.focus();
              });
              g.blur(function () {
                a(this).removeClass(e);
                if (a(this).val() == "") {
                  g.css("display", "none");
                  h.css("display", "inline");
                } else {
                  a(this).addClass(f);
                }
              });
            } else {
              if (a(j).val() == "") {
                a(j).val(k);
                a(j).addClass(b);
              } else {
                a(j).addClass(f);
              }
              a(j).focus(function () {
                a(this).addClass(e);
                a(this).removeClass(b);
                a(this).removeClass(f);
                if (a(this).val() == k) {
                  a(this).val("");
                }
              });
              a(j).blur(function () {
                a(this).removeClass(e);
                if (a(this).val() == "") {
                  a(this).val(k);
                  a(this).addClass(b);
                } else {
                  a(this).addClass(f);
                }
              });
            }
            d.submit(function (l) {
              if (a(j).val() == k) {
                a(j).val("");
              }
            });
          }
        });
      };
    })(jQuery);
    (function (c) {
      function a(d) {
        if (d.attr("title") || typeof d.attr("original-title") != "string") {
          d.attr("original-title", d.attr("title") || "").removeAttr("title");
        }
      }

      function b(e, d) {
        this.$element = c(e);
        this.options = d;
        this.enabled = true;
        a(this.$element);
      }
      b.prototype = {
        show: function () {
          var g = this.getTitle();
          if (g && this.enabled) {
            var f = this.tip();
            f.find(".tipsy-inner")[this.options.html ? "html" : "text"](g);
            f[0].className = "tipsy";
            f.remove()
              .css({
                top: 0,
                left: 0,
                visibility: "hidden",
                display: "block",
              })
              .appendTo(document.body);
            var j = c.extend({}, this.$element.offset(), {
              width: this.$element[0].offsetWidth,
              height: this.$element[0].offsetHeight,
            });
            var d = f[0].offsetWidth,
              i = f[0].offsetHeight;
            var h =
              typeof this.options.gravity == "function"
                ? this.options.gravity.call(this.$element[0])
                : this.options.gravity;
            var e;
            switch (h.charAt(0)) {
              case "n":
                e = {
                  top: j.top + j.height + this.options.offset,
                  left: j.left + j.width / 2 - d / 2,
                };
                break;
              case "s":
                e = {
                  top: j.top - i - this.options.offset,
                  left: j.left + j.width / 2 - d / 2,
                };
                break;
              case "e":
                e = {
                  top: j.top + j.height / 2 - i / 2,
                  left: j.left - d - this.options.offset,
                };
                break;
              case "w":
                e = {
                  top: j.top + j.height / 2 - i / 2,
                  left: j.left + j.width + this.options.offset,
                };
                break;
            }
            if (h.length == 2) {
              if (h.charAt(1) == "w") {
                e.left = j.left + j.width / 2 - 15;
              } else {
                e.left = j.left + j.width / 2 - d + 15;
              }
            }
            f.css(e).addClass("tipsy-" + h);
            if (this.options.fade) {
              f.stop()
                .css({
                  opacity: 0,
                  display: "block",
                  visibility: "visible",
                })
                .animate({
                  opacity: this.options.opacity,
                });
            } else {
              f.css({
                visibility: "visible",
                opacity: this.options.opacity,
              });
            }
          }
        },
        hide: function () {
          if (this.options.fade) {
            this.tip()
              .stop()
              .fadeOut(function () {
                c(this).remove();
              });
          } else {
            this.tip().remove();
          }
        },
        getTitle: function () {
          var f,
            d = this.$element,
            e = this.options;
          a(d);
          var f,
            e = this.options;
          if (typeof e.title == "string") {
            f = d.attr(e.title == "title" ? "original-title" : e.title);
          } else {
            if (typeof e.title == "function") {
              f = e.title.call(d[0]);
            }
          }
          f = ("" + f).replace(/(^\s*|\s*$)/, "");
          return f || e.fallback;
        },
        tip: function () {
          if (!this.$tip) {
            this.$tip = c('<div class="tipsy"></div>').html(
              '<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>'
            );
          }
          return this.$tip;
        },
        validate: function () {
          if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
          }
        },
        enable: function () {
          this.enabled = true;
        },
        disable: function () {
          this.enabled = false;
        },
        toggleEnabled: function () {
          this.enabled = !this.enabled;
        },
      };
      c.fn.tipsy = function (h) {
        if (h === true) {
          return this.data("tipsy");
        } else {
          if (typeof h == "string") {
            return this.data("tipsy")[h]();
          }
        }
        h = c.extend({}, c.fn.tipsy.defaults, h);

        function g(k) {
          var l = c.data(k, "tipsy");
          if (!l) {
            l = new b(k, c.fn.tipsy.elementOptions(k, h));
            c.data(k, "tipsy", l);
          }
          return l;
        }

        function j() {
          var k = g(this);
          k.hoverState = "in";
          if (h.delayIn == 0) {
            k.show();
          } else {
            setTimeout(function () {
              if (k.hoverState == "in") {
                k.show();
              }
            }, h.delayIn);
          }
        }

        function f() {
          var k = g(this);
          k.hoverState = "out";
          if (h.delayOut == 0) {
            k.hide();
          } else {
            setTimeout(function () {
              if (k.hoverState == "out") {
                k.hide();
              }
            }, h.delayOut);
          }
        }
        if (!h.live) {
          this.each(function () {
            g(this);
          });
        }
        if (h.trigger != "manual") {
          var d = h.live ? "live" : "bind",
            i = h.trigger == "hover" ? "mouseenter" : "focus",
            e = h.trigger == "hover" ? "mouseleave" : "blur";
          this[d](i, j)[d](e, f);
        }
        return this;
      };
      c.fn.tipsy.defaults = {
        delayIn: 0,
        delayOut: 0,
        fade: true,
        fallback: "",
        gravity: "n",
        html: false,
        live: false,
        offset: 0,
        opacity: 0.95,
        title: "title",
        trigger: "hover",
      };
      c.fn.tipsy.elementOptions = function (e, d) {
        return c.metadata ? c.extend({}, d, c(e).metadata()) : d;
      };
      c.fn.tipsy.autoNS = function () {
        return c(this).offset().top >
          c(document).scrollTop() + c(window).height() / 2
          ? "s"
          : "n";
      };
      c.fn.tipsy.autoWE = function () {
        return c(this).offset().left >
          c(document).scrollLeft() + c(window).width() / 2
          ? "e"
          : "w";
      };
    })(jQuery);
    var infernumCountry = [
      "AD",
      "AE",
      "AF",
      "AG",
      "AI",
      "AL",
      "AM",
      "AO",
      "AQ",
      "AR",
      "AS",
      "AT",
      "AU",
      "AW",
      "AX",
      "AZ",
      "BA",
      "BB",
      "BD",
      "BE",
      "BF",
      "BG",
      "BH",
      "BI",
      "BJ",
      "BL",
      "BM",
      "BN",
      "BO",
      "BR",
      "BS",
      "BT",
      "BV",
      "BW",
      "BY",
      "BZ",
      "CA",
      "CC",
      "CD",
      "CF",
      "CG",
      "CH",
      "CI",
      "CK",
      "CL",
      "CM",
      "CN",
      "CO",
      "CP",
      "CR",
      "CU",
      "CV",
      "CX",
      "CW",
      "CY",
      "CZ",
      "DE",
      "DJ",
      "DK",
      "DM",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "EH",
      "EL",
      "ER",
      "ES",
      "ET",
      "FI",
      "FJ",
      "FK",
      "FM",
      "FO",
      "FR",
      "GA",
      "GB",
      "GD",
      "GE",
      "GF",
      "GG",
      "GH",
      "GI",
      "GL",
      "GM",
      "GN",
      "GP",
      "GQ",
      "GS",
      "GT",
      "GU",
      "GW",
      "GY",
      "HK",
      "HM",
      "HN",
      "HR",
      "HT",
      "HU",
      "ID",
      "IE",
      "IL",
      "IM",
      "IN",
      "IO",
      "IQ",
      "IR",
      "IS",
      "IT",
      "JE",
      "JM",
      "JO",
      "JP",
      "KE",
      "KG",
      "KH",
      "KI",
      "KM",
      "KN",
      "KP",
      "KR",
      "KW",
      "KY",
      "KZ",
      "LA",
      "LB",
      "LC",
      "LI",
      "LK",
      "LR",
      "LS",
      "LT",
      "LU",
      "LV",
      "LY",
      "MA",
      "MC",
      "MD",
      "ME",
      "MF",
      "MG",
      "MH",
      "ML",
      "MM",
      "MN",
      "MO",
      "MP",
      "MQ",
      "MR",
      "MS",
      "MT",
      "MU",
      "MV",
      "MW",
      "MX",
      "MY",
      "MZ",
      "NA",
      "NC",
      "NE",
      "NF",
      "NG",
      "NI",
      "NL",
      "NO",
      "NP",
      "NR",
      "NU",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PF",
      "PG",
      "PH",
      "PK",
      "PL",
      "PM",
      "PN",
      "PR",
      "PT",
      "PW",
      "PY",
      "QA",
      "RE",
      "RO",
      "RS",
      "RU",
      "RW",
      "SA",
      "SB",
      "SC",
      "SD",
      "SE",
      "SG",
      "SH",
      "SI",
      "SJ",
      "SK",
      "SL",
      "SM",
      "SN",
      "SO",
      "SR",
      "SS",
      "ST",
      "SV",
      "SX",
      "SY",
      "SZ",
      "TC",
      "TD",
      "TF",
      "TG",
      "TH",
      "TJ",
      "TK",
      "TL",
      "TM",
      "TN",
      "TO",
      "TR",
      "TT",
      "TV",
      "TW",
      "TZ",
      "UA",
      "UG",
      "UK",
      "UM",
      "US",
      "UY",
      "UZ",
      "VA",
      "VC",
      "VE",
      "VG",
      "VI",
      "VN",
      "VU",
      "WF",
      "WS",
      "YE",
      "YT",
      "ZA",
      "ZM",
      "ZW",
    ];
    var userCountry = null;
    var checkForRedirect = function (a) {
      userCountry = a;
      if (userCountry && infernumCountry.indexOf(userCountry) == -1) {
        showGate();
      }
    };
    var showGate = function () {
      if ($.cookie("redirect") !== "rejected") {
        window.location.href =
          (debug ? "/app_dev.php" : "") +
          "/" +
          lang +
          "/country-redirect?country=" +
          userCountry +
          "&target=" +
          encodeURIComponent(window.location.href);
      }
    };
    (function (a) {
      jQuery.fn.pngFix = function (d) {
        d = jQuery.extend(
          {
            blankgif: "/design/blank.gif",
          },
          d
        );
        var c =
          navigator.appName == "Microsoft Internet Explorer" &&
          parseInt(navigator.appVersion) == 4 &&
          navigator.appVersion.indexOf("MSIE 5.5") != -1;
        var b =
          navigator.appName == "Microsoft Internet Explorer" &&
          parseInt(navigator.appVersion) == 4 &&
          navigator.appVersion.indexOf("MSIE 6.0") != -1;
        if (jQuery.browser.msie && (c || b)) {
          jQuery(this)
            .find("img[src$=.png]")
            .each(function () {
              jQuery(this).attr("width", jQuery(this).width());
              jQuery(this).attr("height", jQuery(this).height());
              var l = "";
              var g = "";
              var f = jQuery(this).attr("id")
                ? 'id="' + jQuery(this).attr("id") + '" '
                : "";
              var m = jQuery(this).attr("class")
                ? 'class="' + jQuery(this).attr("class") + '" '
                : "";
              var i = jQuery(this).attr("title")
                ? 'title="' + jQuery(this).attr("title") + '" '
                : "";
              var j = jQuery(this).attr("alt")
                ? 'alt="' + jQuery(this).attr("alt") + '" '
                : "";
              var h = jQuery(this).attr("align")
                ? "float:" + jQuery(this).attr("align") + ";"
                : "";
              var e = jQuery(this).parent().attr("href") ? "cursor:hand;" : "";
              if (this.style.border) {
                l += "border:" + this.style.border + ";";
                this.style.border = "";
              }
              if (this.style.padding) {
                l += "padding:" + this.style.padding + ";";
                this.style.padding = "";
              }
              if (this.style.margin) {
                l += "margin:" + this.style.margin + ";";
                this.style.margin = "";
              }
              var k = this.style.cssText;
              g += "<span " + f + m + i + j;
              g +=
                'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;' +
                h +
                e;
              g +=
                "width:" +
                jQuery(this).width() +
                "px;height:" +
                jQuery(this).height() +
                "px;";
              g +=
                "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                jQuery(this).attr("src") +
                "', sizingMethod='scale');";
              g += k + '"></span>';
              if (l != "") {
                g =
                  '<span style="position:relative;display:inline-block;' +
                  l +
                  e +
                  "width:" +
                  jQuery(this).width() +
                  "px;height:" +
                  jQuery(this).height() +
                  'px;">' +
                  g +
                  "</span>";
              }
              jQuery(this).hide();
              jQuery(this).after(g);
            });
          jQuery(this)
            .find("*")
            .each(function () {
              var f = jQuery(this).css("background-image");
              if (f.indexOf(".png") != -1) {
                var e = f.split('url("')[1].split('")')[0];
                jQuery(this).css("background-image", "none");
                jQuery(this).get(0).runtimeStyle.filter =
                  "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                  e +
                  "',sizingMethod='scale')";
              }
            });
          jQuery(this)
            .find("input[src$=.png]")
            .each(function () {
              var e = jQuery(this).attr("src");
              jQuery(this).get(0).runtimeStyle.filter =
                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                e +
                "', sizingMethod='scale');";
              jQuery(this).attr("src", d.blankgif);
            });
        }
        return jQuery;
      };
    })(jQuery);
    (function (a) {
      a.fn.textShadow = function (c) {
        if (!a.browser.msie) {
          return;
        }
        var b = a.browser.version < 7;
        return this.each(function () {
          var e = a(this);
          var f = e.textShadowParse(this.currentStyle["text-shadow"]);
          f = a.extend(f, c);
          e.textShadowRemove();
          if (f.x == 0 && f.y == 0 && f.radius == 0) {
            return;
          }
          if (e.css("position") == "static") {
            e.css({
              position: "relative",
            });
          }
          e.css({
            zIndex: "0",
          });
          if (b) {
            e.css({
              zoom: "1",
            });
          }
          var d = document.createElement("span");
          a(d).addClass("jQueryTextShadow");
          a(d).html(e.html());
          a(d).css({
            padding: this.currentStyle.padding,
            width: e.width(),
            position: "absolute",
            zIndex: "-1",
            color: f.color != null ? f.color : e.css("color"),
            left: -parseInt(f.radius) + parseInt(f.x) + "px",
            top: -parseInt(f.radius) + parseInt(f.y) + "px",
          });
          if (f.radius != 0) {
            if (f.opacity != null) {
              a(d).css(
                "filter",
                "progid:DXImageTransform.Microsoft.Blur(pixelradius=" +
                  parseInt(f.radius) +
                  ", enabled='true', makeShadow='true', ShadowOpacity=" +
                  f.opacity +
                  ")"
              );
            } else {
              a(d).css(
                "filter",
                "progid:DXImageTransform.Microsoft.Blur(pixelradius=" +
                  parseInt(f.radius) +
                  ", enabled='true')"
              );
            }
          }
          e.append(d);
        });
      };
      a.fn.textShadowParse = function (c) {
        c = String(c)
          .replace(/^\s+|\s+$/gi, "")
          .replace(/\s*!\s*important/i, "")
          .replace(
            /\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g,
            "($1/$2/$3/$4)"
          )
          .replace(
            /\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g,
            "($1/$2/$3)"
          );
        var d = {
          x: 0,
          y: 0,
          radius: 0,
          color: null,
        };
        if (c.length > 1 || c[0].toLowerCase() != "none") {
          c = c.replace(/\//g, ",");
          var b;
          if (
            c.match(
              /(\#[0-9a-f]{6}|\#[0-9a-f]{3}|(rgb|hsb)a?\([^\)]*\)|\b[a-z]+\b)/i
            ) &&
            (b = RegExp.$1)
          ) {
            d.color = b.replace(/^\s+/, "");
            c = c.replace(d.color, "");
          }
          c = c
            .replace(/^\s+|\s+$/g, "")
            .split(/\s+/)
            .map(function (e) {
              return (e || "").replace(/^0[a-z]*$/, "") ? e : 0;
            });
          switch (c.length) {
            case 1:
              d.x = d.y = c[0];
              break;
            case 2:
              d.x = c[0];
              d.y = c[1];
              break;
            case 3:
              d.x = c[0];
              d.y = c[1];
              d.radius = c[2];
              break;
          }
          if ((!d.x && !d.y && !d.radius) || d.color == "transparent") {
            d.x = d.y = d.radius = 0;
            d.color = null;
          }
        }
        return d;
      };
      a.fn.textShadowRemove = function () {
        if (!a.browser.msie) {
          return;
        }
        return this.each(function () {
          a(this).children("span.jQueryTextShadow").remove();
        });
      };
    })(jQuery);
    if (typeof Array.prototype.map == "undefined") {
      Array.prototype.map = function (d) {
        var b = new Array(this.length);
        for (var c = 0; c < this.length; c++) {
          b[c] = d(this[c]);
        }
        return b;
      };
    }
    var SocialWidgets = function (d) {
      var b = this;
      var e = function () {
        b.replace(this, b.getFbCode);
      };
      var c = function () {
        b.replace(this, b.getGpCode);
      };
      var a = function () {
        b.replace(this, b.getTwCode);
      };
      if (lang == "de") {
        d.find(".fb a").click(e);
        d.find(".gp a").click(c);
        d.find(".tw a").click(a);
      } else {
        d.find(".fb a").each(e);
        d.find(".gp a").each(c);
        d.find(".tw a").each(a);
      }
    };
    SocialWidgets.prototype.replace = function (c, f) {
      var b;
      var a = window.location.href;
      if ((b = $(c).attr("rel"))) {
        a = b;
      }
      var e = "";
      if ((aTitle = $(c).attr("title"))) {
        e = aTitle;
      }
      var d = f(c, a, e);
      $(c).css("display", "none");
      $(c).after(d);
    };

    function initLightbox(a) {
      $(a).fancybox({
        prevEffect: "none",
        nextEffect: "none",
        helpers: {
          title: {
            type: "outside",
          },
          thumbs: {
            width: 89,
            height: 50,
          },
        },
      });
    }

    function showOverlay(b) {
      var a = $(b).data("overlay");
      if (a) {
        a.load();
      } else {
        $(b).overlay({
          load: true,
          fixed: false,
          mask: {
            color: "#000",
            loadSpeed: 0,
            closeSpeed: 0,
            opacity: 0.8,
          },
        });
      }
    }

    function iframeOverlay(d, b, c) {
      var a = "#" + d;
      var c = jQuery.extend(
        {
          scrolling: false,
        },
        c
      );
      if (!$(a).length) {
        $("body").append(
          '<div id="' +
            d +
            '" class="overlay"><p class="cross"><a class="close">X</a></p><div class="ajaxloader"></div><iframe src="' +
            b +
            '" border="0" frameborder="0" style="width:100%;height:100%;border:0;" scrolling="' +
            (c.scrolling ? "auto" : "no") +
            '"></iframe></div>'
        );
        $(a + " iframe").load(function () {
          $(a + " .ajaxloader").css("display", "none");
        });
      }
      showOverlay(a);
    }
    this.resizeOverlay = function (a, b) {
      if ($(a).length) {
        $(a).css("height", b + "px");
      }
    };
    this.switch2Register = function () {
      if ($("#setBetakey").length) {
        var b = $("#setBetakey").data("overlay");
        if (b) {
          b.close();
        }
      }
      var a = $("#wall .b1").attr("href");
      window.location = a;
    };
    $(document).ready(function () {
      $(".navigation .l1 ul.l2").hover(function () {
        $(this).css("display", "block");
      });
      $(".navigation").slide();
      $(".where .line").replaceWith($(".tabs.clearfix.news"));
      $("#teaser")
        .scrollable({
          items: ".scrollable",
          vertical: true,
          circular: true,
        })
        .autoscroll({
          autoplay: true,
          interval: 10000,
          autopause: true,
        })
        .navigator({
          navi: "#teaser ul",
        });
      $(".socialWidgets").each(function () {
        var b = new SocialWidgets($(this));
      });
      $(".loyalty.boxed p").mouseover(function () {
        $(this).next("div").slideDown("fast");
        $(".loyalty.boxed").addClass("hover");
      });
      $(".layer.loyalty-card .close").click(function () {
        $(".layer.loyalty-card").fadeOut("fast");
        $(".loyalty.boxed").removeClass("hover");
        $.cookie("loyalty-card", "1");
      });
      $(".messages b.close").click(function () {
        $(".messages").slideUp("fast");
      });
      $("a[rel*=payment]").click(function () {
        var b = _gat._getTrackers()[0];
        this.href = b._getLinkerUrl(this.href);
      });
      $("a[rel*=payment]").click(function () {
        window.open(this.href);
        return false;
      });
      $("a[rel*=external]").click(function () {
        window.open(this.href);
        return false;
      });
      $("a[rel*=lightbox]").fancybox({
        prevEffect: "none",
        nextEffect: "none",
        helpers: {
          title: {
            type: "outside",
          },
          thumbs: {
            width: 89,
            height: 50,
          },
        },
      });
      $.cookie("visit", "1", {
        path: "/",
        expires: 100000,
      });
      var a = (debug ? "/app_dev.php" : "") + "/" + lang + "/auth-form";
      $("#userarea").load(a, function () {
        $(".layer.login").hide();
        $(".user.login p").mouseover(function () {
          $(this).next("div").slideDown("fast");
          $(".user.login").addClass("hover");
        });
        $(".layer.login .close").click(function () {
          $(".layer.login").fadeOut("fast");
          $(".user.login").removeClass("hover");
        });
        $(".layer.login form").label2Value();
      });
    });
  }
});
