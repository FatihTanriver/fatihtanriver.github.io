$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("shrink");
    } else {
      $("header").removeClass("shrink");
    }
  });

  $("#theme-toggle-btn").click(function () {
    if ($("body").attr("data-theme") === "night") {
      $("body").removeAttr("data-theme");
    } else {
      $("body").attr("data-theme", "night");
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

  $(".navRad .mask").on("touchstart click", function (e) {
    e.preventDefault();
    var $parent = $(this).parent();
    $parent.toggleClass("active");

    // Close the parent element with a transition after three seconds
    setTimeout(function () {
      $parent.removeClass("active");
    }, 3000);
  });

  $(".navRad.left-bottom .nav-item").on("click", function (e) {
    e.preventDefault();
    var t = $(this).attr("href").replace("#", "");
    $(".html").removeClass("visible");
    $(".html." + t).addClass("visible");
    $(".navRad.left-bottom").toggleClass("active");
    App.title($(this).text());
  });
});
