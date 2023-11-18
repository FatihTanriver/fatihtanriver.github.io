document.addEventListener("DOMContentLoaded", function () {
  let langKey = localStorage.getItem("language");
  if (langKey == null) {
    changeLanguage("de");
  } else {
    changeLanguage(langKey);
  }

  let attr = document.body.getAttribute("data-theme");

  // For some browsers, `attr` is undefined; for others,
  // `attr` is false.  Check for both.
  if (typeof attr !== "undefined" && attr !== false) {
    document.getElementById("switcher-moon").style.fill = "white";
  } else {
    document.getElementById("switcher-sun").style.fill = "yellow";
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      document.querySelector("header").classList.add("shrink");
    } else {
      document.querySelector("header").classList.remove("shrink");
    }
  });

  document
    .getElementById("theme-toggle-checkbox")
    .addEventListener("change", function () {
      var switcherIndicator = document.querySelector(
        ".switcher__indicator::after"
      );

      if (this.checked) {
        document.body.setAttribute("data-theme", "night");
        document.getElementById("switcher-sun").style.fill = "none";
        document.getElementById("switcher-moon").style.fill = "white";
      } else {
        document.body.removeAttribute("data-theme");
        document.getElementById("switcher-sun").style.fill = "yellow";
        document.getElementById("switcher-moon").style.fill = "none";
      }
    });

  document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".header-logo").classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("active");
    this.classList.toggle("active");
  });

  document.querySelectorAll("nav ul li a").forEach(function (element) {
    element.addEventListener("click", function () {
      document.querySelector("nav ul").classList.remove("active");
      document.querySelector(".hamburger").classList.remove("active");
    });
  });

  document.querySelectorAll('nav a[href^="#"]').forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  let timeout;
  let isTimeoutActive = false;
  document.querySelectorAll(".navRad .mask").forEach(function (element) {
    element.addEventListener("touchstart", function (e) {
      e.preventDefault();

      document.querySelectorAll(".navRad").forEach(function (navRad) {
        navRad.classList.remove("active");
      });

      var parent = this.parentElement;
      parent.classList.toggle("active");

      // Clear the existing timeout if it's active
      if (isTimeoutActive) {
        clearTimeout(timeout);
        isTimeoutActive = false;
      }

      // Start a new timeout to close the parent element after three seconds
      timeout = setTimeout(function () {
        parent.classList.remove("active");
        isTimeoutActive = false;
      }, 3000);
      isTimeoutActive = true;
    });
  });

  // Restart the timeout if you click on any .nav-item
  document.querySelectorAll(".navRad-item").forEach(function (element) {
    element.addEventListener("click", function () {
      clearTimeout(timeout);
      isTimeoutActive = false;
      timeout = setTimeout(function () {
        document.querySelector(".navRad.active").classList.remove("active");
      }, 3000);
    });
  });

  document
    .querySelector(".navRad.left-bottom .navRad-item")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var t = this.getAttribute("href").replace("#", "");
      document.querySelector(".html").classList.remove("visible");
      document.querySelector(".html." + t).classList.add("visible");
      document.querySelector(".navRad.left-bottom").classList.toggle("active");
      clearTimeout(timeout);
    });

  /* Timeline */
  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  function callbackFunc() {
    items.forEach(function (item) {
      if (isElementInViewport(item)) {
        item.classList.add("in-view");
      }
    });
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
  /* Timeline */

  /* Start Choronology */
  document.querySelectorAll(".target, .menu").forEach(function (element) {
    element.addEventListener("click", function () {
      let clickedId = this.id;

      document.querySelector(".menu").style.display = "none";
      if (clickedId == "") {
        return;
      }

      document
        .querySelectorAll(".overlay-info")
        .forEach(function (overlayInfo) {
          overlayInfo.classList.remove("d-block");
        });

      let overlaySel = `.${clickedId.replace("radial", "overlay")}`;

      document.querySelector(overlaySel).classList.add("d-block");
    });
  });
  /* End Choronology */

  /* Start Contact */
  document
    .querySelectorAll(".contact-direct .form-control label")
    .forEach(function (label) {
      var text = label.textContent;
      var letters = text.split("").map(function (letter, idx) {
        return `<span style="transition-delay:${idx * 50}ms">${letter}</span>`;
      });
      label.innerHTML = letters.join("");
    });
  /* End Contact */
});

let langFlags = {
  tr: "images/flags/star-turkey.png",
  de: "images/flags/star-germany.png",
  es: "images/flags/star-spain.png",
  en: "images/flags/star-usa.png",
};

/* Start Language Translation */
function changeLanguage(langKey) {
  document.querySelector("#language-button img").src = langFlags[langKey];

  setLanguage(langKey);
  language = localStorage.getItem("language");
  var jsonUrl = "";

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    jsonUrl =
      window.location.origin +
      "/language/" +
      localStorage.getItem("language") +
      ".json";
  } else {
    jsonUrl =
      window.location.origin +
      window.location.pathname +
      "language/" +
      localStorage.getItem("language") +
      ".json";
  }

  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", jsonUrl, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // File exists
      } else {
        console.log("The file does not exist.");
        jsonUrl =
          window.location.origin +
          window.location.pathname +
          "language/" +
          localStorage.getItem("language") +
          ".json";
      }
    }
  };
  xhr.send();

  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", jsonUrl, false);
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4) {
      if (xhr2.status === 200) {
        var lang = JSON.parse(xhr2.responseText);
        language = lang;
      }
    }
  };
  xhr2.send();

  updateTranslations();

  document.querySelectorAll(".site-language img").forEach(function (img) {
    img.style.opacity = "0.5";
  });
  // document.querySelector(`.icon-${langKey} img`).style.opacity = "1";
}

function setLanguage(lang) {
  localStorage.setItem("language", lang);
}

function updateTranslations() {
  var newVal = language.date;
  document.querySelector("[data-lang=navigation_text_1]").textContent =
    language.navigation_text_1;
  document.querySelector("[data-lang=navigation_text_2]").textContent =
    language.navigation_text_2;
  document.querySelector("[data-lang=navigation_text_3]").textContent =
    language.navigation_text_3;
  document.querySelector("[data-lang=navigation_text_4]").textContent =
    language.navigation_text_4;
  document.querySelector("[data-lang=navigation_text_5]").textContent =
    language.navigation_text_5;
  document.querySelector("[data-lang=hero_text_1]").textContent =
    language.hero_text_1;
  document.querySelector("[data-lang=timeline_entity_name_1]").textContent =
    language.timeline_entity_name_1;
  document.querySelector("[data-lang=timeline_entity_name_2]").textContent =
    language.timeline_entity_name_2;
  document.querySelector("[data-lang=timeline_entity_name_3]").textContent =
    language.timeline_entity_name_3;
  document.querySelector("[data-lang=timeline_entity_name_4]").textContent =
    language.timeline_entity_name_4;
  document.querySelector("[data-lang=timeline_entity_name_5]").textContent =
    language.timeline_entity_name_5;
  document.querySelector("[data-lang=timeline_entity_name_6]").textContent =
    language.timeline_entity_name_6;
  document.querySelector("[data-lang=timeline_entity_name_7]").textContent =
    language.timeline_entity_name_7;
  document.querySelector("[data-lang=timeline_entity_name_8]").textContent =
    language.timeline_entity_name_8;
  document.querySelector("[data-lang=timeline_entity_desc_1]").textContent =
    language.timeline_entity_desc_1;
  document.querySelector("[data-lang=timeline_entity_desc_2]").textContent =
    language.timeline_entity_desc_2;
  document.querySelector("[data-lang=timeline_entity_desc_3]").textContent =
    language.timeline_entity_desc_3;
  document.querySelector("[data-lang=timeline_entity_desc_4]").textContent =
    language.timeline_entity_desc_4;
  document.querySelector("[data-lang=timeline_entity_desc_5]").textContent =
    language.timeline_entity_desc_5;
  document.querySelector("[data-lang=timeline_entity_desc_6]").textContent =
    language.timeline_entity_desc_6;
  document.querySelector("[data-lang=timeline_entity_desc_7]").textContent =
    language.timeline_entity_desc_7;
  document.querySelector("[data-lang=timeline_entity_desc_8]").textContent =
    language.timeline_entity_desc_8;
}
/* End Language Translation */

/* Start Color Palette */
function changePalette(newClass, button) {
  document.body.classList.remove("palette-1", "palette-2", "palette-3");
  document.body.classList.add(newClass);

  document
    .querySelectorAll(".theme-pie-chart-container")
    .forEach(function (element) {
      element.classList.remove("active");
    });

  button.classList.add("active");
}
/* End Color Palette */
