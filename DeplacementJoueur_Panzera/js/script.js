let canvas, ctx;
let lc, hc;
let keyd, keyu;
let rigthEna, leftEna, upEna, downEna;
let mousePos;
let fondEna = 0;
let chevalEna = 0;
let chevalApp = 0;
var personnage = new Image();
personnage.src = "personnage.png";
var cheval = new Image();
cheval.src = "cheval.png";
var fond = new Image();
fond.src = "fond.jpg";

//image pistolet : 195/301 . 147/560
//100 . 186
//64.8 . 48.8

class Balle {
  constructor(x,y, vx, vy, v){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.v = v;
  }

  draw(ctx){
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, 4, 4, 45 * Math.PI/180, 0, 2 * Math.PI);
      ctx.stroke();   
      ctx.fillStyle = "#FFCC33";
      ctx.fill();
     

  }
   move() {
    this.x += this.vx*this.v;
    this.y += this.vy*this.v;
  }
  
}
let tableauDesBalles = [];

function dessinerLesBalles(){
  tableauDesBalles.forEach((r) => {
    r.draw(ctx);
  })
}

function deplacerLesBalles(){
  tableauDesBalles.forEach((r) => {
    r.move();
  });
}

function tirer(){
  
  //console.log(r1.x);
  let bx = p1.x;
  let by = p1.y;
  let ang = Math.atan2((by - mousePos.y),(bx - mousePos.x));
  let bvx = Math.cos(ang + Math.PI) ;
  let bvy = Math.sin(ang + Math.PI) ;
  let bv = 15;
  
  let balle = new Balle(bx,by, bvx, bvy, bv);

  tableauDesBalles.push(balle); 
  focus_page();
}

class PersonnageI{

  constructor(x, y, l, h, v, vy, angle) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.v = v;
    this.vy = vy;
    this.angle = angle || 0;
  }

draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-100/2, -186/2);
    ctx.drawImage(personnage, 0, 0, 100, 186);
    ctx.restore();
 
  }

  suitsouris(mousePos)
  {
    let dx = this.x - mousePos.x;
    let dy = this.y - mousePos.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;
    
  }

  movel()
  {
    this.x -= this.v;
  }

  mover()
  {
    this.x += this.v;
  }

  moveu()
  {
    this.y -= this.v;
  }

  moved()
  {
    this.y += this.v;
  }



}

class ChevalI{

  constructor(x, y, l, h, v, vy, angle) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.v = v;
    this.vy = vy;
    this.angle = angle || 0;
  }

draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-100/2, -186/2);
    ctx.drawImage(cheval, 0, 0, 100, 186);
    ctx.restore();
 
  }

  suitsouris(mousePos)
  {
    let dx = this.x - mousePos.x;
    let dy = this.y - mousePos.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;
    
  }

  movel()
  {
    this.x -= this.v;
  }

  mover()
  {
    this.x += this.v;
  }

  moveu()
  {
    this.y -= this.v;
  }

  moved()
  {
    this.y += this.v;
  }



}

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
    //ctx.translate(-this.l/2, -this.h/2);
    ctx.translate(-100/2, -186/2);
    ctx.drawImage(personnage, 0, 0, 100, 186);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    //ctx.strokeRect(0,0, this.l, this.h);
    //ctx.fillRect(27,0, 6, 20);
    
    
    
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
    this.x -= 3;
  }

  mover()
  {
    this.x += 3;
  }

  moveu()
  {
    this.y -= 3;
  }

  moved()
  {
    this.y += 3;
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
    creerPersonnages();
    //creerCheval();


  
    // Pour animation à 60 im/s
    
}

personnage.onload = function()
{

  

}

fond.onload = function()
{
requestAnimationFrame(anime);
//fondEna = 1;

}
function creerCheval()
{



}
function creerPersonnages()
{

   let l = 60;
    let h = 60;
    let x = Math.random() * (lc - 60);
    let y = Math.random()*(hc - 60);
    let v = 5;
    let vy = 0;
  p1 = new PersonnageI(x, y, l, h, v, vy)

      l = 60;
     h = 60;
      x = Math.random() * (lc - 60);
      y = Math.random()*(hc - 60);

     vy = 0;
  ch1 = new ChevalI(x, y, l, h, v, vy)

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
    p1.mover();

  //    tableauDesRectangles.forEach((r) => {
  //   r.mover(ctx);
  // })
  }
  if(leftEna)
  {
    p1.movel();

  //   tableauDesRectangles.forEach((r) => {
  //   r.movel(ctx);
  // })
  }
  if(upEna)
  {
    p1.moveu();

  //   tableauDesRectangles.forEach((r) => {
  //   r.moveu(ctx);
  // })
  }
  if(downEna)
  {
    p1.moved();

  //   tableauDesRectangles.forEach((r) => {
  //   r.moved(ctx);
  // })
  }
}

function mouvementCheval()
{
  if(rigthEna)
  {

    ch1.mover();
  }
  if(leftEna)
  {

    ch1.movel();
  }
  if(upEna)
  {

    ch1.moveu();
  }
  if(downEna)
  {

    ch1.moved();
  }
}

function detectMur()
{


    if(p1.x <= 5)
    {
      leftEna = 0;
    }

    if(p1.x >= (lc))
    {
      rigthEna = 0;
    }

    if(p1.y <= 6)
    {
      upEna = 0;
    }

    if(p1.y >= hc)
    {
      downEna = 0;
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
  if(event.keyCode == 32 && chevalEna == 1)
  {
    chevalEna = 0;
    ch1.x = p1.x - 15;
    ch1.v = 5;
  p1.v=5;
  }
}

function dessinerPersonnage(){

p1.draw(ctx);
}

function dessinerCheval(){
  ch1.draw(ctx);
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

 
    ctx.drawImage(fond, 0, 0, lc, hc);
  

  

    detectMur();

if(mousePos !== undefined) {
  // tableauDesRectangles.forEach((r) => {
  //   r.suitsouris(mousePos);
  // })
  p1.suitsouris(mousePos);
  if (chevalEna)
  ch1.suitsouris(mousePos);
}


//gerer les mouvements
    mouvementJoueur();
    if (chevalEna)
    {
    mouvementCheval();
  }
  deplacerLesBalles(); 


//dessiner les personnges


    dessinerLesBalles();  
    dessinerCheval(); 
    dessinerPersonnage();
    
if(p1.x <= (ch1.x + 50) && p1.x >= (ch1.x - 50) && p1.y <= (ch1.y + 50) && p1.y >= (ch1.y - 50) && chevalEna == 0 && chevalApp == 0)
{
  chevalApp = 1;
  ch1.x = p1.x;
  ch1.y = p1.y;
  chevalEna = 1;
  ch1.v = 10;
  p1.v=10;
}
if(p1.x >= (ch1.x + 50) || p1.x <= (ch1.x - 50) || p1.y >= (ch1.y + 50) || p1.y <= (ch1.y - 50) )
{
  chevalApp = 0;
}
    

    requestAnimationFrame(anime);
}
