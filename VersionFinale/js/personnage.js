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