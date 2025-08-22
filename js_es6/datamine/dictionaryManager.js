export function getDictionary() {
  const data = localStorage.getItem('globaldictionary');
  return data ? JSON.parse(data) : { meta: [], content: [] };
}

export function saveDictionary(dictionary) {
  localStorage.setItem('globaldictionary', JSON.stringify(dictionary));
}

export function mergeDictionaries(newData, existing) {
  const mergeUnique = (src, target) => {
    src.forEach(word => {
      if (!target.includes(word)) target.push(word);
    });
  };

  mergeUnique(newData.meta, existing.meta);
  mergeUnique(newData.content, existing.content);

  return existing;
}
