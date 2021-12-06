import {specificData} from './request';

const display = async (div, word) => {
  let result = await specificData(word);
  const { arr:choices, id, ant } = result;
  div.innerHTML = `<h1>1. ${id}</h1>`;
  choices.forEach((choice) => {
    div.innerHTML += `<div><input type="radio" id="${choice}" name="word" ><p>${choice}</p></div>`
  });
  return ant;
}
export default display;