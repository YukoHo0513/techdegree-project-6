document.addEventListener('DOMContentLoaded', () => {
    const qwerty = document.getElementById('qwerty');
    const btnReset = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const ul = document.querySelector('ul');
    let missedGuess = 0;
    const ol = document.querySelector('ol');
    const h2 = document.querySelector('.title');

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
            li.textContent = arrItem[i].toLowerCase();
            ul.appendChild(li);
            if (arrItem[i] !== ' ') {
                li.className = 'letter';
            } else {
                li.className = 'space';
            }
        }
    }
    addPhraseToDisplay(arrPhrase);

    function checkLetter(button) {
        const lis = ul.childNodes;
        let match = null;
        for (let i = 0; i < lis.length; i++) {
            if (button.textContent === lis[i].textContent) {
                lis[i].className += ' show';
                match = button.textContent;
            } 
        }
        return match;
    }

    let i = 0;
    qwerty.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            if (button.className !== 'chosen') {
                button.className = 'chosen';
                const checkingLetter = checkLetter(button);

                if (checkingLetter === null) {
                    const li = ol.children[i];
                    i += 1;
                    const img = li.firstElementChild;
                    img.src = "images/lostHeart.png";
                    missedGuess += 1;
                }
                checkWin();
            }
        }
    });

    function checkWin() {
        const letterLi = document.getElementsByClassName('letter');
        const showLi = document.getElementsByClassName('show');
        console.log('hello', letterLi.length);
        console.log('bye', showLi.length);
        
        if (letterLi.length === showLi.length) {
            overlay.className = 'win';
            h2.textContent = 'You Won!';

            overlay.style.display = 'flex';
        } else if (missedGuess > 4) {
            overlay.className = 'lose';
            h2.textContent = 'You Lost!';
            overlay.style.display = 'flex';
        }
    }
});