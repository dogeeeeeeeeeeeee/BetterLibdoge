let notificationCounter = 0;

function showNotification(message) {
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.zIndex = '1000000';
    document.body.appendChild(container);
  }

  notificationCounter++;
  const notificationId = `notification-${notificationCounter}`;

  const notification = document.createElement('div');
  notification.id = notificationId;
  notification.innerText = message;
  notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
  notification.style.color = '#fff';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.opacity = '1';
  notification.style.transition = 'opacity 0.5s ease';

  container.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentElement) {
        container.removeChild(notification);
      }
      if (container.children.length === 0) {
        document.body.removeChild(container);
      }
    }, 500);
  }, 2000);
}

function keybinds(e, controller) {
  switch (e.key) {
    case '+':
    case '=':
      e.preventDefault();
      controller.buyDoge();
      showNotification('Doge Bought!');
      break;
    case '-':
      if (controller.getDoges().length === 0) return;
      e.preventDefault();
      controller.sellDoge();
      showNotification('Doge Sold!');
      break;
    default:
      break;
  }
}

function bindKeyEvents(controller) {
  if (!controller) throw new Error("No controller passed to bindKeyEvents()");
  document.addEventListener('keydown', (e) => keybinds(e, controller));
}

export { showNotification, bindKeyEvents };
