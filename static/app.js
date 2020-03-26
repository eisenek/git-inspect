import repoHandler from './repo-handler.js';

document.addEventListener('DOMContentLoaded', callback);

function callback() {
  const repoElements = document.getElementsByTagName('repos');
  if (repoElements.length > 0) {
    [...repoElements].map((repo) => repoHandler(repo));
  }
}
