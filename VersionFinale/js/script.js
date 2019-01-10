if (!document.fullscreenElement) {
	document.documentElement.requestFullscreen();
}

let canvas, ctx;
let lc, hc;
let keyd, keyu;
let rigthEna, leftEna, upEna, downEna;
let mousePos;
let fondEna = 0;
let chevalEna = 0;
let chevalApp = 0;
let pauseEna = 0;
let finEnaLose = 0;
let finEnaWin = 0;
let fenetre1Ena = 1;
let fenetre2Ena = 1;
let icompdemarreEna = 1;
let survieChoix = 0;
let idAlea;
let zH, zL;
let zAgr = 1.2;
let v = 0;
let zoomLose = 0;
let zoomWin = 0;
var vitesseZombie=0.5;
let tableauDesZombies = [];
let tableauDesBalles = [];
var z = 0;
var stockBalle = 0;
var stage1;
var stage2;
var stage3;
var stage4;
let icompdemarre = 0;
let varSourisChoix = 0;
let icomp = 0;
let icompPause = 0;
let nbZSurvie = 0;
let scoreSurvie = 0;
let icompSurvie = 0, icompSurviediff = 0;
let irandomSurvie = 0;

document.onselectstart = new Function ("return false");

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

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

function creerZombieSurvie(){
	if(icompSurvie >= 30)
	{
		irandomSurvie = Math.random()*40;
		console.log(irandomSurvie);
		if(irandomSurvie >= 30)
		{
			if(Math.random()*10 <= 5)
			{
				idAlea = Math.round(Math.random() * 4);
				window['zombie'+(nbZSurvie)] = new Zombie(Math.random()*lc/8, Math.random()*hc, 50, 50, "black", 0, idAlea);
				window['zombie'+(nbZSurvie)].vitesse = 0.5 + 1/40*icompSurviediff;
				tableauDesZombies.push(window['zombie'+nbZSurvie]);
				nbZSurvie ++;

			}
			icompSurviediff++;
			icompSurvie = 0;

		}
		else if(irandomSurvie >= 20)
		{
			if(Math.random()*10 <= 5)
			{
				idAlea = Math.round(Math.random() * 4);
				window['zombie'+(nbZSurvie)] = new Zombie(Math.random()*lc/8 + 7*lc/8, Math.random()*hc, Math.random()*hc, 50, "black", 0, idAlea);
				window['zombie'+(nbZSurvie)].vitesse = 0.5 + 1/40*icompSurviediff;
				tableauDesZombies.push(window['zombie'+nbZSurvie]);
				nbZSurvie ++;

			}
			icompSurviediff++;
			icompSurvie = 0;
			
		}
		else if(irandomSurvie >= 10)
		{
			if(Math.random()*10 <= 5)
			{
				idAlea = Math.round(Math.random() * 4);
				window['zombie'+(nbZSurvie)] = new Zombie(Math.random()*lc, Math.random()*hc/7, 50, 50, "black", 0, idAlea);
				window['zombie'+(nbZSurvie)].vitesse = 0.5 + 1/40*icompSurviediff;
				tableauDesZombies.push(window['zombie'+nbZSurvie]);
				nbZSurvie ++;

			}
			icompSurviediff++;
			icompSurvie = 0;
			
		}
		else if(irandomSurvie >= 0)
		{
			if(Math.random()*10 <= 5)
			{
				idAlea = Math.round(Math.random() * 4);
				window['zombie'+(nbZSurvie)] = new Zombie(Math.random()*lc, Math.random()*hc/7 + 6*hc/7, 50, 50, "black", 0, idAlea);
				window['zombie'+(nbZSurvie)].vitesse = 0.5 + 1/40*icompSurviediff;
				tableauDesZombies.push(window['zombie'+nbZSurvie]);
				nbZSurvie ++;

			}
			icompSurviediff++;
			icompSurvie = 0;
			
		}
	}
	icompSurvie++
}
function creerZombie(i){
	
	xAlea = Math.random() * 1500;
	yAlea = Math.random() * 700 + 20;
	if(stage1){
		for(let nbZ = 1; nbZ<i+1; nbZ++){
			yAlea = Math.random() * 700 + 20;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(1, yAlea, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]); 		
		}
	}
	if(stage2){
		for(let nbZ = 1; nbZ<(i/2)+1; nbZ++){
			yAlea = Math.random() * 700 + 20;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(1, yAlea, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}
		for(let nbZ = (i/2)+1; nbZ<i+1; nbZ++){
			xAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(xAlea, 1, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}		
	}
	if(stage3){
		for(let nbZ = 1; nbZ<(i/3)+1; nbZ++){
			yAlea = Math.random() * 700 + 20;
		    idAlea = Math.round(Math.random() * 4);
		    window['zombie'+(nbZ)] = new Zombie(1, yAlea, 50, 50, "black", 0, idAlea);
		    tableauDesZombies.push(window['zombie'+nbZ]);
		}
		for(let nbZ = (i/3)+1; nbZ<(i/3)*2+1; nbZ++){
			xAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(xAlea, 1, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}					
		for(let nbZ = (i/3)*2+1; nbZ<i+1; nbZ++){
			yAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(1400, yAlea, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}	
	}
	if(stage4){
		for(let nbZ = 1; nbZ<(i/4)+1; nbZ++){
			yAlea = Math.random() * 700 + 20;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(0, yAlea, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}
		for(let nbZ = (i/4)+1; nbZ<(i/4)*2+1; nbZ++){
			xAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(xAlea, 0, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}		
		for(let nbZ = (i/4)*2+1; nbZ<(i/4)*3+1; nbZ++){
			yAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(1400, yAlea, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}
		for(let nbZ = (i/4)*3+1; nbZ<i+1; nbZ++){
			xAlea = Math.random() * 1500;
			idAlea = Math.round(Math.random() * 4);
			window['zombie'+(nbZ)] = new Zombie(xAlea, 800, 50, 50, "black", 0, idAlea);
			tableauDesZombies.push(window['zombie'+nbZ]);
		}
	}
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

function creerPersonnages(){
	let l = 60;
	let h = 60;
	let x = lc/2;
	let y = hc/2;
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


function tirer(){
  stockBalle++;
  let bx = p1.x;
  let by = p1.y;
  let ang = Math.atan2((by - mousePos.y),(bx - mousePos.x));
  let bvx = Math.cos(ang + Math.PI) ;
  let bvy = Math.sin(ang + Math.PI) ;
  let bv = 20;
  if(stockBalle<6)
  {
    loadedAssets.audio.play();
    window['balle'+stockBalle] = new Balle(bx,by, bvx, bvy, bv);
    tableauDesBalles.push(window['balle'+stockBalle]); 
  } 
}

function onclick_page(){
	if(!pauseEna && !finEnaLose && !finEnaWin){
		tirer();
	}
	varSourisChoix = testSourisChoix();
}

function demarerJeu() {
    // Appelé quand la page est prête et a chargé
    // toutes ses ressources (images, vidéos etc.)
    canvas = document.querySelector("#myCanvas");
    window.addEventListener("keydown",onkeyd_page, false);
    window.addEventListener("keyup",onkeyu_page, false);
    lc = canvas.width;
    hc = canvas.height;
    ctx = canvas.getContext("2d");
    creerPersonnages();
    Stage1();
    pauseEna = 1;
    loadedAssets.audiosound1.play();
    requestAnimationFrame(animeDemarre);  
    recharger();
}

function mouvementJoueur() {
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

function mouvementCheval() {
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
  
function recharger(){
    if(stockBalle==4)
		ctx.drawImage(loadedAssets.douille, 1460, 5, 18, 70);
	else if(stockBalle==3){
		ctx.drawImage(loadedAssets.douille, 1430, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1460, 5, 18, 70);
	}
	else if (stockBalle==2){
		ctx.drawImage(loadedAssets.douille, 1400, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1430, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1460, 5, 18, 70);
	}
	else if(stockBalle==1){
		ctx.drawImage(loadedAssets.douille, 1370, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1400, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1430, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1460, 5, 18, 70);
	}
	else if(stockBalle==0){
		ctx.drawImage(loadedAssets.douille, 1340, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1370, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1400, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1430, 5, 18, 70);
		ctx.drawImage(loadedAssets.douille, 1460, 5, 18, 70);
	}
	else{
		ctx.drawImage(loadedAssets.toucheR, 1370, 5, 40, 80);
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


function Stage1(){
	if(!survieChoix){
		stage1= true;
		creerZombie(2);
	}
}
function Stage2(){
	if(!survieChoix){
		stage1 = false;
		stage2 = true;
		vitesseZombie++;
		creerZombie(4);
	}
}
function Stage3(){
	if(!survieChoix){
		stage2 = false;
		stage3 = true;
		vitesseZombie++;
		creerZombie(6);
	}
}
function Stage4(){
	if(!survieChoix){
		stage3 = false;
		stage4 = true;
		creerZombie(8);
	}
}

function animeChoix(){
  //return testSourisChoix :
  ctx.clearRect(0, 0, lc, hc);
  ctx.fillStyle = "rgba(220, 20, 20, 1)";
  ctx.fillRect(0,0,lc,hc);
  ctx.drawImage(loadedAssets.logords, lc/2 - 300, 30 , 600, 261);
  ctx.drawImage(loadedAssets.fondZombie, 0, hc-300);
  ctx.drawImage(loadedAssets.play, lc/2-100, 340, 200, 200);
  ctx.fillStyle = "black";
  ctx.fillRect(0,3*hc/30-30,380,85);
  if(!survieChoix)
  {
  	ctx.font="bold 27px Courier New";
  	ctx.fillStyle = "red";
  	ctx.fillText("& ou 1: Mode STAGE",0.7*lc/30,3*hc/30);
  	ctx.font="27px Courier New";
  	ctx.fillText("é ou 2 : Mode SURVIE",0.7*lc/30,4.5*hc/30);
  }
  else if(survieChoix)
  {
  	ctx.font="27px Courier New";
  	ctx.fillStyle = "red";
  	ctx.fillText("& ou 1: Mode STAGE",0.7*lc/30,3*hc/30);
  	ctx.font="bold 27px Courier New";
  	ctx.fillText("é ou 2 : Mode SURVIE",0.7*lc/30,4.5*hc/30);
  }

  if(varSourisChoix == 1){
    animeInitializer();
    requestAnimationFrame(anime);
  }
  if(fenetre2Ena){
    requestAnimationFrame(animeChoix);
  }
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

function animeInitializer(){
	tableauDesZombies = [];
	icompSurvie = 0;
	icompSurviediff = 0;
	nbZSurvie = 0;
	scoreSurvie = 0;
	vitesseZombie = 0.5;
	stockBalle=0;
	creerPersonnages();
	stage1 = false;
	stage2 = false;
	stage3 = false;
	stage4 = false;
	Stage1();
	pauseEna = 0;
	finEnaLose = 0;
	finEnaWin = 0;
	icomp = 0;
	icompPause = 0;
	zoomLose = 0;
	zoomWin = 0;
	loadedAssets.audiomus.pause();
	loadedAssets.audiofond.play();
	fenetre2Ena = 0;
	pauseEna = 0;
}


function anime() {
	if (pauseEna){
		if(icompPause <= 8){
			ctx.fillStyle = "rgba(220, 84, 44, 0.1)";
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
	
	else if(finEnaLose)
	{
		if(zoomLose < 500){
			zoomLose+=20;
			ctx.clearRect(0, 0, lc, hc);
			ctx.fillStyle = "rgba(220, 20, 20, 0.3)";
			ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
			ctx.drawImage(loadedAssets.fond2, 0, 0, lc, hc);
			ctx.fillRect(0,0,lc,hc);
			ctx.drawImage(loadedAssets.youdied, 700 - zoomLose/2, 300 - zoomLose/2, 100+ zoomLose, 100+zoomLose);
		}
		else
		{
			ctx.clearRect(0, 0, lc, hc);
			ctx.fillStyle = "rgba(220, 20, 20, 0.3)";
			ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
			ctx.drawImage(loadedAssets.fond2, 0, 0, lc, hc);
			ctx.fillRect(0,0,lc,hc);
			ctx.drawImage(loadedAssets.youdied, 700 - 500/2, 300 - 500/2, 100+ 500, 100+500);
			ctx.font="65px Courier New";
			ctx.fillStyle = "black";
			ctx.fillText("ESPACE pour recommencer",lc/2-450,hc-130);
			if(survieChoix)
			{
				ctx.font="bold 60px Courier New";
  				ctx.fillStyle = "black";
  				ctx.fillText("Score : " + scoreSurvie,lc/2-170,hc-50);
			}
		}
	}
	else if(finEnaWin)
	{
		if(zoomWin < 500){
			zoomWin+=20;
			ctx.clearRect(0, 0, lc, hc);
			ctx.fillStyle = "rgba(220, 20, 20, 0.3)";
			ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
			ctx.drawImage(loadedAssets.fond2, 0, 0, lc, hc);
			ctx.fillRect(0,0,lc,hc);
			ctx.drawImage(loadedAssets.win, 700 - zoomWin/2, 300 - zoomWin/2, 250+ zoomWin,  zoomWin-350);
		}
		ctx.clearRect(0, 0, lc, hc);
		ctx.fillStyle = "rgba(220, 20, 20, 0.3)";
		ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
		ctx.drawImage(loadedAssets.fond2, 0, 0, lc, hc);
		ctx.fillRect(0,0,lc,hc);
		ctx.font="65px Courier New";
		ctx.fillStyle = "bold";
		ctx.fillStyle = "black";
		ctx.drawImage(loadedAssets.win, 700 - zoomWin/2, 500 - zoomWin/2, 50+ zoomWin, zoomWin-350);
		ctx.fillText("ESPACE pour recommencer",lc/2-450,3*hc/4);
	}
	else if(!survieChoix){
		ctx.clearRect(0, 0, lc, hc);
		ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
		detectMur();
		if(mousePos !== undefined) {
			for(let j = 0; j< tableauDesBalles.length; j++){
				let ba = tableauDesBalles[j];
				for(let i = 0; i< tableauDesZombies.length; i++){
					let zo = tableauDesZombies[i];
					CollisionBalleAvecZombie(zo, i, ba, j);
				}
			}
			for(let i = 0; i< tableauDesZombies.length; i++){
				let zo = tableauDesZombies[i];
				zo.suitPersonnage(p1);
				zo.move();
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
		recharger();
		//dessiner les personnges
		dessinerLesBalles();  
		dessinerLesZombies();  
		dessinerCheval(); 
		dessinerPersonnage();
		ctx.drawImage(loadedAssets.fond2, (-100 + ((Math.cos(icomp)*50)+50)), (-100 + ((Math.sin(icomp*0.7)*35)+35)), lc+200, hc+200);
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
			v=0;
			chevalApp = 0;
		}    
		icomp += 0.015;
		if(chevalApp){
			ctx.drawImage(loadedAssets.fondtransparent2, 1340, 110, 140, 20);
			if(v<141){
				v += 0.4;
				ctx.drawImage(loadedAssets.fondtransparent1, 1340, 110, v, 20);
			}
			else{
			 chevalApp = 1;
			 chevalEna = 0;
			 ch1.x = p1.x - 74;
			 ch1.y = p1.y - 74;
			 ch1.v = 5;
			 p1.v=5;
			 v=0;
			}
		}
	}
	else if(survieChoix){
		ctx.clearRect(0, 0, lc, hc);
		ctx.drawImage(loadedAssets.fond, 0, 0, lc, hc);
		creerZombieSurvie();
		detectMur();
		if(mousePos !== undefined) {
			for(let j = 0; j< tableauDesBalles.length; j++){
				let ba = tableauDesBalles[j];
				for(let i = 0; i< tableauDesZombies.length; i++){
					let zo = tableauDesZombies[i];
					CollisionBalleAvecZombie(zo, i, ba, j);
				}
			}
			for(let i = 0; i< tableauDesZombies.length; i++){
				let zo = tableauDesZombies[i];
				zo.suitPersonnage(p1);
				zo.move();
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
		recharger();
		//dessiner les personnges
		dessinerLesBalles();  
		dessinerLesZombies();  
		dessinerCheval(); 
		dessinerPersonnage();
		ctx.font="27px Courier New";
  		ctx.fillStyle = "black";
  		ctx.fillText("Score : " + scoreSurvie,0.7*lc/30,3*hc/30);
		ctx.drawImage(loadedAssets.fond2, (-100 + ((Math.cos(icomp)*50)+50)), (-100 + ((Math.sin(icomp*0.7)*35)+35)), lc+200, hc+200);
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
			v=0;
			chevalApp = 0;
		}    
		icomp += 0.015;
		if(chevalApp){
			ctx.drawImage(loadedAssets.fondtransparent2, 1340, 110, 140, 20);
			if(v<141){
				v += 0.4;
				ctx.drawImage(loadedAssets.fondtransparent1, 1340, 110, v, 20);
			}
			else{
			 chevalApp = 1;
			 chevalEna = 0;
			 ch1.x = p1.x - 74;
			 ch1.y = p1.y - 74;
			 ch1.v = 5;
			 p1.v=5;
			 v=0;
			}
		}
	}

	requestAnimationFrame(anime);
}
