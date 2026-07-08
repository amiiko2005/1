(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var bg = document.createElement("div");
    bg.className = "page-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML =
      '<span class="orb orb-a"></span>' +
      '<span class="orb orb-b"></span>' +
      '<span class="orb orb-c"></span>';
    document.body.prepend(bg);
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
        document.body.classList.remove("nav-open");
      });
    });
  }

  function ensureMessengerModal() {
    if (document.getElementById("messenger-modal")) {
      return;
    }

    var wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<div class="messenger-modal" id="messenger-modal" hidden>' +
      '  <div class="messenger-modal-backdrop" data-messenger-close></div>' +
      '  <div class="messenger-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="messenger-modal-title">' +
      '    <h3 id="messenger-modal-title">Мессенджер</h3>' +
      '    <p class="messenger-modal-desc">Как открыть чат?</p>' +
      '    <div class="messenger-modal-actions">' +
      '      <a href="#" class="btn btn-primary" id="messenger-app" rel="noopener noreferrer">В приложении</a>' +
      '      <a href="#" class="btn btn-secondary" id="messenger-web" target="_blank" rel="noopener noreferrer">В браузере</a>' +
      "    </div>" +
      '    <button type="button" class="messenger-modal-close" data-messenger-close>Отмена</button>' +
      "  </div>" +
      "</div>";

    document.body.appendChild(wrapper.firstElementChild);
  }

  ensureMessengerModal();

  const messengerModal = document.getElementById("messenger-modal");
  if (messengerModal) {
    const modalTitle = document.getElementById("messenger-modal-title");
    const appLink = document.getElementById("messenger-app");
    const webLink = document.getElementById("messenger-web");
    let lastFocus = null;

    function openMessengerModal(name, appUrl, webUrl) {
      lastFocus = document.activeElement;
      modalTitle.textContent = name;
      appLink.href = appUrl;
      webLink.href = webUrl;
      messengerModal.hidden = false;
      document.body.style.overflow = "hidden";
      appLink.focus();
    }

    function closeMessengerModal() {
      messengerModal.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    document.querySelectorAll(".messenger-open").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openMessengerModal(
          btn.getAttribute("data-messenger-name") || "Мессенджер",
          btn.getAttribute("data-app-url") || "#",
          btn.getAttribute("data-web-url") || "#"
        );
      });
    });

    messengerModal.querySelectorAll("[data-messenger-close]").forEach(function (el) {
      el.addEventListener("click", closeMessengerModal);
    });

    appLink.addEventListener("click", function () {
      closeMessengerModal();
    });

    webLink.addEventListener("click", function () {
      closeMessengerModal();
    });

    document.addEventListener("keydown", function (e) {
      if (!messengerModal.hidden && e.key === "Escape") {
        closeMessengerModal();
      }
    });
  }

  function reachMetrikaGoal(goal) {
    var counterId = window.WEBLINE_METRIKA_ID;
    if (!counterId || typeof ym !== "function" || !goal) {
      return;
    }
    ym(counterId, "reachGoal", goal);
  }

  document.addEventListener("click", function (e) {
    var telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      reachMetrikaGoal("contact_phone");
      return;
    }

    var messengerBtn = e.target.closest(".messenger-open");
    if (messengerBtn) {
      var name = (messengerBtn.getAttribute("data-messenger-name") || "").toLowerCase();
      if (name === "telegram") {
        reachMetrikaGoal("contact_telegram");
      } else if (name === "max") {
        reachMetrikaGoal("contact_max");
      }
    }
  });
})();
