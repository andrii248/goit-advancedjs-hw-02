import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as p,i as y}from"./assets/vendor-651d7991.js";const e={datePicker:document.querySelector("input#datetime-picker"),days:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]"),startBtn:document.querySelector("button[data-start]")};let c=null,d=null,a=!1;e.startBtn.setAttribute("disabled","true");e.startBtn.addEventListener("click",v);const l={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<l.defaultDate?y.show({title:"Wrong date chosen",message:"Please choose a date in the future",color:"blue"}):(e.startBtn.removeAttribute("disabled"),c=t[0])},onOpen(){clearInterval(d),a=!1,e.startBtn.setAttribute("disabled","true")}},b={start(){a||(a=!0,d=setInterval(()=>{const t=Date.now(),n=c-t,{days:o,hours:r,minutes:i,seconds:u}=S(n);n<=1e3&&this.stop(),k({days:o,hours:r,minutes:i,seconds:u})},1e3))},stop(){clearInterval(d),a=!1,e.datePicker.removeAttribute("disabled")}};p(e.datePicker,l);function v(){b.start(),e.startBtn.setAttribute("disabled","true"),e.datePicker.setAttribute("disabled","true")}function S(t){const u=s(Math.floor(t/864e5)),m=s(Math.floor(t%864e5/36e5)),h=s(Math.floor(t%864e5%36e5/6e4)),f=s(Math.floor(t%864e5%36e5%6e4/1e3));return{days:u,hours:m,minutes:h,seconds:f}}function s(t){return String(t).padStart(2,"0")}function k({days:t,hours:n,minutes:o,seconds:r}){e.days.textContent=t,e.hours.textContent=n,e.minutes.textContent=o,e.seconds.textContent=r}
//# sourceMappingURL=commonHelpers2.js.map
