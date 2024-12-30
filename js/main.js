// MARK:Initial Settings
let theme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?
  'dark' : // Dark/Light returned depending on the user's system preferences
  'light';
let timeFormat = '24h'; // Initial time format set to 24h
let useSeconds = 'off'; // Initially do not use seconds for cleaner first experience
// -----------------------------------------------------------------------------
// MARK:Time
function currentTime() {
  // Creates time string based on settings
  const now = new Date();
  let hours = now.getHours(); // Returns current hours
  const hoursDigits = hours.toString().length; // Returns # of digits of hours var
  let minutes = now.getMinutes(); // Returns current minutes
  const minutesDigits = minutes.toString().length; // Returns # of digits of minutes var
  let seconds = now.getSeconds(); // Returns current seconds
  const secondsDigits = seconds.toString().length; // Returns # of digits of seconds var
  let composite; // will contain final composite of hours, minutes, and seconds depending on user preference
  if (hoursDigits == 1) {
    hours = `0${hours}`; // Adds preceding 0 if only 1 digit
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
  if (timeFormat == '24h') { // Compiles either 24 or 12 hour format
    composite = `${hours}:${minutes}`;
  } else if (timeFormat == '12h') {
    if (hours <= 12) {
      composite = `${hours}:${minutes}`;
    } else {
      parseInt(hours); // Makes hours an integer to enable subtracting
      hours -= 12;
      composite = `${hours}:${minutes}`;
    }
  } else {
    throw new Error( // Thrown when 'timeFormat' is not either '24h' or '12h'
        'Time composite error: Variable "timeFormat" is using an invalid value',
    );
  }
  if (useSeconds == 'off') { // Adds seconds as needed
    return composite;
  } else if (useSeconds == 'on') {
    composite = `${composite}:${seconds}`;
    return composite;
  } else {
    throw new Error( // Thrown when 'useSeconds' is not either 'on' or 'off'
        'Time composite error: Variable "useSeconds" is using an invalid value',
    );
  }
}
const timeText = document.getElementById('timeText');
const title = document.getElementById('title');
function updateTime() { // Function that updates the time text and site title
  timeText.innerHTML = currentTime();
  title.innerHTML = `Clock App - ${currentTime()}`;
}
setInterval(updateTime, 500); // Updates the time every half second (500ms)
// -----------------------------------------------------------------------------
// MARK:Fullscreen Button and Function
const fullscreenButton = document.getElementById('fullscreenButton');
let isInFullscreen = false;
const screen = document.documentElement;
if (document.fullscreenEnabled == false) { // Remove fullscreen button if browser does not support the function
  fullscreenButton.style.mask = '';
  fullscreenButton.style.pointerEvents = 'none';
}
function check() {
  if (window.screenTop && window.screenY) {
    isInFullscreen = false; // Returned when not in fullscreen
  } else {
    isInFullscreen = true; // Returned when in fullscreen
  }
}
// TODO: Fix broken eventListener
setInterval(check, 500); // Check fullscreen state every 500ms
document.addEventListener('keydown', (event) => { // Run update function when 'Esc' clicked
  if (event.key == '27-65' && isInFullscreen == true) {
    updateFullscreenIcon();
  }
});
function updateFullscreenIcon() { // Switches fullscreen icons
  if (fullscreenButton.classList.contains('fullscreenOff')) {
    fullscreenButton.classList.replace('fullscreenOff', 'fullscreenOn');
  } else if (fullscreenButton.classList.contains('fullscreenOn')) {
    fullscreenButton.classList.replace('fullscreenOn', 'fullscreenOff');
  }
}
fullscreenButton.addEventListener('click', () => { // Change fullscreen state on click
  check();
  if (isInFullscreen == true) {
    document.exitFullscreen();
    isInFullscreen = false;
    updateFullscreenIcon();
  } else if (isInFullscreen == false) {
    screen.requestFullscreen();
    isInFullscreen = true;
    updateFullscreenIcon();
  } else {
    throw new Error('Fullscreen Error: Variable is not a boolean');
  }
}); // -------------------------------------------------------------------------
// MARK:Settings Button
const settingsButton = document.getElementById('settingsButton');
const settingsBar = document.getElementById('settingsBar');
settingsButton.addEventListener('click', () => {
  settingsBar.classList.add('settingsBarOut');
}); // -------------------------------------------------------------------------
// MARK:Close Button
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', () => {
  settingsBar.classList.remove('settingsBarOut');
}); // -------------------------------------------------------------------------
// MARK:Format Setting
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
}); // -------------------------------------------------------------------------
// MARK:Next Theme Button
const nextThemeButton = document.getElementById('nextThemeButton');
const background = document.getElementById('background');
const formatText = document.getElementById('formatText');
const secondsText = document.getElementById('secondsText');
const themeSelectorText = document.getElementById('themeSelectorText');
const textThemeSelectorText = document.getElementById('textThemeSelectorText');
const lightThemes = [ // Array of light themes
  'backgroundLightTheme1',
  'backgroundLightTheme2',
  'backgroundLightTheme3',
  'backgroundLightTheme4',
];
const darkThemes = [ // Array of dark themes
  'backgroundDarkTheme1',
  'backgroundDarkTheme2',
  'backgroundDarkTheme3',
  'backgroundDarkTheme4',
];
const textThemes = [ // Array of text themes
  'textTheme1',
  'textTheme2',
  'textTheme3',
  'textTheme4',
  'textTheme5',
  'textTheme6',
  'textTheme7',
];
function updateTheme() { //                                 Function generates a random value corresponding
  const textNum = Math.floor(Math.random() * 10); //        to a theme and text theme and applies them to
  const themeNum = Math.floor(Math.random() * 10); //       various aspects of the app
  const isLight = theme === 'light';
  const themes = isLight ? lightThemes : darkThemes;
  const textTheme = textThemes[Math.floor(textNum / (10 / textThemes.length))];
  const backgroundTheme = themes[Math.floor(themeNum / 2.5)];

  if (backgroundTheme && textTheme) {
    background.className = backgroundTheme; // Applies theme to background
    formatText.className = textTheme; // Applies theme to format setting text
    secondsText.className = textTheme; // Applies theme to seconds setting text
    timeText.className = textTheme; // Applies theme to clock text
    themeSelectorText.className = textTheme; // Applies theme to theme selector title text
    textThemeSelectorText.className = textTheme; // Applies theme to text theme selector text
  } else {
    throw new Error('Updating theme failed'); // Thrown if textTheme or backgroundTheme have a value issue (should never happen)
  }
}
nextThemeButton.addEventListener('click', updateTheme); // Runs function on button click
// -----------------------------------------------------------------------------
// MARK:Light/Dark Button
const lightDarkButton = document.getElementById('lightDarkButton');
updateTheme();
if (theme == 'light') {
  lightDarkButton.classList.add('darkButton');
} else if (theme == 'dark') {
  lightDarkButton.classList.add('lightButton');
}
lightDarkButton.addEventListener('click', () => { // Changes overall theme if button clicked
  theme = theme === 'light' ? 'dark' : 'light'; // Returns dark or light depending on if 'theme' is light or not
  updateTheme(); // Runs a theme update after updating the 'theme' variable
  if (lightDarkButton.classList.contains('lightButton')) { // Replaces the light/dark icon when theme changes
    lightDarkButton.classList.replace('lightButton', 'darkButton');
  } else if (lightDarkButton.classList.contains('darkButton')) {
    lightDarkButton.classList.replace('darkButton', 'lightButton');
  } else {
    throw new Error( // Thrown when 'lightDarkButton' does not contain either 'lightButton' or 'darkButton'
        'Class list error: HTML element does not contain expected class',
    );
  }
}); // -------------------------------------------------------------------------
// MARK:Seconds Setting
const secondsToggle = document.getElementById('secondsToggle');
const secondsToggleNob = document.getElementById('secondsToggleNob');
secondsToggle.addEventListener('click', () => { // Runs when clicking the seconds toggle in settings
  if (useSeconds == 'on') {
    useSeconds = 'off';
    secondsToggleNob.classList.remove('toggleNobOn');
    secondsToggleNob.classList.add('toggleNobOff');
  } else if (useSeconds == 'off') {
    useSeconds = 'on';
    secondsToggleNob.classList.add('toggleNobOn');
    secondsToggleNob.classList.remove('toggleNobOff');
  }
}); // -------------------------------------------------------------------------
// MARK:Theme Setting
const themeContainer = document.getElementById('themeContainer');
const customThemes = themeContainer.children;
for (let i = 0; i < customThemes.length; i++) {
  customThemes[i].addEventListener('click', () => {
    const currentTheme = customThemes[i].classList;
    background.className = currentTheme;
  });
}
// -----------------------------------------------------------------------------
// MARK:Text Theme Setting
// MARK:Theme Setting
const textThemeContainer = document.getElementById('textThemeContainer');
const customTextThemes = textThemeContainer.children;
for (let i = 0; i < customTextThemes.length; i++) {
  customTextThemes[i].addEventListener('click', () => {
    const currentTheme = customTextThemes[i].classList;
    formatText.className = currentTheme; // Applies theme to format setting text
    secondsText.className = currentTheme; // Applies theme to seconds setting text
    timeText.className = currentTheme; // Applies theme to clock text
    themeSelectorText.className = currentTheme; // Applies theme to theme selector title text
    textThemeSelectorText.className = currentTheme; // Applies theme to text theme selector text
  });
}
// -----------------------------------------------------------------------------
// MARK:Error Handling
try { // Currently no tries in case of thrown error
} catch (e) {
  console.error(e); // Logs thrown error message, stopping further program execution
} // ---------------------------------------------------------------------------
