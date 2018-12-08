let canvas, ctx;
let lc, hc;
let keyd, keyu;
let rigthEna, leftEna, upEna, downEna;
let mousePos;
let fondEna = 0;
let chevalEna = 0;
let chevalApp = 0;
let pauseEna = 0;
let fenetre1Ena = 1;
let fenetre2Ena = 1;
let icompdemarreEna = 1;
// var personnage = new Image();
// personnage.src = "assets/personnage.png";
// var cheval = new Image();
// cheval.src = "assets/cheval.png";
// var fond = new Image();
// fond.src = "assets/fond.jpg";
// var fond2 = new Image();
// fond2.src = "assets/fond2.png";
// var audio = new Audio();
// audio.src = "assets/gunjs.wav";

//fentre1Ena correspond à la page de démarrage

//image pistolet : 195/301 . 147/560
//100 . 186
//64.8 . 48.8

document.onselectstart = new Function ("return false");

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
var z = 0;
function creerZombie(i){
  //0,[0,800); [0,1400],0 ; 1400,[0,800];  [0,1400],800
  xAlea = Math.random() * 1501;
  yAlea = Math.random() * 801;
  
  if(stage1){
	  
		window['zombie'+i] = new Zombie(0, yAlea, 50, 50, "black", 0);
		window['zombie'+i].name = 'zombie'+i;
		tableauDesZombies.push(window['zombie'+i]); 
	
  }
  if(stage2){
		console.log("stage2");
		window['zombie'+(i)] = new Zombie(0, yAlea, 50, 50, "black", 0);
		window['zombie'+i].name = 'zombie'+i;
		window['zombie'+(i+1)] = new Zombie(xAlea, 0, 50, 50, "black", 0);
		window['zombie'+(i+1)].name = 'zombie'+(i+1);
		tableauDesZombies.push(window['zombie'+i]); 
		tableauDesZombies.push(window['zombie'+(i+1)]); 
		console.log("nom"+tableauDesZombies[0].name);
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


 function CollisionBalleAvecZombie(zombie,i, balle, j) {
  
  //tableauDesBalles.forEach((r) => {
  let r = balle;
  
  //console.log("pp" + r.x);
     if(((r.x) <= zombie.x + 50 ) && ((r.y) <= zombie.y + 50 ) && ((r.x) >= zombie.x - 50 ) && ((r.y) >= zombie.y - 50 )) {
    //console.log("tue");
		if(i==0){
			console.log(zombie.name + "tué");
			tableauDesZombies.splice(i,1);
		}
		else{
			console.log(zombie.name + "tué");
			tableauDesZombies.splice(i,1);
		}
    //zombie.vitesse++;
		if(j==0){
			tableauDesBalles.splice(j,1);
			console.log("avec la balle " + r.name);
		}
		else{
			tableauDesBalles.splice(j,1);
			console.log("avec la balle " + r.name);
		}	
  
	//console.log(tableauDesZombies[0]);
	
	
	}
  //    if(((r.y+r.h) > hc) || (r.y < 0)) 
  //   r.vy = -r.vy;
  // });
    
 //});
 
 if(stage1 && tableauDesZombies.length == 0)
	{
		// for(let i = 1; i<10; i++){
			// Stage1();
		// }
		Stage2();
	}
	
	if(stage2 && tableauDesZombies.length == 0)
	{
		Stage3();
	}
	if(stage3 && tableauDesZombies.length == 0)
	{
		Stage4();
	}
	
}


 function CollisionZombieAvecPersonnage() {
  
  tableauDesZombies.forEach((r) => {
  
    if(((r.x) <= p1.x + 50 ) && ((r.y) <= p1.y + 50 ) && ((r.x) >= p1.x - 50 ) && ((r.y) >= p1.y - 50 )) 
	{
    //console.log("tue");
    //tableauDesZombies.splice(r,1);
	delete p1;
	//ecran fin de partie à ajouter
	console.log("perdu");
    
	}
  
    
 });
}

class ChoixI{

constructor(x, y, color, texte) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.texte=texte;
  }

  draw(ctx) {
  ctx.font="65px Courier New";
  ctx.fillStyle = this.color;
  ctx.fillText(this.text,this.x,this.y);
  }

  changeColor(ctx){
  }

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
    ctx.drawImage(loadedAssets.personnage, 0, 0, 100, 186);
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
    ctx.drawImage(loadedAssets.cheval, 0, 0, 100, 186);
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

class Balle {
  constructor(x,y, vx, vy, v){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.v = v;
	this.name = "balle";
  }

  draw(ctx){
  ctx.beginPath();
  ctx.ellipse(this.x, this.y, 3, 3, 45 * Math.PI/180, 0, 2 * Math.PI);
  ctx.stroke();   
  ctx.fillStyle = "yellow";
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

function creerChoix(){
	
aJouer = new ChoixI(20, 400, "black", "Jouer"); 

}

function creerCheval()
{

}

function creerPersonnages(){
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
 a = Math.random()*2*Math.PI;
 vy = 0;
 ch1 = new ChevalI(x, y, l, h, v, vy,a)

}
var l =1;
function tirer(){
  let bx = p1.x;
  let by = p1.y;
  let ang = Math.atan2((by - mousePos.y),(bx - mousePos.x));
  let bvx = Math.cos(ang + Math.PI) ;
  let bvy = Math.sin(ang + Math.PI) ;
  let bv = 20;
 
  
  //let balle = new Balle(bx,by, bvx, bvy, bv);
  if(window['balle'+l] != undefined){
	  l++;
	  window['balle'+l] = new Balle(bx,by, bvx, bvy, bv);
	  window['balle'+l].name = 'balle'+l;
	  tableauDesBalles.push(window['balle'+l]); 
  }else{
	  window['balle'+l] = new Balle(bx,by, bvx, bvy, bv);
	  window['balle'+l].name = 'balle'+l;
	  tableauDesBalles.push(window['balle'+l]); 
  }
  loadedAssets.audio.play();
}

function onclick_page(){
  if(!pauseEna){
    tirer();
  }

  varSourisChoix = testSourisChoix();
}


function demarerJeu() {
    // Appelé quand la page est prête et a chargé
    // toutes ses ressources (images, vidéos etc.)
    console.log("pret")
    canvas = document.querySelector("#myCanvas");
    window.addEventListener("keydown",onkeyd_page, false);
    window.addEventListener("keyup",onkeyu_page, false);
    
    lc = canvas.width;
    hc = canvas.height;
    ctx = canvas.getContext("2d");
    
    creerPersonnages();
    creerChoix();
	Stage1();
    //creerCheval();
    //requestAnimationFrame(anime);
    //pauseEna = 0;

    pauseEna = 1;
    loadedAssets.audiosound1.play();
    requestAnimationFrame(animeDemarre);  
}

function onmousemove_page(event){

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

function onkeyd_page(event){
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
		//DESCENDRE CHEVAL
		chevalEna = 0;
		ch1.x = p1.x - 15;
		ch1.v = 5;
		p1.v=5;
	}

	if(event.keyCode == 27)
	{
		//GESTION DE LA PAUSE
		if(pauseEna)
		{
			pauseEna = 0;
			icompPause = 0;
			loadedAssets.audiofond.play();
			loadedAssets.audiomus2.pause();
		}
		else if(!pauseEna)
		{
			pauseEna = 1;
			loadedAssets.audiofond.pause();
			loadedAssets.audiomus2.play();
		}
	}
}

function onkeyu_page(event)
{
	if(window.event)
		event = window.event;
	
	keyu = String.fromCharCode(event.keyCode);

	if(keyu == "Q" || event.keyCode == 37)
	{
		leftEna = 0;
	}
	if(keyu == "Z" || event.keyCode == 38)
	{
		upEna = 0;
	}
	if(keyu == "S" || event.keyCode == 40)
	{
		downEna = 0;
	}
	if(keyu == "D" || event.keyCode == 39)
	{
		rigthEna = 0;
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

function dessinerPersonnage(){
  p1.draw(ctx);
}

function dessinerCheval(){
  ch1.draw(ctx);
}
function testSourisChoix(){
  //return testSourisChoix :
  //1 - Jouer
  //2 - Reglage
  if(mousePos.x >= 300 && mousePos.x <= 1400 && mousePos.y >= 100 && mousePos.y <= 700){

    return 1;
  }
  else {
    return 0;
  }

}

var stage1;
var stage2;
var stage3;
var stage4;

function Stage1(){
	stage1= true;
	creerZombie(1);
}
function Stage2(){
	stage1 = false;
	stage2 = true;
	creerZombie(1);
}
function Stage3(){
	stage2 = false;
	stage3 = true;
	creerZombie(1);
}
function Stage4(){
	stage3 = false;
	stage4 = true;
	creerZombie(1);
}

let icompdemarre = 0;
let varSourisChoix = 0;
function animeChoix(){
  //return testSourisChoix :
  //1 - Jouer
  //2 - Reglage

  ctx.clearRect(0, 0, lc, hc);
  ctx.fillStyle = "rgba(220, 20, 20, 1)";
  ctx.fillRect(0,0,lc,hc);
  ctx.drawImage(loadedAssets.logords, lc/2 - 300, 30 , 600, 261);
  ctx.font="65px Courier New";
  ctx.fillStyle = "black";
  ctx.fillText("JOUER",lc/2-96,5*hc/10);
  ctx.font="65px Courier New";
  ctx.fillStyle = "black";
  ctx.fillText("REGLAGE",lc/2-131,6*hc/10);

  //aJouer.draw(ctx);

  

  if(varSourisChoix == 1){
    console.log("Demarrage Jeu");
    loadedAssets.audiomus.pause();
    loadedAssets.audiofond.play();
    requestAnimationFrame(anime);
    fenetre2Ena = 0;
    pauseEna = 0;
  }


  if(fenetre2Ena){
    requestAnimationFrame(animeChoix);

  }

// A REACTIVER PAUSEENA
    //
    //
    //  
//     fenetre1Ena = 0;
// loadedAssets.audiofond.play();
//     requestAnimationFrame(anime);


}

function animeDemarre(){
//ANIMATION DE DEMARRAGE
	if(icompdemarre <= 1){
	  ctx.clearRect(0, 0, lc, hc);
	  ctx.drawImage(loadedAssets.logords, lc/2 - 300,hc/2 - 130 , 600, 261);
	}

	if(icompdemarre > 1 && icompdemarre <= 2){
	  ctx.clearRect(0, 0, lc, hc);
	  ctx.fillStyle = "rgba(220, 20, 20, " + (icompdemarre-1) + ")";
	  ctx.fillRect(0,0,lc,hc);
	  ctx.drawImage(loadedAssets.logords, lc/2 - 300,hc/2 - 130 , 600, 261);
	}
	if(icompdemarre > 2 && icompdemarre <= 2.6 )
	{
	  ctx.clearRect(0, 0, lc, hc);
	  ctx.fillStyle = "rgba(220, 20, 20, 1)";
	  ctx.fillRect(0,0,lc,hc);
	  ctx.drawImage(loadedAssets.logords, lc/2 - 300, ((-400*icompdemarre +1200) - 130) , 600, 261);
	}

	if (icompdemarre >= 2.6) {
		console.log("fenetre Choix");
		loadedAssets.audiomus.play();
		icompdemarreEna = 0;
		fenetre1Ena = 0;
		requestAnimationFrame(animeChoix);
	}

	if(icompdemarreEna)
		icompdemarre += 0.01;

	if(fenetre1Ena){
		requestAnimationFrame(animeDemarre);
	}
}

let icomp = 0;
let icompPause = 0;

function anime() {
	if (pauseEna){
		if(icompPause <= 8){
		ctx.fillStyle = "rgba(220, 84, 44, 0.1)";
		//ctx.fillStyle = "rgba(200, 75, 37, 0.1)";
		//ctx.fillStyle = "rgba(165, 25, 25, 0.1)";
		ctx.fillRect(0,0,lc,hc);
		}
	if(icompPause == 9){
		ctx.font="65px Courier New";
		ctx.fillStyle = "black";

		ctx.fillText("PAUSE",lc/2-90,9*hc/10);
		ctx.drawImage(loadedAssets.logords, lc/2 - 300,hc/15 , 600, 261);
	}

	icompPause +=1;
	}
	else {
		ctx.clearRect(0, 0, lc, hc);
		ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
		detectMur();

	if(mousePos !== undefined) {
		
		for(let j = 0; j< tableauDesBalles.length; j++){
			let ba = tableauDesBalles[j];
			
			for(let i = 0; i< tableauDesZombies.length; i++){
				let zo = tableauDesZombies[i];
				zo.suitPersonnage(p1);
				zo.move();
				CollisionBalleAvecZombie(zo, i, ba, j);
			}
		}
		
		CollisionZombieAvecPersonnage();
		p1.suitsouris(mousePos);
		if (chevalEna)
			ch1.suitsouris(mousePos);
	}

	//gerer les mouvements
	deplacerLesZombies();
	mouvementJoueur();
	if (chevalEna)
	{
	  mouvementCheval();
	}
	deplacerLesBalles(); 


	//dessiner les personnges
	dessinerLesBalles();  
	dessinerLesZombies();  
	dessinerCheval(); 
	dessinerPersonnage();
    // ctx.drawImage(fond2, (-100 + (100 - p1.x/lc*100)), (-100 + (100 - p1.y/hc*100)), lc+200, hc+200);
    ctx.drawImage(loadedAssets.fond2, (-100 + ((Math.cos(icomp)*50)+50)), (-100 + ((Math.sin(icomp*0.7)*35)+35)), lc+200, hc+200);
    //ctx.drawImage(fond2, (-100 + ((Math.cos(icomp*1.2)*25)+50)), (-100 + ((Math.sin(icomp*1.3)*50)+35)), lc+200, hc+200);
    
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
    icomp += 0.015;
  }
  requestAnimationFrame(anime);
}
