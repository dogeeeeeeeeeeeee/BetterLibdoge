class DogeExtension {
  constructor() {
    this._loaded = false;
    this._loading = false;
  }

  getInfo() {
    return {
      id: 'dogeExtension',
      name: 'Doge',
      blocks: [
        {
          opcode: 'loadDoge',
          blockType: Scratch.BlockType.COMMAND,
          text: 'load doge'
        },
        {
          opcode: 'buyDoge',
          blockType: Scratch.BlockType.COMMAND,
          text: 'buy doge'
        },
        {
          opcode: 'sellDoge',
          blockType: Scratch.BlockType.COMMAND,
          text: 'sell doge'
        },
        {
          opcode: 'dogeCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'doge count'
        },
        {
          opcode: 'isLoaded',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'doge loaded?'
        }
      ]
    };
  }

  loadDoge() {
    if (this._loaded || this._loading) return;

    this._loading = true;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/dogeeeeeeeeeeeee/BetterLibdoge/embeddable.js'; // We rely on JSDelivr: reasons
    script.onload = () => {
      this._loaded = true;
      this._loading = false;
      console.log('Doge controller loaded.');
    };
    script.onerror = (e) => {
      this._loading = false;
      console.error('Failed to load Doge controller', e);
    };
    document.head.appendChild(script);
  }

  buyDoge() {
    if (typeof controller !== 'undefined') {
      controller.buyDoge();
    } else {
      console.error("controller not loaded yet! Run 'load doge' first.");
    }
  }

  sellDoge() {
    if (typeof controller !== 'undefined') {
      controller.sellDoge();
    } else {
      console.error("controller not loaded yet! Run 'load doge' first.");
    }
  }

  dogeCount() {
    if (typeof controller !== 'undefined') {
      return controller.getDoges().length;
    }
    return 0;
  }

  isLoaded() {
    return (typeof controller !== 'undefined');
  }
}

Scratch.extensions.register(new DogeExtension());
