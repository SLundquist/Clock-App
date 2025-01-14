// MARK: Utilities
function applyClassToArray(array: HTMLElement[], classToApply: string): void {
  array.forEach(element => element.className = classToApply);
}

function applyStyleToArray(array: HTMLElement[], styleProperty: keyof CSSStyleDeclaration, value: string): void {
  array.forEach(element => {
    (element.style as any)[styleProperty] = value;
  });
}

function applyBoxShadowToArray(array: HTMLElement[], leftRight: number, upDown: number, spread: number, start: number, color: string): void {
  array.forEach(element => element.style.boxShadow = `${leftRight}rem ${upDown}rem ${spread}rem ${start}rem ${color}`);
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

// -----------------------------------------------------------------------------

// MARK: Element Calls
const timeText = document.getElementById('timeText');
const title = document.getElementById('title');
const fullscreenButton = document.getElementById('fullscreenButton');
const settingsButton = document.getElementById('settingsButton');
const settingsBar = document.getElementById('settingsBar');
const formatToggle = document.getElementById('formatToggle');
const formatToggleNob = document.getElementById('formatToggleNob');
const closeButton = document.getElementById('closeButton');
const nextThemeButton = document.getElementById('nextThemeButton');
const background = document.getElementById('background');
const formatText = document.getElementById('formatText');
const secondsText = document.getElementById('secondsText');
const themeSelectorText = document.getElementById('themeSelectorText');
const textThemeSelectorText = document.getElementById('textThemeSelectorText');
const secondsToggle = document.getElementById('secondsToggle');
const secondsToggleNob = document.getElementById('secondsToggleNob');
const lightDarkButton = document.getElementById('lightDarkButton');
const themeContainer = document.getElementById('themeContainer');
const textThemeContainer = document.getElementById('textThemeContainer');
const tooltipLaunchers = document.getElementsByClassName('tooltipLauncher');

// -----------------------------------------------------------------------------

// MARK: Constant Arrays
const textElements = [timeText, formatText, secondsText, themeSelectorText, textThemeSelectorText].filter(Boolean) as HTMLElement[];
const lightThemes = [
  'backgroundLightTheme1', 'backgroundLightTheme2', 'backgroundLightTheme3',
  'backgroundLightTheme4', 'backgroundLightTheme5', 'backgroundLightTheme6', 'backgroundLightTheme7',
];
const darkThemes = [
  'backgroundDarkTheme1', 'backgroundDarkTheme2', 'backgroundDarkTheme3',
  'backgroundDarkTheme4', 'backgroundDarkTheme5', 'backgroundDarkTheme6',
];
const textThemes = [
  'textTheme1', 'textTheme2', 'textTheme3', 'textTheme4', 'textTheme5', 'textTheme6',
  'textTheme7', 'textTheme8', 'textTheme9', 'textTheme10', 'textTheme11', 'textTheme12',
];
const colorChangeElements = [fullscreenButton, settingsButton, lightDarkButton, nextThemeButton, closeButton].filter(Boolean) as HTMLElement[];
const borderChangeElements = [formatToggle, secondsToggle].filter(Boolean) as HTMLElement[];
const boxShadowChangeElements = [secondsToggleNob, formatToggleNob].filter(Boolean) as HTMLElement[];
const textThemeOptions = Array.from(textThemeContainer?.children || []) as HTMLElement[];

// -----------------------------------------------------------------------------

// MARK: Initial Settings
let theme = window.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';
let timeFormat: '12h' | '24h' = '24h';
let useSeconds: 'on' | 'off' = 'off';

// -----------------------------------------------------------------------------

// MARK: Time
function currentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formatTime = (value: number): string => value < 10 ? `0${value}` : value.toString();
  const hoursString = timeFormat === '12h' ? formatTime(hours % 12 || 12) : formatTime(hours);
  const minutesString = formatTime(minutes);
  const secondsString = formatTime(seconds);

  let composite = `${hoursString}:${minutesString}`;
  if (useSeconds === 'on') composite += `:${secondsString}`;

  return composite;
}

function updateTime(): void {
  if (timeText && title) {
    timeText.innerHTML = currentTime();
    title.innerHTML = currentTime();
  } else {
    throw new Error('Uncaught error: object is null');
  }
}

setInterval(updateTime, 500);

// -----------------------------------------------------------------------------

// MARK: Fullscreen Button and Function
let isInFullscreen = false;

function checkFullscreen(): void {
  isInFullscreen = !(window.screenTop && window.screenY);
}


function updateFullscreenIcon() { // Switches fullscreen icons
    if (fullscreenButton.classList.contains('fullscreenOff')) {
    fullscreenButton.classList.replace('fullscreenOff', 'fullscreenOn');
    } else if (fullscreenButton.classList.contains('fullscreenOn')) {
    fullscreenButton.classList.replace('fullscreenOn', 'fullscreenOff');
    }
}

fullscreenButton?.addEventListener('click', () => {
  checkFullscreen();
  if (isInFullscreen) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
  updateFullscreenIcon();
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

// MARK: Settings Button
settingsButton?.addEventListener('click', () => settingsBar?.classList.add('settingsBarOut'));

// -----------------------------------------------------------------------------

// MARK: Close Button
closeButton?.addEventListener('click', () => settingsBar?.classList.remove('settingsBarOut'));

// -----------------------------------------------------------------------------

// MARK: Format Setting
formatToggle?.addEventListener('click', () => {
  timeFormat = timeFormat === '24h' ? '12h' : '24h';
  formatToggleNob?.classList.toggle('toggleNobOn', timeFormat === '12h');
  formatToggleNob?.classList.toggle('toggleNobOff', timeFormat === '24h');
  checkIfWhiteTheme();
});

// -----------------------------------------------------------------------------

// MARK: White Theme
const whiteThemes = ['backgroundLightTheme7'];

function checkIfWhiteTheme(): void {
  const isWhiteTheme = whiteThemes.includes(background?.className || '');
  const color = isWhiteTheme ? 'black' : 'white';
  const backgroundColor = isWhiteTheme ? 'black' : 'white';
  const shadowColor = isWhiteTheme ? 'black' : 'white';
  const settingsBarColor = isWhiteTheme ? '#4b4b4b30' : '#b4b4b438';

  applyStyleToArray(textElements, 'color', color);
  applyStyleToArray(colorChangeElements, 'background', backgroundColor);
  applyStyleToArray(borderChangeElements, 'borderColor', color);
  applyStyleToArray(textThemeOptions, 'color', color);
  applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, shadowColor);
  if (settingsBar) settingsBar.style.background = settingsBarColor;

  [formatToggleNob, secondsToggleNob].forEach(nob => {
    if (nob) nob.style.background = nob.classList.contains('toggleNobOn') ? color : 'transparent';
  });
}

// -----------------------------------------------------------------------------

// MARK: Next Theme Button
function themePicker(outputType: 'text' | 'background'): string {
  const themes = outputType === 'text' ? textThemes : theme === 'light' ? lightThemes : darkThemes;
  return themes[randomInt(themes.length)];
}

function updateTheme(): void {
  let textThemeToApply = themePicker('text');
  while (textThemeToApply === timeText?.className) {
    textThemeToApply = themePicker('text');
  }

  let backgroundThemeToApply = themePicker('background');
  while (backgroundThemeToApply === background?.className) {
    backgroundThemeToApply = themePicker('background');
  }

  if (background && textThemeToApply && backgroundThemeToApply) {
    background.className = backgroundThemeToApply;
    applyClassToArray(textElements, textThemeToApply);
  } else {
    throw new Error('Updating theme failed');
  }
  checkIfWhiteTheme();
}

nextThemeButton?.addEventListener('click', updateTheme);

// -----------------------------------------------------------------------------

// MARK: Light/Dark Button
updateTheme();
lightDarkButton?.classList.toggle('darkButton', theme === 'light');
lightDarkButton?.classList.toggle('lightButton', theme === 'dark');

lightDarkButton?.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  updateTheme();
  lightDarkButton?.classList.toggle('lightButton', theme === 'dark');
  lightDarkButton?.classList.toggle('darkButton', theme === 'light');
});

// -----------------------------------------------------------------------------

// MARK: Seconds Setting
secondsToggle?.addEventListener('click', () => {
  useSeconds = useSeconds === 'on' ? 'off' : 'on';
  secondsToggleNob?.classList.toggle('toggleNobOn', useSeconds === 'on');
  secondsToggleNob?.classList.toggle('toggleNobOff', useSeconds === 'off');
  checkIfWhiteTheme();
});

// -----------------------------------------------------------------------------

// MARK: Theme Setting
Array.from(themeContainer?.children || []).forEach(themeElement => {
  themeElement.addEventListener('click', () => {
    const currentTheme = themeElement.classList.toString();
    if (background) background.className = currentTheme;
    checkIfWhiteTheme();
    theme = darkThemes.includes(currentTheme) ? 'dark' : 'light';
  });
});

// -----------------------------------------------------------------------------

// MARK: Text Theme Setting
Array.from(textThemeContainer?.children || []).forEach(textThemeElement => {
  textThemeElement.addEventListener('click', () => {
    const currentTheme = textThemeElement.classList.toString();
    applyClassToArray(textElements, currentTheme);
  });
});

// -----------------------------------------------------------------------------

// MARK: Tooltip
Array.from(tooltipLaunchers).forEach((launcher, i) => {
  const currentTooltip = document.getElementById(`tooltip${i}`);
  launcher.addEventListener('mouseenter', () => currentTooltip?.classList.add('tooltipOn'));
  launcher.addEventListener('mouseleave', () => currentTooltip?.classList.remove('tooltipOn'));
});

// -----------------------------------------------------------------------------

// MARK: Error Handling
try {
} catch (e) {
  console.error(e);
}
