import githubRequest from './github-request.js';

async function repoHandler(repo) {
  console.log(await githubRequest(repo.dataset));
}

export default repoHandler;
