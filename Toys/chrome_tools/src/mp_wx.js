(function () {
  const node = document.querySelector('.rich_media_area_primary_inner');
  node && (node.style.maxWidth = 'fit-content');

  const nodeCode = document.querySelector('#js_pc_qr_code');
  nodeCode && nodeCode.remove();
})();
