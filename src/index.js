import './main.css';
import * as myfun from './request';

const {getWordData} = myfun.default;

const vocab = ['sour','abhor','sharp','gentle','cruel','love', 'hate','happy','sad'];
const player = document.querySelector('.player');
const div = document.querySelector('.words');
const game = document.querySelector('.game');
const nextButton = document.querySelector('.next');
let counter = 1;

const display = async (word = vocab[0]) => {
  let result = await getWordData(word);
  console.log(result);
}

display('happy');
