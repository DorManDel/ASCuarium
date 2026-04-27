/* =========================================================
   🌊 ASCuarium — MAIN SCRIPT
   =========================================================
   Full-page animated ASCII aquarium.

   FILE MAP:
   01. DOM References
   02. Default Settings
   03. ASCII Art Library
   04. Fish Arsenal
   05. Seaweed Arsenal
   06. Helpers
   07. Depth / Water Logic
   08. ASCII Element Factory
   09. Fish Manager
   10. Seaweed Manager
   11. Bubble Manager
   12. Render Engine
   13. Settings Events
   14. Project Start
   ========================================================= */


/* =========================================================
   01. DOM REFERENCES
   ========================================================= */

const aquarium = document.getElementById("aquarium");

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

const fishAmountInput = document.getElementById("fishAmount");
const fishVarietyInput = document.getElementById("fishVariety");
const bubbleAmountInput = document.getElementById("bubbleAmount");
const depthStrengthInput = document.getElementById("depthStrength");
const speedControlInput = document.getElementById("speedControl");
const waterToneInput = document.getElementById("waterTone");

const fishAmountValue = document.getElementById("fishAmountValue");
const fishVarietyValue = document.getElementById("fishVarietyValue");
const bubbleAmountValue = document.getElementById("bubbleAmountValue");
const depthStrengthValue = document.getElementById("depthStrengthValue");
const speedControlValue = document.getElementById("speedControlValue");
const waterToneValue = document.getElementById("waterToneValue");

const fishToggleList = document.getElementById("fishToggleList");

const applySettings = document.getElementById("applySettings");
const resetSettings = document.getElementById("resetSettings");

const seaweedAmountInput = document.getElementById("seaweedAmount");
const seaweedAmountValue = document.getElementById("seaweedAmountValue");


/* =========================================================
   02. DEFAULT SETTINGS
   ========================================================= */

const DEFAULT_SETTINGS = {
  fishAmount: 12,
  bubbleAmount: 36,
  depthStrength: 65,
  speed: 100,
  seaweedAmount: 8,
  fishVariety: 15,
  waterTone: 45
};

/* USER PREFS:
   Saves slider values into localStorage.
   Loaded once on page start before renderAquarium().
*/
const STORAGE_KEY = "ascuarium-user-settings";

function saveUserSettings() {
  const settings = {
    fishAmount: fishAmountInput.value,
    fishVariety: fishVarietyInput.value,
    bubbleAmount: bubbleAmountInput.value,
    seaweedAmount: seaweedAmountInput.value,
    depthStrength: depthStrengthInput.value,
    speed: speedControlInput.value,
    waterTone: waterToneInput.value
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function loadUserSettings() {
  const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedSettings) return;

  fishAmountInput.value = savedSettings.fishAmount ?? DEFAULT_SETTINGS.fishAmount;
  fishVarietyInput.value = savedSettings.fishVariety ?? DEFAULT_SETTINGS.fishVariety;
  bubbleAmountInput.value = savedSettings.bubbleAmount ?? DEFAULT_SETTINGS.bubbleAmount;
  seaweedAmountInput.value = savedSettings.seaweedAmount ?? DEFAULT_SETTINGS.seaweedAmount;
  depthStrengthInput.value = savedSettings.depthStrength ?? DEFAULT_SETTINGS.depthStrength;
  speedControlInput.value = savedSettings.speed ?? DEFAULT_SETTINGS.speed;
  waterToneInput.value = savedSettings.waterTone ?? DEFAULT_SETTINGS.waterTone;
}


/* =========================================================
   03. ASCII ART LIBRARY
   ========================================================= */

const ASCII = {
  fishSmall: `><(((º>`,
  fishTiny: `><>`,
  fishBlue: `><(((º>`,
  pufferFish: `><(((●)>`,

  pufferFishPuffed: `
           @% :%
          #    .#%%%%%%%%%%%@@
  @@     %   %%#              %%@
 @   %%  @%%%  %%#      .%@@     %@
 @    %%%     %%  =%   ..@@=     %@
@             %%             %%%%%%@
%     ....    .#  -%               %
 @%   %@%%      #*                 %
  %*@    %                       :@
          %.                    -@
           @%                  %@
             @%%@          %%%@
                @@%%%%%%%%@`,
  hanFish: `>=[==º>`,
  katanaFish: `───╼===(º)>`,
  angelFish: `><))°>`,
  roundFish: `><((●>`,
  needleFish: `><(((º>──`,
  deadfish: `><)))*>`,
  anglerFish: `
    _
   |_\\
  |>(_')
    |_/`,
  tunaFish: `
      ___.-*"\\
    (     -((( *>
     "*-._/`,


  swordfish: `
   /\\
<=(  )><
   \\/`,

  hammerFish: `
          /\\\\
<========(  )><
          \\\\/`,

  shark: `
                          
                            @@
@@                         @   @
@  @                      @     @
 @  @                     @@     @
 @   @                   @        @@@@@@@
 @   @@                 @                   @@@
  @    @@     @@@@@@@@@@@                       @ @@@@@
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
(  /`,

  seaweedTall: `
   |
  /|
 ( |
  \\|
   |
  /|
 ( |
  \\|`,

  seaweedCoral: `
 \\ | /
-- * --
 / | \\`,

  seaweedLong: `
   ||
  )||
 ( ||
  )||
 ( ||
  )||
 / ||`,

  seaweedWave: `
  ///
 (((
 )))
 (((
 )))
///`,

  coralPink: `
 \\|/
--*--
 /|\\`,

  coralOrange: `
  Y
 \\|/
--+--
 / \\`,
  sandPatch: `0o. .o0  ° . 0o.   .o  . °`
};


/* =========================================================
   04. FISH ARSENAL
   ---------------------------------------------------------
   This is the fish database.

   name     = readable name
   art      = ASCII drawing
   tint     = CSS color class
   face     = natural direction of ASCII art: right / left
   behavior = normal / puffer / special
   ========================================================= */

const fishArsenal = [
  {
    name: "Small Fish",
    art: ASCII.fishSmall,
    tint: "tint-yellow",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Tiny Fish",
    art: ASCII.fishTiny,
    tint: "tint-blue",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Blue Fish",
    art: ASCII.fishBlue,
    tint: "tint-blue",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Puffer Fish",
    art: ASCII.pufferFish,
    tint: "tint-orange",
    face: "right",
    behavior: "puffer"
  },
  {
    name: "Hammer Fish",
    art: ASCII.hammerFish,
    tint: "tint-cyan",
    face: "left",
    behavior: "normal"
  },
  {
    name: "Han Fish",
    art: ASCII.hanFish,
    tint: "tint-cyan",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Katana Fish",
    art: ASCII.katanaFish,
    tint: "tint-silver",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Swordfish",
    art: ASCII.swordfish,
    tint: "tint-silver",
    face: "left",
    behavior: "special"
  },
  {
    name: "Angel Fish",
    art: ASCII.angelFish,
    tint: "tint-purple",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Round Fish",
    art: ASCII.roundFish,
    tint: "tint-lime",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Needle Fish",
    art: ASCII.needleFish,
    tint: "tint-red",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Dead Fish",
    art: ASCII.deadfish,
    tint: "tint-red",
    face: "right",
    behavior: "normal"
  },
  {
    name: "Angler Fish",
    art: ASCII.anglerFish,
    tint: "tint-purple",
    face: "left",
    behavior: "special"
  }, {
    name: "Tuna Fish",
    art: ASCII.tunaFish,
    tint: "tint-silver",
    face: "right",
    behavior: "special"
  }
];


/* =========================================================
   05. SEAWEED ARSENAL
   ========================================================= */

const seaweedArsenal = [
  { name: "Classic Seaweed", art: ASCII.seaweedA, className: "seaweed-classic" },
  { name: "Curly Seaweed", art: ASCII.seaweedB, className: "seaweed-curly" },
  { name: "Tall Seaweed", art: ASCII.seaweedTall, className: "seaweed-tall" },
  { name: "Long Seaweed", art: ASCII.seaweedLong, className: "seaweed-long" },
  { name: "Wave Seaweed", art: ASCII.seaweedWave, className: "seaweed-wave" },
  { name: "Pink Coral", art: ASCII.coralPink, className: "coral-pink" },
  { name: "Orange Coral", art: ASCII.coralOrange, className: "coral-orange" }
];


/* =========================================================
   06. HELPERS
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
  seaweedAmountValue.textContent = seaweedAmountInput.value;
  fishVarietyValue.textContent = fishVarietyInput.value;
}

/* =========================================================
   FISH PICKER UI
   ---------------------------------------------------------
   Builds checkbox list from fishArsenal.
   Each fish gets:
   - checkbox
   - readable name
   - ASCII preview
   ========================================================= */

function renderFishToggleList() {
  fishToggleList.innerHTML = "";

  fishArsenal.forEach((fish, index) => {
    const row = document.createElement("div");
    row.className = "fish-toggle-item";

    row.innerHTML = `
      <label>
        <input
          type="checkbox"
          class="fish-toggle"
          value="${index}"
          checked
        />
        ${fish.name}
      </label>

      <pre class="fish-preview">${fish.art.trim()}</pre>
    `;

    fishToggleList.appendChild(row);
  });
}


/* =========================================================
   07. DEPTH / WATER LOGIC
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
   08. ASCII ELEMENT FACTORY
   ========================================================= */

function createAsciiElement(config) {
  const element = document.createElement("pre");

  element.className = [
    "generated",
    "ascii",
    `depth-${config.depth}`,
    config.tint || "",
    config.swimClass || "",
    config.flipClass || "",
    config.behaviorClass || "",
    config.extraClass || ""
  ].join(" ");

  element.textContent = config.art.trim();

  if (config.top) element.style.top = config.top;
  if (config.left) element.style.left = config.left;
  if (config.duration) element.style.animationDuration = config.duration;
  if (config.delay) element.style.animationDelay = config.delay;

  aquarium.appendChild(element);

  /* added for puffer fish clickable - get puffed when expand */

  if (config.behaviorClass === "puffer-fish") {
    element.classList.add("clickable-fish");
    element.dataset.puffed = "false";
    element.dataset.normalArt = config.art.trim();
    element.dataset.puffedArt = ASCII.pufferFishPuffed.trim();

    function puffUp() {
      element.textContent = element.dataset.puffedArt;
      element.classList.add("puffed");
      element.dataset.puffed = "true";
    }

    function popDown() {
      element.textContent = element.dataset.normalArt;
      element.classList.remove("puffed");
      element.dataset.puffed = "false";

      const pop = document.createElement("span");
      pop.className = "generated pop-text";
      pop.textContent = "POP!";
      pop.style.left = "50%";
      pop.style.top = element.style.top || "50%";
      aquarium.appendChild(pop);

      setTimeout(() => pop.remove(), 700);
    }

    setTimeout(puffUp, randomBetween(1500, 6000));

    element.addEventListener("click", (event) => {
      event.stopPropagation();

      if (element.dataset.puffed === "true") {
        popDown();
      }
    });
  }
}


/* =========================================================
   09. FISH MANAGER
   ---------------------------------------------------------
   Fish direction mechanics:

   swimClass:
   - controls movement direction only

   flipClass:
   - controls visual direction only

   Example:
   fish faces right + swims left = needs flip
   fish faces left  + swims left = no flip
   ========================================================= */

const FishManager = {
  getRandomSwimDirection() {
    return Math.random() > 0.5 ? "right" : "left";
  },

  getSwimClass(swimDirection) {
    return swimDirection === "right" ? "swim-right" : "swim-left";
  },

  getFlipClass(fish, swimDirection) {
    const fishFacesRight = fish.face === "right";
    const swimsRight = swimDirection === "right";

    return fishFacesRight === swimsRight ? "" : "flip-fish";
  },

  getBehaviorClass(fish) {
    if (fish.behavior === "puffer") return "puffer-fish";
    if (fish.behavior === "special") return "special-fish";

    return "";
  },

  createFish() {
    const varietyLimit = Number(fishVarietyInput.value);

    const enabledIndexes = [...document.querySelectorAll(".fish-toggle:checked")]
      .map((box) => Number(box.value));

    const enabledFish = fishArsenal.filter((_, i) => enabledIndexes.includes(i));

    const activeFishPool = enabledFish.slice(0, varietyLimit);

    const fish = pickRandom(activeFishPool.length ? activeFishPool : fishArsenal);
    const swimDirection = this.getRandomSwimDirection();

    createAsciiElement({
      art: fish.art,
      tint: fish.tint,
      swimClass: this.getSwimClass(swimDirection),
      flipClass: this.getFlipClass(fish, swimDirection),
      behaviorClass: this.getBehaviorClass(fish),
      depth: getDepthByStrength(),
      top: `${randomBetween(8, 82)}vh`,
      duration: getDuration(18, 48),
      delay: `${randomBetween(-40, 0)}s`
    });
  },

  createSpecificFish(fishName) {
    const fish = fishArsenal.find((item) => item.name === fishName);

    if (!fish) return;

    const swimDirection = this.getRandomSwimDirection();

    createAsciiElement({
      art: fish.art,
      tint: fish.tint,
      swimClass: this.getSwimClass(swimDirection),
      flipClass: this.getFlipClass(fish, swimDirection),
      behaviorClass: this.getBehaviorClass(fish),
      depth: getDepthByStrength(),
      top: `${randomBetween(18, 70)}vh`,
      duration: getDuration(22, 42),
      delay: `${randomBetween(-20, 0)}s`
    });
  },

  createSchool(amount) {
    for (let i = 0; i < amount; i++) {
      this.createFish();
    }
  },

  createShark() {
    createAsciiElement({
      art: ASCII.shark,
      tint: "tint-shark",
      swimClass: "swim-left",
      flipClass: "",
      behaviorClass: "shark-fish",
      depth: 1,
      top: `${randomBetween(30, 62)}vh`,
      duration: getDuration(56, 82),
      delay: `${randomBetween(-50, -8)}s`
    });
  }
};


/* =========================================================
   10. SEAWEED MANAGER
   ========================================================= */

const SeaweedManager = {
  createSeaweed(plant, left, depth, deep = false) {
    createAsciiElement({
      art: plant.art,
      tint: "",
      swimClass: "",
      flipClass: "",
      behaviorClass: "",
      extraClass: `seaweed ${plant.className} ${deep ? "deep" : ""}`,
      depth,
      left,
      duration: `${randomBetween(2.8, 5.2)}s`,
      delay: `${randomBetween(-3, 0)}s`
    });
  },

  createSeaweedField() {
    const amount = Number(seaweedAmountInput.value);

    for (let i = 0; i < amount; i++) {
      const plant = pickRandom(seaweedArsenal);
      const left = `${randomBetween(2, 96)}%`;
      const depth = randomInt(1, 5);
      const deep = depth <= 2;

      this.createSeaweed(plant, left, depth, deep);
    }
  }
};

/* CREATE SAND */
function createSandPatch() {
  const sand = document.createElement("pre");

  sand.className = "generated ascii sand-patch";
  sand.textContent = ASCII.sandPatch;
  sand.style.left = `${randomBetween(0, 95)}%`;
  sand.style.bottom = `${randomBetween(-1, 1)}vh`;

  aquarium.appendChild(sand);
}

/* =========================================================
   11. BUBBLE MANAGER
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
   12. RENDER ENGINE
   ========================================================= */

function renderAquarium() {
  clearGeneratedElements();
  applyWaterTone();

  const fishAmount = Number(fishAmountInput.value);
  const bubbleAmount = Number(bubbleAmountInput.value);

  FishManager.createSchool(fishAmount);
  /* Promise Shark & Puffer to appear */
  FishManager.createShark();
  FishManager.createSpecificFish("Puffer Fish");
  SeaweedManager.createSeaweedField();

  /* Create Sand Loop */
  for (let i = 0; i < 18; i++) {
    createSandPatch();
  }

  /* Create Bubble Loop */
  for (let i = 0; i < bubbleAmount; i++) {
    createBubble();
  }
}


/* =========================================================
   13. SETTINGS EVENTS
   ========================================================= */

function openSettings() {
  settingsPanel.classList.add("open");
}

function closeSettingsPanel() {
  settingsPanel.classList.remove("open");
}

function resetToDefaults() {
  fishAmountInput.value = DEFAULT_SETTINGS.fishAmount;
  bubbleAmountInput.value = DEFAULT_SETTINGS.bubbleAmount;
  depthStrengthInput.value = DEFAULT_SETTINGS.depthStrength;
  speedControlInput.value = DEFAULT_SETTINGS.speed;
  waterToneInput.value = DEFAULT_SETTINGS.waterTone;
  seaweedAmountInput.value = DEFAULT_SETTINGS.seaweedAmount;
  fishVarietyInput.value = DEFAULT_SETTINGS.fishVariety;

  localStorage.removeItem(STORAGE_KEY);

  updateValueLabels();
  renderAquarium();
}

settingsToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  openSettings();
});

closeSettings.addEventListener("click", (event) => {
  event.stopPropagation();
  closeSettingsPanel();
});

settingsPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  closeSettingsPanel();
});

applySettings.addEventListener("click", () => {
  updateValueLabels();
  /* added for SavedUserPrefs*/
  saveUserSettings();
  renderAquarium();
});

resetSettings.addEventListener("click", resetToDefaults);

[
  fishAmountInput,
  bubbleAmountInput,
  seaweedAmountInput,
  depthStrengthInput,
  speedControlInput,
  fishVarietyInput,
  waterToneInput
].forEach((input) => {
  input.addEventListener("input", updateValueLabels);
});


/* =========================================================
   14. PROJECT START
   ========================================================= */

loadUserSettings();
updateValueLabels();
renderFishToggleList();
renderAquarium();