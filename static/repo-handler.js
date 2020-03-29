/* eslint-disable no-use-before-define */
import githubRequest from './github-request.js';

async function repoHandler({ user, update }) {
  try {
    logOngoingCall(user);
    const data = await githubRequest({ user, update });
    window.ongoingCall[user] = false;
    const divElement = buildDivElement(data);
    return divElement;
  } catch (err) {
    const message = document.createElement('span');
    message.innerText = err.message;
    return message;
  }
}

function logOngoingCall(user) {
  if (!window.ongoingCall) {
    window.ongoingCall = {};
  }
  window.ongoingCall[user] = true;
}

function buildDivElement({ tagName, dataset: { user, update }, content }) {
  const divElement = document.createElement(tagName);
  divElement.classList.add('repo-card');
  divElement.dataset.user = user;
  divElement.dataset.update = update;
  resolveDivContent(divElement, user, content);
  return divElement;
}

function resolveDivContent(divElement, owner, content) {
  divElement.innerHTML = `
  <p><span class="name">User: </span><span>${owner}</span></p>
  <div class="table"></div>
  `;
  const rows = getTable(content);
  rows.forEach((row) => divElement.lastElementChild.appendChild(row));
}

function getTable(content) {
  const head = getTableHead();

  if (content.length) {
    return [head, ...content.map(getTableRow)];
  }
  return [head, getTableRow({})];
}

function getTableRow({ repoName, description, url }) {
  if (repoName || description || url) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.innerHTML = `
  <div>${repoName || 'No name'}</div>
  <div>${description || 'No description'}</div>
  <div><a href="${url || 'javascript:void(0)'}">link</a></div>`;
    return row;
  }
  const row = document.createElement('div');
  row.classList.add('row', 'empty');
  row.innerHTML = '<div>No data for entered user and date.</div>';
  return row;
}

function getTableHead() {
  const row = document.createElement('div');
  row.classList.add('row', 'head');
  row.innerHTML = `
<div>Repo name</div>
<div>Description</div>
<div>url</div>`;
  return row;
}

export default repoHandler;
