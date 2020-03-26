import * as fetch from 'node-fetch';

async function listOfUserRepos(req, res, next) {
  const { user, updated } = req.query;
  const url = `https://api.github.com/users/${user}/repos`;
  const query = updated ? '?sort=updated' : '';
  try {
    const promise = await fetch(url + query);
    if (promise.ok) {
      res.status(200).send(await promise.json());
    } else {
      res.status(promise.status);
      res.send({ message: await promise.text() });
    }
  } catch (err) {
    next(err);
  }
}

export default listOfUserRepos;
