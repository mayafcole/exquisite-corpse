const images = {
  head: [
    'gallery/head/head1.jpg',
    'gallery/head/head2.jpg',
    'gallery/head/head3.jpg'
  ],
  mid: [
    'gallery/body/body1.png',
    'gallery/body/body2.png',
    'gallery/body/body3.png'
  ],
  feet: [
    'gallery/legs/legs1.png',
    'gallery/legs/legs2.png',
    'gallery/legs/legs.png'
  ]
};

const selections = {
  head: 0,
  mid: 0,
  feet: 0
};

let activePart = 'head';

function drawFinalComposite() {
  const canvas = document.getElementById('final-canvas');
  const ctx = canvas.getContext('2d');

  // Clear previous
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const partKeys = ['head', 'mid', 'feet'];
  const imgHeight = canvas.height / 3;

  const loadImagesPromises = partKeys.map((part, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // if images are from external source, else can remove
      img.onload = () => {
        // Draw image into its third of canvas height, scaled width-wise proportionally
        let drawHeight = imgHeight;
        let drawWidth = (img.width / img.height) * drawHeight;
        const xOffset = (canvas.width - drawWidth) / 2; // center horizontally

        ctx.drawImage(img, xOffset, index * imgHeight, drawWidth, drawHeight);
        resolve();
      };
      img.onerror = reject;
      img.src = images[part][selections[part]];
    });
  });

  return Promise.all(loadImagesPromises);
}

// Update image for a given part
function updateImage(part) {
  const imgElement = document.getElementById(`${part}-img`);
  imgElement.src = images[part][selections[part]];
  checkFinishReady();
}

// Enable finish button only if all parts are selected
function checkFinishReady() {
  const ready = ['head','mid','feet'].every(part => selections[part] !== null && selections[part] !== undefined);
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.disabled = !ready;
}

// Black out other parts except the active one
function updateHighlight(activePartParam) {
  activePart = activePartParam;
  ['head', 'mid', 'feet'].forEach(part => {
    const section = document.getElementById(`${part}-section`);
    if (!section) return;
    if (part === activePart) {
      section.classList.remove('blacked-out');
    } else {
      section.classList.add('blacked-out');
    }
  });
}

// Make arrow buttons change images, activate section on click
document.querySelectorAll('.nav-arrow').forEach(button => {
  button.addEventListener('click', () => {
    const part = button.dataset.part;
    const isLeft = button.classList.contains('left-arrow');
    const len = images[part].length;
    if (isLeft) {
      selections[part] = (selections[part] - 1 + len) % len;
    } else {
      selections[part] = (selections[part] + 1) % len;
    }
    updateImage(part);
    updateHighlight(part);
  });
});

// Activate section if user clicks anywhere on it
['head','mid','feet'].forEach(part => {
  const section = document.getElementById(`${part}-section`);
  section.addEventListener('click', () => {
    updateHighlight(part);
  });
});

// Finish button click handler
document.getElementById('finish-btn').addEventListener('click', () => {
  const container = document.getElementById('container');
  const finishBtn = document.getElementById('finish-btn');
  const finalCanvas = document.getElementById('final-canvas');

  // Hide selection sections and finish button
  ['head-section', 'mid-section', 'feet-section'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  finishBtn.style.display = 'none';

  // Show the final canvas
  finalCanvas.style.display = 'block';

  drawFinalComposite().catch(() => {
    alert('Error loading images');
  });
});

// Initialize UI
['head','mid','feet'].forEach(updateImage);
updateHighlight('head');