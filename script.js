function computerChoiceAnalyzer() {
    const number = Math.random();
    let choice = '';
    if (number < 1 / 3) { choice = 'rock'; }
    else if (number < 2 / 3) { choice = 'paper'; }
    else { choice = 'scissors'; }

    return choice;
}

function game(playerChoice) {
    const computerChoice = computerChoiceAnalyzer();
    let result = '';
    if (playerChoice === computerChoice) {
        result = 'Hòa.';
        score.ties++;
    } else if ((playerChoice === 'rock' && computerChoice === 'scissors')
        || (playerChoice === 'paper' && computerChoice === 'rock')
        || (playerChoice === 'scissors' && computerChoice === 'paper')) {
        result = 'Bạn thắng.';
        score.wins++;
    } else {
        result = 'Bạn thua.';
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    const display = `
        <p class="result">${result}</p>
        <div style="margin-bottom: 60px;"> 
          Bạn ${choiceToImage(playerChoice)} ${choiceToImage(computerChoice)} Máy tính
        </div>`;
    document.getElementById('result').innerHTML = display;
    document.getElementById('display').innerHTML = displayScore();
}

function displayScore() {
    return `Thắng: ${score.wins}. Thua: ${score.losses}. Hòa: ${score.ties}`;
}

function confirmReset() {
    document.querySelector('.confirm-reset')
        .innerHTML = `Bạn chắc chắn muốn làm mới tỉ số?
        <button class="confirm-button-yes">Có</button>
        <button class="confirm-button-no">Không</button>
    `;
    
    document.querySelector('.confirm-button-yes').addEventListener('click', () => {
        resetScore();
        document.querySelector('.confirm-reset').innerHTML = '';
    });

    document.querySelector('.confirm-button-no').addEventListener('click', () => {
        document.querySelector('.confirm-reset').innerHTML = '';
    });
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    document.getElementById('display').innerHTML = displayScore();
}

function choiceToImage(choice) {
    let htmlDisplay = '';
    if (choice === 'rock') {
        htmlDisplay = `<img class="choice-result" src="icons/rock-emoji.png">`;
    }
    else if (choice === 'paper') {
        htmlDisplay = `<img class="choice-result" src="icons/paper-emoji.png">`;
    }
    else {
        htmlDisplay = `<img class="choice-result" src="icons/scissors-emoji.png">`;
    }
    return htmlDisplay;
}

function autoPlay() {
    document.getElementById('auto-play-button').outerHTML = `
        <button id="stop-play-button" onclick="stopPlay()">
          Dừng tự động chơi
        </button>`;

    autoPlayId = setInterval(() => {
        const number = Math.random();
        let randomChoice = '';
        if (number < 1 / 3) { randomChoice = 'rock'; }
        else if (number < 2 / 3) { randomChoice = 'paper'; }
        else { randomChoice = 'scissors'; }

        game(randomChoice);
    }, 1000);
}

function stopPlay() {
    clearInterval(autoPlayId);

    document.getElementById('stop-play-button').outerHTML = `
        <button id="auto-play-button">
          Tự động chơi
        </button>`;
}

let score = JSON.parse(localStorage.getItem('score'))
    || {
    wins: 0,
    losses: 0,
    ties: 0
};

document.getElementById('display').innerHTML = displayScore();

document.querySelector('.rock-button-container')
    .addEventListener('click', () => game('rock'));

document.querySelector('.paper-button-container')
    .addEventListener('click', () => game('paper'));

document.querySelector('.scissors-button-container')
    .addEventListener('click', () => game('scissors'));

document.getElementById('reset-button')
    .addEventListener('click', () => confirmReset());

document.getElementById('auto-play-button')
    .addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'q' || event.key === 'Q') {
        game('rock');
    }
    if (event.key === 'w' || event.key === 'W') {
        game('paper');
    }
    if (event.key === 'e' || event.key === 'E') {
        game('scissors');
    }
    if (event.key === 'a' || event.key === 'A') {
        autoPlay();
    }
    if (event.key === 's' || event.key === 'S') {
        stopPlay();
    }
    if (event.key === 'c' || event.key === 'C') {
        confirmReset();
    }
});