document.addEventListener('DOMContentLoaded', () => {
    const pokemonAPI = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`;
    let phrases = [];
    fetch(pokemonAPI)
        .then(response => response.json())
        .then(data => data.results)
        .then(createArr)
        .then(getRandomPhraseAsArray)
        .then(addPhraseToDisplay)
        .catch(error => console.log("There is an error:", error))

    function createArr(pokemonLists) {
        pokemonLists.forEach(pokemonList => {
            phrases.push(pokemonList.name)
        }) 
        return phrases;
    }

    const qwerty = document.getElementById('qwerty');
    const btnStart = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const ul = document.querySelector('ul');
    let missedGuess = 0;
    const ol = document.querySelector('ol');
    const h2 = document.querySelector('.title');
    const retryBtn = document.createElement('a');
    let heartIndex = 0;

    btnStart.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    function getRandomPhraseAsArray(arr) {
        console.log("hello");
        const randomNum = Math.floor(Math.random() * arr.length);
        const arrItem = arr[randomNum];
        return arrItem;
    }

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

    function checkLetter(button) {
        const lis = ul.childNodes;
        let letterFound = null;
        for (let i = 0; i < lis.length; i++) {
            if (button.textContent === lis[i].textContent) {
                lis[i].className += ' show';
                letterFound = button.textContent;
            } 
        }
        return letterFound;
    }

    qwerty.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            if (button.className !== 'chosen') {
                button.className = 'chosen';
                const checkingLetter = checkLetter(button);

                if (checkingLetter === null) {
                    const li = ol.children[heartIndex];
                    heartIndex += 1;
                    const img = li.firstElementChild;
                    img.src = "images/pokeball-trans.png";
                    missedGuess += 1;
                }
                checkWin();
            }
        }
    });

    function checkWin() {
        const letterLi = document.getElementsByClassName('letter');
        const showLi = document.getElementsByClassName('show');
        retryBtn.className = 'btn__reset';
        retryBtn.textContent = 'Retry';
        
        if (letterLi.length === showLi.length) {
            overlay.className = 'win';
            h2.textContent = 'You Won!';
            btnStart.style.display = 'none';
            overlay.appendChild(retryBtn);
            overlay.style.display = 'flex';
        } else if (missedGuess > 4) {
            overlay.className = 'lose';
            h2.textContent = 'You Lost!';
            btnStart.style.display = 'none';
            overlay.appendChild(retryBtn);
            overlay.style.display = 'flex';
        }
    }

    retryBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        ul.innerHTML = '';
        const newPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhrase);
        missedGuess = 0;
        heartIndex = 0;
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = '';
        };
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].src = "images/pokeball-color.png";
        }
    });
});