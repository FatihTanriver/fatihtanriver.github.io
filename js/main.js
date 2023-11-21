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
    $(".header-logo").toggleClass("active");
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

  /* Start Choronology*/
  $(".target, .menu").click(function () {
    let clickedId = this.id;

    $(".menu").toggle();
    if (clickedId == "") {
      return;
    }

    $(".overlay-info").removeClass("d-block");

    let overlaySel = `.${clickedId.replace("radial", "overlay")}`;

    $(overlaySel).addClass("d-block");
  });
  /* End Choronology*/

  /*Start Contact*/

  $(".contact-direct .form-control label").each(function () {
    var $label = $(this);
    var text = $label.text();
    var letters = text.split("").map(function (letter, idx) {
      return `<span style="transition-delay:${idx * 50}ms">${letter}</span>`;
    });
    $label.html(letters.join(""));
  });

  /*End Contact*/

  /*Start Email*/

  emailjs.init("abv1oLwXi-_rYfilT");
  $("#myForm").submit(function (event) {
    event.preventDefault();

    $("#button").val("Sending...");

    const serviceID = "service_bvxjeq8";
    const templateID = "template_1hsw3jr";

    // from_name must be set to reply_to
    const replyToInput = $("#reply_to");
    const fromNameInput = $("#from_name");
    replyToInput.val(fromNameInput.val());

    const form = this; // Get a reference to the form element

    emailjs
      .sendForm(serviceID, templateID, form)
      .then(function () {
        $("#button").val("Send Email");
        createNotification("Message Send Successfully!!", "success");
      })
      .catch(function (err) {
        $("#button").val("Send Email");
        createNotification("Error while sending message", "error");
      });
  });

  /*End Email*/
});

let langFlags = {
  tr: "images/flags/star-turkey.png",
  de: "images/flags/star-germany.png",
  es: "images/flags/star-spain.png",
  en: "images/flags/star-usa.png",
};

/*Start Language Translation*/
function changeLanguage(langKey) {
  //localStorage.getItem("language") == null ? setLanguage(langKey) : false;

  $("#language-button img").attr("src", langFlags[langKey]);

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
  $("[data-lang=timeline_entity_name_1]").text(language.timeline_entity_name_1);
  $("[data-lang=timeline_entity_name_2]").text(language.timeline_entity_name_2);
  $("[data-lang=timeline_entity_name_3]").text(language.timeline_entity_name_3);
  $("[data-lang=timeline_entity_name_4]").text(language.timeline_entity_name_4);
  $("[data-lang=timeline_entity_name_5]").text(language.timeline_entity_name_5);
  $("[data-lang=timeline_entity_name_6]").text(language.timeline_entity_name_6);
  $("[data-lang=timeline_entity_name_7]").text(language.timeline_entity_name_7);
  $("[data-lang=timeline_entity_name_8]").text(language.timeline_entity_name_8);
  $("[data-lang=timeline_entity_desc_1]").text(language.timeline_entity_desc_1);
  $("[data-lang=timeline_entity_desc_2]").text(language.timeline_entity_desc_2);
  $("[data-lang=timeline_entity_desc_3]").text(language.timeline_entity_desc_3);
  $("[data-lang=timeline_entity_desc_4]").text(language.timeline_entity_desc_4);
  $("[data-lang=timeline_entity_desc_5]").text(language.timeline_entity_desc_5);
  $("[data-lang=timeline_entity_desc_6]").text(language.timeline_entity_desc_6);
  $("[data-lang=timeline_entity_desc_7]").text(language.timeline_entity_desc_7);
  $("[data-lang=timeline_entity_desc_8]").text(language.timeline_entity_desc_8);
}
/*End Language Translation*/

/*Start Color Palette*/

function changePalette(newClass, button) {
  $("body").removeClass("palette-1 palette-2 palette-3").addClass(newClass);

  $(".theme-pie-chart-container").removeClass("active");

  $(button).addClass("active");
}

/*End Color Palette */

function createNotification(message, type) {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.classList.add(type);

  notif.innerText = message;

  toasts.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 5000);
}
