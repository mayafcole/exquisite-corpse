const restartBtn = document.getElementById('restart-btn');

const images = {
  head: [
    {
      url: 'gallery/head/resized_heads/Jack-O-Latern.png',
      citation: '"Ahhhhhhh!!!!!!!!!" by Chris Breeze is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/Skull.png',
      citation: '"Magnera Human Skull 2" by L.C.Nøttaasen is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/resized_heads/female_vampire.png',
      citation: '"Vampire" by Carniphage is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/werewolf.png',
      citation: '"Werewolf (Harry Potter)" by Robert Clarke is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/Frankenstein.png',
      citation: '"Frankenstein" by twm1340 is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
     {
      url: 'gallery/head/resized_heads/snake_head.png',
      citation: '"Snake Head" by Skrewtape is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/egg.png',
      citation: '"Oxyura leucocephala MHNT.ZOO.2010.11.11.3" by Roger Culos is licensed under CC BY-SA 4.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/resized_heads/hello_kitty.png',
      citation: '"Pop! Sanrio" by pullip_junk is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/lego_head.png',
      citation: '"終於入手 LEGO Head  !!" by Super Flow 非常流暢 is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/robot.png',
      citation: '"Friendly Robot" by firepile is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/resized_heads/skull_w_glasses.png',
      citation: '"Cheap Sunglasses" by erix! is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/resized_heads/sad_pumpkin.png',
      citation: '"Vintage Beistle Jack-O-Lantern sad face" by riptheskull is licensed under CC BY-ND 2.0.',
      overlapsWithNext: false
    }
  ],
  body: [
    {
      url: 'gallery/body/astronaut.png',
      citation: '"astronaut" by Oregon State University is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/body/tuxedo.png',
      citation: '"Thick as Thieves tuxedo, Kent Wang marcella shirt" by Kent Wang is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/body/magician.png',
      citation: '"The Headless Magician" by Double--M is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
     {
      url: 'gallery/body/king_peguin.png',
      citation: '"King Penguin Couple" by D-Stanley is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/body/tennis_player.png',
      citation: '"Tennis Player Sculpture, Thames Costal Walkway" by russellstreet is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/body/snowman.png',
      citation: '"Snowman Neighbor" by MGShelton is licensed under CC BY-NC 2.0.',
      overlapsWithNext: false
    }
  ],
  legs: [
    {
      url: 'gallery/legs/2.png',
      citation: '"Dance recital" by ChrisMillett12 is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/legs/3.png',
      citation: '"Pinnoctopus cordiformis, Common octopus" by brian.gratwicke is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/legs/4.png',
      citation: '"Transformers Bumblebee Concept" by RoninKengo is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/legs/5.png',
      citation: '"Flamingos\' heart" by Omar.Bariffi is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/legs/6.png',
      citation: '"CLOWN!" by The Glass Beehive* is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    }
  ]
};

const selections = {
  head: 0,
  body: 0,
  legs: 0
};

let activePart = 'head';

// Reset the game state
restartBtn.addEventListener('click', () => {
  selections.head = 0;
  selections.body = 0;
  selections.legs = 0;

  document.getElementById('final-canvas').style.display = 'none';
  restartBtn.style.display = 'none';

  document.getElementById('qr-container').style.display = 'none';
  document.getElementById('qrcode').innerHTML = '';
  const downloadLink = document.getElementById('download-link');
  downloadLink.href = '#';

  document.getElementById('citation-container').style.display = 'none';
  document.getElementById('citations-list').innerHTML = '';

  ['head-section', 'body-section', 'legs-section'].forEach(id => {
    document.getElementById(id).style.display = '';
  });

  const finishBtn = document.getElementById('finish-btn');
  finishBtn.style.display = '';
  finishBtn.disabled = true;

  ['head', 'body', 'legs'].forEach(updateImage);
  updateHighlight('head');
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // adjust or remove if needed
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
    img.src = src;
  });
}

function scaleDimensions(img, maxHeight, maxWidth) {
  let height = maxHeight;
  let width = (img.width / img.height) * height;

  if (width > maxWidth) {
    width = maxWidth;
    height = width * (img.height / img.width);
  }

  return { width, height };
}

// async function drawFinalComposite() {
//   const canvas = document.getElementById('final-canvas');
//   const ctx = canvas.getContext('2d');
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Approximate target heights for each part based on recommended resize
//   const partHeights = {
//     head: 320,
//     body: 420,
//     legs: 300
//   };

//   const maxWidth = canvas.width * 0.9; // Leave horizontal padding

//   // Draw order: legs at bottom, then body, then head on top
//   const drawOrder = ['legs', 'body', 'head'];

//   // This will track vertical drawing offset from canvas top
//   let currentY = 0;

//   for (const part of drawOrder) {
//     const sel = selections[part];
//     const imageData = images[part][sel];

//     await new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'anonymous'; // adjust based on origin policy
//       img.onload = () => {
//         let drawHeight = partHeights[part];
//         let drawWidth = (img.width / img.height) * drawHeight;

//         // Adjust width if exceeds max allowed width
//         if (drawWidth > maxWidth) {
//           drawWidth = maxWidth;
//           drawHeight = drawWidth * (img.height / img.width);
//         }

//         const x = (canvas.width - drawWidth) / 2;

//         // For legs and body, draw at current Y; for head, draw overlapping higher
//         let y = currentY;

//         // For the head, optionally overlap slightly upwards (adjust as needed)
//         if (part === 'head') {
//           y = currentY - (drawHeight * 0.3); // move head 30% into body height
//         }

//         ctx.drawImage(img, x, y, drawWidth, drawHeight);

//         // Increment y only if not head (which overlaps)
//         if (part !== 'head') {
//           currentY += drawHeight;
//         } else {
//           // Head overlapping - adjust currentY so next drawing doesn't jump down too far
//           currentY += drawHeight * 0.7; // less than full height because of overlap
//         }
//         resolve();
//       };
//       img.onerror = () => {
//         console.error(`Failed to load image: ${img.src}`);
//         reject(new Error(`Image load failed at ${img.src}`));
//       };
//       img.src = imageData.url;
//     });
//   }
//   console.log('All images loaded and drawn with balanced proportions and overlap.');
// }

async function drawFinalComposite() {
  const canvas = document.getElementById('final-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const parts = ['head', 'body', 'legs'];
  const maxWidth = canvas.width * 0.9; // max width per image

  // Custom target heights per part (you can adjust these)
  const targetHeights = {
    head: 280,   // smaller head height (less than before)
    body: 420,
    legs: 300
  };

  // Current vertical position to draw next image
  let currentY = 0;

  for (const part of parts) {
    const sel = selections[part];
    const imageData = images[part][sel];

    await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // adjust/remove if needed
      img.onload = () => {
        // Scale proportionally based on target height for part
        let drawHeight = targetHeights[part];
        let drawWidth = (img.width / img.height) * drawHeight;

        // Constrain width
        if (drawWidth > maxWidth) {
          drawWidth = maxWidth;
          drawHeight = drawWidth * (img.height / img.width);
        }

        const x = (canvas.width - drawWidth) / 2;  // horizontal center

        // Calculate y position with custom overlap
        let y = currentY;

        if (part === 'legs') {
          // legs at currentY (bottom part)
          // no special offset
        } else if (part === 'body') {
          // body overlaps legs more by reducing vertical gap (increase overlap)
          y = currentY - (drawHeight * 0.45); // 45% overlap upwards
        } else if (part === 'head') {
          // make head spaced a bit further from the body (less overlap)
          y = currentY + 20;  // shift down 20px gap for more spacing
        }

        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Update currentY for next image (legs always increases fully)
        if (part === 'legs') {
          currentY += drawHeight;
        } else if (part === 'body') {
          // increase by less because head overlaps body by 20px gap
          currentY = y + drawHeight;
        } else if (part === 'head') {
          // update currentY for body drawing next loop
          currentY = y + drawHeight;
        }

        resolve();
      };
      img.onerror = () => {
        console.error('Failed to load image:', img.src);
        reject(new Error('Image load failed at ' + img.src));
      };
      img.src = imageData.url;
    });
  }

  console.log('All parts drawn with custom overlaps and head resized.');
}

// Helper function to load image
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // adjust/remove as needed
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image at ' + url));
    img.src = url;
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

['head', 'body', 'legs'].forEach(part => {
  const section = document.getElementById(`${part}-section`);
  section.addEventListener('click', () => {
    updateHighlight(part);
  });
});


function showCitations() {
  const citationsList = document.getElementById('citations-list');
  citationsList.innerHTML = '';

  ['head', 'body', 'legs'].forEach(part => {
    const partData = images[part][selections[part]];
    
    // Log the citation or note missing data
    console.log(`Citation for ${part}:`, partData ? partData.citation : 'No data');

    if (!partData || !partData.citation || partData.citation.trim() === '') return;

    const li = document.createElement('li');
    li.textContent = partData.citation;
    citationsList.appendChild(li);
  });

  document.getElementById('citation-container').style.display = 'block';
}

document.getElementById('finish-btn').addEventListener('click', async () => {
  ['head-section', 'body-section', 'legs-section'].forEach(id =>
    document.getElementById(id).style.display = 'none'
  );

  const finishBtn = document.getElementById('finish-btn');
  finishBtn.style.display = 'none';

  const finalCanvas = document.getElementById('final-canvas');
  finalCanvas.style.display = 'block';

  restartBtn.style.display = 'block';

  try {
    await drawFinalComposite();
    showCitations();
    // generateQRCodeFromCanvas();
  } catch (e) {
    console.error('Error during drawing or QR:', e);
    alert('Error loading images or generating QR code.');
  }
});

// function generateQRCodeFromCanvas() {
//   const canvas = document.getElementById('final-canvas');
//   const qrcodeContainer = document.getElementById('qr-container');
//   const qrcodeDiv = document.getElementById('qrcode');
//   const downloadLink = document.getElementById('download-link');

//   qrcodeDiv.innerHTML = '';

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