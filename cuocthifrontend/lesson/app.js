window.onload = function () {
  const navBlock = document.querySelector('.nav.nav.grid.wide');
  // Sự kiện kéo thanh scroll
  document.onscroll = function (e) {
    if (window.scrollY > 0) {
      navBlock.classList.add('active');
    } else {
      navBlock.classList.remove('active');
    }
  };
  const menuBtn = document.querySelector('.nav__icon > i');
  const btnCloseMenu = document.querySelector('.aside__icon > i');
  const listMenu = document.querySelectorAll('.aside__item');
  const menuBlock = document.querySelector('aside');
  // Mở menu
  menuBtn.onclick = function () {
    menuBlock.classList.add('active');
  };
  // ĐÓng menu
  btnCloseMenu.onclick = function () {
    menuBlock.classList.remove('active');
  };
  // Click thanh điều hướng
  listMenu.forEach(function (item) {
    item.onclick = function () {
      menuBlock.classList.remove('active');
    };
  });
};
$(document).ready(function () {
  $('.member__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: false,
  });

  $('.learn__list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: false,
  });
});
