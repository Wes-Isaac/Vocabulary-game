import './main.css';
import display from './display.js';
import { specificData, postScore, getLeaderboard } from './request.js';
import errorMessage from './errorMessage.js';

const vocab = [
  'sour',
  'abhor',
  'sharp',
  'gentle',
  'cruel',
  'love',
  'hate',
  'happy',
  'sad',
];
vocab.sort(() => Math.random() - 0.5);
const player = document.querySelector('.player');
const div = document.querySelector('.words');
const game = document.querySelector('.game');
const nextButton = document.querySelector('.next');
const score = document.querySelector('.score');
const startButton = document.querySelector('.start');
const leaderboard = document.querySelector('.leaderboard');
let playerName;
let counter = 2;
let antonym;

display(div, vocab[0]).then((ant) => {
  antonym = ant;
});

const handleClick = async (e) => {
  const input = game.querySelectorAll('input');
  let off = 0;
  input.forEach((val) => {
    if (val.value === 'off') {
      off += 1;
    }
  });

  if (off && counter <= vocab.length) {
    div.classList.remove('choosen');
    div.innerHTML = '';
    const result = await specificData(vocab[counter - 1]);
    const { arr: choices, id, ant } = result;
    choices.sort(() => Math.random() - 0.5);
    antonym = ant;
    div.innerHTML = `<h1>${counter}. ${id}</h1>`;
    choices.forEach((choice) => {
      div.innerHTML += `<div><input type="radio" id="${choice}" name="word" ><p>${choice}</p></div>`;
    });
    counter += 1;
  } else if (off) {
    e.target.classList.add('none');
    div.innerHTML = `<p class="final">Thanks for playing this game!!!! You Scored ${score.value} / ${vocab.length}</p>`;
    postScore(playerName, score.value);
  } else {
    errorMessage('Please select your answer!!!');
  }
};

startButton.addEventListener('click', (e) => {
  e.preventDefault();
  playerName = e.target.previousElementSibling.value;

  if (playerName) {
    game.classList.remove('none');
    player.classList.add('none');
  } else {
    errorMessage('Input a valid name');
  }
});

div.addEventListener('click', (e) => {
  if (!div.classList.contains('choosen')) {
    const input = document.querySelectorAll('input');
    e.target.value = 'off';
    if (e.target.id && e.target.id !== antonym[0]) {
      div.classList.add('choosen');
      e.target.nextSibling.classList.add('error');

      input.forEach((i) => {
        if (i.id === antonym[0]) {
          i.nextSibling.classList.add('success');
        }
      });
    } else if (e.target.id === antonym[0]) {
      // eslint-disable-next-line
      score.value++;
      e.target.nextSibling.classList.add('success');
      div.classList.add('choosen');
    }
  }
});

nextButton.addEventListener('click', (e) => {
  handleClick(e);
});

document.addEventListener('click', async (e) => {
  if (e.target.innerHTML === 'Leaderboard') {
    document.querySelector('#gameplay').classList.add('none');
    document.querySelector('#leaderboard').classList.remove('none');
    const leader = await getLeaderboard();
    leaderboard.innerHTML = '<div><h3>Name</h3> <h3>Score</h3></div>';
    leader.forEach((lead) => {
      leaderboard.innerHTML += `
      <div>
      <p>${lead.user}</p> 
      <p>${lead.score}</p>
      </div>`;
    });
  } else if (e.target.innerHTML === 'Home') {
    document.querySelector('#gameplay').classList.remove('none');
    document.querySelector('#leaderboard').classList.add('none');
  }
});
