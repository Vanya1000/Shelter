import pets from "./../../assets/js/pets.js";

const buttons = document.querySelectorAll('.ripple');

buttons.forEach(button => {
	button.addEventListener('click', function (e) {
		const x = e.pageX;
		const y = e.pageY;

		const buttonTop = e.target.offsetTop//позиция  кнопки относ wrapper
		const buttonLeft = e.target.offsetLeft

		let xInside = x - buttonLeft
		const yInside = y - buttonTop

		let circle = document.createElement('span');
		circle.classList.add('circle');
		circle.style.top = yInside + 'px';
		circle.style.left = xInside + 'px';

		this.appendChild(circle);
		setTimeout(() => {
			circle.remove();
		}, 500);
	});
});

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const bodyHidden = document.body;
const logo = document.querySelector('.header__logo-and-discribe');

burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");
	menu.classList.toggle("open");
	logo.classList.toggle("header__logo-and-discribe_open-menu");
	bodyHidden.classList.toggle("menu-opened");
});

menu.addEventListener("click", function (event) {
	if (event.target.closest('.menu__item')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		logo.classList.remove("header__logo-and-discribe_open-menu");
		bodyHidden.classList.remove("menu-opened");
	}
});

document.addEventListener("click", function (event) {
	if (!event.target.closest('.header__wrapper') || event.target.closest('.header__logo-and-discribe')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		logo.classList.remove("header__logo-and-discribe_open-menu");
		bodyHidden.classList.remove("menu-opened");
	}
});




function shuffle(array) { //  Тасование Фишера — Йетса
	let shaffleArray = [...array];
	for (let i = shaffleArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[shaffleArray[i], shaffleArray[j]] = [shaffleArray[j], shaffleArray[i]];
	}
	return shaffleArray;
}

function create48ItemsPets () {
	//console.log('I work');
	let pets48 = [];
	for (let i = 0; i < 6; i++) {
		pets48.push(...shuffle(pets));
	}
	return pets48;
}

const rnd48Pets = create48ItemsPets();


const sliderItemCollection = document.querySelectorAll('.item-card');


const sliderState = {
	currentPage: 1,
	countItems: 8,
}

function getActualCollection() {
	let countItems;
	let actualCollection;
	if (window.innerWidth < 768) {
		countItems = 3;
		actualCollection = Array.from(document.querySelectorAll('.item-card')).slice(0, 3);
	} else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
		countItems = 6;
		actualCollection = Array.from(document.querySelectorAll('.item-card')).slice(0, 6);
	} else if (window.innerWidth >= 1280) {
		countItems = 8;
		actualCollection = document.querySelectorAll('.item-card');
	}
	sliderState.countItems = countItems;
	return actualCollection;
}



function setCard(currentPage, countItems, actualCollection = getActualCollection()) {
	actualCollection.forEach((item, index) => {
		let index48Arr;
		currentPage <= 1 ? index48Arr = index : index48Arr = (currentPage - 1) * countItems + index;
		item.setAttribute('index', index48Arr);// устанавливаем атрибут
		item.querySelector('img').src = rnd48Pets[index48Arr].img;
		item.querySelector('img').classList.add("animation");
		item.querySelector('img').addEventListener('animationend', () => {
			item.querySelector('img').classList.remove("animation");
		});
		item.querySelector('.item-card__name').textContent = rnd48Pets[index48Arr].name;
	});
}

setCard(sliderState.currentPage, sliderState.countItems); // initial


const arrowFirst = document.querySelector('.our-friends__button-first');
const arrowRight = document.querySelector('.our-friends__button-right');
const arrowleft = document.querySelector('.our-friends__button-left');
const arrowLast = document.querySelector('.our-friends__button-last');
const buttonNumer = document.querySelector('.our-friends__button-number');


arrowFirst.addEventListener('click', function () {
	sliderState.currentPage = 1;
	remoteVisiblePagination();
})

arrowRight.addEventListener('click', function () {
	sliderState.currentPage++;
	remoteVisiblePagination();
})

arrowleft.addEventListener('click', function () {
	sliderState.currentPage--;;
	remoteVisiblePagination();
})

arrowLast.addEventListener('click', function () {
	sliderState.currentPage = Math.ceil(rnd48Pets.length / sliderState.countItems);
	remoteVisiblePagination();
})


function remoteVisiblePagination() {
	buttonNumer.textContent = sliderState.currentPage;
	setCard(sliderState.currentPage, sliderState.countItems);
	if (sliderState.currentPage <= 1) {
		arrowLast.classList.remove('btn-disabled');
		arrowRight.classList.remove('btn-disabled');
		arrowFirst.classList.add('btn-disabled');
		arrowleft.classList.add('btn-disabled');
	} else if (sliderState.currentPage > 1 && sliderState.currentPage < Math.ceil(rnd48Pets.length / sliderState.countItems)) {
		arrowFirst.classList.remove('btn-disabled');
		arrowleft.classList.remove('btn-disabled');
		arrowLast.classList.remove('btn-disabled');
		arrowRight.classList.remove('btn-disabled');
	} else if (sliderState.currentPage >= Math.ceil(rnd48Pets.length / sliderState.countItems)) {
		arrowFirst.classList.remove('btn-disabled');
		arrowleft.classList.remove('btn-disabled');
		arrowLast.classList.add('btn-disabled');
		arrowRight.classList.add('btn-disabled');
	}
}

function changeScreenSize() {
	sliderState.currentPage = 1;
	let actualCollection = getActualCollection();
	setCard(1, sliderState.countItems, actualCollection);
	remoteVisiblePagination()
}

window.addEventListener(`resize`, changeScreenSize);



const sliderBody = document.querySelector('.slider__item-body');

sliderBody.addEventListener("click", function (event) {
	if (event.target.closest('.item-card')) {
		let indexPets = event.target.closest('.item-card').getAttribute('index');
		createPopup(indexPets)
		console.log(indexPets);
	}
});

const pageHelp = document.querySelector('.page__popup');

function createPopup(index) {
	pageHelp.querySelector('.description__tittle').innerHTML = rnd48Pets[index].name;
	pageHelp.querySelector('.description__type').innerHTML = rnd48Pets[index].type;
	pageHelp.querySelector('.description__bread').innerHTML = rnd48Pets[index].breed;
	pageHelp.querySelector('.description__text').innerHTML = rnd48Pets[index].description;
	pageHelp.querySelector('img').src = rnd48Pets[index].img;
	pageHelp.querySelector('.description__age').innerHTML = rnd48Pets[index].age;
	pageHelp.querySelector('.description__inoculations').innerHTML = rnd48Pets[index].inoculations;
	pageHelp.querySelector('.description__diseases').innerHTML = rnd48Pets[index].diseases;
	pageHelp.querySelector('.description__parasites').innerHTML = rnd48Pets[index].parasites;
	pageHelp.classList.add("visible");
	document.body.classList.add("popup-opened");
}


pageHelp.addEventListener("click", function (event) {
	if (!event.target.closest('.popup__main') || event.target.closest('.popup__buttonX')) {
		pageHelp.classList.remove("visible");
		document.body.classList.remove("popup-opened");
	}
});