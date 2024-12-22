var theme=window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches?"dark":"light",timeFormat="24h",useSeconds="off";function currentTime(){let e,t=new Date,n=t.getHours(),o=n.toString().length,s=t.getMinutes(),l=s.toString().length,r=t.getSeconds();if(1==o&&(n=`0${n}`),1==l&&(s=`0${s}`),1==r.toString().length&&(r=`0${r}`),"24h"==timeFormat)e=`${n}:${s}`;else{if("12h"!=timeFormat)throw new Error('Time composite error: Variable "timeFormat" is using an invalid value');n<=12||(parseInt(n),n-=12),e=`${n}:${s}`}if("off"==useSeconds)return e;if("on"==useSeconds)return e=`${e}:${r}`,e;throw new Error('Time composite error: Variable "useSeconds" is using an invalid value')}const timeText=document.getElementById("timeText"),title=document.getElementById("title");function updateTime(){timeText.innerHTML=currentTime(),title.innerHTML=`Clock App - ${currentTime()}`}var clockInterval=setInterval(updateTime,500);const fullscreenButton=document.getElementById("fullscreenButton");var isInFullscreen=!1;const screen=document.documentElement;function check(){isInFullscreen=!window.screenTop||!window.screenY}0==document.fullscreenEnabled&&(fullscreenButton.style.mask="",fullscreenButton.style.pointerEvents="none");const fullscreenChecker=setInterval(check,500);function updateFullscreenIcon(){fullscreenButton.classList.contains("fullscreenOff")?fullscreenButton.classList.replace("fullscreenOff","fullscreenOn"):fullscreenButton.classList.contains("fullscreenOn")&&fullscreenButton.classList.replace("fullscreenOn","fullscreenOff")}document.addEventListener("keydown",(e=>{"Escape"==e.key&&1==isInFullscreen&&updateFullscreenIcon()})),fullscreenButton.addEventListener("click",(()=>{if(check(),1==isInFullscreen)document.exitFullscreen(),isInFullscreen=!1,updateFullscreenIcon();else{if(0!=isInFullscreen)throw new Error("Fullscreen Error: Variable is not a boolean");screen.requestFullscreen(),isInFullscreen=!0,updateFullscreenIcon()}}));const settingsButton=document.getElementById("settingsButton"),settingsBar=document.getElementById("settingsBar");settingsButton.addEventListener("click",(()=>{settingsBar.classList.add("settingsBarOut")}));const closeButton=document.getElementById("closeButton");closeButton.addEventListener("click",(()=>{settingsBar.classList.remove("settingsBarOut")}));const formatToggle=document.getElementById("formatToggle"),formatToggleNob=document.getElementById("formatToggleNob");formatToggle.addEventListener("click",(()=>{"24h"==timeFormat?(timeFormat="12h",formatToggleNob.classList.add("toggleNobOn"),formatToggleNob.classList.remove("toggleNobOff")):"12h"==timeFormat&&(timeFormat="24h",formatToggleNob.classList.add("toggleNobOff"),formatToggleNob.classList.remove("toggleNobOn"))}));const nextThemeButton=document.getElementById("nextThemeButton"),background=document.getElementById("background"),formatText=document.getElementById("formatText"),secondsText=document.getElementById("secondsText"),lightThemes=["backgroundLightTheme1","backgroundLightTheme2","backgroundLightTheme3","backgroundLightTheme4"],darkThemes=["backgroundDarkTheme1","backgroundDarkTheme2","backgroundDarkTheme3","backgroundDarkTheme4"],textThemes=["textTheme1","textTheme2","textTheme3","textTheme4","textTheme5","textTheme6","textTheme7"];function updateTheme(){const e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());var n="light"===theme?lightThemes:darkThemes,o=textThemes[Math.floor(e/(10/textThemes.length))],s=n[Math.floor(t/2.5)];if(!s||!o)throw new Error("Updating theme failed");background.className=s,formatText.className=o,secondsText.className=o,timeText.className=o}nextThemeButton.addEventListener("click",updateTheme);const lightDarkButton=document.getElementById("lightDarkButton");updateTheme(),"light"==theme?lightDarkButton.classList.add("darkButton"):"dark"==theme&&lightDarkButton.classList.add("lightButton"),lightDarkButton.addEventListener("click",(()=>{if(theme="light"===theme?"dark":"light",updateTheme(),lightDarkButton.classList.contains("lightButton"))lightDarkButton.classList.replace("lightButton","darkButton");else{if(!lightDarkButton.classList.contains("darkButton"))throw new Error("Class list error: HTML element does not contain expected class");lightDarkButton.classList.replace("darkButton","lightButton")}}));const secondsToggle=document.getElementById("secondsToggle"),secondsToggleNob=document.getElementById("secondsToggleNob");secondsToggle.addEventListener("click",(()=>{"on"==useSeconds?(useSeconds="off",secondsToggleNob.classList.remove("toggleNobOn"),secondsToggleNob.classList.add("toggleNobOff")):"off"==useSeconds&&(useSeconds="on",secondsToggleNob.classList.add("toggleNobOn"),secondsToggleNob.classList.remove("toggleNobOff"))}));