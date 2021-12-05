import './main.css';
import * as myfun from './request';
import display from './display';

const {getWordData} = myfun.default;

const vocab = ['sour','abhor','sharp','gentle','cruel','love', 'hate','happy','sad'];
const player = document.querySelector('.player');
const div = document.querySelector('.words');
const game = document.querySelector('.game');
const nextButton = document.querySelector('.next');
const score = document.querySelector('.score');
const startButton = document.querySelector('.start');
let playerName;
let counter = 1;



display(div, vocab[0]);
