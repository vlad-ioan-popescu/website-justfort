/************ JS functions for JUST FORT *********/
///////////////////////////////////////

'use strict';

///////////////////////////////////////
/****** TIMER AND THEME SWITCH ****/
///////////////////////////////////////

const DAWN = '07:00';
const DUSK = '21:00';
const timeHTML = document.getElementById('time-js');
const btnSun = document.querySelector('#icon-sun');
const btnMoon = document.querySelector('#icon-moon');
const btnSwitch = document.querySelector('#switch');
const mainLogo = document.getElementById('main-logo');
const mainLogoSmall = document.getElementById('main-logo-small');
const darkThemeCSS = document.getElementById('dark-theme');
const state = {
	nightTime: false,
	manualSwitch: false,
};

setInterval(digitalClock, 1000);

/****** timp real  */
function digitalClock() {
	// get the date
	const d = new Date();
	let hours = d.getHours().toString().padStart(2, '0');
	// let hours = addZero(d.getHours());
	let minutes = d.getMinutes().toString().padStart(2, '0');
	const currentTime = `${hours}:${minutes}`;
	timeHTML.innerHTML = currentTime;

	// manual switch guard
	if (state.manualSwitch) return;

	// if no manual switch, set night and day according to clock
	if (currentTime <= DAWN || currentTime >= DUSK) setNightTime();
	else setDayTime();
}

// toggle theme on button switch and icon clicks
btnSwitch.addEventListener('click', function () {
	state.manualSwitch = true;
	toggleTime();
});
btnSun.addEventListener('click', function () {
	state.manualSwitch = true;
	setDayTime();
});
btnMoon.addEventListener('click', function () {
	state.manualSwitch = true;
	setNightTime();
});

/******** functions */
function toggleTime() {
	state.nightTime ? setDayTime() : setNightTime();
}

function setDayTime() {
	state.nightTime = false;
	btnSwitch.checked = true;
	darkThemeCSS.href = '';
	if (mainLogo.src !== 'src/img/logo-light.png')
		mainLogo.src !== 'src/img/logo-light.png';
	if (mainLogo.src !== 'src/img/logo-light-small.png')
		mainLogo.src !== 'src/img/logo-light-small.png';
}

function setNightTime() {
	state.nightTime = true;
	btnSwitch.checked = false;
	if (darkThemeCSS.getAttribute('href') !== 'src/css/dark.css')
		darkThemeCSS.href = 'src/css/dark.css';
	if (mainLogo.src !== 'src/img/logo-dark.png')
		mainLogo.src !== 'src/img/logo-dark.png';
	if (mainLogo.src !== 'src/img/logo-dark-small.png')
		mainLogo.src !== 'src/img/logo-dark-small.png';
}

//////////////////////////////////
//  FORM VALIDATION AND SEND
//////////////////////////////////

const form = document.querySelector('.modal__form');
const msgName = document.querySelector('.message__name');
const msgEmail = document.querySelector('.message__email');
const msgText = document.querySelector('.message__text');
const msgResponse = document.querySelector('.message__response');
const spinnerHTML = '<img src="src/img/spinner.gif" />';
let formData;
let alreadySent = false;

// input blur logic
[msgName, msgEmail, msgText].forEach(el => {
	el.addEventListener('blur', function () {
		if (this.value && validText(this.value)) {
			this.classList.remove('wrong');
		} else {
			this.classList.add('wrong');
		}
	});
});
msgEmail.addEventListener('blur', function () {
	if (validEmail(this.value)) {
		this.classList.remove('wrong');
	} else {
		this.classList.add('wrong');
	}
});

// form submit logic
form.addEventListener('submit', e => {
	e.preventDefault();
	let okFlag = true;

	if (alreadySent) {
		msgResponse.innerHTML =
			'<span class="not_ok">Ati trimis deja un mesaj. Va rugam reincarcati pagina daca doriti sa ne mai transmiteti ceva.</span>';
	}

	if (!validText(msgName.value)) {
		okFlag = false;
		msgName.classList.add('wrong');
	}

	if (!validEmail(msgEmail.value)) {
		okFlag = false;
		msgEmail.classList.add('wrong');
	}

	if (!validText(msgText.value)) {
		okFlag = false;
		msgText.classList.add('wrong');
	}

	if (okFlag && !alreadySent) {
		// send the data
		msgResponse.innerHTML = spinnerHTML;

		formData = new FormData(form);

		sendEmail();

		setTimeout(
			() =>
				(msgResponse.innerHTML =
					'<span class="ok">Am primit mailul dvs. Vom raspunde in cel mai scurt timp!</span>'),
			2000
		);
		alreadySent = true;
	}
});

// helper functions
function validEmail(email) {
	const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return pattern.test(email);
}
function validText(text) {
	return text;
}
async function sendEmail() {
	try {
		const data = await fetch('./send-email.php', {
			method: 'POST',
			body: formData,
		});
		// console.log(data, typeof data);
		// data = data || '';
		// msgResponse.innerHTML = '';
		// msgResponse.insertAdjacentHTML(
		// 	'afterbegin',
		// 	'<span class="ok">Am primit mailul dvs. Vom raspunde in cel mai scurt timp!</span>' +
		// 		data
		// );
	} catch (err) {
		msgResponse.innerHTML = `<span class="not_ok">${err.message}</span>`;
	}
}

///////////////////////////////////////
/********* HAMBURGER MENU **********/
///////////////////////////////////////

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav');
const links = document.querySelector('.js-nav-link');

hamburger.addEventListener('click', function () {
	this.classList.toggle('active');
	navMenu.classList.toggle('active');
});
navMenu.addEventListener('click', function (e) {
	if (!e.target.classList.contains('js-nav-link')) return;
	this.classList.toggle('active');
	hamburger.classList.toggle('active');
});
