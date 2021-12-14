function removeAD() {
  const node = document.querySelector('.feature');
  node && node.remove();
}

function modifyWidth() {
  const node = document.querySelector('.main-content-container');
  node && (node.style.minWidth = 'fit-content');
}

let timer;

function executer() {
  clearTimeout(timer);
  removeAD();
  modifyWidth();
  timer = setTimeout(executer, 1000);
}

(function init() {
  executer();
})();
