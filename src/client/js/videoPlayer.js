const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const memoryVolume = localStorage.getItem("memoryVolume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
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
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  localStorage.setItem("memoryVolume", video.volume);
};

const handlePlayClick = () => {
  video.paused ? video.play() : video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = () => {
  if (video.volume > 0) {
    preVolume = video.volume;
  }
  video.muted = video.muted ? false : true;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  video.volume = video.muted ? 0 : preVolume;
};

const handleVolume = () => {
  if (volumeRange.value === "0") {
    muteBtn.innerText = "Unmute";
    video.muted = true;
  } else {
    muteBtn.innerText = "Mute";
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
    fullScreenBtn.innerText = "Exit Full Screen";
  } else {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
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

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("timeupdate", hadnleTimeUpdate);
timeline.addEventListener("input", handleTimeRange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
