const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.header-nav');
const active = document.querySelector('.active');
const popupClose = document.querySelector('.pop-up-close-btn');
const popupWrapper = document.querySelector('.pop-up-wrapper');
const sliderItems = document.querySelector('.slider-items');
const btnLeft = document.querySelector('.btn-prev')
const btnRight = document.querySelector('.btn-next')
const logo = document.querySelector('.logo');
let sliderCards = document.querySelectorAll('.slider-item');
let scrollOffset = 0;
let cardsOffset = 0;
let cardsInPage = 0;
let lastCards = [];

burgerMenu.addEventListener('click', () => {
    openBurger();
    burgerMenu.classList.toggle('open-menu');
});

function openBurger() {
    if (!burgerMenu.classList.contains('open-menu')) {
        nav.setAttribute('style', 'right:0');
        logo.setAttribute('style', 'visibility:hidden');
        bodyScroll();
    } else {
        nav.removeAttribute('style');
        logo.removeAttribute('style');
        bodyScroll();
    }
}

function bodyScroll() {
    if (!burgerMenu.classList.contains('open-menu')) {
        document.querySelector('body').setAttribute('style', 'overflow-y:hidden')
    } else {
        document.querySelector('body').removeAttribute('style')
    }
}

window.addEventListener('resize', closeMenu);

function closeMenu() {
    document.querySelector('body').removeAttribute('style');
    burgerMenu.classList.remove('open-menu');
    nav.removeAttribute('style');
    logo.removeAttribute('style');
}

nav.addEventListener('click', (e) => {
    if (!e.target.classList.contains('ul')) {
        closeMenu()
    }
});

nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('disable-link')) {
        e.preventDefault();
        return false;
    }
});

active.addEventListener('click', () => {
    closeMenu();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// POP-UP //

sliderItems.addEventListener('click', (e) => {
    if (!e.target.classList.contains('slider-items')) {
        e = e.target;
        if (!e.classList.contains('slider-item')) {
            e = e.closest('.slider-item')
        }
        popupWrapper.setAttribute('style', 'display:flex');

        document.querySelector('.pop-up__img').setAttribute('style', `background: url(${e.querySelector('img').getAttribute('data-img')}); background-size: contain;`);
        document.querySelector('.pop-up__title').textContent = e.getAttribute('data-name');
        document.querySelector('.pop-up__sub-title').textContent = e.querySelector('.slider-item-params').getAttribute('data-type') + '-' + e.querySelector('.slider-item-params').getAttribute('data-breed');
        document.querySelector('.pop-up__text').textContent = e.querySelector('.slider-item-params').getAttribute('data-description');
        document.querySelector('.pop-up__list__age').textContent = e.querySelector('.slider-item-params').getAttribute('data-age');
        document.querySelector('.pop-up__list__inoculations').textContent = e.querySelector('.slider-item-params').getAttribute('data-inoculations');
        document.querySelector('.pop-up__list__diseases').textContent = e.querySelector('.slider-item-params').getAttribute('data-diseases');
        document.querySelector('.pop-up__list__parasites').textContent = e.querySelector('.slider-item-params').getAttribute('data-parasites');
        document.querySelector('.pop-up__list__parasites').textContent = e.querySelector('.slider-item-params').getAttribute('data-parasites');
        document.querySelector('body').setAttribute('style', 'overflow-y:hidden')
    }
});

popupClose.addEventListener('click', popupToClose);
popupWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('pop-up-wrapper')) {
        popupToClose()
    }
});


function popupToClose() {
    popupWrapper.removeAttribute('style');
    document.querySelector('body').removeAttribute('style')
}

// GET JSON //

const url = '../../assets/pets.json';
function getData(swipe) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            for (let key in lastCards) {
                showData(data[lastCards[key]], swipe)
            }
        });
}

// RANDOM CARDS

function randomize(b) {
    let array = [];
    for(let e = 0; e <= 7; e++){
        array.push(e)
    }
    array.push(...lastCards);
    array = array.filter((item) => {
        return array.indexOf(item) === array.lastIndexOf(item)
    });
    lastCards = [];
    for(let countCycles = 1; countCycles <= b; countCycles++){
        lastCards.push(...[array.splice(Math.random() * array.length, 1)[0]])
    }
}

window.addEventListener('load', function () {
    const clientWidth = document.documentElement.clientWidth;
    if (clientWidth >= 1280) {
        cardsInPage = 3;
    }
    if (1279 >= clientWidth && clientWidth >= 768) {
        cardsInPage = 2;
    }
    if (767 >= clientWidth && clientWidth >= 320) {
        cardsInPage = 1;
    }
    randomize(cardsInPage);
    getData();
});

function showData(data) {
    const divItemWrapper = document.createElement('div');
    divItemWrapper.classList.add('slider-item');
    divItemWrapper.setAttribute('data-name', `${data['name']}`);
    sliderItems.append(divItemWrapper);

    const divItemImg = document.createElement('img');
    divItemImg.src = data['img'];
    divItemImg.alt = data['name'];
    divItemImg.setAttribute('data-img', `${data['img']}`);
    document.querySelectorAll('.slider-item')[document.querySelectorAll('.slider-item').length - 1].append(divItemImg);

    const divItemName = document.createElement('div');
    divItemName.classList.add('slider-item__text');
    divItemName.textContent = data['name'];
    document.querySelectorAll('.slider-item')[document.querySelectorAll('.slider-item').length - 1].append(divItemName);

    const buttonItem = document.createElement('button');
    buttonItem.classList.add('btn-light');
    buttonItem.textContent = 'Learn more';
    document.querySelectorAll('.slider-item')[document.querySelectorAll('.slider-item').length - 1].append(buttonItem);

    const divItemParams = document.createElement('div');
    divItemParams.classList.add('slider-item-params');
    divItemParams.setAttribute('style', 'display:none');
    divItemParams.setAttribute('data-type', `${data['type']}`);
    divItemParams.setAttribute('data-breed', `${data['breed']}`);
    divItemParams.setAttribute('data-description', `${data['description']}`);
    divItemParams.setAttribute('data-age', `${data['age']}`);
    divItemParams.setAttribute('data-inoculations', `${data['inoculations']}`);
    divItemParams.setAttribute('data-diseases', `${data['diseases']}`);
    divItemParams.setAttribute('data-parasites', `${data['parasites']}`);
    document.querySelectorAll('.slider-item')[document.querySelectorAll('.slider-item').length - 1].append(divItemParams);
}


// SLIDER //

window.addEventListener('resize', setScrollOffset);
window.addEventListener('load', setScrollOffset);

function setScrollOffset() {
    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth >= 1280) {
        scrollOffset = 360;
        cardsOffset = 3;
        cardsInPage = 3;
    }
    if (1279 >= clientWidth && clientWidth >= 768) {
        scrollOffset = 310;
        cardsOffset = 2;
        cardsInPage = 2;
    }
    if (767 >= clientWidth && clientWidth >= 320) {
        scrollOffset = 310;
        cardsOffset = 1;
        cardsInPage = 1;
    }
}

function scroll(val) {
    if (val === 'prev') {
        randomize(cardsInPage);
        getDataPrev();
    }
    if (val === 'next') {
        randomize(cardsInPage);
        getData();
    }
}

window.addEventListener('resize', () => {
    for (let i = 0; i <= document.querySelectorAll('.slider-item').length; i++) {
        document.querySelectorAll('.slider-item')[0].remove();
    }
    randomize(cardsInPage);
    getData();
});

const moveRight = () => {
    scroll('next')
    sliderItems.classList.add('transition-right')
    btnLeft.removeEventListener('click', moveLeft)
    btnRight.removeEventListener('click', moveRight)
}

const moveLeft = () => {
    scroll('prev')
    sliderItems.classList.add('transition-left')
    btnLeft.removeEventListener('click', moveLeft)
    btnRight.removeEventListener('click', moveRight)
}

btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)

sliderItems.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === 'move-left') {
        sliderItems.classList.remove('transition-left');
        if (document.querySelectorAll('.slider-item').length / cardsInPage > 1) {
            for (let i = 1; i <= cardsInPage; i++) {
                document.querySelectorAll('.slider-item')[document.querySelectorAll('.slider-item').length - 1].remove();
            }
        }
    } else {
        sliderItems.classList.remove('transition-right');
        if (document.querySelectorAll('.slider-item').length / cardsInPage > 1) {
            for (let i = 1; i <= cardsInPage; i++) {
                document.querySelectorAll('.slider-item')[0].remove();
            }
        }
    }
    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);
    sliderCards = document.querySelectorAll('.slider-item')
})


// DATA PREPEND

function showDataPrev(data) {
    const divItemWrapper = document.createElement('div');
    divItemWrapper.classList.add('slider-item');
    divItemWrapper.setAttribute('data-name', `${data['name']}`);
    sliderItems.prepend(divItemWrapper);

    const divItemImg = document.createElement('img');
    divItemImg.src = data['img'];
    divItemImg.alt = data['name'];
    divItemImg.setAttribute('data-img', `${data['img']}`);
    document.querySelectorAll('.slider-item')[0].append(divItemImg);

    const divItemName = document.createElement('div');
    divItemName.classList.add('slider-item__text');
    divItemName.textContent = data['name'];
    document.querySelectorAll('.slider-item')[0].append(divItemName);

    const buttonItem = document.createElement('button');
    buttonItem.classList.add('btn-light');
    buttonItem.textContent = 'Learn more';
    document.querySelectorAll('.slider-item')[0].append(buttonItem);

    const divItemParams = document.createElement('div');
    divItemParams.classList.add('slider-item-params');
    divItemParams.setAttribute('style', 'display:none');
    divItemParams.setAttribute('data-type', `${data['type']}`);
    divItemParams.setAttribute('data-breed', `${data['breed']}`);
    divItemParams.setAttribute('data-description', `${data['description']}`);
    divItemParams.setAttribute('data-age', `${data['age']}`);
    divItemParams.setAttribute('data-inoculations', `${data['inoculations']}`);
    divItemParams.setAttribute('data-diseases', `${data['diseases']}`);
    divItemParams.setAttribute('data-parasites', `${data['parasites']}`);
    document.querySelectorAll('.slider-item')[0].append(divItemParams);
}

function getDataPrev() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            for (let key in lastCards) {
                showDataPrev(data[lastCards[key]])
            }
        });
}