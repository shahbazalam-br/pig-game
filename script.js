const scorePl1 = document.getElementById('score--0');
const scorePl2 = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const currP1 = document.getElementById('current--0');
const currP2 = document.getElementById('current--1');
const player1sec = document.querySelector('.player--0');
const player2sec = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player1Name = document.getElementById('name--0');
const player2Name = document.getElementById('name--1');

let diceRoll, curr, activePlayer, scores, active;

//stating conditions
const init = function () {
  diceRoll = 0;
  diceImg.classList.add('hidden'); //hide dice
  curr = 0;
  activePlayer = 0;
  scores = [0, 0];
  active = true;
  scorePl1.textContent = 0;
  scorePl2.textContent = 0;

  currP1.textContent = 0;
  currP2.textContent = 0;
  player1sec.classList.add('player--active');
  player2sec.classList.remove('player--active');
  player1sec.classList.remove('player--winner');
  player2sec.classList.remove('player--winner');
};
init();

player1Name.addEventListener('click', function () {
  name1 = prompt('Enter Player 1');
  player1Name.textContent = name1;
  if (name1 == '') {
    player1Name.textContent = 'PLAYER 1';
  }
});

player2Name.addEventListener('click', function () {
  name2 = prompt('Enter Player 2');
  player2Name.textContent = name2;
  if (name2 == '') {
    player2Name.textContent = 'PLAYER 2';
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  if (activePlayer == 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  curr = 0;
  player1sec.classList.toggle('player--active');
  player2sec.classList.toggle('player--active');
};

//Roll Dice Click
btnRoll.addEventListener('click', function () {
  if (active) {
    //Generate random dice rolls
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    console.log(diceRoll);

    //Show dice
    diceImg.classList.remove('hidden');
    //Dice = Roll
    diceImg.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      //Add Rolls to Curr
      curr += diceRoll;
      // console.log(curr);
      document.getElementById(`current--${activePlayer}`).textContent = curr;
    } else {
      switchPlayer();
    }
  }
});

//Hold Function
btnHold.addEventListener('click', function () {
  if (active) {
    scores[activePlayer] += curr;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      active = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//New Game
btnNew.addEventListener('click', init);

//Info
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnOpen = document.querySelectorAll('.show-modal');

const openModel = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const closeOverlay = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpen.length; i++) {
  btnOpen[i].addEventListener('click', openModel);
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeOverlay);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});
