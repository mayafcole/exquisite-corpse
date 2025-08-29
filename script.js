const restartBtn = document.getElementById('restart-btn');

const images = {
  head: [
    {
      url: 'gallery/head/smaller_heads/Jack-O-Latern.png',
      citation: '"Ahhhhhhh!!!!!!!!!" by Chris Breeze is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/Skull.png',
      citation: '"Magnera Human Skull 2" by L.C.Nøttaasen is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/smaller_heads/female_vampire.png',
      citation: '"Vampire" by Carniphage is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/werewolf.png',
      citation: '"Werewolf (Harry Potter)" by Robert Clarke is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/Frankenstein.png',
      citation: '"Frankenstein" by twm1340 is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
     {
      url: 'gallery/head/smaller_heads/snake_head.png',
      citation: '"Snake Head" by Skrewtape is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/egg.png',
      citation: '"Oxyura leucocephala MHNT.ZOO.2010.11.11.3" by Roger Culos is licensed under CC BY-SA 4.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/smaller_heads/hello_kitty.png',
      citation: '"Pop! Sanrio" by pullip_junk is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/lego_head.png',
      citation: '"終於入手 LEGO Head  !!" by Super Flow 非常流暢 is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/robot.png',
      citation: '"Friendly Robot" by firepile is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/head/smaller_heads/skull_w_glasses.png',
      citation: '"Cheap Sunglasses" by erix! is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/head/smaller_heads/sad_pumpkin.png',
      citation: '"Vintage Beistle Jack-O-Lantern sad face" by riptheskull is licensed under CC BY-ND 2.0.',
      overlapsWithNext: false
    }
  ],
  body: [
    {
      url: 'gallery/body/smaller_bodies/astronaut.png',
      citation: '"astronaut" by Oregon State University is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/body/smaller_bodies/tuxedo.png',
      citation: '"Thick as Thieves tuxedo, Kent Wang marcella shirt" by Kent Wang is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/body/smaller_bodies/magician.png',
      citation: '"The Headless Magician" by Double--M is licensed under CC BY 2.0.',
      overlapsWithNext: false
    },
     {
      url: 'gallery/body/smaller_bodies/king_penguin.png',
      citation: '"King Penguin Couple" by D-Stanley is licensed under CC BY 2.0.',
      overlapsWithNext: true
    },
    {
      url: 'gallery/body/smaller_bodies/tennis_player.png',
      citation: '"Tennis Player Sculpture, Thames Costal Walkway" by russellstreet is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false
    },
    {
      url: 'gallery/body/smaller_bodies/snowman.png',
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

async function drawFinalComposite() {
  const canvas = document.getElementById('final-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxWidth = canvas.width * 0.9;

  // Define fixed coordinates for the top-left corner of each part's image (x will be adjusted for centering)
  const fixedPositions = {
    head: { x: canvas.width / 2, y: 0 },
    body: { x: canvas.width / 2, y: 0 },  // y will be computed dynamically below
    legs: { x: canvas.width / 2, y: 0 }   // y will be computed dynamically below
  };

  // Overlap ratios controlling vertical overlaps between parts
  const overlapRatios = {
    head_body: 0.9, // 40% overlap of head onto body
    body_legs: 0.1  // 10% overlap of body onto legs
  };

  const headScale = 0.7; // Scale down head to 70% of calculated size

  // Load images sequentially to calculate dimensions and y offsets
  const parts = ['head', 'body', 'legs'];
  const loadedImages = {};
  for (const part of parts) {
    loadedImages[part] = await loadImage(images[part][selections[part]].url);
  }

  // Calculate scaled dimensions (respecting maxWidth)
  const scaledDims = {};
  for (const part of parts) {
    let img = loadedImages[part];
    let width = img.width;
    let height = img.height;
    if (width > maxWidth) {
      width = maxWidth;
      height = width * (img.height / img.width);
    }

    // Apply scaling for head only
    if (part === 'head') {
      height *= headScale;
      width *= headScale;
    }

    scaledDims[part] = { width, height };
  }

  // Calculate Y positions applying overlaps
  fixedPositions.head.y = 0; // start at top
  fixedPositions.body.y =
    fixedPositions.head.y +
    scaledDims.head.height * (1 - overlapRatios.head_body);
  fixedPositions.legs.y =
    fixedPositions.body.y +
    scaledDims.body.height * (1 - overlapRatios.body_legs);

  // Optionally adjust canvas height to fit all parts
  const totalHeight =
    fixedPositions.legs.y + scaledDims.legs.height;
  if (totalHeight > canvas.height) {
    canvas.height = totalHeight;
  }

  // Draw images, centering horizontally
  for (const part of parts) {
    const pos = fixedPositions[part];
    const dim = scaledDims[part];
    const x = pos.x - dim.width / 2; // center horizontally
    ctx.drawImage(loadedImages[part], x, pos.y, dim.width, dim.height);
  }

  console.log('Final composite drawn with scaled head.');
}

// Helper function to load image as Promise (if you don't already have this)
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
    img.src = src;
  });
}

// Helper function to load images as Promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';  // adjust based on your image hosting
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image: '+src));
    img.src = src;
  });
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