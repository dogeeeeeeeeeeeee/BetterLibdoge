import { extractMeta } from './extractMeta.js';
import { extractContent } from './extractContent.js';
import { getDictionary, saveDictionary, mergeDictionaries } from './dictionaryStore.js';
import { buildSentence } from './sentenceBuilder.js';

export const dataminer = (() => {
  const meta = extractMeta();
  const content = extractContent();

  const newDict = { meta, content };
  const existingDict = getDictionary();
  const merged = mergeDictionaries(newDict, existingDict);
  saveDictionary(merged);

  return {
    getSentence: buildSentence
  };
})();
