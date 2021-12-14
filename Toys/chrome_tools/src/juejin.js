(function () {
  const mainContainer = document.querySelector('.main-container');
  const mainArea = document.querySelector('.main-container .main-area');

  let containerMaxWidth = mainContainer.offsetWidth;
  let mainAreaMaxWidth = mainArea.offsetWidth;

  const targetWidth = window.innerWidth - 500;
  const diff = targetWidth - containerMaxWidth;
  if (diff < 0) return;
  containerMaxWidth += diff;
  mainAreaMaxWidth += diff;

  mainContainer.style.maxWidth = containerMaxWidth + 'px';
  mainArea.style.maxWidth = mainAreaMaxWidth + 'px';
  mainArea.style.width = mainAreaMaxWidth + 'px';
})();
