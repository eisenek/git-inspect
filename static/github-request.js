
async function githubRequest({ user, updated }) {
  const url = `/api/repos/list?user=${user}&updated=${updated}`;
  try {
    const data = await (await fetch(url)).json();
    return data;
  } catch (err) {
    alert('Failed fetching data. Try again.');
    return false;
  }
}

export default githubRequest;
