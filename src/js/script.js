var toggle = document.querySelector('.main__toggle');
var filter = document.querySelector('.main__filter');
var iconBar = document.querySelector('.main__toggle-icon--bar');
var iconClose = document.querySelector('.main__toggle-icon--close');

var filterToggles = Array.from(document.querySelectorAll('.filter__toggle'));

var buttonMore = document.querySelector('.filter__more');
var filterElements = Array.from(document.querySelectorAll('.filter__checkbox-item'));

var catalogButton = document.querySelector('.catalog__button');
var catalogList = Array.from(document.querySelectorAll('.catalog__item'));
var catalogLoader = document.querySelector('.catalog__loader');

var HIDDEN_CLASS = 'visually-hidden';
var HIDDEN_ELEMENTS_NUM = 3;

// Открытие и закрытие фильтра на маленьких экранах
toggle.addEventListener('click', function () {
  if (filter.classList.contains('main__filter--close')) {
    filter.classList.remove('main__filter--close');
    iconBar.classList.add(HIDDEN_CLASS);
    iconClose.classList.remove(HIDDEN_CLASS);
  } else {
    filter.classList.add('main__filter--close');
    iconBar.classList.remove(HIDDEN_CLASS);
    iconClose.classList.add(HIDDEN_CLASS);
  }
});

// Скрытие полей внутри фильтра
filterToggles.map(function (toggle) {
  toggle.addEventListener('click', function (evt) {
    var filterWrapper = evt.target.parentElement;

    if (filterWrapper.classList.contains('filter__wrapper--closed')) {
      filterWrapper.classList.remove('filter__wrapper--closed');
      toggle.classList.remove('filter__toggle--closed');
    } else {
      filterWrapper.classList.add('filter__wrapper--closed');
      toggle.classList.add('filter__toggle--closed');
    }
  })
});

// Кнопка "Показать еще"
buttonMore.addEventListener('click', function () {
  filterElements.map(function (element) {
    if (element.classList.contains('filter__checkbox-item--hidden')) {
      element.classList.remove('filter__checkbox-item--hidden');
      buttonMore.classList.add(HIDDEN_CLASS);
    }
  });
});

// Кнопка показа оставшихся блоков
catalogButton.addEventListener('click', function (evt) {
  catalogList.map(function (item) {
    item.classList.remove(HIDDEN_CLASS);
    catalogLoader.classList.add('catalog__loader--hidden');
  });
})

var hideLastCards = function () {
  catalogList.slice(-HIDDEN_ELEMENTS_NUM).map(function (item) {
    item.classList.add(HIDDEN_CLASS);
  })
};

hideLastCards();

