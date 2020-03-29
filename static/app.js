/* eslint-disable no-use-before-define */
import repoHandler from './repo-handler.js';

document.addEventListener('DOMContentLoaded', addObserver);

function addObserver() {
  const target = document.body;
  const config = { subtree: true, childList: true, attributes: true };
  const observer = new MutationObserver(callback);
  observer.observe(target, config);
}

function callback(mutationList) {
  // eslint-disable-next-line no-restricted-syntax
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      transformToCards();
    }
  }
}

function transformToCards() {
  const existingTags = [...getExistingTags()];
  if (existingTags && existingTags.length) {
    if (existingTags[0].firstChild) {
      document.body.appendChild(existingTags[0].firstChild);
    }
    replaceTag(existingTags[0]);
  }
}

function getExistingTags() {
  return document.body.getElementsByTagName('repos');
}

async function replaceTag(tag) {
  if (window.ongoingCall && window.ongoingCall[tag.dataset.user]) {
    return;
  }
  const resultDivTag = await repoHandler(tag.dataset);
  tag.replaceWith(resultDivTag);
}
