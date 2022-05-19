$(document).ready(function () {
  // Parallax Service
  $(".service-image").parallaxBackground({
    event: "mouse_move",
    animation_type: "shift",
    animate_duration: 2,
  });
  // Project Dropdown
  let dropDownClick = $(".dropdown-select");
  let dropDownList = $(".dropdown-list");
  let itemCurr = $(".dropdown-select .dropdown-link");
  dropDownClick.on("click ", (event) => {
    event.stopPropagation();
    dropDownList.toggleClass("active");
    dropDownClick.toggleClass("active");
  });

  dropDownList.children().each(function () {
    $(this).on("click", () => {
      let tmp = itemCurr.text();
      dropDownClick.children().text($(this).text());
      $(this).html(tmp);
    });
  });
  //Hamburger icon event
  let btnBurger = $(".header-mobi-left .button-burger");
  btnBurger.on("click", function () {
    btnBurger.addClass("open");
  });
  //Fixed Menu Top
  let height_button_cover = $(".headerbtn");
  let header_nav = $(".header-nav");
  let header_default = $(".header-default");
  $(window).on("scroll", function (e) {
    let positionScroll = $(window).scrollTop();

    let position =
      height_button_cover.outerHeight() + height_button_cover.offset().top;
    if (positionScroll >= position) {
      header_nav.addClass("active");
      header_default.addClass("active");
    } else {
      header_nav.removeClass("active");
      header_default.removeClass("active");
    }
  });
  // Back to top
  let backtop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  $(".backtotop").on("click", function () {
    backtop();
  });
  // Hover nav side menu
  let itemBtn = $(".nav-bottom-item li");
  itemBtn.each(function (index, element) {
    $(element).on({
      mouseenter: function () {
        $(this).siblings().addClass("active");
        $(this).addClass("underline");
      },
      mouseleave: function () {
        $(this).siblings().removeClass("active");
        $(this).removeClass("underline");
      },
    });
  });
  //Hover Login
  $(".nav-top .nav-icon-login, .nav-login").hover(function () {
    $(".nav-login").toggleClass("active");
  });
  //Open nav side menu
  let openNav = $(".headerbtn");
  let sideMenu = $(".nav");
  let bgnav = $(".nav-background");
  let openBurger = $(".button-burger");
  let bod = $("body");
  openNav.add(openBurger).on("click", () => {
    sideMenu.addClass("active");
    bgnav.addClass("active");
    $(".main-slider").addClass("active");
    $("main").addClass("active");
    backtop();
    bod.addClass("hidden");
  });
  //Close nav side menu
  let closeNav = $(".nav-bottom-x");
  let navBottomItem = $(".nav-bottom-item li");
  let navTopItem = $(".nav-top-item, .nav-top-item a");

  let close = () => {
    sideMenu.removeClass("active");
    bgnav.removeClass("active");
    btnBurger.removeClass("open");
    $(".main-slider").removeClass("active");
    $("main").removeClass("active");
    bod.removeClass("hidden");
  };
  closeNav
    .add(bgnav)
    .add(navBottomItem)
    .add(navTopItem)
    .on("click", function () {
      close();
    });
  $(window).on("resize", () => {
    close();
  });

  // Parallax Slider
  // Params
  let mainSliderSelector = ".main-slider",
    interleaveOffset = 0.5;
  // Main Slider
  let mainSliderOptions = {
    loop: true,
    speed: 1000,
    watchOverflow: true,
    // autoplay: {
    //   delay: 4000,
    // },
    loopAdditionalSlides: 10,
    grabCursor: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        this.autoplay.stop();
      },
      imagesReady: function () {
        this.el.classList.remove("loading");
        this.autoplay.start();
      },
      slideChangeTransitionStart: function () {
        let caption = $(".slide-textbox-title"),
          line = $(".line"),
          desc = $(".slide-textbox-desc"),
          slideLine = $(".slide-line"),
          slideMouse = $(".slide-mouse"),
          slideButton = $(".slide-button"),
          slideText = $(".slide-text");
        caption.add(slideText).add(slideButton).removeClass("fadeUp");
        line.removeClass("animation-line");
        desc.add(slideMouse).add(slideLine).removeClass("fadeDown");
      },
      slideChangeTransitionEnd: function () {
        let caption = $(".slide-textbox-title"),
          line = $(".line"),
          desc = $(".slide-textbox-desc"),
          slideLine = $(".slide-line"),
          slideMouse = $(".slide-mouse"),
          slideButton = $(".slide-button"),
          slideText = $(".slide-text");
        caption.add(slideText).add(slideButton).addClass("fadeUp");
        line.addClass("animation-line");
        desc.add(slideMouse).add(slideLine).addClass("fadeDown");
      },
      progress: function () {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          let slideProgress = swiper.slides[i].progress,
            innerOffset = swiper.width * interleaveOffset,
            innerTranslate = slideProgress * innerOffset;

          swiper.slides[i].querySelector(".slide-bgimg").style.transform =
            "translateX(" + innerTranslate + "px)";
        }
      },
      touchStart: function () {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function (speed) {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-bgimg").style.transition =
            speed + "ms";
        }
      },
    },
  };
  let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
  //gallery product item
  options = {
    contain: true,
    wrapAround: true,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    draggable: false,
    prevNextButtons: true,
  };
  options1 = {
    contain: true,
    cellAlign: "left",
    pageDots: false,
    prevNextButtons: false,
    draggable: false,
    prevNextButtons: true,
  };
  if (matchMedia("screen and (max-width: 992px)").matches) {
    options.draggable = true;
    options.prevNextButtons = false;
    options1.draggable = true;
    options1.prevNextButtons = false;
  }
  $(".gallery-item-bottom").flickity(options);
  $(".product-show-image").flickity({
    contain: true,
    pageDots: false,
    fullscreen: true,
    draggable: true,
    prevNextButtons: false,
    selectedAttraction: 0.01,
    friction: 0.15,
  });
  // slider product detail
  $(".product-show-zoom").on("click", () => {
    $(".product-show-image").flickity("viewFullscreen");
  });
  $(".control-prev").on("click", () => {
    $(".product-show-image").flickity("previous");
  });
  $(".control-next").on("click", () => {
    $(".product-show-image").flickity("next");
  });

  // Carousel More

  let sumCarousel = $(".carousel-more").flickity(options1);
  let $progressBar = $(".progress");
  sumCarousel.on("scroll.flickity", function (event, progress) {
    progress = Math.max(0, Math.min(1, progress));
    $progressBar.width(progress * 100 + "%");
  });
  //windows
  $(document).on("click", () => {
    dropDownList.removeClass("active");
  });
  // Login
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
});
