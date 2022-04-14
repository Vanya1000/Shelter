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

const sliderItemCollection = document.querySelectorAll('.item-card');
const buttonLeft = document.querySelector('.slider__button-left');
const buttonRight = document.querySelector('.slider__button-right');

const sliderState = {
	countPets: pets.length,
	prevPets: [],
	currentPets: []
}

function generateNoRepeatCard() {
	let rnd = Math.floor(Math.random() * sliderState.countPets);
	while (sliderState.currentPets.includes(rnd) || sliderState.prevPets.includes(rnd)) {
		rnd = Math.floor(Math.random() * sliderState.countPets);
	}
	return rnd;
}

function setRndAndNoRepeatCard () {
	sliderItemCollection.forEach((item, index) => {
		let rnd = generateNoRepeatCard();
		item.setAttribute('index', rnd);// устанавливаем атрибут
		item.querySelector('img').src = pets[rnd].img;
		item.querySelector('img').classList.add("animation");
		item.querySelector('img').addEventListener('animationend', () => {
			item.querySelector('img').classList.remove("animation");
		});
		item.querySelector('.item-card__name').textContent = pets[rnd].name;
		sliderState.currentPets[index] = rnd;
		if (index === 2) {sliderState.prevPets = [...sliderState.currentPets]};
	});
}

setRndAndNoRepeatCard()

buttonLeft.addEventListener('click', setRndAndNoRepeatCard);
buttonRight.addEventListener('click', setRndAndNoRepeatCard);

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
	pageHelp.querySelector('.description__tittle').innerHTML = pets[index].name;
	pageHelp.querySelector('.description__type').innerHTML = pets[index].type;
	pageHelp.querySelector('.description__bread').innerHTML = pets[index].breed;
	pageHelp.querySelector('.description__text').innerHTML = pets[index].description;
	pageHelp.querySelector('img').src = pets[index].img;
	pageHelp.querySelector('.description__age').innerHTML = pets[index].age;
	pageHelp.querySelector('.description__inoculations').innerHTML = pets[index].inoculations;
	pageHelp.querySelector('.description__diseases').innerHTML = pets[index].diseases;
	pageHelp.querySelector('.description__parasites').innerHTML = pets[index].parasites;
	pageHelp.classList.add("visible");
	document.body.classList.add("popup-opened");
}


pageHelp.addEventListener("click", function (event) {
	if (!event.target.closest('.popup__main') || event.target.closest('.popup__buttonX')) {
		pageHelp.classList.remove("visible");
		document.body.classList.remove("popup-opened");
	}
});