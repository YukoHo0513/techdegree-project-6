const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('ul');
let missedGuess = 0;

const phrases = ['I do not like cheese', 'Happy new year', 'Sloths move fast', 'Baked pork chop on rice', 'Rainbow on a rainy day' ];


btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    const randomNum = Math.floor(Math.random() * arr.length);
    const arrItem = arr[randomNum];
    return arrItem;
}
const arrPhrase = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arrItem) {
    for (let i = 0; i < arrItem.length; i++) {
        const li = document.createElement('li');
        li.textContent = arrItem[i];
        ul.appendChild(li);
        if (arrItem[i] !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}
addPhraseToDisplay(arrPhrase);


const keyQBtn = document.querySelector('.keyQ');

function checkLetter(button) {
    const lis = ul.childNodes;
    let match = null;
    for (let i = 0; i < lis.length; i++) {
        if (button.textContent === lis[i].textContent) {
            lis[i].className = 'show';
            match = button.textContent;
        } 
    }
    return match;
}
console.log(checkLetter(keyQBtn));