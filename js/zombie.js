class Zombie {

constructor(x, y, w, h, c, angle, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vitesse = vitesseZombie;
    this.color = c;
    this.angle = angle || 0;
    this.scale = 1;
    this.id = id || 1;
  }
  
  

  draw(ctx) {

    switch(this.id) {

    case 1:

      zL = 73*zAgr;
      zH = 76*zAgr;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.translate(-zL/2, -zH/2);
      ctx.drawImage(loadedAssets.zombie1, 0, 0, zL, zH);
      ctx.restore();
    // code block
    break;

    case 2:

    zL = 75*zAgr;
    zH = 56*zAgr;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-zL/2, -zH/2);
    ctx.drawImage(loadedAssets.zombie2, 0, 0, zL, zH);
    ctx.restore();
    // code block
    break;

    case 3:
    zL = 75*zAgr;
    zH = 56*zAgr;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-zL/2, -zH/2);
    ctx.drawImage(loadedAssets.zombie3, 0, 0, zL, zH);
    ctx.restore();
    // code block
    break;

    case 4:
    zL = 68*zAgr;
    zH = 109*zAgr;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-zL/2, -zH/2);
    ctx.drawImage(loadedAssets.zombie4, 0, 0, zL, zH);
    ctx.restore();
    // code block
    break;

    default:
    // code block
  }

  }
  
   suitPersonnage(p1) {
    // On va calculer l'angle entre l'objet courant
    // (le rectangle et la souris)
    let dx = this.x - p1.x;
    let dy = this.y - p1.y;
    this.angle = Math.atan2(dy,dx) -Math.PI/2;

  }
  
  move() {
    let dist = distance(this.x, this.y, 10, 10);
    if(dist > 5) {
      this.x += this.vitesse * Math.sin(this.angle);
      this.y -= this.vitesse * Math.cos(this.angle);
    }
  }
}