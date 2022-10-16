// Based on Image to ASCII Coding Train Tutorial
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// https://youtu.be/55iwMYv8tGI

const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,^'.         ";

let video;
let asciiDiv;
let hasColor = false;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(120, 82);
  buttonColor = createButton('Color');
  buttonColor.mousePressed(doColor)
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = r * 0.3 + g * 0.59 + b * 0.11;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += hasColor ? `<span style="color: rgb(${r},${g},${b})">${c}</span>` : c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}

function doColor() {
  hasColor = !hasColor;
}
