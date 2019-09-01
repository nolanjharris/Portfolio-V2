$(document).ready(function() {
  "use strict";

  //// SCROLL SPY TRIGGER
  $("body").scrollspy({
    target: ".navbar-sp",
    offset: 195
  });

  //// PRELOADER TRIGGER
  $(window).on("load", function() {
    $(".loading").animate(
      {
        top: "-100%"
      },
      700,
      function() {
        $(this).remove();
      }
    );
  });

  //// SMOTH SCROLL
  $.scrollIt({
    topOffset: 0
  });

  // Typed JS TRIGGER
  $(".header .middle-l h3 span").typed({
    strings: ["Web Developer", "Problem Solver", "Team Player"],
    loop: true,
    startDelay: 1e3,
    backDelay: 3e3
  });

  //// ISOTOPE TRIGGER
  var $grid = $(".portfolio-content").isotope({
    itemSelector: ".portfolio-item",
    stagger: 30
  });
  $(".filter-portfolio").on("click", ".button", function() {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $(".button-group").each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "a", function() {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  //// MASONRY
  $(".portfolio-content").isotope({
    itemSelector: ".portfolio-caption img",
    masonry: {
      columnWidth: 0
    }
  });

  //// MAGNIFIC POPUP TRIGGER
  $(".modal-image").magnificPopup({
    type: "inline",
    midClick: true
  });

  //// NAVBAR COLLAPSE
  var rNav = $(".right-nav"),
    hInfo = $(".home .info"),
    home = $(".home"),
    navBtn = $(".slide-nav-btn"),
    navBtnActive = "slide-nav-btn-active",
    nav = $(".slide-nav"),
    navActive = "slide-nav-active",
    rNavSpan = $(".right-nav ul li i"),
    up = $(".up i"),
    body = $("html, body");
  rNav.css("top", (home.height() - rNav.height()) / 2);
  hInfo.css("top", (home.height() - hInfo.height()) / 2);
  navBtn.on("click", function() {
    $(this).toggleClass(navBtnActive);
    nav.toggleClass(navActive);
  });

  //// PARSLEY TRIGGER
  $(".contact-forum").parsley();
});
