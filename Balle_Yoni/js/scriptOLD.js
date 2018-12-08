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
class Zombie {

constructor(x, y, w, h, c, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vitesse = 0.5;
    this.color = c;
    this.angle = angle || 0;
    this.scale = 1;
  }
	
  

   draw(ctx) {
    ctx.save();
        // je le retaille
    ctx.scale(this.scale, this.scale);
    // On positionne le rectangle en changeant le repere
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    // recentrer un rectangle, on translate en négatif
    // de sa demi largeur et sa demi hauteur
    ctx.translate(-this.w/2, -this.h/2);
    
    ctx.fillStyle = this.color;
    
    ctx.fillRect(0, 0, this.w, this.h);
    // les yeux
    ctx.fillStyle="white";
    ctx.fillRect(10, 10, 5, 5);
    ctx.fillRect(30, 10, 5, 5);
    ctx.restore();
  }
  
   suitPersonnage(p1) {
    // On va calculer l'angle entre l'objet courant
    // (le rectangle et la souris)
    let dx = this.x - p1.x;
    let dy = this.y - p1.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;
    //console.log(this.angle)
  }
  
  move() {
    let dist = distance(this.x, this.y, 10, 10);
    if(dist > 5) {
      this.x += this.vitesse * Math.sin(this.angle);
      this.y -= this.vitesse * Math.cos(this.angle);
      //console.log(this.angle);
    }
  }
}
function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}


let tableauDesZombies = [];

function dessinerLesZombies(){
  tableauDesZombies.forEach((r) => {
    r.draw(ctx);
  })
}

function deplacerLesZombies(){
  tableauDesZombies.forEach((r) => {
    r.move();
  });
}
//var z = 0;
function creerZombie(i){
  //0,[0,800); [0,1400],0 ; 1400,[0,800];  [0,1400],800
  xAlea = Math.random() * 1501;
  yAlea = Math.random() * 801;
  
  if(stage1){
	  
		window['zombie'+i] = new Zombie(0, yAlea, 50, 50, "black", 0);
		tableauDesZombies.push(window['zombie'+i]); 
	
  }
  if(stage2){
	  
		window['zombie'+(i)] = new Zombie(0, yAlea, 50, 50, "black", 0);
		window['zombie'+(i+1)] = new Zombie(xAlea, 0, 50, 50, "black", 0);
		tableauDesZombies.push(window['zombie'+i]); 
		tableauDesZombies.push(window['zombie'+(i+1)]); 
		
  }
  if(stage3){
	 
		window['zombie'+i] = new Zombie(0, yAlea, 50, 50, "black", 0);
		window['zombie'+(i+1)] = new Zombie(xAlea, 0, 50, 50, "black", 0);
		window['zombie'+(i+2)] = new Zombie(1400, yAlea, 50, 50, "black", 0);
		tableauDesZombies.push(window['zombie'+i]); 
		tableauDesZombies.push(window['zombie'+(i+1)]); 
		tableauDesZombies.push(window['zombie'+(i+2)]); 
	 
  }
  if(stage4){
		 
		window['zombie'+i] = new Zombie(0, yAlea, 50, 50, "black", 0);
		window['zombie'+(i+1)] = new Zombie(xAlea, 0, 50, 50, "black", 0);
		window['zombie'+(i+2)] = new Zombie(1400, yAlea, 50, 50, "black", 0);
		window['zombie'+(i+3)] = new Zombie(xAlea, 800, 50, 50, "black", 0);		
		tableauDesZombies.push(window['zombie'+i]); 
		tableauDesZombies.push(window['zombie'+(i+1)]); 
		tableauDesZombies.push(window['zombie'+(i+2)]); 
		tableauDesZombies.push(window['zombie'+(i+3)]); 
		
  }
}


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
var i = 0;
function tirer(){
  
  //console.log(r1.x);
  let bx = p1.x;
  let by = p1.y;
  let ang = Math.atan2((by - mousePos.y),(bx - mousePos.x));
  let bvx = Math.cos(ang + Math.PI) ;
  let bvy = Math.sin(ang + Math.PI) ;
  let bv = 15;
  
  
  window['balle'+i] = balle = new Balle(bx,by, bvx, bvy, bv);
  if (window['balle'+i] != undefined){
	  //alert("existe deja");
	  i++;
	  window['balle'+i] = new Balle(bx,by, bvx, bvy, bv);
	  console.log(i);
	  tableauDesBalles.push(window['balle'+i]); 
  }
  

  
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
    Stage1(1);
	//creerZombie();
    creerDesRectangles();
    creerPersonnages();
	
    //creerCheval();
	//console.log(window['zombie'+z]);

  
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
  }
  if(leftEna)
  {
    p1.movel();

  }
  if(upEna)
  {
    p1.moveu();
  }
  if(downEna)
  {
    p1.moved();
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

 function CollisionBalleAvecZombie(zombie) {
	
	tableauDesBalles.forEach((r) => {
		if(((r.x) <= zombie.x + 50 ) && ((r.y) <= zombie.y + 50 ) && ((r.x) >= zombie.x - 50 ) && ((r.y) >= zombie.y - 50 )) {
			//let positionZombie = zombie.substr();(5
			//console.log("tue");
			tableauDesZombies.splice(zombie,1);
			//zombie.vitesse++;
			tableauDesBalles.splice(r,1);
			Stage1(1);
 }

 });
}

function SortieDeBalle(){
	lc = canvas.width;
    hc = canvas.height;
	tableauDesBalles.forEach((r) => {
		if( (r.x < 0) || (r.y > hc) || (r.y < 0) || (r.x > lc) ) 
			tableauDesBalles.splice(r,1);
	});
}
var stage1;
var stage2;
var stage3;
var stage4;

function Stage1(){
	stage1= true;
	creerZombie(2);
}
function Stage2(){
	stage1 = false;
	stage2 = true;
	creerZombie(2);
}
function Stage3(){
	stage2 = false;
	stage3 = true;
	creerZombie(2);
}
function Stage4(){
	stage3 = false;
	stage4 = true;
	creerZombie(1);
}


function anime() {

    ctx.clearRect(0, 0, lc, hc);
    ctx.drawImage(fond, 0, 0, lc, hc);
  
    detectMur();
	

if(mousePos !== undefined) {
  // tableauDesRectangles.forEach((r) => {
  //   r.suitsouris(mousePos);
  // })
  
  //z1.suitPersonnage(p1);
  //z2.suitPersonnage(p1);
  //z1.move();
 // z2.move();
  //Stage1();
  
  tableauDesZombies.forEach((z) => {
    z.suitPersonnage(p1);
	z.move();
	CollisionBalleAvecZombie(z);
  });
  p1.suitsouris(mousePos);
  if (chevalEna)
	ch1.suitsouris(mousePos);

SortieDeBalle();
tableauDesBalles.forEach((b) => {
console.log(" x " + b.x + " y " + b.y);
});
}


//gerer les mouvements
    mouvementJoueur();
    if (chevalEna)
    {
    mouvementCheval();
  }
    deplacerLesBalles(); 


	deplacerLesZombies();
    dessinerLesZombies();  

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
