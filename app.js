const optionArray = ['rock', 'paper', 'scissors'];

const game = document.querySelector('.game');
const options = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');
const userOptionDiv = document.querySelector('.user');
const computerOptionDiv = document.querySelector('.computer');
const winner = document.querySelector('.game-winner');
const userPoints = document.querySelector('.user-points');
const computerPoints = document.querySelector('.computer-points');

const maxPoints = 10;
let p1 = 0;
let p2 = 0;

startGame();

function startGame() {
  options.forEach((item) => {
    item.addEventListener('click', (e) => {
      placeholders.forEach((element) => (element.style.display = 'none'));
      play(e.target.dataset.index);
    });
  });
}

function play(option) {
  const computerChoice = generateOption();
  displayOptions(option, computerChoice);
  if (document.querySelector('.winner')) {
    document.querySelector('.winner').remove();
  }
  if (isWin(option, computerChoice)) {
    winner.insertAdjacentHTML('beforeend', ' <span class="winner">You</span>');
    updatePoints('win');
  } else if (!isWin(option, computerChoice) && option == computerChoice) {
    winner.insertAdjacentHTML('beforeend', ' <span class="winner">Tie</span>');
  } else {
    winner.insertAdjacentHTML(
      'beforeend',
      ' <span class="winner">Computer</span>'
    );
    updatePoints('lose');
  }

  gameWin();

  displayPoints();
}

function generateOption() {
  return Math.floor(Math.random() * 3);
}

function displayOptions(user, computer) {
  if (document.querySelectorAll('.option').length != 0) {
    document.querySelectorAll('.option').forEach((element) => element.remove());
  }
  const userOption = `<img
              class="option"
              src="/assets/${optionArray[user]}.png"
              alt="${optionArray[user]}"
            />`;
  const computerOption = `<img
              class="option"
              src="/assets/${optionArray[computer]}.png"
              alt="${optionArray[computer]}"
            />`;

  userOptionDiv.insertAdjacentHTML('beforeend', userOption);
  computerOptionDiv.insertAdjacentHTML('beforeend', computerOption);
}

function isWin(user, computer) {
  if (user == 0 && computer == 2) {
    return true;
  }

  if (user == 1 && computer == 0) {
    return true;
  }

  if (user == 2 && computer == 1) {
    return true;
  }

  return false;
}

function updatePoints(state) {
  if (state == 'win') {
    p1++;
  }
  if (state == 'lose') {
    p2++;
  }
}

function displayPoints() {
  document.querySelector('.point-count--user').remove();
  document.querySelector('.point-count--computer').remove();

  const userCount = `<span class="point-count--user">${p1}</span>`;
  const computerCount = `<span class="point-count--computer">${p2}</span>`;

  userPoints.insertAdjacentHTML('afterbegin', userCount);
  computerPoints.insertAdjacentHTML('afterbegin', computerCount);
}

function gameWin() {
  if (p1 == maxPoints || p2 == maxPoints) {
    const userScreen = `<div class="win-screen">
          <p class="win-screen__heading ${p1 == maxPoints ? 'win' : 'lose'}">${
      p1 == maxPoints ? 'You Win!' : 'You Lose!'
    }</p>
          <button class="win-screen__button">Play Again</button>
        </div>`;

    game.insertAdjacentHTML('afterbegin', userScreen);

    const replayBtn = document.querySelector('.win-screen__button');

    replayGame(replayBtn);
  }
}

function reset() {
  p1 = 0;
  p2 = 0;
  document.querySelector('.winner').remove();
  document.querySelectorAll('.option').forEach((element) => element.remove());
  placeholders.forEach((element) => (element.style.display = 'block'));
  document.querySelector('.win-screen').remove();
  displayPoints();
}

function replayGame(btn) {
  btn.addEventListener('click', () => {
    reset();
  });
}
