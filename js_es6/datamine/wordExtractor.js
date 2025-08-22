import { presetWords } from './constants.js';
import { filterWords } from './filterWords.js';

export function extractMeta() {
  const strings = [document.title.trim()];
  const metaTags = document.getElementsByTagName('meta');

  Array.from(metaTags).forEach(tag => {
    if (['keywords', 'description', 'author'].includes(tag.name) && tag.content) {
      strings.push(tag.content.trim());
    }
  });

  const words = unescape(strings.join(' ').toLowerCase())
    .replace(/\W/g, ' ')
    .split(/[\s\/]+/g)
    .concat(presetWords);

  return filterWords(words);
}

export function extractContent() {
  const content = document.createElement('div');
  content.innerHTML = document.body.innerHTML.replace(/>/g, '> ');

  ['script', 'style'].forEach(tag => {
    const elements = content.getElementsByTagName(tag);
    while (elements.length) {
      elements[0].parentElement.removeChild(elements[0]);
    }
  });

  const words = unescape(content.textContent.toLowerCase().trim())
    .replace(/\W/g, ' ')
    .split(/[\s\/]+/g);

  return filterWords(words);
}
