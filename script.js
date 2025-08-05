// js/script.js

const images = [
  'gallery/head/head1.jpg',
  'gallery/head/head2.jpg',
  'gallery/head/head3.jpg'
];

const headImg = document.getElementById('head-img');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');

let currentIndex = 0;
let selectionMade = false;
let timeLeft = 60; // seconds
let timerInterval = null;

function updateImage() {
  headImg.src = images[currentIndex];
  selectionMade = true;
  nextBtn.disabled = false; // enable next when image changes
}

leftArrow.addEventListener('click', () => {
  if (currentIndex == 0) currentIndex = images.length - 1;
  else currentIndex--;
  updateImage();
});

rightArrow.addEventListener('click', () => {
  if (currentIndex == images.length - 1) currentIndex = 0;
  else currentIndex++;
  updateImage();
});

nextBtn.addEventListener('click', () => {
  alert("Next step triggered! Selected image index: " + currentIndex);
  // Proceed to next page or logic here
});

function startTimer() {
  timerEl.textContent = formatTime(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextBtn.disabled = !selectionMade;
      alert("Time's up! Please proceed.");
    }
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Initialize
updateImage();
startTimer();