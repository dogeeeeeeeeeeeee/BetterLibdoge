const directions = {
  0: 'bottom',
  90: 'left',
  180: 'top',
  270: 'right'
};

const styleProperties = [
  'transform',
  'WebkitTransform',
  'msTransform',
  'MozTransform',
  'OTransform'
];

function random(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function locate(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found.`);
    return { left: 0, bottom: 0, side: 'bottom' };
  }

  const left = parseInt(element.style.left || '0', 10);
  const bottom = parseInt(element.style.bottom || '0', 10);
  const side = element.getAttribute('rel') || 'bottom';

  return { left, bottom, side };
}

function flipElement(figure, rotation) {
  if (!figure || typeof rotation !== 'number') return;

  const side = directions[rotation];
  if (!side) {
    console.warn(`Unsupported rotation: ${rotation}`);
    return;
  }

  figure.setAttribute('rel', side);
  styleProperties.forEach(prop => {
    figure.style[prop] = `rotate(${rotation}deg)`;
  });
}

export { random, locate, flipElement };