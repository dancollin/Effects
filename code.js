
let playground = document.querySelector("#playground");

playground.width = 500;
playground.height = 500;

let play = playground.getContext('2d');
let i = 0;
let arcs = [];
const AMAX = 3000;
const RADMAX = 10;
let TRANSP = 0.1;
let mouseX=0, mouseY=0;

for( let i =0; i<AMAX; i++) {
    let a = {};
    a.x = Math.round(Math.random()*(playground.width-50)+25);
    a.y = Math.round(Math.random()*(playground.height-50)+25);
    a.rad = Math.round(Math.random()*RADMAX+15);
    a.pos = Math.round(Math.random()*Math.PI);
    a.speed = Math.round(Math.random()*400)/10000;
    arcs.push(a);
}


setInterval(funny, 25);

function funny() {
    play.fillStyle="white";
    play.fillRect(0,0,playground.width, playground.height);



    //play.fill();
    play.fillStyle = "rgba(0,0,0,0.1";
    play.strokeStyle = `rgba(0,0,0,${TRANSP})`;
    for(let i = 0; i<arcs.length; i++) {
        let t = arcs[i];
        play.beginPath();
        play.arc(t.x, t.y, t.rad, t.pos, t.pos+3.14);
        arcs[i].pos += arcs[i].speed;
        play.closePath();
        play.stroke();
    } 
}

 
// an event listener to catch mouse movement changes over canvas
playground.addEventListener("mousemove", function (playground, evt) {
    getMousePos(playground, evt);
    document.querySelector("#mousepos").innerHTML = mouseX + " " + mouseY;
 }, false);
 
 // updates the mouse
 function getMousePos(evt) {
    var rect = playground.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    TRANSP = mouseX/playground.width;
    mouseY = evt.clientY- rect.top;
 }