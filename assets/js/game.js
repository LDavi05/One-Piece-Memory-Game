const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const flags = [
  'brook',
  'chopper',
  'franky',
  'jinbe',
  'luffy',
  'nami',
  'nicorobin',
  'sanji',
  'usopp',
  'zoro',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  
  if(disabledCards.length == 20) {
    clearInterval(this.loop);
    setTimeout(() => {
      alert(`Parabéns ${spanPlayer.innerHTML}! Você venceu o jogo em ${timer.innerHTML} segundos!`);
    }, 500);
  }
}

const checkCards = () => {
  const firstFlag = firstCard.getAttribute('data-flag');
  const secondFlag = secondCard.getAttribute('data-flag');
  
  if(firstFlag == secondFlag) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    
    firstCard = '';
    secondCard = '';
    
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if(target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if(firstCard == '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard == '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (flag) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');
  
  front.style.backgroundImage = `url('../img/${flag}.png')`;
  
  card.appendChild(front);
  card.appendChild(back);
  
  card.addEventListener("click", revealCard);
  card.setAttribute('data-flag', flag);
  
  return card;
}

const loadGame = () => {
  const duplicateFlags = [...flags, ...flags];
  
  const shuffledArray = duplicateFlags.sort(() => Math.random() - 0.5);
  
  shuffledArray.forEach((flag) => {
    const card = createCard(flag);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  
  startTimer();
  loadGame();
}
