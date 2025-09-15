const firebaseConfig = {
apiKey: "AIzaSyDdylD42bvnAEg1zFpcxccIlI3UV4oQZfM",
authDomain: "exquisite-corpse-b3d86.firebaseapp.com",
projectId: "exquisite-corpse-b3d86",
storageBucket: "exquisite-corpse-b3d86.firebasestorage.app", // <-- change this
messagingSenderId: "342957648893",
appId: "1:342957648893:web:cb21cb307f676ea4f6c794",
measurementId: "G-2FK0314SLH"
};


async function uploadCanvasImage() {
const canvas = document.getElementById('final-canvas');
if (!canvas) throw new Error('Canvas element not found.');
// Convert data URL to Blob reliably
const dataURL = canvas.toDataURL('image/png');
const blob = await (await fetch(dataURL)).blob();
const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images/' + Date.now() + '.png');
const snapshot = await imagesRef.put(blob);
const downloadURL = await snapshot.ref.getDownloadURL();
console.log('File available at:', downloadURL);
return downloadURL;
}


firebase.initializeApp(firebaseConfig);
if (firebase.analytics) firebase.analytics();

console.log("FIREBASE STUFF");

firebase.storage().setMaxUploadRetryTime(5000);
(async () => {
try {
console.log('Starting test upload…');
const snap = await firebase.storage().ref('images/test.txt')
.putString('hello world', 'raw', { contentType: 'text/plain' });
console.log('Test upload OK:', await snap.ref.getDownloadURL());
} catch (e) {
console.error('Test upload failed:', e.code, e.message, e);
}
})();



const restartBtn = document.getElementById('restart-btn');
const finishBtn = document.getElementById('finish-btn');

const images = {
  head: [
    {
      url: 'gallery/head/smaller_heads/Jack-O-Latern.png',
      citation: '"Ahhhhhhh!!!!!!!!!" by Chris Breeze is licensed under CC BY 2.0.',
      overlapsWithNext: true,
      title: 'Jack-O-Latern'

    },
    {
      url: 'gallery/head/smaller_heads/Skull.png',
      citation: '"Magnera Human Skull 2" by L.C.Nøttaasen is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false,
      title: 'Skull'

    },
    {
      url: 'gallery/head/smaller_heads/female_vampire.png',
      citation: '"Vampire" by Carniphage is licensed under CC BY 2.0.',
      overlapsWithNext: true,
      title: 'Vampire'
    },
    {
      url: 'gallery/head/smaller_heads/werewolf.png',
      citation: '"Werewolf (Harry Potter)" by Robert Clarke is licensed under CC BY 2.0.',
      overlapsWithNext: true,
      title: 'Werewolf'
    },
    {
      url: 'gallery/head/smaller_heads/Frankenstein.png',
      citation: '"Frankenstein" by twm1340 is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false,
      title: 'Frankenstein'
    },
     {
      url: 'gallery/head/smaller_heads/snake_head.png',
      citation: '"Snake Head" by Skrewtape is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true,
      title: 'Snake'
    },
    {
      url: 'gallery/head/smaller_heads/egg.png',
      citation: '"Oxyura leucocephala MHNT.ZOO.2010.11.11.3" by Roger Culos is licensed under CC BY-SA 4.0.',
      overlapsWithNext: false,
      title: 'Egghead'
    },
    {
      url: 'gallery/head/smaller_heads/hello_kitty.png',
      citation: '"Pop! Sanrio" by pullip_junk is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true,
      title: 'Hello Kitty'
    },
    {
      url: 'gallery/head/smaller_heads/lego_head.png',
      citation: '"終於入手 LEGO Head  !!" by Super Flow 非常流暢 is licensed under CC BY-NC-ND 2.0.',
      overlapsWithNext: true,
      title: 'LEGO Head'
    },
    {
      url: 'gallery/head/smaller_heads/robot.png',
      citation: '"Friendly Robot" by firepile is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Robot'
    },
    {
      url: 'gallery/head/smaller_heads/skull_w_glasses.png',
      citation: '"Cheap Sunglasses" by erix! is licensed under CC BY 2.0.',
      overlapsWithNext: true,
      title: 'Cool Skull'
    },
    {
      url: 'gallery/head/smaller_heads/sad_pumpkin.png',
      citation: '"Vintage Beistle Jack-O-Lantern sad face" by riptheskull is licensed under CC BY-ND 2.0.',
      overlapsWithNext: false,
      title: 'Sad Jack-O-Lantern'
    }
  ],
  body: [
    {
      url: 'gallery/body/smaller_bodies/astronaut.png',
      citation: '"astronaut" by Oregon State University is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false,
      title: 'Astronaut'
    },
    {
      url: 'gallery/body/smaller_bodies/tuxedo.png',
      citation: '"Thick as Thieves tuxedo, Kent Wang marcella shirt" by Kent Wang is licensed under CC BY-SA 2.0.',
      overlapsWithNext: true,
      title: 'Spy'
    },
    {
      url: 'gallery/body/smaller_bodies/magician.png',
      citation: '"The Headless Magician" by Double--M is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Magician'
    },
     {
      url: 'gallery/body/smaller_bodies/king_penguin.png',
      citation: '"King Penguin Couple" by D-Stanley is licensed under CC BY 2.0.',
      overlapsWithNext: true,
      title: 'Penguin'
    },
    {
      url: 'gallery/body/smaller_bodies/tennis_player.png',
      citation: '"Tennis Player Sculpture, Thames Costal Walkway" by russellstreet is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false,
      title: 'Tennis Player'
    },
    {
      url: 'gallery/body/smaller_bodies/snowman.png',
      citation: '"Snowman Neighbor" by MGShelton is licensed under CC BY-NC 2.0.',
      overlapsWithNext: false,
      title: 'Snowman'
    }
  ],
  legs: [
    {
      url: 'gallery/legs/2.png',
      citation: '"Dance recital" by ChrisMillett12 is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Ballerina'
    },
    {
      url: 'gallery/legs/3.png',
      citation: '"Pinnoctopus cordiformis, Common octopus" by brian.gratwicke is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Octopus'
    },
    {
      url: 'gallery/legs/4.png',
      citation: '"Transformers Bumblebee Concept" by RoninKengo is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Bumblebee'
    },
    {
      url: 'gallery/legs/5.png',
      citation: '"Flamingos\' heart" by Omar.Bariffi is licensed under CC BY 2.0.',
      overlapsWithNext: false,
      title: 'Flamingo'
    },
    {
      url: 'gallery/legs/6.png',
      citation: '"CLOWN!" by The Glass Beehive* is licensed under CC BY-SA 2.0.',
      overlapsWithNext: false,
      title: 'Clown'
    }
  ]
};

const currentIndices = {
  head: 0,
  body: 0,
  legs: 0
};

const selections = {
  head: 0,
  body: 0,
  legs: 0
};

let activePart = 'head';


// Helper: Load image asynchronously
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Adjust/remove based on your server setup
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
    img.src = src;
  });
}

// Helper: Scale image while keeping aspect ratio
function scaleDimensions(img, maxHeight, maxWidth) {
  let height = maxHeight;
  let width = (img.width / img.height) * height;
  if (width > maxWidth) {
    width = maxWidth;
    height = width * (img.height / img.width);
  }
  return { width, height };
}

// Update displayed image for a part
function updateImage(part) {
  const imgElement = document.getElementById(`${part}-img`);
  imgElement.src = images[part][selections[part]].url;
  currentIndices[part] = selections[part];
  checkFinishReady();
}

// Enable finish button only if all parts selected
function checkFinishReady() {
  const ready = ['head', 'body', 'legs'].every(part => selections[part] !== null && selections[part] !== undefined);
  finishBtn.disabled = !ready;
}

// Highlight active part, blackout others
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

// Animate carousel for a given part
function animateCarousel(part) {
  const imagesArray = images[part];
  const imgElement = document.getElementById(`${part}-img`);
  let count = 0;
  const maxCycles = 30;
  const intervalMs = 50;
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      currentIndices[part] = (currentIndices[part] + 1) % imagesArray.length;
      imgElement.src = imagesArray[currentIndices[part]].url;
      count++;
      if (count >= maxCycles) {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * imagesArray.length);
        currentIndices[part] = randomIndex;
        imgElement.src = imagesArray[randomIndex].url;
        selections[part] = randomIndex;
        resolve(randomIndex);
      }
    }, intervalMs);
  });
}

async function drawFinalComposite() {
  const canvas = document.getElementById('final-canvas');
  const ctx = canvas.getContext('2d');

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxWidth = canvas.width * 0.9; // Leave horizontal padding

  // Positions of top-left corner for each part, Y to be computed
  const fixedPositions = {
    head: { x: canvas.width / 2, y: 0 },
    body: { x: canvas.width / 2, y: 0 },  // calculate below
    legs: { x: canvas.width / 2, y: 0 }   // calculate below
  };

  // Overlap ratios for vertical overlaps between parts
  const overlapRatios = {
    head_body: 0.8,  // 30% overlap between head and body
    body_legs: 0.15  // 40% overlap between body and legs
  };

  const headScale = 0.7; // Scale down head to 70% size

  // Order of parts to draw (top to bottom)
  const parts = ['head', 'body', 'legs'];

  // Load images asynchronously
  const loadedImages = {};
  for (const part of parts) {
    loadedImages[part] = await loadImage(images[part][selections[part]].url);
  }

  // Compute scaled dimensions for each image
  const scaledDims = {};
  for (const part of parts) {
    const img = loadedImages[part];
    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      width = maxWidth;
      height = width * (img.height / img.width);
    }

    if (part === 'head') {
      width *= headScale;
      height *= headScale;
    }

    scaledDims[part] = { width, height };
  }

  // Calculate vertical positions with overlaps
  fixedPositions.head.y = 0;

  fixedPositions.body.y = fixedPositions.head.y + scaledDims.head.height * (1 - overlapRatios.head_body);

  fixedPositions.legs.y = fixedPositions.body.y + scaledDims.body.height * (1 - overlapRatios.body_legs);

  // Compute total height needed for canvas
  const totalHeight = fixedPositions.legs.y + scaledDims.legs.height;
  if (totalHeight > canvas.height) {
    canvas.height = totalHeight;  // resize canvas height if necessary
  }

  // Draw images centered horizontally and stacked vertically with overlap
  for (const part of parts) {
    const pos = fixedPositions[part];
    const dim = scaledDims[part];
    const x = pos.x - dim.width / 2;  // horizontally center the image
    ctx.drawImage(loadedImages[part], x, pos.y, dim.width, dim.height);
  }

  console.log('Final composite drawn with proper overlap.');
}

// Show citations list
function showCitations() {
  const citationsList = document.getElementById('citations-list');
  citationsList.innerHTML = '';
  ['head', 'body', 'legs'].forEach(part => {
    const partData = images[part][selections[part]];
    if (!partData || !partData.citation) return;
    const li = document.createElement('li');
    li.textContent = partData.citation;
    citationsList.appendChild(li);
  });
  document.getElementById('citation-container').style.display = 'block';
}

async function generateQRCodeForFirebaseImage() {
  try {
    // Upload the canvas image to Firebase Storage and get download URL
    const downloadURL = await uploadCanvasImage();

    // Get references to QR code container and related elements
    const qrcodeDiv = document.getElementById('qrcode');
    const qrcodeContainer = document.getElementById('qr-container');
    const downloadLink = document.getElementById('download-link');

    // Clear previous QR code if any
    qrcodeDiv.innerHTML = '';

    // Generate QR code with the download URL
    new QRCode(qrcodeDiv, {
      text: downloadURL,
      width: 180,
      height: 180
    });

    // Update download link href for PNG download
    downloadLink.href = downloadURL;

    // Show the QR code container
    qrcodeContainer.style.display = 'block';

  } catch (error) {
    console.error('Error uploading image or generating QR code:', error);
    alert('Failed to upload image or generate QR code.');
  }
}

// Attach to your generate button
document.getElementById('generate-qr-btn').addEventListener('click', () => {
  generateQRCodeForFirebaseImage();
});

// Event listeners
document.querySelectorAll('.nav-arrow').forEach(button => {
  button.addEventListener('click', async () => {
    const part = button.dataset.part;
    document.querySelectorAll(`.nav-arrow[data-part="${part}"]`).forEach(b => b.disabled = true);
    try {
      await animateCarousel(part);
      updateImage(part);
      updateHighlight(part);
      checkFinishReady();
    } finally {
      document.querySelectorAll(`.nav-arrow[data-part="${part}"]`).forEach(b => b.disabled = false);
    }
  });
});

['head', 'body', 'legs'].forEach(part => {
  const section = document.getElementById(`${part}-section`);
  if(section) {
    section.addEventListener('click', () => updateHighlight(part));
  }
});

finishBtn.addEventListener('click', async () => {
  ['head-section', 'body-section', 'legs-section'].forEach(id =>
    document.getElementById(id).style.display = 'none'
  );
  finishBtn.style.display = 'none';

  const finalCanvas = document.getElementById('final-canvas');
  finalCanvas.style.display = 'block';

  restartBtn.style.display = 'block';

  try {
    await drawFinalComposite();
    showCitations();
    await generateQRCodeForFirebaseImage();
  } catch(e) {
    console.error('Error drawing or processing:', e);
    alert('There was an error generating the final image.');
  }
});

restartBtn.addEventListener('click', () => {
  selections.head = 0;
  selections.body = 0;
  selections.legs = 0;

  document.getElementById('final-canvas').style.display = 'none';
  restartBtn.style.display = 'none';

  document.getElementById('qr-container').style.display = 'none';
  document.getElementById('qrcode').innerHTML = '';
  document.getElementById('citation-container').style.display = 'none';
  document.getElementById('citations-list').innerHTML = '';

  ['head-section', 'body-section', 'legs-section'].forEach(id =>
    document.getElementById(id).style.display = ''
  );

  finishBtn.style.display = '';
  finishBtn.disabled = true;

  ['head', 'body', 'legs'].forEach(updateImage);
  updateHighlight('head');
});

console.log(firebase.app().options.projectId);
console.log(firebase.app().options.storageBucket);
console.log(firebase.app().options.appId);
console.log(firebase.app().options.measurementId);
console.log(firebase.app().options.apiKey);