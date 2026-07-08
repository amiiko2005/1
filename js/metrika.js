(function () {
  // Замените 0 на номер счётчика из Яндекс Метрики (только цифры).
  window.WEBLINE_METRIKA_ID = 0;

  var counterId = window.WEBLINE_METRIKA_ID;
  if (!counterId) {
    return;
  }

  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(counterId, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });

  var noscript = document.createElement("noscript");
  noscript.innerHTML =
    '<div><img src="https://mc.yandex.ru/watch/' +
    counterId +
    '" style="position:absolute;left:-9999px;" alt=""></div>';
  document.body.appendChild(noscript);
})();
