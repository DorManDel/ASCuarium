/* =========================================================
   🌊 DORUTILS ASCII AQUARIUM BG — SCRIPT
   =========================================================

   Full-page animated ASCII aquarium.

   Features:
   01. JS-generated fish, shark, swordfish, seaweed and bubbles
   02. Depth system from 1 to 5
   03. Settings popup
   04. Sliders regenerate amount / speed / tone

   ========================================================= */


/* =========================================================
   01. DOM REFERENCES
   ========================================================= */

const aquarium = document.getElementById("aquarium");

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

const fishAmountInput = document.getElementById("fishAmount");
const bubbleAmountInput = document.getElementById("bubbleAmount");
const depthStrengthInput = document.getElementById("depthStrength");
const speedControlInput = document.getElementById("speedControl");
const waterToneInput = document.getElementById("waterTone");

const fishAmountValue = document.getElementById("fishAmountValue");
const bubbleAmountValue = document.getElementById("bubbleAmountValue");
const depthStrengthValue = document.getElementById("depthStrengthValue");
const speedControlValue = document.getElementById("speedControlValue");
const waterToneValue = document.getElementById("waterToneValue");

const applySettings = document.getElementById("applySettings");
const resetSettings = document.getElementById("resetSettings");


/* =========================================================
   02. ASCII ART LIBRARY
   ========================================================= */

const ASCII = {
  fishSmall: `><(((º>`,
  fishTiny: `><>`,
  fishBlue: `<º)))><`,

  swordfish: `
          /\\\\
<========(  )><
          \\\\/`,

  shark: `
                          @@@
                             @@
@@                        @@   @
@@@@                      @     @
 @  @                     @@     @
 @   @                   @        @@@@@@@
 @   @@                 @                   @@@
@@    @@     @@@@@@@@@@@                       @ @@@@@
        @@@@@                                        @@@
  @@                                        @@@@@ +%      @@
  @@ @@@@@@@@                              @ @@@            %
 @@  @         @  @@@@@@       @          @@@ @   @@@@@@ @@@@
 @@ @         @@ @       @@@@@@@       @@@@@@@@@@ @@@@@
   @            @              @     @@         @@@
                             @@     @
                            @     @@
                             @@@ @`,

  seaweedA: `
  )\\\\
 (  )
  )(
 (  )
  )(
 /  \\\\`,

  seaweedB: `
   /
  /)
 (/
  )\\\\
 /  )
(  /`
};


/* =========================================================
   03. FISH BLUEPRINTS
   ========================================================= */

const fishBlueprints = [
  { art: ASCII.fishSmall, tint: "tint-yellow" },
  { art: ASCII.fishTiny,  tint: "tint-blue" },
  { art: ASCII.fishBlue,  tint: "tint-blue" },
  { art: ASCII.fishTiny,  tint: "tint-pink" },
  { art: ASCII.swordfish, tint: "tint-silver" }
];


/* =========================================================
   04. HELPERS
   ========================================================= */

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function clearGeneratedElements() {
  const generatedElements = aquarium.querySelectorAll(".generated");
  generatedElements.forEach((element) => element.remove());
}

function updateValueLabels() {
  fishAmountValue.textContent = fishAmountInput.value;
  bubbleAmountValue.textContent = bubbleAmountInput.value;
  depthStrengthValue.textContent = depthStrengthInput.value;
  speedControlValue.textContent = `${speedControlInput.value}%`;
  waterToneValue.textContent = waterToneInput.value;
}


/* =========================================================
   05. DEPTH / COLOR LOGIC
   ========================================================= */

function getDepthByStrength() {
  const strength = Number(depthStrengthInput.value);
  const randomDepth = randomInt(1, 5);

  if (strength < 20) return 4;
  if (strength < 45) return randomInt(3, 5);
  if (strength < 75) return randomDepth;

  return Math.random() > 0.55 ? randomInt(1, 2) : randomDepth;
}

function applyWaterTone() {
  const tone = Number(waterToneInput.value);

  const lightOpacity = 0.20 + tone / 220;
  const midBlue = tone < 50 ? "#0e3f66" : "#12547f";
  const deepBlue = tone < 50 ? "#03111f" : "#04192a";

  aquarium.style.setProperty("--water-light", `rgba(83, 185, 255, ${lightOpacity})`);
  aquarium.style.setProperty("--water-mid", midBlue);
  aquarium.style.setProperty("--water-deep", deepBlue);
}

function getDuration(baseMin, baseMax) {
  const speed = Number(speedControlInput.value);
  const speedMultiplier = 100 / speed;

  return `${randomBetween(baseMin, baseMax) * speedMultiplier}s`;
}


/* =========================================================
   06. CREATE ASCII ELEMENT
   ========================================================= */

function createAsciiElement(config) {
  const element = document.createElement("pre");

  element.className = `generated ascii depth-${config.depth} ${config.tint || ""} ${config.direction || ""}`;
  element.textContent = config.art.trim();

  element.style.top = config.top;
  element.style.animationDuration = config.duration;
  element.style.animationDelay = config.delay;

  aquarium.appendChild(element);
}


/* =========================================================
   07. CREATE RANDOM FISH
   ========================================================= */

function createRandomFish() {
  const fish = pickRandom(fishBlueprints);
  const direction = Math.random() > 0.5 ? "swim-right" : "swim-left";

  createAsciiElement({
    art: fish.art,
    tint: fish.tint,
    direction,
    depth: getDepthByStrength(),
    top: `${randomBetween(8, 88)}vh`,
    duration: getDuration(18, 48),
    delay: `${randomBetween(-40, 0)}s`
  });
}


/* =========================================================
   08. CREATE SHARK
   ========================================================= */

function createShark() {
  createAsciiElement({
    art: ASCII.shark,
    tint: "tint-shark",
    direction: "swim-left",
    depth: 1,
    top: `${randomBetween(30, 62)}vh`,
    duration: getDuration(56, 82),
    delay: `${randomBetween(-50, -8)}s`
  });
}


/* =========================================================
   09. CREATE PLANTS
   ========================================================= */

function createPlant(art, left, depth, deep = false) {
  const element = document.createElement("pre");

  element.className = `generated ascii seaweed depth-${depth} ${deep ? "deep" : ""}`;
  element.textContent = art.trim();
  element.style.left = left;
  element.style.animationDuration = `${randomBetween(2.8, 5.2)}s`;
  element.style.animationDelay = `${randomBetween(-3, 0)}s`;

  aquarium.appendChild(element);
}

function createPlants() {
  createPlant(ASCII.seaweedA, "5%", 5);
  createPlant(ASCII.seaweedB, "14%", 4);
  createPlant(ASCII.seaweedA, "42%", 2, true);
  createPlant(ASCII.seaweedB, "61%", 1, true);
  createPlant(ASCII.seaweedA, "74%", 3);
  createPlant(ASCII.seaweedB, "88%", 5);
}


/* =========================================================
   10. CREATE BUBBLES
   ========================================================= */

function createBubble() {
  const bubble = document.createElement("span");

  const size = randomBetween(4, 20);
  const left = randomBetween(0, 100);
  const duration = randomBetween(7, 18);
  const delay = randomBetween(-18, 0);
  const opacity = randomBetween(0.25, 0.75);

  bubble.className = "generated bubble";
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.opacity = opacity;

  aquarium.appendChild(bubble);
}


/* =========================================================
   11. RENDER AQUARIUM
   ========================================================= */

function renderAquarium() {
  clearGeneratedElements();
  applyWaterTone();

  const fishAmount = Number(fishAmountInput.value);
  const bubbleAmount = Number(bubbleAmountInput.value);

  for (let i = 0; i < fishAmount; i++) {
    createRandomFish();
  }

  createShark();
  createPlants();

  for (let i = 0; i < bubbleAmount; i++) {
    createBubble();
  }
}


/* =========================================================
   12. SETTINGS PANEL EVENTS
   ========================================================= */

function openSettings() {
  settingsPanel.classList.add("open");
}

function closeSettingsPanel() {
  settingsPanel.classList.remove("open");
}

function resetToDefaults() {
  fishAmountInput.value = 12;
  bubbleAmountInput.value = 36;
  depthStrengthInput.value = 65;
  speedControlInput.value = 100;
  waterToneInput.value = 45;

  updateValueLabels();
  renderAquarium();
}

settingsToggle.addEventListener("click", openSettings);
closeSettings.addEventListener("click", closeSettingsPanel);

applySettings.addEventListener("click", () => {
  updateValueLabels();
  renderAquarium();
});

resetSettings.addEventListener("click", resetToDefaults);

[
  fishAmountInput,
  bubbleAmountInput,
  depthStrengthInput,
  speedControlInput,
  waterToneInput
].forEach((input) => {
  input.addEventListener("input", updateValueLabels);
});


/* =========================================================
   13. START PROJECT
   ========================================================= */

updateValueLabels();
renderAquarium();
