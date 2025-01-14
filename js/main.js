var _a, _b;
// MARK: Utilities
function applyClassToArray(array, classToApply) {
    array.forEach(function (element) { return element.className = classToApply; });
}
function applyStyleToArray(array, styleProperty, value) {
    array.forEach(function (element) {
        element.style[styleProperty] = value;
    });
}
function applyBoxShadowToArray(array, leftRight, upDown, spread, start, color) {
    array.forEach(function (element) { return element.style.boxShadow = "".concat(leftRight, "rem ").concat(upDown, "rem ").concat(spread, "rem ").concat(start, "rem ").concat(color); });
}
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
// -----------------------------------------------------------------------------
// MARK: Element Calls
var timeText = document.getElementById('timeText');
var title = document.getElementById('title');
var fullscreenButton = document.getElementById('fullscreenButton');
var settingsButton = document.getElementById('settingsButton');
var settingsBar = document.getElementById('settingsBar');
var formatToggle = document.getElementById('formatToggle');
var formatToggleNob = document.getElementById('formatToggleNob');
var closeButton = document.getElementById('closeButton');
var nextThemeButton = document.getElementById('nextThemeButton');
var background = document.getElementById('background');
var formatText = document.getElementById('formatText');
var secondsText = document.getElementById('secondsText');
var themeSelectorText = document.getElementById('themeSelectorText');
var textThemeSelectorText = document.getElementById('textThemeSelectorText');
var secondsToggle = document.getElementById('secondsToggle');
var secondsToggleNob = document.getElementById('secondsToggleNob');
var lightDarkButton = document.getElementById('lightDarkButton');
var themeContainer = document.getElementById('themeContainer');
var textThemeContainer = document.getElementById('textThemeContainer');
var tooltipLaunchers = document.getElementsByClassName('tooltipLauncher');
// -----------------------------------------------------------------------------
// MARK: Constant Arrays
var textElements = [timeText, formatText, secondsText, themeSelectorText, textThemeSelectorText].filter(Boolean);
var lightThemes = [
    'backgroundLightTheme1', 'backgroundLightTheme2', 'backgroundLightTheme3',
    'backgroundLightTheme4', 'backgroundLightTheme5', 'backgroundLightTheme6', 'backgroundLightTheme7',
];
var darkThemes = [
    'backgroundDarkTheme1', 'backgroundDarkTheme2', 'backgroundDarkTheme3',
    'backgroundDarkTheme4', 'backgroundDarkTheme5', 'backgroundDarkTheme6',
];
var textThemes = [
    'textTheme1', 'textTheme2', 'textTheme3', 'textTheme4', 'textTheme5', 'textTheme6',
    'textTheme7', 'textTheme8', 'textTheme9', 'textTheme10', 'textTheme11', 'textTheme12',
];
var colorChangeElements = [fullscreenButton, settingsButton, lightDarkButton, nextThemeButton, closeButton].filter(Boolean);
var borderChangeElements = [formatToggle, secondsToggle].filter(Boolean);
var boxShadowChangeElements = [secondsToggleNob, formatToggleNob].filter(Boolean);
var textThemeOptions = Array.from((textThemeContainer === null || textThemeContainer === void 0 ? void 0 : textThemeContainer.children) || []);
// -----------------------------------------------------------------------------
// MARK: Initial Settings
var theme = ((_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme:dark)')) === null || _b === void 0 ? void 0 : _b.matches) ? 'dark' : 'light';
var timeFormat = '24h';
var useSeconds = 'off';
// -----------------------------------------------------------------------------
// MARK: Time
function currentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var formatTime = function (value) { return value < 10 ? "0".concat(value) : value.toString(); };
    var hoursString = timeFormat === '12h' ? formatTime(hours % 12 || 12) : formatTime(hours);
    var minutesString = formatTime(minutes);
    var secondsString = formatTime(seconds);
    var composite = "".concat(hoursString, ":").concat(minutesString);
    if (useSeconds === 'on')
        composite += ":".concat(secondsString);
    return composite;
}
function updateTime() {
    if (timeText && title) {
        timeText.innerHTML = currentTime();
        title.innerHTML = currentTime();
    }
    else {
        throw new Error('Uncaught error: object is null');
    }
}
setInterval(updateTime, 500);
// -----------------------------------------------------------------------------
// MARK: Fullscreen Button and Function
var isInFullscreen = false;
function checkFullscreen() {
    isInFullscreen = !(window.screenTop && window.screenY);
}
function updateFullscreenIcon() {
    if (fullscreenButton.classList.contains('fullscreenOff')) {
        fullscreenButton.classList.replace('fullscreenOff', 'fullscreenOn');
    }
    else if (fullscreenButton.classList.contains('fullscreenOn')) {
        fullscreenButton.classList.replace('fullscreenOn', 'fullscreenOff');
    }
}
fullscreenButton === null || fullscreenButton === void 0 ? void 0 : fullscreenButton.addEventListener('click', function () {
    checkFullscreen();
    if (isInFullscreen) {
        document.exitFullscreen();
    }
    else {
        document.documentElement.requestFullscreen();
    }
    updateFullscreenIcon();
});
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);
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
settingsButton === null || settingsButton === void 0 ? void 0 : settingsButton.addEventListener('click', function () { return settingsBar === null || settingsBar === void 0 ? void 0 : settingsBar.classList.add('settingsBarOut'); });
// -----------------------------------------------------------------------------
// MARK: Close Button
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', function () { return settingsBar === null || settingsBar === void 0 ? void 0 : settingsBar.classList.remove('settingsBarOut'); });
// -----------------------------------------------------------------------------
// MARK: Format Setting
formatToggle === null || formatToggle === void 0 ? void 0 : formatToggle.addEventListener('click', function () {
    timeFormat = timeFormat === '24h' ? '12h' : '24h';
    formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.toggle('toggleNobOn', timeFormat === '12h');
    formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.toggle('toggleNobOff', timeFormat === '24h');
    checkIfWhiteTheme();
});
// -----------------------------------------------------------------------------
// MARK: White Theme
var whiteThemes = ['backgroundLightTheme7'];
function checkIfWhiteTheme() {
    var isWhiteTheme = whiteThemes.includes((background === null || background === void 0 ? void 0 : background.className) || '');
    var color = isWhiteTheme ? 'black' : 'white';
    var backgroundColor = isWhiteTheme ? 'black' : 'white';
    var shadowColor = isWhiteTheme ? 'black' : 'white';
    var settingsBarColor = isWhiteTheme ? '#4b4b4b30' : '#b4b4b438';
    applyStyleToArray(textElements, 'color', color);
    applyStyleToArray(colorChangeElements, 'background', backgroundColor);
    applyStyleToArray(borderChangeElements, 'borderColor', color);
    applyStyleToArray(textThemeOptions, 'color', color);
    applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, shadowColor);
    if (settingsBar)
        settingsBar.style.background = settingsBarColor;
    [formatToggleNob, secondsToggleNob].forEach(function (nob) {
        if (nob)
            nob.style.background = nob.classList.contains('toggleNobOn') ? color : 'transparent';
    });
}
// -----------------------------------------------------------------------------
// MARK: Next Theme Button
function themePicker(outputType) {
    var themes = outputType === 'text' ? textThemes : theme === 'light' ? lightThemes : darkThemes;
    return themes[randomInt(themes.length)];
}
function updateTheme() {
    var textThemeToApply = themePicker('text');
    while (textThemeToApply === (timeText === null || timeText === void 0 ? void 0 : timeText.className)) {
        textThemeToApply = themePicker('text');
    }
    var backgroundThemeToApply = themePicker('background');
    while (backgroundThemeToApply === (background === null || background === void 0 ? void 0 : background.className)) {
        backgroundThemeToApply = themePicker('background');
    }
    if (background && textThemeToApply && backgroundThemeToApply) {
        background.className = backgroundThemeToApply;
        applyClassToArray(textElements, textThemeToApply);
    }
    else {
        throw new Error('Updating theme failed');
    }
    checkIfWhiteTheme();
}
nextThemeButton === null || nextThemeButton === void 0 ? void 0 : nextThemeButton.addEventListener('click', updateTheme);
// -----------------------------------------------------------------------------
// MARK: Light/Dark Button
updateTheme();
lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.toggle('darkButton', theme === 'light');
lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.toggle('lightButton', theme === 'dark');
lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.addEventListener('click', function () {
    theme = theme === 'light' ? 'dark' : 'light';
    updateTheme();
    lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.toggle('lightButton', theme === 'dark');
    lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.toggle('darkButton', theme === 'light');
});
// -----------------------------------------------------------------------------
// MARK: Seconds Setting
secondsToggle === null || secondsToggle === void 0 ? void 0 : secondsToggle.addEventListener('click', function () {
    useSeconds = useSeconds === 'on' ? 'off' : 'on';
    secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.toggle('toggleNobOn', useSeconds === 'on');
    secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.toggle('toggleNobOff', useSeconds === 'off');
    checkIfWhiteTheme();
});
// -----------------------------------------------------------------------------
// MARK: Theme Setting
Array.from((themeContainer === null || themeContainer === void 0 ? void 0 : themeContainer.children) || []).forEach(function (themeElement) {
    themeElement.addEventListener('click', function () {
        var currentTheme = themeElement.classList.toString();
        if (background)
            background.className = currentTheme;
        checkIfWhiteTheme();
        theme = darkThemes.includes(currentTheme) ? 'dark' : 'light';
    });
});
// -----------------------------------------------------------------------------
// MARK: Text Theme Setting
Array.from((textThemeContainer === null || textThemeContainer === void 0 ? void 0 : textThemeContainer.children) || []).forEach(function (textThemeElement) {
    textThemeElement.addEventListener('click', function () {
        var currentTheme = textThemeElement.classList.toString();
        applyClassToArray(textElements, currentTheme);
    });
});
// -----------------------------------------------------------------------------
// MARK: Tooltip
Array.from(tooltipLaunchers).forEach(function (launcher, i) {
    var currentTooltip = document.getElementById("tooltip".concat(i));
    launcher.addEventListener('mouseenter', function () { return currentTooltip === null || currentTooltip === void 0 ? void 0 : currentTooltip.classList.add('tooltipOn'); });
    launcher.addEventListener('mouseleave', function () { return currentTooltip === null || currentTooltip === void 0 ? void 0 : currentTooltip.classList.remove('tooltipOn'); });
});
// -----------------------------------------------------------------------------
// MARK: Error Handling
try {
}
catch (e) {
    console.error(e);
}
