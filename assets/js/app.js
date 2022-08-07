/* Variables */
const $vinylImage = document.querySelector(".vinyl__image");
const $needleImage = document.querySelector(".needle__image");
const $btnMain = document.querySelector("#main");
const $btnStop = document.querySelector("#stop");
const $btnReverse = document.querySelector("#reverse");
const $btnForward = document.querySelector("#forward");
const $btnBackward = document.querySelector("#backward");
const $speedText = document.querySelector("#speed");

/* if it's true means play */
let valueButton = false;

/* rotate vinyl animation */
const rotateVinyl = $vinylImage.animate(
  [{ transform: "rotateZ(0deg)" }, { transform: "rotateZ(360deg)" }],
  {
    duration: 2000,
    direction: "normal",
    easing: "linear",
    iterations: Infinity,
    delay: 500,
  }
);
rotateVinyl.pause();
/* move needle animation */
const moveNeedle = $needleImage.animate(
  [{ transform: "rotate(0)" }, { transform: "rotate(20deg)" }],
  {
    duration: 500,
    direction: "normal",
    easing: "ease-in",
    iterations: 1,
    fill: "forwards",
  }
);
moveNeedle.pause();
/* read needle animation */
const readNeedle = $needleImage.animate(
  [{ transform: "rotate(20deg)" }, { transform: "rotate(30deg)" }],
  {
    duration: 2500,
    direction: "alternate",
    easing: "linear",
    iterations: Infinity,
    delay: 500,
  }
);
readNeedle.pause();

/* animation speed */
let speed = rotateVinyl.playbackRate;
/* play button */
$btnMain.addEventListener("click", (event) => {
  playAndPause();
});
/* pause button */
$btnStop.addEventListener("click", (event) => {
  stopAnimation();
});
/* reverse button */
$btnReverse.addEventListener("click", (event) => {
  reverseAnimation();
});
/* backward button */
$btnBackward.addEventListener("click", (event) => {
  backwardSpeed();
});
/* forward button */
$btnForward.addEventListener("click", (event) => {
  forwardSpeed();
});

/* play and pause function */
function playAndPause() {
  if (valueButton) {
    rotateVinyl.pause();
    readNeedle.pause();
    $btnBackward.classList.add("disabled");
    $btnForward.classList.add("disabled");
    $btnReverse.classList.add("disabled");
    if ($btnMain.classList.contains("icon-pause")) {
      $btnMain.classList.remove("icon-pause");
      $btnMain.classList.add("icon-play");
    }
    if (rotateVinyl.playbackRate < 0 && readNeedle.playbackRate < 0) {
      rotateVinyl.playbackRate *= -1;
      readNeedle.playbackRate *= -1;
    }
    valueButton = false;
    console.log(`Pause state vinyl: ${rotateVinyl.playState}`);
    console.log(`Speed value of vinyl on pause: ${rotateVinyl.playbackRate}`);
  } else {
    if (moveNeedle.playState != "finished") {
      moveNeedle.play();
    }
    if (rotateVinyl.playbackRate < 0 && readNeedle.playbackRate < 0) {
      rotateVinyl.playbackRate *= -1;
      readNeedle.playbackRate *= -1;
    }
    rotateVinyl.play();
    readNeedle.play();
    $speedText.innerText = rotateVinyl.playbackRate.toFixed(1);
    $btnBackward.classList.remove("disabled");
    $btnForward.classList.remove("disabled");
    $btnStop.classList.remove("disabled");
    $btnReverse.classList.remove("disabled");
    if ($btnMain.classList.contains("icon-play")) {
      $btnMain.classList.remove("icon-play");
      $btnMain.classList.add("icon-pause");
    }
    valueButton = true;
    console.log(`Play state vinyl: ${rotateVinyl.playState}`);
    console.log(`Speed value of vinyl on play: ${rotateVinyl.playbackRate}`);
  }
}
/* cancel all animations */
function stopAnimation() {
  rotateVinyl.cancel();
  readNeedle.cancel();
  moveNeedle.cancel();
  if ($btnMain.classList.contains("icon-pause")) {
    $btnMain.classList.remove("icon-pause");
    $btnMain.classList.add("icon-play");
    valueButton = false;
  }
  if (rotateVinyl.playbackRate === -1 && readNeedle.playbackRate === -1) {
    rotateVinyl.playbackRate = 1;
    readNeedle.playbackRate = 1;
  }
  $speedText.innerText = "0.0";
  $btnBackward.classList.add("disabled");
  $btnForward.classList.add("disabled");
  $btnStop.classList.add("disabled");
  $btnReverse.classList.add("disabled");
  speed = 1;
  rotateVinyl.playbackRate = speed;
  readNeedle.playbackRate = speed;
  console.log(`Stop state vinyl: ${rotateVinyl.playState}`);
  console.log(`Speed value of vinyl on stop: ${rotateVinyl.playbackRate}`);
}
/* make all animations reverse */
function reverseAnimation() {
  if (rotateVinyl.playState != "idle" && readNeedle.playState != "idle") {
    rotateVinyl.reverse();
    readNeedle.reverse();
    console.log(`Reverse state vinyl: ${rotateVinyl.playState}`);
    console.log(`Speed value of vinyl on reverse: ${rotateVinyl.playbackRate}`);
  }
}
/* increase the animation speed */
function forwardSpeed() {
  if (speed < 9.5 && $btnMain.classList.contains("icon-pause")) {
    speed += 0.5;
    rotateVinyl.playbackRate = speed;
    readNeedle.playbackRate = speed;
    $speedText.innerText = speed.toFixed(1);
    console.log(`forward speed ${speed}`);
  }
}
/* cut the animation speed */
function backwardSpeed() {
  if (speed < 9.5 && $btnMain.classList.contains("icon-pause")) {
    speed -= 0.5;
    if (speed === 0) {
      speed = 1;
      rotateVinyl.playbackRate = speed;
      readNeedle.playbackRate = speed;
      $speedText.innerText = speed.toFixed(1);
    }
    rotateVinyl.playbackRate = speed;
    readNeedle.playbackRate = speed;
    $speedText.innerText = speed.toFixed(1);
    console.log(`backward speed ${speed}`);
  }
}
