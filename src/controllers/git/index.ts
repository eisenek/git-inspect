import * as fetch from 'node-fetch';
import IReposCard from '../../interfaces/repos_card_interface';

const passwd: string | undefined = process.env.GIT_PASSWD;
const login: string | undefined = process.env.GIT_USR;
const gitAuth: string | undefined = ((login && passwd) && (new Buffer(login + passwd)).toString('base64')) || undefined;

async function listOfUserRepos(req, res, next) {
  const { user, updated } = req.query;
  const url = `https://api.github.com/users/${user}/repos`;
  const query = updated ? '?sort=updated' : '';
  const headers = (gitAuth) && { headers: { Authorization: `Basic ${gitAuth}` } };
  try {
    const promise = await fetch(url + query, headers || null);
    if (promise.ok) {
      const result = resolveCard(await promise.json(), updated);
      res.status(200).send(result);
    } else {
      res.status(promise.status);
      res.send({ message: await promise.text() });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function resolveCard(repos, fromDate) {
  const updateDate: Date | false = resolveDate(fromDate);
  if (updateDate && repos && repos.length) {
    const result: IReposCard = {
      tagName: 'div',
      dataset: {
        user: repos[0].owner.login,
        update: fromDate,
      },
      content: repos
        .filter(
        // eslint-disable-next-line camelcase
          ({ updated_at }) => new Date(updated_at) >= updateDate,
        )
        .map(
          (repo:
            {
              url: string,
              name: string,
              description: string
            }) => ({ repoName: repo.name, description: repo.description, url: repo.url }),
        ),
    };
    return result;
  }
  return { tagName: 'div', dataSet: { user: 'Not found', update: updateDate || 'Invalid date' }, content: [{}] };
}

function resolveDate(dateInput) {
  try {
    const date = new Date(dateInput);
    if (date.toString() !== 'Invalid Date' && !isNaN(date.getTime())) {
      return date;
    }
    throw new Error('Provided date is invalid.');
  } catch (err) {
    console.log('Invalid date');
    return false;
  }
}

export default listOfUserRepos;
