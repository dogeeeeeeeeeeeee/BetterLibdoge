import { getDictionary } from './dictionaryStore.js';
import { prefixes, suffixes } from './constants.js';
import { random } from './util.js'; // assuming you modularized your util.js


const util = {
    random: random
};

export function buildSentence() {
  const dict = getDictionary();

  if (dict.meta.length === 0 && dict.content.length === 0) {
    return "wow nothing to see here lol";
  }

  const sources = [];
  sources.push(Math.random() < 0.5 ? dict.content : dict.meta);
  if (Math.random() < 0.4) {
    sources.push(Math.random() < 0.5 ? dict.content : dict.meta);
  }

  const sentence = [prefixes[util.random(0, prefixes.length - 1)]];
  const pickedWords = [];

  sources.forEach(source => {
    const word = source[util.random(0, source.length - 1)];
    if (!pickedWords.includes(word)) pickedWords.push(word);
  });

  sentence.push(pickedWords.join(' '));

  if (Math.random() <= 0.33) {
    sentence.push(suffixes[util.random(0, suffixes.length - 1)]);
  }

  return sentence.join(' ');
}
