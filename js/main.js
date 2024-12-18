// setting vars
var theme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
  ? 'dark'
  : 'light';
var timeFormat = '24h';
var useSeconds = 'off';

// Creates time string based on settings
function currentTime() {
  let now = new Date();
  let hours = now.getHours();
  let hoursDigits = hours.toString().length;
  let minutes = now.getMinutes();
  let minutesDigits = minutes.toString().length;
  let seconds = now.getSeconds();
  let secondsDigits = seconds.toString().length;
  let composite;
  if (hoursDigits == 1) {
    hours = `0${hours}`;
  } else {
  }
  if (minutesDigits == 1) {
    minutes = `0${minutes}`;
  } else {
  }
  if (secondsDigits == 1) {
    seconds = `0${seconds}`;
  } else {
  }
  if (timeFormat == '24h') {
    composite = `${hours}:${minutes}`;
  } else if (timeFormat == '12h') {
    if (hours <= 12) {
      composite = `${hours}:${minutes}`;
    } else {
      parseInt(hours);
      hours -= 12;
      composite = `${hours}:${minutes}`;
    }
  } else {
    throw new Error(
      'Time composite error: Variable "timeFormat" is using an invalid value',
    );
  }
  if (useSeconds == 'off') {
    return composite;
  } else if (useSeconds == 'on') {
    composite = `${composite}:${seconds}`;
    return composite;
  } else {
    throw new Error(
      'Time composite error: Variable "useSeconds" is using an invalid value',
    );
  }
}

// Function that updates the time text and site title
const timeText = document.getElementById('timeText');
const title = document.getElementById('title');
function updateTime() {
  timeText.innerHTML = currentTime();
  title.innerHTML = `Clock App - ${currentTime()}`;
}

// Updates the time every half second (500ms)
var clockInterval = setInterval(updateTime, 500);

// Fullscreen Button
const fullscreenButton = document.getElementById('fullscreenButton');
var isInFullscreen = false;
const screen = document.documentElement;
if (document.fullscreenEnabled == false) {
  fullscreenButton.style.mask = '';
  fullscreenButton.style.pointerEvents = 'none';
}
function check() {
  if (window.screenTop && window.screenY) {
    isInFullscreen = false;
  } else {
    isInFullscreen = true;
  }
}
fullscreenButton.addEventListener('click', () => {
  check();
  if (isInFullscreen == true) {
    document.exitFullscreen();
    isInFullscreen = false;
  } else if (isInFullscreen == false) {
    screen.requestFullscreen();
    isInFullscreen = true;
  } else {
    throw new Error('Fullscreen Error: Variable is not a boolean');
  }
});

// Settings Button
const settingsButton = document.getElementById('settingsButton');
const settingsBar = document.getElementById('settingsBar');
settingsButton.addEventListener('click', () => {
  settingsBar.classList.add('settingsBarOut');
});

// Close Button
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', () => {
  settingsBar.classList.remove('settingsBarOut');
});

// Format Setting
const formatToggle = document.getElementById('formatToggle');
const formatToggleNob = document.getElementById('formatToggleNob');
formatToggle.addEventListener('click', () => {
  if (timeFormat == '24h') {
    timeFormat = '12h';
    formatToggleNob.classList.add('toggleNobOn');
    formatToggleNob.classList.remove('toggleNobOff');
  } else if (timeFormat == '12h') {
    timeFormat = '24h';
    formatToggleNob.classList.add('toggleNobOff');
    formatToggleNob.classList.remove('toggleNobOn');
  } else {
  }
});

// Next Theme Button
const nextThemeButton = document.getElementById('nextThemeButton');
const background = document.getElementById('background');
const formatText = document.getElementById('formatText');
const secondsText = document.getElementById('secondsText');

function updateTheme() {
  const textNum = Math.floor(Math.random() * 10);
  const themeNum = Math.floor(Math.random() * 10);
  const lightThemes = [
    'backgroundLightTheme1',
    'backgroundLightTheme2',
    'backgroundLightTheme3',
    'backgroundLightTheme4',
  ];
  const darkThemes = [
    'backgroundDarkTheme1',
    'backgroundDarkTheme2',
    'backgroundDarkTheme3',
    'backgroundDarkTheme4',
  ];
  const textThemes = [
    'textTheme1',
    'textTheme2',
    'textTheme3',
    'textTheme4',
    'textTheme5',
    'textTheme6',
    'textTheme7',
  ];

  var isLight = theme === 'light';
  var themes = isLight ? lightThemes : darkThemes;
  var textTheme = textThemes[Math.floor(textNum / (10 / textThemes.length))];
  var backgroundTheme = themes[Math.floor(themeNum / 2.5)];

  if (backgroundTheme && textTheme) {
    background.className = backgroundTheme;
    formatText.className = textTheme;
    secondsText.className = textTheme;
    timeText.className = textTheme;
  } else {
    throw new Error('Updating theme failed');
  }
}
nextThemeButton.addEventListener('click', updateTheme);

// Theme Button
updateTheme();
const lightDarkButton = document.getElementById('lightDarkButton');
lightDarkButton.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  updateTheme();
});

// Seconds Setting
const secondsToggle = document.getElementById('secondsToggle');
const secondsToggleNob = document.getElementById('secondsToggleNob');
secondsToggle.addEventListener('click', () => {
  if (useSeconds == 'on') {
    useSeconds = 'off';
    secondsToggleNob.classList.remove('toggleNobOn');
    secondsToggleNob.classList.add('toggleNobOff');
  } else if (useSeconds == 'off') {
    useSeconds = 'on';
    secondsToggleNob.classList.add('toggleNobOn');
    secondsToggleNob.classList.remove('toggleNobOff');
  }
});

// Error Logging
try {
} catch (e) {
  console.error(e);
}
