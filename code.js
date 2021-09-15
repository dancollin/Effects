
let playground = document.querySelector("#playground");

playground.width = window.innerWidth;
playground.height = window.innerHeight;

let play = playground.getContext('2d');
let dots = [];
const _maxDots = 300;
const _dotSize = 5;
const _lineLimit = 45;
const _delay = 20;

let lines = [];

for( let i =0; i<_maxDots; i++) {
    let a = {};
    // position of dot
    a.x = Math.round(Math.random()*(playground.width-50)+25);
    a.y = Math.round(Math.random()*(playground.height-50)+25);
    a.rad = _dotSize;
    a.dx = Math.random()*2+1;
    a.dy = Math.random()*2+1;
    dots.push(a);
}


setInterval(funny, _delay);

function funny() {
    play.fillStyle="black";
    play.fillRect(0,0,playground.width, playground.height);

    // update positions of dots
    for(let i = 0; i < dots.length; i++) {

        let t = dots[i];

        t.x += t.dx;
        if(dots[i].x > playground.width-8 || dots[i].x < 8) 
            dots[i].dx *= -1;
        dots[i].y += dots[i].dy;
        if(dots[i].y > playground.height-8 || dots[i].y < 8) 
            dots[i].dy *= -1;     
    }
    
    // draw all the dots
    play.fillStyle = "rgba(250,250,250,0.2)";
    for(let i = 0; i<dots.length; i++) {
        let t = dots[i];
        play.beginPath();
        play.arc(t.x, t.y, t.rad, 0, Math.PI*2);
        //play.closePath();
        //play.stroke();
        play.fill();   
    } 

    // analyze distances and then build an array of lines to be drawn
    // build and array of all lines to draw and in which color
    analyzeDistances();
    // plot them ...
    for(let i = 0; i<lines.length; i++) {
        let line = lines[i];
        let transp = line.dist/_lineLimit;
        play.strokeStyle = `rgba(240,240,240,0.2)`;
        play.fillStyle = `rgba(240,240,240,${transp})`;
        console.log(transp);
        play.beginPath();
        play.moveTo(line.x1, line.y1);
        play.lineTo(line.x2, line.y2);
        play.closePath();
        play.stroke();
        play.fill();
    }

    // print some shit
    play.fillStyle = `rgba(240,240,240,0.7)`;
    play.font = "1rem Arial";
    play.fillText("Welcome to Nothing", playground.width/2-150, playground.height/2);

}


function analyzeDistances() {

    // delete all current lines
    lines = [];
    // check all dots
    for(let cpoint = 0; cpoint < dots.length; cpoint++) {
        // against any point
        for( let apoint=cpoint; apoint<dots.length; apoint++) {
            if( cpoint == apoint)
                continue;
             let len = distanceAB(dots[apoint], dots[cpoint]);
             if (len < _lineLimit) {
                let line = {};
                line.dist = len;
                line.x1 = dots[cpoint].x;
                line.x2 = dots[apoint].x;
                line.y1 = dots[cpoint].y;
                line.y2 = dots[apoint].y;
                lines.push(line);
            }
        }
    }

    // should remove doubles...

}
 
function distanceAB (p1, p2) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.sqrt( dx*dx + dy*dy);
}



/* 
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
 } */