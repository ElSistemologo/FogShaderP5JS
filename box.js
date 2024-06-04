function Box(x,y,z, rotx, roty, rotz) {
  
  this.pos_x = x;
  this.pos_y = y;
  this.pos_z = z;
  this.angle_x = rotx;
  this.angle_y = roty;
  this.angle_z = rotz;

  this.draw = function() {
  
    push();
    translate(this.pos_x, this.pos_y, this.pos_z);
  
    rotateX(this.angle_x);
    rotateY(this.angle_y);
    rotateZ(this.angle_z);
  
    noStroke();
    box(90);
    pop();

    this.angle_x += 0.01;
    this.angle_y += 0.001;
    this.angle_z += 0.01;

  }

}