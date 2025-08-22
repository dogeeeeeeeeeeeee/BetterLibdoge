import controller from './controller.js';
import { bindKeyEvents } from './keybinds.js';
import './dataminer.js'; // It initializes itself, no exports needed

function init() {
  console.log("Starting Doge invasion...");

  // Start with one Doge just to spice things up
  controller.buyDoge();

  // Bind keys: + to buy, - to sell
  bindKeyEvents(controller);
}

document.addEventListener('DOMContentLoaded', init);