const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const memoryVolume = localStorage.getItem("memoryVolume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
window.onload = () => {
  if (memoryVolume) {
    video.volume = memoryVolume;
  } else {
    video.volume = 0.5;
  }
  volumeRange.value = video.volume;
};

video.onvolumechange = () => {
  volumeRange.value = video.volume;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  localStorage.setItem("memoryVolume", video.volume);
};

const handlePlayClick = () => {
  video.paused ? video.play() : video.pause();
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

let DELAY = 200;
let clicks = 0;
let clickTimer = null;

const handlePlayClickArea = (e) => {
  clicks++;
  if (clicks === 1) {
    clickTimer = setTimeout(function () {
      if (
        e.target === playBtnIcon ||
        e.target === muteBtnIcon ||
        e.target === volumeRange ||
        e.target === fullScreenBtnIcon ||
        e.target === timeline ||
        e.target === currentTime ||
        e.target === totalTime
      ) {
        clicks = 0;
        return;
      } else {
        video.paused ? video.play() : video.pause();
        playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
      }
      clicks = 0;
    }, DELAY);
  } else {
    clearTimeout(clickTimer);
    if (
      e.target === playBtnIcon ||
      e.target === muteBtnIcon ||
      e.target === volumeRange ||
      e.target === fullScreenBtnIcon ||
      e.target === timeline ||
      e.target === currentTime ||
      e.target === totalTime
    ) {
      return;
    } else {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fullScreenBtnIcon.classList = "fas fa-expand";
      } else {
        document.exitFullscreen();
        fullScreenBtnIcon.classList = "fas fa-compress";
      }
    }
    clicks = 0;
  }
};

const handlePlayClickSpacebar = (e) => {
  console.log("hi");
  if (e.keyCode === 32) {
    e.preventDefault();
    handlePlayClick();
  } else if (e.keyCode === 13) {
    e.preventDefault();
    handleFullScreen();
  }
};

const handleMute = () => {
  if (video.volume > 0) {
    preVolume = video.volume;
  }
  video.muted = video.muted ? false : true;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  video.volume = video.muted ? 0 : preVolume;
};

const handleVolume = () => {
  if (volumeRange.value === "0") {
    muteBtnIcon.classList = "fas fa-volume-mute";
    video.muted = true;
  } else {
    muteBtnIcon.classList = "fas fa-volume-up";
    video.volume = volumeRange.value;
    video.muted = false;
  }
};

const timer = (seconds) => {
  let hour = parseInt(seconds / 3600);
  let min = parseInt((seconds % 3600) / 60);
  let sec = parseInt((seconds % 3600) % 60);
  if ((hour !== 0) & (min >= 10)) {
    if (sec < 10) {
      return hour + ":" + min + ":0" + sec;
    } else {
      return hour + ":" + min + ":" + sec;
    }
  } else if ((hour !== 0) & (min < 10)) {
    if (sec < 10) {
      return hour + ":0" + min + ":0" + sec;
    } else {
      return hour + ":0" + min + ":" + sec;
    }
  } else if ((hour === 0) & (min !== 0)) {
    if (sec < 10) {
      return min + ":0" + sec;
    } else {
      return min + ":" + sec;
    }
  } else if ((seconds >= 10) & (seconds < 60)) {
    return "0:" + sec;
  } else if (seconds < 10) {
    return "0:0" + sec;
  }
};

const handleLoadedMetadata = () => {
  totalTime.innerText = timer(video.duration);
  timeline.max = Math.floor(video.duration);
};
const hadnleTimeUpdate = () => {
  currentTime.innerText = timer(video.currentTime);
  timeline.value = Math.floor(video.currentTime);
};
const handleTimeRange = () => {
  video.currentTime = timeline.value;
};
const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 2000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("timeupdate", hadnleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimeRange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("click", handlePlayClickArea);
videoContainer.addEventListener("keydown", handlePlayClickSpacebar);
window.onload = function getFocus() {
  videoContainer.focus();
};
window.addEventListener("dblclick", function ignore(e) {
  e.preventDefault();
});
