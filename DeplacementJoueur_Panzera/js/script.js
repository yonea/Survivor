let canvas, ctx;
let lc, hc;
let keyd, keyu;
let rigthEna, leftEna, upEna, downEna;
let mousePos;

class Rectangle {
  constructor(x, y, l, h, vx, vy, angle) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.angle = angle || 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.l/2, -this.h/2);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0, this.l, this.h);
    ctx.fillRect(27,0, 6, 20);
    
    
    
    ctx.restore();
 
  }
  
  suitsouris(mousePos)
  {
    let dx = this.x - mousePos.x;
    let dy = this.y - mousePos.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;
    
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

    let l = 60;
    let h = 60;
    let x = Math.random() * (lc - 60);
    let y = Math.random()*(hc - 60);
    let vx = 0;
    let vy = 0;
    
    let rect = new Rectangle(x, y, l, h, vx, vy);
    
    tableauDesRectangles.push(rect);

}

function onmousemove_page(event)
{

  if( window.event)
    event = window.event;
  
  mousePos = {};
  mousePos.x = event.clientX ;
  mousePos.y = event.clientY ;

  
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

function detectMur()
{

  tableauDesRectangles.forEach((r) => {
    if(r.x <= 5)
    {
      leftEna = 0;
    }

    if(r.x >= (lc - r.l))
    {
      rigthEna = 0;
    }

    if(r.y <= 6)
    {
      upEna = 0;
    }

    if(r.y >= hc - r.h)
    {
      downEna = 0;
    }
  })

 
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

    detectMur();

if(mousePos !== undefined) {
  tableauDesRectangles.forEach((r) => {
    r.suitsouris(mousePos);
  })
}

    mouvementJoueur();
    dessinerLesRectangles(); 

    requestAnimationFrame(anime);
}