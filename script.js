// Define steps and their images
const steps = [
  {
    key: 'head',
    title: 'Choose your head!',
    images: [
      'gallery/head/head1.jpg',
      'gallery/head/head2.jpg',
      'gallery/head/head3.jpg'
    ]
  },
  {
    key: 'mid',
    title: 'Choose your midsection!',
    images: [
      'gallery/body/body1.jpg',
      'gallery/body/body2.jpg',
      'gallery/body/body3.jpg'
    ]
  },
  {
    key: 'feet',
    title: 'Choose your feet!',
    images: [
      'gallery/legs/legs1.jpg',
      'gallery/legs/legs2.jpg',
      'gallery/legs/legs3.jpg'
    ]
  }
];

const headImg = document.getElementById('head-img');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const titleEl = document.querySelector('h2');

let currentStepIndex = 0;
let currentIndex = 0;
let selections = {};    // to save user's selections keyed by step.key
let timeLeft = 60;
let timerInterval = null;
let selectionMade = false;

function updateImage() {
  const images = steps[currentStepIndex].images;
  headImg.src = images[currentIndex];
  selectionMade = true;
  nextBtn.disabled = false;
}

function loadStep(stepIdx) {
  // Clear old timer
  if (timerInterval) clearInterval(timerInterval);

  currentStepIndex = stepIdx;
  currentIndex = 0;
  selectionMade = false;
  nextBtn.disabled = true;
  timeLeft = 60;

  // Update title
  titleEl.textContent = steps[stepIdx].title;

  // Update image
  updateImage();

  startTimer();
}

leftArrow.addEventListener('click', () => {
  const images = steps[currentStepIndex].images;
  if (currentIndex === 0) currentIndex = images.length - 1;
  else currentIndex--;
  updateImage();
});

rightArrow.addEventListener('click', () => {
  const images = steps[currentStepIndex].images;
  if (currentIndex === images.length - 1) currentIndex = 0;
  else currentIndex++;
  updateImage();
});

nextBtn.addEventListener('click', () => {
  if (!selectionMade) {
    alert('Please select an option before proceeding.');
    return;
  }

  // Save selection for current step
  selections[steps[currentStepIndex].key] = steps[currentStepIndex].images[currentIndex];

  if (currentStepIndex + 1 < steps.length) {
    loadStep(currentStepIndex + 1);
  } else {
    // All steps done; do something with selections (e.g., show summary, save, etc.)
    clearInterval(timerInterval);
    alert('All done! Your selections: ' + JSON.stringify(selections, null, 2));
    nextBtn.disabled = true;
  }
});

function startTimer() {
  timerEl.textContent = formatTime(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextBtn.disabled = !selectionMade;

      if (!selectionMade) {
        // Auto select current image
        selectionMade = true;
        nextBtn.disabled = false;
      }
      alert("Time's up! Please proceed.");
    }
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Initialize app on page load
loadStep(0);