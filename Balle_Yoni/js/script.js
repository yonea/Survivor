window.onload = init;

let canvas, ctx, w, h;
let mousePos;

class Rectangle {
  constructor(x, y, w, h, c, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vitesse = 5;
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
  
  suitSouris(mousePos) {
    // On va calculer l'angle entre l'objet courant
    // (le rectangle et la souris)
    let dx = this.x - mousePos.x;
    let dy = this.y - mousePos.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;
    //console.log(this.angle)
  }
  
  move() {
    let dist = distance(this.x, this.y, mousePos.x, mousePos.y);
    if(dist > 5) {
      this.x += this.vitesse * Math.sin(this.angle);
      this.y -= this.vitesse * Math.cos(this.angle);
      //console.log(this.angle);
    }
  }
}
class Balle {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	draw(ctx){
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, 4, 4, 45 * Math.PI/180, 0, 2 * Math.PI);
      ctx.stroke();	  
     

	}
	 move() {
		this.x += 5;
		this.y += 5;
	}
	
}
let tableauDesBalles = [];
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  
  w = canvas.width;
  h = canvas.height;
  
  r1 = new Rectangle(50, 50, 50, 50, "black", 0);
  creerDesBalles();
  document.onmousemove = traiteDeplacementsSouris;
  
  // on demarre la boucle d'animation
  requestAnimationFrame(mainloop);
}

function traiteDeplacementsSouris(event) {
  let rect = canvas.getBoundingClientRect();
  mousePos = {};
  mousePos.x = event.clientX - rect.left;
  mousePos.y = event.clientY - rect.top;
}
function creerDesBalles(){
	let balle = new Balle(50,100);
	tableauDesBalles.push(balle); 
}

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
	console.log("tirer");
}
function mainloop() {
  // on efface le canvas
  ctx.clearRect(0, 0, w, h);
  
  // On dessine des objets
  r1.draw(ctx);


   
  dessinerLesBalles();

    // 3 On change l'état (position, couleur, taille etc.)
  deplacerLesBalles(); 
 
  
  // On déplace des objets
  /*r1.angle += 2;
  
  if(mousePos !== undefined) {
    r1.x = mousePos.x;
    r1.y = mousePos.y;
  }
  */
  if(mousePos !== undefined) {
     r1.suitSouris(mousePos);
      r1.move();
  }
  
  
  //r1.scale += 0.01
  //if(r1.scale > 2) r1.scale = 1;
  // on rappelle la boucle d'abimation
  requestAnimationFrame(mainloop);
}