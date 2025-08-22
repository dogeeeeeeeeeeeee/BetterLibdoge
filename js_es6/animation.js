const animation = (() => {
  const FRAME_RATE = 60; // For reference; not directly used with rAF
  const STEP_SIZE = 2;

  function fadeOut(id, opacity = 1) {
    const element = document.getElementById(id);
    if (!element) return;

    opacity = Math.max(0, Math.min(1, opacity));
    element.style.opacity = opacity;

    if (opacity > 0) {
      requestAnimationFrame(() => fadeOut(id, opacity - 0.05));
    } else {
      element.remove();
    }
  }

  function move(doge, dx, dy, distance, onDone) {
    if (distance <= 0) {
      if (onDone) onDone();
      return;
    }

    const figure = doge.getFigure();
    const left = parseInt(figure.style.left || '0', 10);
    const bottom = parseInt(figure.style.bottom || '0', 10);

    figure.style.left = (left + dx) + 'px';
    figure.style.bottom = (bottom + dy) + 'px';

    requestAnimationFrame(() => move(doge, dx, dy, distance - STEP_SIZE, onDone));
  }

  function run(doge, distance, callback) {
    const dir = doge.getDirection();
    const side = doge.getLocation().side;
    
    // Very basic directional mapping
    const vectors = {
      right: { dx: 1, dy: 0 },
      left: { dx: -1, dy: 0 }
    };

    const vector = vectors[dir] || { dx: 0, dy: 0 };
    move(doge, vector.dx * STEP_SIZE, vector.dy * STEP_SIZE, distance, callback);
  }

  function slide(doge, vector, endCondition, callback) {
    const figure = doge.getFigure();
    const styleLeft = parseInt(figure.style.left || '0', 10);
    const styleBottom = parseInt(figure.style.bottom || '0', 10);

    figure.style.left = (styleLeft + vector.dx) + 'px';
    figure.style.bottom = (styleBottom + vector.dy) + 'px';

    if (!endCondition(figure)) {
      requestAnimationFrame(() => slide(doge, vector, endCondition, callback));
    } else {
      if (callback) callback();
    }
  }

  function hide(doge, callback) {
    const side = doge.getLocation().side;
    const figure = doge.getFigure();

    const vectors = {
      bottom: { dx: 0, dy: -1, done: (el) => parseInt(el.style.bottom) <= -el.clientHeight },
      right: { dx: 1, dy: 0, done: (el) => parseInt(el.style.left) >= window.innerWidth },
      top: { dx: 0, dy: 1, done: (el) => parseInt(el.style.bottom) >= window.innerHeight },
      left: { dx: -1, dy: 0, done: (el) => parseInt(el.style.left) <= -el.clientHeight }
    };

    const v = vectors[side];
    if (v) slide(doge, { dx: v.dx, dy: v.dy }, v.done, callback);
  }

  function ambush(doge, callback) {
    const side = doge.getLocation().side;
    const figure = doge.getFigure();

    const vectors = {
      bottom: { dx: 0, dy: 1, done: (el) => parseInt(el.style.bottom) >= 0 },
      right: { dx: -1, dy: 0, done: (el) => parseInt(el.style.left) <= window.innerWidth - el.clientHeight },
      top: { dx: 0, dy: -1, done: (el) => parseInt(el.style.bottom) <= window.innerHeight - el.clientHeight },
      left: { dx: 1, dy: 0, done: (el) => parseInt(el.style.left) >= 0 }
    };

    const v = vectors[side];
    if (v) slide(doge, { dx: v.dx, dy: v.dy }, v.done, callback);
  }

  return {
    fadeOut,
    run,
    hide,
    ambush
  };
})();
