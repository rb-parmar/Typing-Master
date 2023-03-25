`use strict`;

// Connecting HTML elements with JavaScript
const displayWord = document.querySelector('.displayWord');
const count = document.querySelector('.count');
const input = document.querySelector('.input');
const startButton = document.querySelector('.startButton');
const playAgain = document.querySelector('.playAgain');
const score = document.querySelector('.score');

// Creating new Audio Object 
const bgMusic = new Audio('./assets/Audio/tick-tock-21075.mp3');
bgMusic.type = 'Audio/mp3';
bgMusic.volume = 0.5;

// Array of words to write from
const words = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
  'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
  'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
  'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
  'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
  'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
  'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
  'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
  'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
  'keyboard', 'window'
];

// Score class
class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() { return this.#date; }
  get hits() { return this.#hits; }
  get percentage() { return this.#percentage; }
}

let countdown = 99;
function getDate() { 
  const options = {
    month: 'short',
    day: 'numeric',
  }

  return new Date().toLocaleDateString('en-ca', options);
}

let hits = 0;
var percentage = ((hits / 90) * 100).toFixed(2);

// Getting a random word
let copy = [...words];
function randomWord() {
  let word = Math.floor(Math.random() * copy.length);
  displayWord.innerText = copy[word];
  copy.splice(word, 1);
};

// Checking if words are equal
function checkWord() {
  if(displayWord.innerText === input.value) {
    hits++;
    percentage = ((hits / 90) * 100).toFixed(2);
    displayWord.innerText = '';
    input.value = '';
    randomWord();
  }
};

// countdown decrement
function time() {
  countdown--;
  count.innerHTML = countdown;
}

// start button
startButton.addEventListener('click', function() {
  count.innerHTML = countdown;
  countTime = setInterval(function() { time(); }, 1000);
  bgMusic.play();
  randomWord();
  wordCheck = setInterval(function() { checkWord(); }, 100);
  startButton.style.display = 'none';
  playAgain.style.display = 'block';
});

// checking when to stop the game
stop = setInterval(function() {
  if(countdown === 0) {
    bgMusic.pause();
    clearInterval(stop);
    clearInterval(countTime);
    displayWord.innerHTML = '';
    input.value = '';
    count.innerHTML = '0';
    clearInterval(wordCheck);
    score.style.display = 'block';
    playerScore = new Score(getDate(), hits, percentage);
    score.innerHTML = `Date: ${playerScore.date}<br>Hits: ${playerScore.hits}<br>Percentage: ${playerScore.percentage}%`
  }  
}, 1000);

// Play again button 
playAgain.addEventListener('click', function() {
  location.reload();
});
