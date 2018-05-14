'use strict';

// Variables
const canvas = document.querySelector('#canvas'),
	  ctx    = canvas.getContext('2d'),
	  numA   = document.querySelector('.num-a'),
	  numB   = document.querySelector('.num-b'),
	  answer = document.querySelector('.answer'),
	  arcA   = document.querySelector('.arc-a'),
	  arcB   = document.querySelector('.arc-b'),
	  repeat = document.querySelector('.repeat'),
	  x0     = 38, 	//origin 
	  y0     = 137, //origin
	  delta  = 38.7, //Scale division
	  aMin   = 6,  //a Є [6, 9] 
	  aMax   = 9,
	  sumMin = 11, //sum Є [11, 14]
	  sumMax = 14 

let a,  //First number
	b,	//Second number
	sum,//Sum of numbers
	l1, //Length of the first segment
	l2; //Length of the second segment

//canva settings
ctx.strokeStyle = 'magenta';
ctx.fillStyle = 'magenta';




// Functions
function start() {
	// get new data
	a 	= Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
	b 	= Math.floor(Math.random() * ((sumMax - a)  - (sumMin - a) + 1)) + (sumMin - a);
	sum = a + b;
	l1 = a * delta;
	l2 = b * delta;

	//reset task numbers
	numA.innerHTML = a;
	numB.innerHTML = b;

	// reset answer
	answer.type = 'text';
	answer.value = '?';
	answer.disabled = true;

	//set first arcs number
	arcA.value = '';
	arcA.disabled = false;
	arcA.setAttribute('style', `left: ${x0 + l1/2}px; top: ${y0 - l1/4}px;`);

	//draw first arc
	drawArc(x0, l1);

	//set second arcs number
	arcB.value = '';
	arcB.disabled = true;
	arcB.setAttribute('style', `left: ${x0 + l1 + l2/2}px; top: ${y0 - l2/4}px;`);

	//hide repeat button
	repeat.disabled = true;

	// clear canvas
	ctx.clearRect(0,0, canvas.width, canvas.height);
	arcA.focus();
} 


//Function for draw arcs
function drawArc(xStart, l) {
	let clearX = xStart;

	let drawInterval = setInterval(function () {
		ctx.beginPath();
		ctx.moveTo(xStart, y0);
		ctx.quadraticCurveTo(xStart + l/2, y0 - l/2, xStart + l, y0);
		ctx.stroke();
		ctx.closePath();
		ctx.clearRect(clearX, 0, canvas.width, canvas.height);

		if (clearX >= l + xStart) {
			ctx.beginPath();
			ctx.moveTo(xStart + l - 10, y0 - 5);
			ctx.lineTo(xStart + l, y0);
			ctx.lineTo(xStart + l - 5, y0 - 10);
			ctx.stroke();
			clearInterval(drawInterval);
		}

		clearX += l/20;
	}, 15)	
}

// Function for checking inputs 
function check(e, value, cbRight, cbWrong) {
	if (e.target.value == value) {
		e.target.disabled = true;
		e.target.style.color = 'black';
		return cbRight()
	} else {
		e.target.style.color = 'red';
		return cbWrong()
	}
}

//Adding listeners
arcA.addEventListener('keyup', (e) => check(e, a, () => {
	//right answer
	drawArc(x0 + l1, l2)
	numA.style.background = 'none';
	arcB.disabled = false;
	arcB.focus();
}, () => {
	//wrong answer
	numA.style.background = 'orange';
}));


arcB.addEventListener('keyup', (e) => check(e, b, () => {
	//right answer
	numB.style.background = 'none';
	answer.disabled = false;
	answer.type = 'number';
	answer.value = '';
	answer.focus();
}, 
() => {
	//wrong answer
	numB.style.background = 'orange';
}))

answer.addEventListener('keyup', (e) => check(e, sum, () => {
//right answer
	repeat.disabled = false;
	repeat.focus();
}, () => {
//wrong answer
}))

repeat.addEventListener('keypress', start);


// Start first task
start()