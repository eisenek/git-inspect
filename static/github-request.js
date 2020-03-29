
async function githubRequest({ user, update }) {
  const url = `/api/repos/list?user=${user}&updated=${update}`;
  try {
    const data = await (await fetch(url)).json();
    return data;
  } catch (err) {
    return false;
  }
}

export default githubRequest;
