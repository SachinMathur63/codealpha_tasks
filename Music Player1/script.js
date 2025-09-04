const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const trackNameElement = document.getElementById('trackName');
const trackArtistElement = document.getElementById('trackArtist');
const trackImageElement = document.getElementById('trackImage');
const trackDurationElement = document.getElementById('trackDuration');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const playlistElement = document.getElementById('playlist');

// Playlist data
const audioFiles = [
  { name: 'Born to Shine', artist: 'Diljit Dosanjh', src: 'Diljit.mp3', image: 'goat.jpg' },
  { name: '295', artist: 'Sidhu Moosewala', src: 'Diljit3.mp3', image: '295.jpg' },
  { name: 'Lehnga', artist: 'Jass Manak', src: 'Sidhu1.mp3', image: 'lehnga.jpg' },
  { name: 'Lock', artist: 'Karan Aujla', src: 'lock.mp3', image: 'lock1.jpg' }
];

let currentTrack = 0;
let isPlaying = false;

// Load track info
function loadTrack(index) {
  currentTrack = index;
  audioPlayer.src = audioFiles[index].src;
  trackNameElement.textContent = audioFiles[index].name;
  trackArtistElement.textContent = audioFiles[index].artist;
  trackImageElement.src = audioFiles[index].image;

  // highlight active
  document.querySelectorAll(".playlist div").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  audioPlayer.load();
}

// Format time
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Play/Pause
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
}

playPauseButton.addEventListener("click", togglePlayPause);

audioPlayer.addEventListener("play", () => {
  isPlaying = true;
  playPauseButton.textContent = "❚❚";
});

audioPlayer.addEventListener("pause", () => {
  isPlaying = false;
  playPauseButton.textContent = "▶";
});

// Next/Prev
nextButton.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % audioFiles.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

prevButton.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + audioFiles.length) % audioFiles.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

// Progress
audioPlayer.addEventListener("timeupdate", () => {
  progressBar.max = audioPlayer.duration || 0;
  progressBar.value = audioPlayer.currentTime;
  trackDurationElement.textContent =
    `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration || 0)}`;
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

// Volume
volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});

// Autoplay next
audioPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % audioFiles.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

// Build playlist
audioFiles.forEach((track, index) => {
  const div = document.createElement("div");
  div.textContent = `${track.name} - ${track.artist}`;
  div.addEventListener("click", () => {
    loadTrack(index);
    audioPlayer.play();
  });
  playlistElement.appendChild(div);
});

// Initial load
loadTrack(currentTrack);
