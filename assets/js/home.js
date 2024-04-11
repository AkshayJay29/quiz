// nanimation front page
// code inspired from Quiz on Coagulation in Water Treatment by dhakal79
const hero = document.querySelector('.hero');
const headline = document.querySelector('.headline');

const tl = new TimelineMax();
tl.fromTo(hero, 1, {
        height: "0%"
    }, {
        height: "85%",
        //ease: Power2.easeInOut
    })
    .fromTo(hero, 1, {
        width: "100%"
    }, {
        width: "85%",
        // ease: Power2.easeInOut
    })
    .fromTo(headline, 0.1, {
        opacity: 0,
        x: 30
    }, {
        opacity: 1,
        x: 0
    }, "-=0.5");

// animate the text 
const text = document.querySelector('.headline');
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";

}

let char = 0;
let timer = setInterval(onTick, 200);

function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if (char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}