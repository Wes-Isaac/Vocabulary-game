import './main.css';
import display from './display';
import {specificData, postScore, getLeaderboard } from './request';
import errorMessage from './errorMessage';

const vocab = ['sour','abhor','sharp','gentle','cruel','love', 'hate','happy','sad'];
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
    console.log(val.value)
    val.value === 'off'? off++ : off;
  })
  console.log(off)
  // return; function

  if(off && counter <= vocab.length) {

    div.classList.remove('choosen');
    div.innerHTML = '';
    let result = await specificData(vocab[counter - 1]);
  const { arr:choices, id, ant } = result;
  antonym = ant;
  div.innerHTML = `<h1>${counter}. ${id}</h1>`;
  choices.forEach((choice) => {
    div.innerHTML += `<input type="radio" id="${choice}" name="word" ><label for="">${choice}</label><br>`
  });
    counter++;
  } else if(off) {
    e.target.innerHTML = 'Submit Score';
    div.innerHTML = `Thanks for playing this game!!!! You Scored ${score.value} / ${vocab.length}`;
    postScore(playerName, score.value);
  }else {
    errorMessage('Please select your answer!!!')
  }
}

startButton.addEventListener('click', (e)=> {
  e.preventDefault();
   playerName = e.target.previousElementSibling.value;
   console.log(playerName);

  if(playerName) {
    game.classList.remove('none');
    player.classList.add('none');
  } else {
    errorMessage('Input a valid name')
  }
})

div.addEventListener('click', (e) => {
  if(!div.classList.contains('choosen')) {
    const input = document.querySelectorAll('input');
    e.target.value= 'off';
    if(e.target.id && e.target.id !== antonym[0]) {
      div.classList.add('choosen');
      console.log(e.target.id);
      e.target.nextSibling.classList.add('error');

      input.forEach((i) => {
        if(i.id === antonym[0]) {
          i.nextSibling.classList.add('success');
        }
      })
    } else if(e.target.id === antonym[0]) {
      score.value++;
      e.target.nextSibling.classList.add('success');
      div.classList.add('choosen');

    }
  }
});

nextButton.addEventListener('click',  (e) => {
  handleClick(e);
});

document.addEventListener('click', async (e) => {
  if(e.target.innerHTML ==='Leaderboard') {
    console.log('HAPPY')
    document.querySelector('#gameplay').classList.add('none')
    document.querySelector('#leaderboard').classList.remove('none')
    const leader = await getLeaderboard();
    console.log(leader);
    leaderboard.innerHTML = '<p><span>Name<span> <span>Score<span></p>';
    leader.forEach((lead) => {
      leaderboard.innerHTML += `
      <div>
      <p><span>${lead.user}<span> <span>${lead.score}<span></p>

      </div>`

    })
  } else if(e.target.innerHTML ==='Home') {
    console.log('NOT HAPPY');
    document.querySelector('#gameplay').classList.remove('none')
    document.querySelector('#leaderboard').classList.add('none');
  }
})
