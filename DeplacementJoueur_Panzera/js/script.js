let canvas, ctx;
let lc, hc;
let keyd, keyu;
let rigthEna, leftEna, upEna, downEna;

class Rectangle {
  constructor(x, y, l, h, vx, vy) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
  }
  
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.l, this.h);
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  movel()
  {
    this.x -= 10;
  }

  mover()
  {
    this.x += 10;
  }

  moveu()
  {
    this.y -= 10;
  }

  moved()
  {
    this.y += 10;
  }
  //  changesize() {
  //   this.l += this.vl;
  //   this.h += this.vh;
  // }
  // decrisToi() {
  //   return "Je suis un rectangle de couleur : " + this.couleur;
  // }
}

let tableauDesRectangles = [];

window.onload = function () {
    // Appelé quand la page est prête et a chargé
    // toutes ses ressources (images, vidéos etc.)
    console.log("pret")
    canvas = document.querySelector("#myCanvas");
    window.addEventListener("keydown",onkeyd_page, false);
    window.addEventListener("keyup",onkeyu_page, false);
    
    lc = canvas.width;
    hc = canvas.height;
    ctx = canvas.getContext("2d");
    creerDesRectangles();
  
    // Pour animation à 60 im/s
    requestAnimationFrame(anime);
}


function creerDesRectangles() {

    let l = 30;
    let h = 30;
    let x = Math.random() * lc - l;
    let y = Math.random()*hc - h;
    let vx = 0;
    let vy = 0;
    
    let rect = new Rectangle(x, y, l, h, vx, vy);
    
    tableauDesRectangles.push(rect);

}

function onmousemove_page(event)
{

  if( window.event)
    event = window.event;

  let spanx = document.querySelector("#poscx");
  spanx.innerHTML = event.clientX;

  let spany = document.querySelector("#poscy");
  spany.innerHTML = event.clientY;
}

function focus_page()
{
   document.getElementById("myCanvas").focus();
   //alert("?");
}

function onkeyu_page(event)
{
   if(window.event)
    event = window.event;
  keyu = String.fromCharCode(event.keyCode);

  if(keyu == "Q" || event.keyCode == 37)
  {
    leftEna = 0;
    //    console.log("Up Q");
  }
  if(keyu == "Z" || event.keyCode == 38)
  {
    upEna = 0;
    //  console.log("Up Z");
  }
  if(keyu == "S" || event.keyCode == 40)
  {
    downEna = 0;
    //  console.log("Up S");
  }
  if(keyu == "D" || event.keyCode == 39)
  {
    rigthEna = 0;
    //  console.log("Up D");
  }
}

function mouvementJoueur()
{
  if(rigthEna)
  {
     tableauDesRectangles.forEach((r) => {
    r.mover(ctx);
  })
  }
  if(leftEna)
  {
    tableauDesRectangles.forEach((r) => {
    r.movel(ctx);
  })
  }
  if(upEna)
  {
    tableauDesRectangles.forEach((r) => {
    r.moveu(ctx);
  })
  }
  if(downEna)
  {
    tableauDesRectangles.forEach((r) => {
    r.moved(ctx);
  })
  }
}

function onkeyd_page(event)
{

   if(window.event)
    event = window.event;

  keyd = String.fromCharCode(event.keyCode);
  if(keyd == "Q" || event.keyCode == 37)
  {
    leftEna = 1;
  }
  if(keyd == "Z" || event.keyCode == 38)
  {
    upEna = 1;
  }
  if(keyd == "S" || event.keyCode == 40)
  {
    downEna = 1;
  }
  if(keyd == "D" || event.keyCode == 39)
  {
    rigthEna = 1;
  }
}

function dessinerLesRectangles() {
  tableauDesRectangles.forEach((r) => {
    r.draw(ctx);
  })
}

function deplacerLesRectangles() {
  tableauDesRectangles.forEach((r) => {
    r.move();
  });
}
function changerTaille() {
  tableauDesRectangles.forEach((r) => {
    r.changesize();
  });
}

// function testeCollisionAvecMurs() {
//   tableauDesRectangles.forEach((r) => {
//     if(((r.x+r.l) > lc) || (r.x < 0)) 
//     r.vx = -r.vx;
    
//      if(((r.y+r.h) > hc) || (r.y < 0)) 
//     r.vy = -r.vy;
//   });
    
// }

function anime() {

    ctx.clearRect(0, 0, lc, hc);

    mouvementJoueur();
    dessinerLesRectangles(); 

    requestAnimationFrame(anime);
}