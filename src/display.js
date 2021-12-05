import {specificData} from './request';

const display = async (div, word) => {
  let result = await specificData(word);
  const { arr:choices, id, ant } = result;
  div.innerHTML = `<h1>1. ${id}</h1>`;
  choices.forEach((choice) => {
    div.innerHTML += `<input type="radio" id="${choice}" name="word" ><label for="">${choice}</label><br>`
  });
  return ant;
}
export default display;