/* =========================================================
   🧠 SCRIPT MAP / HOW THIS FILE IS BUILT 🗺️
   =========================================================

   01. DOM REFERENCES
       Gets HTML elements by id.
       Example: settings panel, sliders, aquarium container.

   02. DEFAULT SETTINGS
       One object that controls the default aquarium values.
       If you want to change startup values, change them here.

   03. ASCII ART LIBRARY
       Stores all creature and plant ASCII drawings.

   04. FISH ARSENAL
       List of fish types.
       Each fish has name, art, color, behavior and direction info.

   05. HELPERS
       Small reusable functions:
       random numbers, random picker, clear generated objects.

   06. DEPTH / COLOR LOGIC
       Decides how far/close fish look and changes water tone.

   07. ASCII ELEMENT FACTORY
       Creates <pre> elements and places them in the aquarium.

   08. FISH MANAGER
       Creates fish from the arsenal and controls fish behavior.

   09. SEAWEED MANAGER
       Creates plants, seaweed and bottom decorations.

   10. BUBBLE MANAGER
       Creates animated bubbles.

   11. RENDER ENGINE
       Clears old objects and regenerates the full aquarium.

   12. SETTINGS EVENTS
       Handles popup open/close, sliders, apply/reset buttons.

   13. PROJECT START
       Updates labels and renders the first aquarium.

   ========================================================= */

/* 01. DOM REFERENCES */

const aquarium = document.getElementById("aquarium");
const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

/* 02. ASCII ART LIBRARY */

const ASCII = {
  fishSmall: `><(((º>`,
  fishTiny: `><>`,
  fishBlue: `<º)))><`,
  hammerfish: `
          /\\
<========(  )><
          \\/
          `,
  swordfish: `
                                                
             %%%                      
             %%                       
            %%%%@%%%%%%#%      %%%#   
  #####%%%%%%%%@%#% %%%#%%%%% #%%#    
        %%%  %%% %% %% %%%%%%%%%%     
             %%             %%%%@     
               %             %%%%     
                                      
                 
          `,
  shark: `
                          
                            @@
@@                        @@   @
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
  )\\
 (  )
  )(
 (  )
  )(
 /  \\`,
  seaweedB: `
   /
  /)
 (/
  )\\
 /  )
(  /`
};
/* =========================================================
  { art: ASCII.fishTiny, classes: "tint-blue swim-right", top: "36vh", duration: "31s", delay: "-12s", depth: 2 },
  { art: ASCII.fishBlue, classes: "tint-blue swim-left", top: "50vh", duration: "28s", delay: "-9s", depth: 3 },
  { art: ASCII.fishTiny, classes: "tint-pink swim-left", top: "67vh", duration: "36s", delay: "-18s", depth: 1 },
  { art: ASCII.swordfish, classes: "tint-silver swim-right", top: "27vh", duration: "34s", delay: "-7s", depth: 3 },
  { art: ASCII.swordfish, classes: "tint-silver swim-left", top: "74vh", duration: "42s", delay: "-24s", depth: 2 },
  { art: ASCII.shark, classes: "tint-shark swim-left", top: "40vh", duration: "56s", delay: "-20s", depth: 1 },
  { art: ASCII.fishSmall, classes: "tint-yellow swim-right", top: "82vh", duration: "22s", delay: "-14s", depth: 5 },
  { art: ASCII.fishBlue, classes: "tint-blue swim-left", top: "12vh", duration: "39s", delay: "-2s", depth: 2 },
  { art: ASCII.fishTiny, classes: "tint-pink swim-right", top: "59vh", duration: "26s", delay: "-17s", depth: 4 }
];

*/


/* =========================================================
   04. PLANT DATA
   ========================================================= */

const plants = [
  { art: ASCII.seaweedA, left: "5%",  depth: 5 },
  { art: ASCII.seaweedB, left: "14%", depth: 4 },
  { art: ASCII.seaweedA, left: "74%", depth: 3 },
  { art: ASCII.seaweedB, left: "88%", depth: 5 },
  { art: ASCII.seaweedA, left: "42%", depth: 2, deep: true },
  { art: ASCII.seaweedB, left: "61%", depth: 1, deep: true }
];

/* =========================================================
   05. HELPER: RANDOM NUMBER
   ========================================================= */

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/* =========================================================
   06. CREATE ASCII ELEMENT
   ========================================================= */

function createAsciiElement(item) {
  const element = document.createElement("pre");

  element.className = `ascii depth-${item.depth} ${item.classes || ""}`;
  element.textContent = item.art.trim();

  if (item.top) element.style.top = item.top;
  if (item.left) element.style.left = item.left;
  if (item.right) element.style.right = item.right;
  if (item.duration) element.style.animationDuration = item.duration;
  if (item.delay) element.style.animationDelay = item.delay;

  aquarium.appendChild(element);
}

/* =========================================================
   07. CREATE PLANT
   ========================================================= */

function createPlant(item) {
  const element = document.createElement("pre");

  element.className = `ascii seaweed depth-${item.depth} ${item.deep ? "deep" : ""}`;
  element.textContent = item.art.trim();
  element.style.left = item.left;
  element.style.animationDelay = `${randomBetween(-3, 0)}s`;

  aquarium.appendChild(element);
}


/* =========================================================
   08. CREATE BUBBLE
   ========================================================= */

function createBubble() {
  const bubble = document.createElement("span");

  const size = randomBetween(4, 20);
  const left = randomBetween(0, 100);
  const duration = randomBetween(7, 18);
  const delay = randomBetween(-18, 0);
  const opacity = randomBetween(0.25, 0.75);

  bubble.className = "bubble";
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;
  bubble.style.opacity = opacity;

  aquarium.appendChild(bubble);
}

/* =========================================================
   09. SETTINGS PANEL
   ========================================================= */

function openSettings() {
  settingsPanel.classList.add("open");
}

function closeSettingsPanel() {
  settingsPanel.classList.remove("open");
}

settingsToggle.addEventListener("click", openSettings);
closeSettings.addEventListener("click", closeSettingsPanel);

/* Close on pressing outside popup */
document.addEventListener("click", (event) => {
  const clickedInsidePanel = settingsPanel.contains(event.target);
  const clickedSettingsButton = settingsToggle.contains(event.target);

  if (!clickedInsidePanel && !clickedSettingsButton) {
    closeSettingsPanel();
  }
});

/* =========================================================
   10. RENDER AQUARIUM
   ========================================================= */

function renderAquarium() {
  creatures.forEach(createAsciiElement);
  plants.forEach(createPlant);

  for (let i = 0; i < 28; i++) {
    createBubble();
  }
}

renderAquarium();