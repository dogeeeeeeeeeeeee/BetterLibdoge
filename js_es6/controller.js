import { Doge } from './doge.js'

const controller = (() => {
  const doges = [];
  let name = 1;

  function buyDoge() {
    const d = new Doge(name++);
    const distance = util.random(500, 1000);
    d.run(distance);
    doges.push(d);
  }

  function sellDoge() {
    if (doges.length === 0) return;

    const d = doges.pop();
    d.escape(); // Let it vanish into the Doge-ether
  }

  function getDoges() {
    return [...doges]; // optional: return a copy to prevent external mutations
  }

  return {
    buyDoge,
    sellDoge,
    getDoges
  };
})();

export default controller;