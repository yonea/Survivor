class Balle {
  constructor(x,y, vx, vy, v, ang){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.v = v;
    this.name = "balle";
    this.ang = ang;
  }
  draw(ctx){
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 2, 2, 45 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();   
    ctx.fillStyle = "black";
    ctx.fill();
  }
  move() {
    this.x += this.vx*this.v;
    this.y += this.vy*this.v;
  } 
}
