import getWordData from './request';

const display = async (div, word) => {
  let result = await getWordData(word);
  const { arr:choices, id } = result;
  div.innerHTML = `<h1>1. ${id}</h1>`;
  choices.forEach((choice) => {
    div.innerHTML += `<input type="radio" id="${choice}" name="word" ><label for="">${choice}</label><br>`
  });
}
export default display;