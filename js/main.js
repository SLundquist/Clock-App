var _a, _b;
// MARK:Utilities
function applyClassToArray(array, classToApply) {
    for (var i = 0; i < array.length; i++) {
        array[i].className = classToApply;
    }
}
function applyColorToArray(array, valueToApply) {
    for (var i = 0; i < array.length; i++) {
        array[i].style.color = valueToApply;
    }
}
function applyBackgroundToArray(array, valueToApply) {
    for (var i = 0; i < array.length; i++) {
        array[i].style.background = valueToApply;
    }
}
function applyBorderColorToArray(array, valueToApply) {
    for (var i = 0; i < array.length; i++) {
        array[i].style.borderColor = valueToApply;
    }
}
function applyBoxShadowToArray(array, leftRight, upDown, spread, start, color) {
    for (var i = 0; i < array.length; i++) {
        array[i].style.boxShadow = "".concat(leftRight, "rem ").concat(upDown, "rem ").concat(spread, "rem ").concat(start, "rem ").concat(color);
    }
}
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
// -----------------------------------------------------------------------------
// MARK:Element Calls
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
// MARK:Constant Arrays
var textElements = [
    timeText, formatText, secondsText, themeSelectorText, textThemeSelectorText,
];
var lightThemes = [
    'backgroundLightTheme1',
    'backgroundLightTheme2',
    'backgroundLightTheme3',
    'backgroundLightTheme4',
    'backgroundLightTheme5',
    'backgroundLightTheme6',
    'backgroundLightTheme7',
];
var darkThemes = [
    'backgroundDarkTheme1',
    'backgroundDarkTheme2',
    'backgroundDarkTheme3',
    'backgroundDarkTheme4',
    'backgroundDarkTheme5',
    'backgroundDarkTheme6',
];
var textThemes = [
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
var colorChangeElements = [
    fullscreenButton,
    settingsButton,
    lightDarkButton,
    nextThemeButton,
    closeButton,
];
var borderChangeElements = [
    formatToggle,
    secondsToggle,
];
var boxShadowChangeElements = [
    secondsToggleNob,
    formatToggleNob,
];
var textThemeOptions = Array.from(textThemeContainer.children);
// -----------------------------------------------------------------------------
// MARK:Initial Settings
var theme = ((_b = (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme:dark)')) === null || _b === void 0 ? void 0 : _b.matches) ?
    'dark' : // dark or light returned depending on the user's system preferences
    'light';
var timeFormat = '24h'; // Initial time format set to 24h
var useSeconds = 'off'; // Initially do not use seconds for cleaner first experience
// -----------------------------------------------------------------------------
// MARK:Time
function currentTime() {
    var now = new Date();
    var hours = now.getHours(); // Returns current hours
    var minutes = now.getMinutes(); // Returns current minutes
    var seconds = now.getSeconds(); // Returns current seconds
    var composite; // will contain final composite of hours, minutes, and seconds depending on user preference
    var hoursString = hours < 10 ? "0".concat(hours) : hours.toString();
    var minutesString = minutes < 10 ? "0".concat(minutes) : minutes.toString();
    var secondsString = seconds < 10 ? "0".concat(seconds) : seconds.toString();
    if (timeFormat === '24h') {
        composite = "".concat(hoursString, ":").concat(minutesString);
    }
    else if (timeFormat === '12h') {
        var formattedHours = hours % 12 || 12; // Convert to 12-hour format
        var formattedHoursString = formattedHours < 10 ? "0".concat(formattedHours) : formattedHours.toString();
        composite = "".concat(formattedHoursString, ":").concat(minutesString);
    }
    else {
        throw new Error('Time composite error: Variable "timeFormat" is using an invalid value');
    }
    if (useSeconds === 'on') {
        composite = "".concat(composite, ":").concat(secondsString);
    }
    else if (useSeconds !== 'off') {
        throw new Error('Time composite error: Variable "useSeconds" is using an invalid value');
    }
    return composite;
}
function updateTime() {
    if (timeText != null && title != null) {
        timeText.innerHTML = currentTime();
        title.innerHTML = "".concat(currentTime());
    }
    else {
        throw new Error('Uncaught error: object is null');
    }
}
setInterval(updateTime, 500); // Updates the time
// -----------------------------------------------------------------------------
// MARK:Fullscreen Button and Function
var isInFullscreen = false;
if (document.fullscreenEnabled == false && fullscreenButton != null) { // Remove fullscreen button if browser does not support the function
    fullscreenButton.style.mask = '';
    fullscreenButton.style.pointerEvents = 'none';
}
function check() {
    if (window.screenTop && window.screenY) {
        isInFullscreen = false; // Returned when not in fullscreen
    }
    else {
        isInFullscreen = true; // Returned when in fullscreen
    }
}
function updateFullscreenIcon() {
    if (fullscreenButton != null) {
        if (fullscreenButton.classList.contains('fullscreenOff')) {
            fullscreenButton.classList.replace('fullscreenOff', 'fullscreenOn');
        }
        else if (fullscreenButton.classList.contains('fullscreenOn')) {
            fullscreenButton.classList.replace('fullscreenOn', 'fullscreenOff');
        }
    }
    else {
        throw new Error('Uncaught error: Object is null');
    }
}
fullscreenButton === null || fullscreenButton === void 0 ? void 0 : fullscreenButton.addEventListener('click', function () {
    check();
    if (isInFullscreen == true) {
        document.exitFullscreen();
        isInFullscreen = false;
        updateFullscreenIcon();
    }
    else if (isInFullscreen == false) {
        document.documentElement.requestFullscreen();
        isInFullscreen = true;
        updateFullscreenIcon();
    }
    else {
        throw new Error('Fullscreen Error: Variable is not a boolean');
    }
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
// MARK:Settings Button
settingsButton === null || settingsButton === void 0 ? void 0 : settingsButton.addEventListener('click', function () {
    settingsBar === null || settingsBar === void 0 ? void 0 : settingsBar.classList.add('settingsBarOut');
});
// -----------------------------------------------------------------------------
// MARK:Close Button
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', function () {
    settingsBar === null || settingsBar === void 0 ? void 0 : settingsBar.classList.remove('settingsBarOut');
});
// -----------------------------------------------------------------------------
// MARK:Format Setting
formatToggle === null || formatToggle === void 0 ? void 0 : formatToggle.addEventListener('click', function () {
    if (timeFormat == '24h') {
        timeFormat = '12h';
        formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.add('toggleNobOn');
        formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.remove('toggleNobOff');
        checkIfWhiteTheme();
    }
    else if (timeFormat == '12h') {
        timeFormat = '24h';
        formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.add('toggleNobOff');
        formatToggleNob === null || formatToggleNob === void 0 ? void 0 : formatToggleNob.classList.remove('toggleNobOn');
        checkIfWhiteTheme();
    }
    else {
    }
});
// -----------------------------------------------------------------------------
// MARK:White theme
var whiteThemes = ['backgroundLightTheme7'];
function checkIfWhiteTheme() {
    if (whiteThemes.includes(background.className)) {
        applyColorToArray(textElements, 'black');
        applyBackgroundToArray(colorChangeElements, 'black');
        applyBorderColorToArray(borderChangeElements, 'black');
        applyColorToArray(textThemeOptions, 'black');
        applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, 'black');
        settingsBar.style.background = '#4b4b4b30';
        if (formatToggleNob.classList.contains('toggleNobOn') == true) {
            formatToggleNob.style.background = 'black';
        }
        else {
            formatToggleNob.style.background = 'transparent';
        }
        if (secondsToggleNob.classList.contains('toggleNobOn') == true) {
            secondsToggleNob.style.background = 'black';
        }
        else {
            secondsToggleNob.style.background = 'transparent';
        }
    }
    else {
        applyColorToArray(textElements, 'white');
        applyBackgroundToArray(colorChangeElements, 'white');
        applyBorderColorToArray(borderChangeElements, 'white');
        applyColorToArray(textThemeOptions, 'white');
        applyBoxShadowToArray(boxShadowChangeElements, 0, 0, 0, 0.1, 'white');
        settingsBar.style.background = '#b4b4b438';
        applyBackgroundToArray(boxShadowChangeElements, 'white');
        if (formatToggleNob.classList.contains('toggleNobOn') == true) {
            formatToggleNob.style.background = 'white';
        }
        else {
            formatToggleNob.style.background = 'transparent';
        }
        if (secondsToggleNob.classList.contains('toggleNobOn') == true) {
            secondsToggleNob.style.background = 'white';
        }
        else {
            secondsToggleNob.style.background = 'transparent';
        }
    }
}
// -----------------------------------------------------------------------------
// MARK:Next Theme Button
function themePicker(outputType) {
    if (outputType == 'text') {
        var textTheme = textThemes[randomInt(textThemes.length)];
        return textTheme;
    }
    else if (outputType == 'background') {
        var isLight = theme === 'light';
        var themes = isLight ? lightThemes : darkThemes;
        var backgroundTheme = themes[randomInt(themes.length)];
        return backgroundTheme;
    }
    else {
        throw new Error('themePicker failed: Input not valid');
    }
}
function updateTheme() {
    var textThemeToApply = themePicker('text');
    if (textThemeToApply == (timeText === null || timeText === void 0 ? void 0 : timeText.className)) {
        while (textThemeToApply == (timeText === null || timeText === void 0 ? void 0 : timeText.className)) {
            textThemeToApply = themePicker('text');
        }
    }
    var backgroundThemeToApply = themePicker('background');
    if (backgroundThemeToApply == (background === null || background === void 0 ? void 0 : background.className)) {
        while (backgroundThemeToApply == (background === null || background === void 0 ? void 0 : background.className)) {
            backgroundThemeToApply = themePicker('background');
        }
    }
    if (backgroundThemeToApply && textThemeToApply) {
        background.className = backgroundThemeToApply; // Applies theme to background
        applyClassToArray(textElements, textThemeToApply); // Applies text theme to all text elements
    }
    else {
        throw new Error('Updating theme failed'); // Thrown if textTheme or backgroundTheme have a value issue (should never happen)
    }
    checkIfWhiteTheme();
}
nextThemeButton === null || nextThemeButton === void 0 ? void 0 : nextThemeButton.addEventListener('click', updateTheme); // Runs function on button click
// -----------------------------------------------------------------------------
// MARK:Light/Dark Button
updateTheme();
if (theme == 'light') {
    lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.add('darkButton');
}
else if (theme == 'dark') {
    lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.classList.add('lightButton');
}
lightDarkButton === null || lightDarkButton === void 0 ? void 0 : lightDarkButton.addEventListener('click', function () {
    theme = theme === 'light' ? 'dark' : 'light'; // Returns dark or light depending on if 'theme' is light or not
    updateTheme(); // Runs a theme update after updating the 'theme' variable
    if (lightDarkButton.classList.contains('lightButton')) { // Replaces the light/dark icon when theme changes
        lightDarkButton.classList.replace('lightButton', 'darkButton');
    }
    else if (lightDarkButton.classList.contains('darkButton')) {
        lightDarkButton.classList.replace('darkButton', 'lightButton');
    }
    else {
        throw new Error(// Thrown when 'lightDarkButton' does not contain either 'lightButton' or 'darkButton'
        'Class list error: HTML element does not contain expected class');
    }
});
// -----------------------------------------------------------------------------
// MARK:Seconds Setting
secondsToggle === null || secondsToggle === void 0 ? void 0 : secondsToggle.addEventListener('click', function () {
    if (useSeconds == 'on') {
        useSeconds = 'off';
        secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.remove('toggleNobOn');
        secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.add('toggleNobOff');
        checkIfWhiteTheme();
    }
    else if (useSeconds == 'off') {
        useSeconds = 'on';
        secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.add('toggleNobOn');
        secondsToggleNob === null || secondsToggleNob === void 0 ? void 0 : secondsToggleNob.classList.remove('toggleNobOff');
        checkIfWhiteTheme();
    }
});
// -----------------------------------------------------------------------------
// MARK:Theme Setting
var customThemes = themeContainer === null || themeContainer === void 0 ? void 0 : themeContainer.children;
var _loop_1 = function (i) {
    if (customThemes)
        customThemes[i].addEventListener('click', function () {
            var currentThemePre = customThemes[i].classList;
            var currentTheme = currentThemePre.toString();
            background.className = currentTheme;
            checkIfWhiteTheme();
            if (darkThemes.includes(currentTheme)) {
                theme = 'dark';
            }
            else {
                theme = 'light';
            }
        });
};
for (var i = 0; i < customThemes.length; i++) {
    _loop_1(i);
}
// -----------------------------------------------------------------------------
// MARK:Text Theme Setting
var customTextThemes = textThemeContainer === null || textThemeContainer === void 0 ? void 0 : textThemeContainer.children;
var _loop_2 = function (i) {
    customTextThemes[i].addEventListener('click', function () {
        var currentTheme = customTextThemes[i].classList.toString();
        applyClassToArray(textElements, currentTheme); // Applies text theme to all text elements
    });
};
for (var i = 0; i < customTextThemes.length; i++) {
    _loop_2(i);
}
var _loop_3 = function (i) {
    var currentTooltip = document.getElementById("tooltip".concat(i));
    tooltipLaunchers[i].addEventListener('mouseenter', function () {
        currentTooltip === null || currentTooltip === void 0 ? void 0 : currentTooltip.classList.add('tooltipOn');
    });
    tooltipLaunchers[i].addEventListener('mouseleave', function () {
        currentTooltip === null || currentTooltip === void 0 ? void 0 : currentTooltip.classList.remove('tooltipOn');
    });
};
// -----------------------------------------------------------------------------
// MARK:Tooltip
for (var i = 0; i < tooltipLaunchers.length; i++) {
    _loop_3(i);
}
// ---------------------------------------------------------------------------
// MARK:Error Handling
try { // Currently no tries in case of thrown error
}
catch (e) {
    console.error(e); // Logs thrown error message, stopping further program execution
}
finally {
    console.log('execution completed');
}
