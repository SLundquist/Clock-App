let theme=window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches?"dark":"light",timeFormat="24h",useSeconds="off";function currentTime(){const e=new Date;let t=e.getHours();const n=t.toString().length;let o=e.getMinutes();const s=o.toString().length;let l=e.getSeconds();let c;if(1==n&&(t=`0${t}`),1==s&&(o=`0${o}`),1==l.toString().length&&(l=`0${l}`),"24h"==timeFormat)c=`${t}:${o}`;else{if("12h"!=timeFormat)throw new Error('Time composite error: Variable "timeFormat" is using an invalid value');t<=12||(parseInt(t),t-=12),c=`${t}:${o}`}if("off"==useSeconds)return c;if("on"==useSeconds)return c=`${c}:${l}`,c;throw new Error('Time composite error: Variable "useSeconds" is using an invalid value')}const timeText=document.getElementById("timeText"),title=document.getElementById("title");function updateTime(){timeText.innerHTML=currentTime(),title.innerHTML=`Clock App - ${currentTime()}`}setInterval(updateTime,500);const fullscreenButton=document.getElementById("fullscreenButton");let isInFullscreen=!1;const screen=document.documentElement;function check(){isInFullscreen=!window.screenTop||!window.screenY}function updateFullscreenIcon(){fullscreenButton.classList.contains("fullscreenOff")?fullscreenButton.classList.replace("fullscreenOff","fullscreenOn"):fullscreenButton.classList.contains("fullscreenOn")&&fullscreenButton.classList.replace("fullscreenOn","fullscreenOff")}0==document.fullscreenEnabled&&(fullscreenButton.style.mask="",fullscreenButton.style.pointerEvents="none"),fullscreenButton.addEventListener("click",(()=>{if(check(),1==isInFullscreen)document.exitFullscreen(),isInFullscreen=!1,updateFullscreenIcon();else{if(0!=isInFullscreen)throw new Error("Fullscreen Error: Variable is not a boolean");screen.requestFullscreen(),isInFullscreen=!0,updateFullscreenIcon()}}));const settingsButton=document.getElementById("settingsButton"),settingsBar=document.getElementById("settingsBar");settingsButton.addEventListener("click",(()=>{settingsBar.classList.add("settingsBarOut")}));const closeButton=document.getElementById("closeButton");closeButton.addEventListener("click",(()=>{settingsBar.classList.remove("settingsBarOut")}));const formatToggle=document.getElementById("formatToggle"),formatToggleNob=document.getElementById("formatToggleNob");formatToggle.addEventListener("click",(()=>{"24h"==timeFormat?(timeFormat="12h",formatToggleNob.classList.add("toggleNobOn"),formatToggleNob.classList.remove("toggleNobOff")):"12h"==timeFormat&&(timeFormat="24h",formatToggleNob.classList.add("toggleNobOff"),formatToggleNob.classList.remove("toggleNobOn"))}));const nextThemeButton=document.getElementById("nextThemeButton"),background=document.getElementById("background"),formatText=document.getElementById("formatText"),secondsText=document.getElementById("secondsText"),themeSelectorText=document.getElementById("themeSelectorText"),textThemeSelectorText=document.getElementById("textThemeSelectorText"),lightThemes=["backgroundLightTheme1","backgroundLightTheme2","backgroundLightTheme3","backgroundLightTheme4","backgroundLightTheme5","backgroundLightTheme6"],darkThemes=["backgroundDarkTheme1","backgroundDarkTheme2","backgroundDarkTheme3","backgroundDarkTheme4","backgroundDarkTheme5","backgroundDarkTheme6"],textThemes=["textTheme1","textTheme2","textTheme3","textTheme4","textTheme5","textTheme6","textTheme7"];function updateTheme(){const e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random()),n="light"===theme?lightThemes:darkThemes,o=textThemes[Math.floor(e/(10/textThemes.length))],s=n[Math.floor(t/1.6666667)];if(!s||!o)throw new Error("Updating theme failed");background.className=s,formatText.className=o,secondsText.className=o,timeText.className=o,themeSelectorText.className=o,textThemeSelectorText.className=o}nextThemeButton.addEventListener("click",updateTheme);const lightDarkButton=document.getElementById("lightDarkButton");updateTheme(),"light"==theme?lightDarkButton.classList.add("darkButton"):"dark"==theme&&lightDarkButton.classList.add("lightButton"),lightDarkButton.addEventListener("click",(()=>{if(theme="light"===theme?"dark":"light",updateTheme(),lightDarkButton.classList.contains("lightButton"))lightDarkButton.classList.replace("lightButton","darkButton");else{if(!lightDarkButton.classList.contains("darkButton"))throw new Error("Class list error: HTML element does not contain expected class");lightDarkButton.classList.replace("darkButton","lightButton")}}));const secondsToggle=document.getElementById("secondsToggle"),secondsToggleNob=document.getElementById("secondsToggleNob");secondsToggle.addEventListener("click",(()=>{"on"==useSeconds?(useSeconds="off",secondsToggleNob.classList.remove("toggleNobOn"),secondsToggleNob.classList.add("toggleNobOff")):"off"==useSeconds&&(useSeconds="on",secondsToggleNob.classList.add("toggleNobOn"),secondsToggleNob.classList.remove("toggleNobOff"))}));const themeContainer=document.getElementById("themeContainer"),customThemes=themeContainer.children;for(let e=0;e<customThemes.length;e++)customThemes[e].addEventListener("click",(()=>{const t=customThemes[e].classList;background.className=t}));const textThemeContainer=document.getElementById("textThemeContainer"),customTextThemes=textThemeContainer.children;for(let e=0;e<customTextThemes.length;e++)customTextThemes[e].addEventListener("click",(()=>{const t=customTextThemes[e].classList;formatText.className=t,secondsText.className=t,timeText.className=t,themeSelectorText.className=t,textThemeSelectorText.className=t}));const tooltipLaunchers=document.getElementsByClassName("tooltipLauncher");for(let e=0;e<tooltipLaunchers.length;e++){const t=document.getElementById(`tooltip${e}`);tooltipLaunchers[e].addEventListener("mouseenter",(()=>{t.classList.replace("tooltipOff","tooltipOn")})),tooltipLaunchers[e].addEventListener("mouseleave",(()=>{t.classList.replace("tooltipOn","tooltipOff")}))}