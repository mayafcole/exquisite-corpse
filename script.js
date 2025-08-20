const restartBtn = document.getElementById('restart-btn');

const images = {
  head: [
    {
      url: 'gallery/head/head4.png',
      citation: '"Ahhhhhhh!!!!!!!!!" by Chris Breeze is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/head/head5.png',
      citation: '"Magnera Human Skull 2" by L.C.Nøttaasen is licensed under CC BY-SA 2.0.'
    },
    {
      url: 'gallery/head/head6.png',
      citation: '"Vampire" by Carniphage is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/head/head7.png',
      citation: '"Werewolf (Harry Potter)" by Robert Clarke is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/head/head8.png',
      citation: '"Frankenstein" by twm1340 is licensed under CC BY-SA 2.0.'
    }
  ],
  body: [
    {
      url: 'gallery/body/body4.png',
      citation: '"Scarecrow" by Jonas B is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/body/body5.png',
      citation: '"astronaut" by Oregon State University is licensed under CC BY-SA 2.0.'
    },
    {
      url: 'gallery/body/body6.png',
      citation: '"Thick as Thieves tuxedo, Kent Wang marcella shirt" by Kent Wang is licensed under CC BY-SA 2.0.'
    },
    {
      url: 'gallery/body/body7.png',
      citation: '"The Headless Magician" by Double--M is licensed under CC BY 2.0.'
    }
  ],
  legs: [
    {
      url: 'gallery/legs/legs4.png',
      citation: '"Dance recital" by ChrisMillett12 is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/legs/legs5.png',
      citation: '"Pinnoctopus cordiformis, Common octopus" by brian.gratwicke is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/legs/legs6.png',
      citation: '"Transformers Bumblebee Concept" by RoninKengo is licensed under CC BY 2.0.'
    },
      {
      url: 'gallery/legs/legs7.png',
      citation: '"Flamingos\' heart" by Omar.Bariffi is licensed under CC BY 2.0.'
    },
    {
      url: 'gallery/legs/legs8.png',
      citation: '"CLOWN!" by The Glass Beehive* is licensed under CC BY-SA 2.0.'
    },
  ]
};

const selections = {
  head: 0,
  body: 0,
  legs: 0
};

let activePart = 'head';

restartBtn.addEventListener('click', () => {
  // Reset selections
  selections.head = 0;
  selections.body = 0;
  selections.legs = 0;

  // Hide final canvas and restart button
  document.getElementById('final-canvas').style.display = 'none';
  restartBtn.style.display = 'none';

  // Hide QR code and citations
  document.getElementById('qr-container').style.display = 'none';
  document.getElementById('qrcode').innerHTML = '';
  const downloadLink = document.getElementById('download-link');
  downloadLink.href = '#';
  document.getElementById('citation-container').style.display = 'none';
  document.getElementById('citations-list').innerHTML = '';

  // Show all selection sections and finish button
  ['head-section', 'body-section', 'legs-section'].forEach(id => {
    document.getElementById(id).style.display = '';
  });
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.style.display = '';
  finishBtn.disabled = true;

  // Reset UI images and highlights
  ['head', 'body', 'legs'].forEach(updateImage);
  updateHighlight('head');
});


function drawFinalComposite() {
  const canvas = document.getElementById('final-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const parts = ['head', 'body', 'legs'];
  const partHeight = canvas.height / parts.length;
  const maxPartWidth = canvas.width * 0.9;

  const promises = parts.map((part, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; 
      img.onload = () => {
        let drawHeight = partHeight;
        let drawWidth = (img.width / img.height) * drawHeight;
        if (drawWidth > maxPartWidth) {
          drawWidth = maxPartWidth;
          drawHeight = drawWidth * (img.height / img.width);
        }
        const x = (canvas.width - drawWidth) / 2;
        const y = index * partHeight;   // no vertical padding
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        resolve();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        reject(new Error(`Image load failed at ${img.src}`));
      };
      img.src = images[part][selections[part]].url;
    });
  });

  return Promise.all(promises).then(() => {
    console.log('All images loaded and drawn stacked with no vertical gaps.');
  });
}
    

function updateImage(part) {
  const imgElement = document.getElementById(`${part}-img`);
  imgElement.src = images[part][selections[part]].url;
  checkFinishReady();
}

function checkFinishReady() {
  const ready = ['head', 'body', 'legs'].every(part => selections[part] !== null && selections[part] !== undefined);
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.disabled = !ready;
}

function updateHighlight(activePartParam) {
  activePart = activePartParam;
  ['head', 'body', 'legs'].forEach(part => {
    const section = document.getElementById(`${part}-section`);
    if (!section) return;
    if (part === activePart) {
      section.classList.remove('blacked-out');
    } else {
      section.classList.add('blacked-out');
    }
  });
}

// Event listeners for arrows to change image and activate highlight
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

// Clicking anywhere in a section activates that part
['head', 'body', 'legs'].forEach(part => {
  const section = document.getElementById(`${part}-section`);
  section.addEventListener('click', () => {
    updateHighlight(part);
  });
});

// Show citations on final screen
function showCitations() {
  const citationsList = document.getElementById('citations-list');
  citationsList.innerHTML = '';
  ['head', 'body', 'legs'].forEach(part => {
    const partData = images[part][selections[part]];
    if (!partData) return;
    const li = document.createElement('li');
    li.textContent = partData.citation || 'No citation available';
    citationsList.appendChild(li);
  });
  document.getElementById('citation-container').style.display = 'block';
}

// Finish button click handler
document.getElementById('finish-btn').addEventListener('click', () => {
  ['head-section', 'body-section', 'legs-section'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.style.display = 'none';

  const finalCanvas = document.getElementById('final-canvas');
  finalCanvas.style.display = 'block';

  restartBtn.style.display = 'block';

  drawFinalComposite()
    .then(() => {
      showCitations();
      // generateQRCodeFromCanvas();
    })
    .catch(e => {
      console.error('Error during drawing or QR:', e);
      alert('Error loading images or generating QR code.');
    });
});

// QR code generation from canvas
// function generateQRCodeFromCanvas() {
//   const canvas = document.getElementById('final-canvas');
//   const qrcodeContainer = document.getElementById('qr-container');
//   const qrcodeDiv = document.getElementById('qrcode');
//   const downloadLink = document.getElementById('download-link');

//   qrcodeDiv.innerHTML = '';  // clear previous

//   const imgDataUrl = canvas.toDataURL('image/png');

//   if (!imgDataUrl || imgDataUrl.length < 100) {
//     console.error('Invalid or empty canvas data URL');
//     alert('Canvas image not ready for QR code generation.');
//     return;
//   }

//   downloadLink.href = imgDataUrl;

//   new QRCode(qrcodeDiv, {
//     text: imgDataUrl,
//     width: 180,
//     height: 180
//   });

//   qrcodeContainer.style.display = 'block';
// }