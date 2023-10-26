$(document).ready(function () {
  let langKey = localStorage.getItem("language");
  if (langKey == null) {
    changeLanguage("de");
  } else {
    changeLanguage(langKey);
  }

  let attr = $("body").attr("data-theme");

  // For some browsers, `attr` is undefined; for others,
  // `attr` is false.  Check for both.
  if (typeof attr !== "undefined" && attr !== false) {
    $("#switcher-moon").css("fill", "white");
  } else {
    $("#switcher-sun").css("fill", "yellow");
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("shrink");
    } else {
      $("header").removeClass("shrink");
    }
  });

  $("#theme-toggle-checkbox").change(function () {
    var switcherIndicator = $(".switcher__indicator::after");

    if ($(this).is(":checked")) {
      $("body").attr("data-theme", "night");
      $("#switcher-sun").css("fill", "none");
      $("#switcher-moon").css("fill", "white");
    } else {
      $("body").removeAttr("data-theme");
      $("#switcher-sun").css("fill", "yellow");
      $("#switcher-moon").css("fill", "none");
    }
  });

  $(".hamburger").click(function () {
    $("nav ul").toggleClass("active");
    $(this).toggleClass("active"); // Added this line
  });

  $("nav ul li a").click(function () {
    $("nav ul").removeClass("active");
    $(".hamburger").removeClass("active"); // Added this line
  });

  $('nav a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = $("#" + targetId);

    if (targetElement.length) {
      $("html, body").animate(
        {
          scrollTop: targetElement.offset().top,
        },
        800
      ); // Adjust the duration as needed for the desired scroll speed
    }
  });

  let timeout;
  let isTimeoutActive = false;
  $(".navRad .mask").on("touchstart click", function (e) {
    e.preventDefault();

    $(".navRad").removeClass("active"); // Reset any other if exists

    var $parent = $(this).parent();
    $parent.toggleClass("active");

    // Clear the existing timeout if it's active
    if (isTimeoutActive) {
      clearTimeout(timeout);
      isTimeoutActive = false;
    }

    // Start a new timeout to close the parent element after three seconds
    timeout = setTimeout(function () {
      $parent.removeClass("active");
      isTimeoutActive = false;
    }, 3000);
    isTimeoutActive = true;
  });

  // Restart the timeout if you click on any .nav-item
  $(".navRad-item").on("touchstart click", function () {
    clearTimeout(timeout);
    isTimeoutActive = false;
    timeout = setTimeout(function () {
      // Code to remove "active" class from parent here
      $(".navRad.active").removeClass("active");
    }, 3000);
  });

  $(".navRad.left-bottom .nav-item").on("click", function (e) {
    e.preventDefault();
    var t = $(this).attr("href").replace("#", "");
    $(".html").removeClass("visible");
    $(".html." + t).addClass("visible");
    $(".navRad.left-bottom").toggleClass("active");
    clearTimeout(timeout);
  });

  /* Timeline */
  // define variables
  var $items = $(".timeline li");

  // check if an element is in viewport
  function isElementInViewport($el) {
    var rect = $el[0].getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= $(window).height() &&
      rect.right <= $(window).width()
    );
  }

  function callbackFunc() {
    $items.each(function () {
      if (isElementInViewport($(this))) {
        $(this).addClass("in-view");
      }
    });
  }

  // listen for events
  $(window).on("load", callbackFunc);
  $(window).on("resize", callbackFunc);
  $(window).on("scroll", callbackFunc);
  /* Timeline */
});

/*Start Language Translation*/
function changeLanguage(langKey) {
  //localStorage.getItem("language") == null ? setLanguage(langKey) : false;
  setLanguage(langKey);
  language = localStorage.getItem("language");
  var jsonUrl = "";

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    //'http://localhost:5500/language/de.json'
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

  $.ajax({
    url: jsonUrl,
    type: "HEAD",
    error: function () {
      console.log("The file does not exist.");
      jsonUrl =
        window.location.origin +
        window.location.pathname +
        "language/" +
        localStorage.getItem("language") +
        ".json";
    },
    success: function () {
      // console.log("The file exists.");
    },
  });

  $.ajax({
    url: jsonUrl,
    dataType: "json",
    async: false,
    dataType: "json",
    success: function (lang) {
      language = lang;
    },
  });

  updateTranslations();

  $(".site-language img").css("opacity", "0.5");
  $(`.icon-${langKey} img`).css("opacity", "1");
}

function setLanguage(lang) {
  localStorage.setItem("language", lang);
}

function updateTranslations() {
  //language = localStorage.getItem("language");
  var newVal = language.date;
  $("[data-lang=navigation_text_1]").text(language.navigation_text_1);
  $("[data-lang=navigation_text_2]").text(language.navigation_text_2);
  $("[data-lang=navigation_text_3]").text(language.navigation_text_3);
  $("[data-lang=navigation_text_4]").text(language.navigation_text_4);
  $("[data-lang=navigation_text_5]").text(language.navigation_text_5);
  $("[data-lang=hero_text_1]").text(language.hero_text_1);
}
/*End Language Translation*/

/*Start Color Palette*/

function changePalette(newClass) {
  $("body").removeClass("palette-1 palette-2 palette-3").addClass(newClass);
}

/*End Color Palette */
