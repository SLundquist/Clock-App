// MARK:Utilities
function applyClassToArray(array: Array<HTMLElement>, classToApply: string) {
  for (let i = 0; i < array.length; i++) {
    array[i].className = classToApply;
  }
}

function applyColorToArray(array: Array<HTMLElement>, valueToApply: string) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.color = valueToApply;
  }
}

function applyBackgroundToArray(array: Array<HTMLElement>, valueToApply: string) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.background = valueToApply;
  }
}

function applyBorderColorToArray(array: Array<HTMLElement>, valueToApply: string) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.borderColor = valueToApply;
  }
}

function applyBoxShadowToArray(array: Array<HTMLElement>, leftRight: number, upDown: number, spread: number, start: number, color: string) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.boxShadow = `${leftRight}rem ${upDown}rem ${spread}rem ${start}rem ${color}`;
  }
}

function randomInt(max: number) { // Returns a random integer
  return Math.floor(Math.random() * max);
}

// -----------------------------------------------------------------------------

// MARK:Element Calls
const timeText: HTMLElement | null = document.getElementById('timeText');
const title: HTMLElement | null = document.getElementById('title');
const fullscreenButton: HTMLElement | null = document.getElementById('fullscreenButton');
const settingsButton: HTMLElement | null = document.getElementById('settingsButton');
const settingsBar: HTMLElement | null = document.getElementById('settingsBar');
const formatToggle: HTMLElement | null = document.getElementById('formatToggle');
const formatToggleNob: HTMLElement | null = document.getElementById('formatToggleNob');
const closeButton: HTMLElement | null = document.getElementById('closeButton');
const nextThemeButton: HTMLElement | null = document.getElementById('nextThemeButton');
const background: HTMLElement | null = document.getElementById('background');
const formatText: HTMLElement | null = document.getElementById('formatText');
const secondsText: HTMLElement | null = document.getElementById('secondsText');
const themeSelectorText: HTMLElement | null = document.getElementById('themeSelectorText');
const textThemeSelectorText: HTMLElement | null = document.getElementById('textThemeSelectorText');
const secondsToggle: HTMLElement | null = document.getElementById('secondsToggle');
const secondsToggleNob: HTMLElement | null = document.getElementById('secondsToggleNob');
const lightDarkButton: HTMLElement | null = document.getElementById('lightDarkButton');
const themeContainer: HTMLElement | null = document.getElementById('themeContainer');
const textThemeContainer: HTMLElement | null = document.getElementById('textThemeContainer');
const tooltipLaunchers: HTMLCollectionOf<Element> | null = document.getElementsByClassName('tooltipLauncher');

// -----------------------------------------------------------------------------

// MARK:Constant Arrays
const textElements: Array<HTMLElement | null> = [
  timeText, formatText, secondsText, themeSelectorText, textThemeSelectorText,
];
const lightThemes: Array<string> = [
  'backgroundLightTheme1',
  'backgroundLightTheme2',
  'backgroundLightTheme3',
  'backgroundLightTheme4',
  'backgroundLightTheme5',
  'backgroundLightTheme6',
  'backgroundLightTheme7',
];
const darkThemes: Array<string> = [
  'backgroundDarkTheme1',
  'backgroundDarkTheme2',
  'backgroundDarkTheme3',
  'backgroundDarkTheme4',
  'backgroundDarkTheme5',
  'backgroundDarkTheme6',
];
const textThemes: Array<string> = [
  'textTheme1',
  'textTheme2',
  'textTheme3',
  'textTheme4',
  'textTheme5',
  'textTheme6',
  'textTheme7',
  'textTheme8',
  'textTheme9',
  'textTheme10',
  'textTheme11',
  'textTheme12',
];
const colorChangeElements: Array<HTMLElement | null> = [
  fullscreenButton,
  settingsButton,
  lightDarkButton,
  nextThemeButton,
  closeButton,
];
const borderChangeElements: Array<HTMLElement | null> = [
  formatToggle,
  secondsToggle,
];
const boxShadowChangeElements: Array<HTMLElement | null> = [
  secondsToggleNob,
  formatToggleNob,
];
const textThemeOptions = Array.from(textThemeContainer.children as HTMLCollectionOf<HTMLElement>);

// -----------------------------------------------------------------------------

// MARK:Initial Settings
let theme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?
  'dark' : // dark or light returned depending on the user's system preferences
  'light';
let timeFormat = '24h'; // Initial time format set to 24h
let useSeconds = 'off'; // Initially do not use seconds for cleaner first experience

// -----------------------------------------------------------------------------

// MARK:Time
function currentTime(): string { // Creates time string based on settings
  const now: Date = new Date();
  let hours: number = now.getHours(); // Returns current hours
  let minutes: number = now.getMinutes(); // Returns current minutes
  let seconds: number = now.getSeconds(); // Returns current seconds

  let composite: string; // will contain final composite of hours, minutes, and seconds depending on user preference

  let hoursString: string = hours < 10 ? `0${hours}` : hours.toString();
  let minutesString: string = minutes < 10 ? `0${minutes}` : minutes.toString();
  let secondsString: string = seconds < 10 ? `0${seconds}` : seconds.toString();

  if (timeFormat === '24h') {
    composite = `${hoursString}:${minutesString}`;
  } else if (timeFormat === '12h') {
    const formattedHours: number = hours % 12 || 12; // Convert to 12-hour format
    const formattedHoursString: string = formattedHours < 10 ? `0${formattedHours}` : formattedHours.toString();
    composite = `${formattedHoursString}:${minutesString}`;
  } else {
    throw new Error('Time composite error: Variable "timeFormat" is using an invalid value');
  }

  if (useSeconds === 'on') {
    composite = `${composite}:${secondsString}`;
  } else if (useSeconds !== 'off') {
    throw new Error('Time composite error: Variable "useSeconds" is using an invalid value');
  }

  return composite;
}

function updateTime() { // Function that updates the time text and site title
  if (timeText != null && title != null) {
    timeText.innerHTML = currentTime();
    title.innerHTML = `${currentTime()}`;
  }
  else {
    throw new Error('Uncaught error: object is null');
  }
}

setInterval(updateTime, 500); // Updates the time

// -----------------------------------------------------------------------------

// MARK:Fullscreen Button and Function
let isInFullscreen = false;
if (document.fullscreenEnabled == false && fullscreenButton != null) { // Remove fullscreen button if browser does not support the function
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

function updateFullscreenIcon() { // Switches fullscreen icons
  if (fullscreenButton != null) {
    if (fullscreenButton.classList.contains('fullscreenOff')) {
    fullscreenButton.classList.replace('fullscreenOff', 'fullscreenOn');
    } else if (fullscreenButton.classList.contains('fullscreenOn')) {
    fullscreenButton.classList.replace('fullscreenOn', 'fullscreenOff');
    }
  } else {
    throw new Error('Uncaught error: Object is null');
  }
}

fullscreenButton?.addEventListener('click', () => { // Change fullscreen state on click
  check();
  if (isInFullscreen == true) {
    document.exitFullscreen();
    isInFullscreen = false;
    updateFullscreenIcon();
  } else if (isInFullscreen == false) {
    document.documentElement.requestFullscreen();
    isInFullscreen = true;
    updateFullscreenIcon();
  } else {
    throw new Error('Fullscreen Error: Variable is not a boolean');
  }
});

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

interface Document {
  webkitIsFullScreen?: boolean;
  mozFullScreen?: boolean;
  msFullscreenElement?: Element | null;
}

function exitHandler() {
  if (!document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement) {
    updateFullscreenIcon();
  }
}

// -----------------------------------------------------------------------------

// MARK:Settings Button
settingsButton?.addEventListener('click', () => {
  settingsBar?.classList.add('settingsBarOut');
});

// -----------------------------------------------------------------------------

// MARK:Close Button
closeButton?.addEventListener('click', () => {
  settingsBar?.classList.remove('settingsBarOut');
});

// -----------------------------------------------------------------------------

// MARK:Format Setting
formatToggle?.addEventListener('click', () => {
  if (timeFormat == '24h') {
    timeFormat = '12h';
    formatToggleNob?.classList.add('toggleNobOn');
    formatToggleNob?.classList.remove('toggleNobOff');
    checkIfWhiteTheme();
  } else if (timeFormat == '12h') {
    timeFormat = '24h';
    formatToggleNob?.classList.add('toggleNobOff');
    formatToggleNob?.classList.remove('toggleNobOn');
    checkIfWhiteTheme();
  } else {
  }
});

// -----------------------------------------------------------------------------

// MARK:White theme
const whiteThemes = ['backgroundLightTheme7'];
function checkIfWhiteTheme() {
  if (whiteThemes.includes(background!.className)) {
    applyColorToArray(textElements, 'black');
    applyBackgroundToArray(colorChangeElements, 'black');
    applyBorderColorToArray(borderChangeElements, 'black');
    applyColorToArray(textThemeOptions, 'black');
    applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, 'black');
    settingsBar.style.background = '#4b4b4b30';
    applyBackgroundToArray(boxShadowChangeElements, 'black');
    if (formatToggleNob.classList.contains('toggleNobOn') == true) {
      formatToggleNob.style.background = 'black';
    } else {
      formatToggleNob.style.background = 'transparent';
    }
    if (secondsToggleNob.classList.contains('toggleNobOn') == true) {
      secondsToggleNob.style.background = 'black';
    } else {
      secondsToggleNob.style.background = 'transparent';
    }
  } else {
    applyColorToArray(textElements, 'white');
    applyBackgroundToArray(colorChangeElements, 'white');
    applyBorderColorToArray(borderChangeElements, 'white');
    applyColorToArray(textThemeOptions, 'white');
    applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, 'white');
    settingsBar.style.background = '#b4b4b438';
    applyBackgroundToArray(boxShadowChangeElements, 'white');
    if (formatToggleNob.classList.contains('toggleNobOn') == true) {
      formatToggleNob.style.background = 'white';
    } else {
      formatToggleNob.style.background = 'transparent';
    }
    if (secondsToggleNob.classList.contains('toggleNobOn') == true) {
      secondsToggleNob.style.background = 'white';
    } else {
      secondsToggleNob.style.background = 'transparent';
    }
  }
}

// -----------------------------------------------------------------------------

// MARK:Next Theme Button
function themePicker(outputType: string) { // takes one argument. expected to be either 'text' or 'background' and returns a respective random theme
  if (outputType == 'text') {
    const textTheme = textThemes[randomInt(textThemes.length)];

    return textTheme;
  } else if (outputType == 'background') {
    const isLight = theme === 'light';
    const themes = isLight ? lightThemes : darkThemes;
    const backgroundTheme = themes[randomInt(themes.length)];

    return backgroundTheme;
  } else {
    throw new Error('themePicker failed: Input not valid');
  }
}

function updateTheme() {
  let textThemeToApply = themePicker('text');
  if (textThemeToApply == timeText?.className) {
    while (textThemeToApply == timeText?.className) {
      textThemeToApply = themePicker('text');
    }
  }
  let backgroundThemeToApply = themePicker('background');
  if (backgroundThemeToApply == background?.className) {
    while (backgroundThemeToApply == background?.className) {
      backgroundThemeToApply = themePicker('background');
    }
  }
  if (backgroundThemeToApply && textThemeToApply) {
    background!.className = backgroundThemeToApply; // Applies theme to background
    applyClassToArray(textElements, textThemeToApply); // Applies text theme to all text elements
  } else {
    throw new Error('Updating theme failed'); // Thrown if textTheme or backgroundTheme have a value issue (should never happen)
  }
  checkIfWhiteTheme();
}

nextThemeButton?.addEventListener('click', updateTheme); // Runs function on button click

// -----------------------------------------------------------------------------

// MARK:Light/Dark Button
updateTheme();
if (theme == 'light') {
  lightDarkButton?.classList.add('darkButton');
} else if (theme == 'dark') {
  lightDarkButton?.classList.add('lightButton');
}
lightDarkButton?.addEventListener('click', () => { // Changes overall theme if button clicked
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
});

// -----------------------------------------------------------------------------

// MARK:Seconds Setting
secondsToggle?.addEventListener('click', () => { // Runs when clicking the seconds toggle in settings
  if (useSeconds == 'on') {
    useSeconds = 'off';
    secondsToggleNob?.classList.remove('toggleNobOn');
    secondsToggleNob?.classList.add('toggleNobOff');
    checkIfWhiteTheme();
  } else if (useSeconds == 'off') {
    useSeconds = 'on';
    secondsToggleNob?.classList.add('toggleNobOn');
    secondsToggleNob?.classList.remove('toggleNobOff');
    checkIfWhiteTheme();
  }
});

// -----------------------------------------------------------------------------

// MARK:Theme Setting
const customThemes = themeContainer?.children;
for (let i = 0; i < customThemes!.length; i++) {
  if (customThemes) customThemes[i].addEventListener('click', () => {
    const currentThemePre: DOMTokenList = customThemes[i].classList;
    const currentTheme: string = currentThemePre.toString();
    background!.className = currentTheme;
    checkIfWhiteTheme();
    if (darkThemes.includes(currentTheme)) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
  });
}

// -----------------------------------------------------------------------------

// MARK:Text Theme Setting
const customTextThemes: HTMLCollection | undefined = textThemeContainer?.children;
for (let i = 0; i < customTextThemes!.length; i++) {
  customTextThemes![i].addEventListener('click', () => {
    let currentTheme: string = customTextThemes[i].classList.toString();
    applyClassToArray(textElements, currentTheme); // Applies text theme to all text elements
  });
}

// -----------------------------------------------------------------------------

// MARK:Tooltip
for (let i = 0; i < tooltipLaunchers.length; i++) {
  const currentTooltip = document.getElementById(`tooltip${i}`);
  tooltipLaunchers[i].addEventListener('mouseenter', () => {
    currentTooltip?.classList.add('tooltipOn');
  });
  tooltipLaunchers[i].addEventListener('mouseleave', () => {
    currentTooltip?.classList.remove('tooltipOn');
  });
}

// ---------------------------------------------------------------------------

// MARK:Error Handling
try { // Currently no tries in case of thrown error
} catch (e) {
  console.error(e); // Logs thrown error message, stopping further program execution
}
