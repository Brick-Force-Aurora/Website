const apiUrl = `https://api.github.com/repos/Brick-Force-Aurora/Brick-Force/issues?state=all`;

async function fetchIssues() {
  const response = await fetch(apiUrl);
  const issues = await response.json();
  const container = document.querySelector('.bug-columns');

  issues.forEach(issue => {
    const issueElement = document.createElement('div');
    issueElement.className = 'bug-card';
    issueElement.onclick = () => window.open(issue.html_url, '_blank');

    // Determine if the item is an issue or a pull request
    const type = issue.pull_request ? 'Pull Request' : 'Issue';

    const iconColor = issue.state === 'open' ? 'icon-green' : 'icon-purple';

    const icon = `<span class="bug-icon ${iconColor}"></span>`;

    // Build the labels as styled chips
    const labels = issue.labels
      .map(label => `<span class="bug-label">${label.name}</span>`)
      .join('');

    // Display assignee names or a default message
    const assignee = issue.assignee ? issue.assignee.login : 'Unassigned';

    // Truncate the description to 100 characters
    const description = issue.body
      ? issue.body.length > 100
        ? `${issue.body.substring(0, 100)}...`
        : issue.body
      : 'No description provided.';


    issueElement.innerHTML = `
      <div class="bug-header">
        ${icon}
        <h3>${issue.title}</h3>
      </div>
      <div class="bug-body">
      <p><strong>Tags:</strong>
        ${labels}</p>
        <p class="bug-description">${description}</p>
      </div>
      <div class="bug-footer">
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>State:</strong> <span class="bug-state ${iconColor}">${issue.state}</span></p>
        <p><strong>Assignee:</strong> ${assignee}</p>
      </div>
    `;

    container.appendChild(issueElement);
  });
}

fetchIssues();
