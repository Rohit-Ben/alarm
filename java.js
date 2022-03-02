let date = new Date();
let h, m, s, hr, mn, se;
let hour = [];
let min = [];
let sec = [];
let local;
let sub = document.querySelector(".sub");
sub.addEventListener("click", (e) => {
  e.preventDefault();
  h = document.querySelector(".h").value;
  m = document.querySelector(".m").value;
  s = document.querySelector(".s").value;
  if (h <= 24 && m <= 60 && s <= 60) {
    hour.push(h);
    min.push(m);
    sec.push(s);
    document.querySelector(".h").classList.remove("red");
    document.querySelector(".m").classList.remove("red");
    document.querySelector(".s").classList.remove("red");
  }
  else{
    document.querySelector(".h").classList.add("red");
    document.querySelector(".m").classList.add("red");
    document.querySelector(".s").classList.add("red");
  }
  
  local = {
    hour: hour,
    minute: min,
    sec: sec,
  };
  localStorage.setItem("local", JSON.stringify(local));
  document.querySelector(".h").value = "";
  document.querySelector(".m").value = "";
  document.querySelector(".s").value = "";
});

let t = document.querySelector(".time");
setInterval(clock, 1000);
let str = "";
function clock() {
  let date = new Date();
  hr = parseInt(date.getHours());
  mn = parseInt(date.getMinutes());
  se = parseInt(date.getSeconds());
  if (hr < 10) {
    hr = "0" + hr;
  }
  if (mn < 10) {
    mn = "0" + mn;
  }
  if (se < 10) {
    se = "0" + se;
  }
  t.innerHTML = `<h2>${hr} : ${mn} : ${se}</h2>`;
  hr = parseInt(hr);
  mn = parseInt(mn);
  se = parseInt(se);
  let html = "";
  let a = document.querySelector(".alarm");
  a.innerHTML = "";
  if (localStorage.length == 0) {
  } else {
    let hour = JSON.parse(localStorage.local).hour;
    let minute = JSON.parse(localStorage.local).minute;
    let second = JSON.parse(localStorage.local).sec;

    for (let index = 0; index < hour.length; index++) {
      let x = `${hour[index]} : ${minute[index]} : ${second[index]}`;

      // console.log(hr,(parseInt(hour[index])));
      let tn = parseInt(hr * 3600 + mn * 60 + se);
      let ta =
        parseInt(hour[index]) * 3600 +
        parseInt(minute[index]) * 60 +
        parseInt(second[index]);
      let tl;
      if (ta > tn) {
        tl = ta - tn;
      } else {
        tl = parseInt(86400 + ta - tn);
      }
      // console.log(tl);
      let sh = Math.floor(tl / 3600);
      tl = tl % 3600;
      let sm = Math.floor(tl / 60);
      let ss = tl % 60;
      // console.log(`${tn} - ${ta} - ${tl}`);
      if (hr == hour[index] && mn == minute[index] && se == second[index]) {
        console.log("alarm!!!!!");
        var audio = new Audio("alarm.wav");
        audio.play();
      }
        html += `<div class="box ${index + 1}">
      <div class="img" onclick="deletealarm(${index + 1})"><img src="https://img.icons8.com/plumpy/24/000000/delete-sign--v1.png"/></div>
      <div class="alarmtime">${x}</div>
      <div class="left">rings after- ${sh}hr ${sm}min ${ss}sec</div>
      </div>`;
    }
    a.innerHTML = html;
  }
}

function deletealarm(ind) {
  let dh=JSON.parse(localStorage.getItem('local')).hour;
  dh.splice(ind-1,1);
  let dm=JSON.parse(localStorage.getItem('local')).minute;
  dm.splice(ind-1,1);
  let ds=JSON.parse(localStorage.getItem('local')).sec;
  ds.splice(ind-1,1);
  let local = {
    hour: dh,
    minute: dm,
    sec: ds,
  };
  localStorage.setItem("local", JSON.stringify(local)); 

}