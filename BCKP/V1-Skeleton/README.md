Commands / Things Used / What They Do
HTML commands / tags
Command / Tag	What it does	Alternative
<!DOCTYPE html>	Tells the browser this is an HTML5 document.	None, always use it.
<html lang="en">	Root of the page. lang helps accessibility and search engines.	lang="he" for Hebrew pages.
<head>	Holds page metadata, title, CSS links, etc.	None.
<meta charset="UTF-8">	Allows normal text symbols, emojis, ASCII, Hebrew, etc.	Usually no alternative needed.
<meta name="viewport">	Makes the page responsive on mobile.	None for modern responsive pages.
<title>	Text shown in the browser tab.	None.
<link rel="stylesheet" href="style.css">	Connects the external CSS file.	Use internal <style> block.
<body>	Holds the visible page content.	None.
<main>	Main content area of the page.	<div>, but <main> is more semantic.
<section>	A logical section of the page.	<div>, but <section> is more meaningful.
<article>	Independent content block, used here for note cards.	<div>.
<h1>	Main page title.	<h2>, <p>, but h1 is correct for the main title.
<p>	Paragraph text.	<div> or <span>, depending on use.
<div>	Generic container.	Semantic tags like <main>, <section>, <article>.
<script src="script.js"></script>	Connects the external JavaScript file.	Internal <script> block.
<pre>	Preserves spaces and line breaks. Perfect for ASCII art.	<div> with white-space: pre, but <pre> is cleaner.
<span>	Small inline element. Used here for bubbles.	<div>, but span is lightweight.
CSS commands / properties
Command / Property	What it does	Alternative
box-sizing: border-box	Makes width/height include padding and border. Easier layouts.	Default is content-box.
margin: 0	Removes browser default spacing.	CSS reset file.
min-height: 100vh	Makes body at least full screen height.	height: 100vh.
display: flex	Enables flexible layout.	display: grid.
align-items: center	Centers items vertically in flex.	With grid: place-items: center.
justify-content: center	Centers items horizontally in flex.	With grid: place-items: center.
background	Sets page or element background.	background-color, background-image.
radial-gradient()	Circular gradient effect.	linear-gradient().
linear-gradient()	Smooth gradient in a direction.	Solid color or image background.
color	Text color.	Can use CSS variables.
font-family	Selects font.	Import Google Fonts.
overflow: hidden	Hides content that leaves the box.	overflow: auto or scroll.
width: min(1120px, 95vw)	Uses the smaller value. Keeps layout responsive.	max-width: 1120px; width: 95vw;.
padding	Inner spacing.	margin for outer spacing.
border-radius	Rounded corners.	No alternative except SVG/clip-path.
rgba()	Color with opacity.	Hex with alpha like #ffffff22.
border	Adds outline border.	outline.
box-shadow	Adds shadow/glow.	filter: drop-shadow().
backdrop-filter: blur()	Frosted glass effect.	Transparent background without blur.
text-align: center	Centers text.	Flex/Grid alignment for blocks.
letter-spacing	Space between letters.	None direct.
font-size: clamp()	Responsive font size with min/preferred/max.	Media queries.
text-shadow	Glow/shadow for text.	filter: drop-shadow().
position: relative	Allows absolute children to position inside it.	Static layout, but not for this aquarium.
position: absolute	Places element freely inside relative parent.	CSS Grid/Flex, but not ideal for floating fish.
inset: 0	Shortcut for top/right/bottom/left = 0.	top:0; right:0; bottom:0; left:0;.
z-index	Controls front/back layering.	DOM order, but z-index is clearer.
white-space: pre	Keeps spaces and line breaks.	Use <pre> element.
user-select: none	Prevents accidental text selection.	Leave selectable for copyable ASCII.
animation-name	Chooses keyframe animation.	animation shorthand.
animation-duration	Controls animation speed.	animation: name 5s linear infinite.
animation-delay	Starts animation earlier/later. Negative delay spreads movement.	Randomize with JS.
animation-iteration-count: infinite	Repeats animation forever.	Set number like 3.
@keyframes	Defines animation steps.	JS animation with requestAnimationFrame.
transform: translateX()	Moves element horizontally.	Change left, but transform is smoother.
transform: scaleX(-1)	Flips element horizontally.	Write reversed ASCII manually.
border-radius: 50%	Makes bubbles circular.	SVG circle.
::after	Creates extra decorative part without extra HTML.	Add another real HTML element.
@media	Applies CSS only at certain screen sizes.	Use responsive units like vw, clamp().
JavaScript commands / methods
Command / Method	What it does	Alternative
const	Creates a variable that cannot be reassigned.	let if value changes.
document.getElementById()	Finds an element by ID.	document.querySelector("#aquarium").
[]	Creates an array/list.	Object map, but array is best for ordered items.
{}	Creates an object with properties.	Class instance.
Template literal `text`	Allows multi-line strings for ASCII art.	Normal strings with \n.
function name()	Creates reusable function.	Arrow function: const name = () => {}.
document.createElement()	Creates new HTML element from JS.	Write the element manually in HTML.
.className	Sets CSS classes as a string.	.classList.add(...).
.textContent	Inserts text safely. Good for ASCII.	.innerHTML, but less safe.
.style.property	Sets inline CSS from JS.	Add CSS classes instead.
if (item.top)	Runs code only if value exists.	Optional chaining / default values.
.appendChild()	Adds created element into the page.	.append() or insertAdjacentElement().
.forEach()	Runs a function for every item in an array.	for...of loop.
.trim()	Removes extra spaces/newlines from start/end.	Leave as-is if spacing is important.
renderAquarium()	Custom function that starts building everything.	Call each creation function manually.
05 — How to Run It
Option A — Simple way
Create a folder named ascii-aquarium.
Create these files inside it:
index.html
style.css
script.js
Open index.html in your browser.
Option B — VS Code Live Server
Open the folder in VS Code.
Install the extension Live Server.
Right-click index.html.
Click Open with Live Server.
Option C — Python local server

Inside the folder, run:

python -m http.server 5500

Then open:

http://localhost:5500

Alternative if your system uses Python 3 command explicitly:

python3 -m http.server 5500
06 — How to Add Another Fish

Add this object inside the creatures array in script.js:

{
  art: `><((('>`,
  classes: "ascii fish-yellow normal swim-right",
  top: "180px",
  duration: "19s",
  delay: "-6s"
}
07 — How to Add Another Bubble

Add this object inside the bubbles array:

{ left: "35%", duration: "9s", delay: "-2s", size: "14px" }
08 — Recommended Next Improvements
[ ] Add pause / play button
[ ] Add day / night mode
[ ] Add random fish generator
[ ] Add mouse interaction
[ ] Add food particles
[ ] Add scoreboard/count of fish
[ ] Add aquarium themes
[ ] Add ASCII treasure chest
[ ] Add sound toggle

Done — I split it into: