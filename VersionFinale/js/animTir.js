class AnimTir {
  constructor(x, y, angle, v, couleur) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.exist = 0;
    this.v = v;
    this.couleur = couleur;
  }
  draw(ctx) {
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.couleur;
    ctx.fillRect(0,0,10,30);
    ctx.restore();
  }
  move() {
      this.x += this.v * Math.sin(this.angle);
      this.y -= this.v * Math.cos(this.angle);
      this.exist ++;
  }
}