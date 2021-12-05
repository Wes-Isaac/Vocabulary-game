import axios from 'axios';

const getWordData = async (word) => {
let wordData;
wordData =  await axios.get(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=406393ea-9e45-49ea-b312-be15890f03f0`);
const syns = wordData.data[0].meta.syns;
const ant = wordData.data[0].meta.ants[0];
const arr = syns.filter((syn) => syn.length > 3)[0];
arr.splice(3);
arr.push(ant[0]);
let id = wordData.data[0].meta.id;
return {arr, id, ant };
}

const specificData = async (word) => {
  let result = await getWordData(word);
  return result;
}

export default specificData;