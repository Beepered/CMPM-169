var particles = [];
let box_size = 35;
let inflating = false;
let which_type = 0, fire_time = 40;
let backgroundColor = 50;

function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth - 150, 700, WEBGL);
	background(backgroundColor);
	noStroke();
}

function draw() {
	rotateX(-mouseY);
	rotateY(mouseX);
	offset = 0;
    if(which_type == 0){
      background(backgroundColor);
    }
	
	for(var i = 0; i<particles.length; i++){
        particles[i].update();
		if(particles[i+offset].dead){
			particles.splice(i+offset, 1);
			offset--;
			i++;
		}
	}
    if(inflating){
      box_size += 0.2;
    }
    box(box_size)
  if(which_type != 0){
    fire_time--;
    box_size -= 0.02;
    if(fire_time <= 0){
      fire_time = 40;
      background(backgroundColor);
      for(var i = 0; i<300 * (box_size / 35); i++){
		particles.push(new fire);
	  }
    }
  }
}

class particle{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
        this.size = 1
		this.dead = false;
      this.vel = [random(-0.8, 0.8), random(-0.8, 0.8), random(-0.8, 0.8)];
		this.total = 1.5/(sqrt((this.vel[0]*this.vel[0])+(this.vel[1]*this.vel[1])+(this.vel[2]*this.vel[2]))+random(-0.9, -0.3)) * (box_size / 35);
		this.vel = [this.vel[0]*this.total, this.vel[1]*this.total, this.vel[2]*this.total];
		this.color = random(50, 255);
		this.age = 120;
	}
	update(){
        this.size -= random(0.001, 0.02);
		this.age -= random(0.2, 2);
		if(this.dead === false && this.age <= 0){
			this.dead = true;
		}
		this.vel = [this.vel[0]*random(0.97, 0.99), this.vel[1]*random(0.97, 0.99), this.vel[2]*random(0.97, 0.99)];
		this.x += this.vel[0];
		this.y += this.vel[1];
		this.z += this.vel[2];
		if(this.color<240){
			fill(255, this.color, 0);
		}
		else{
			fill(this.color);
		}
		translate(this.x, this.y, this.z);
		sphere(8 * (box_size / 20) * this.size, 8, 4);
		translate(-this.x, -this.y, -this.z);
	}
}

class fire{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
        this.size = 1
		this.dead = false;
      this.vel = [random(-1, 1), random(-2, -0.8), random(-0.8, 0.8)];
		this.total = 1.5/(sqrt((this.vel[0]*this.vel[0])+(this.vel[1]*this.vel[1])+(this.vel[2]*this.vel[2]))+random(-0.9, -0.3)) * (box_size / 35);
      this.vel = [this.vel[0]*this.total, this.vel[1]*this.total, this.vel[2]*this.total];
		this.color = random(50, 255);
		this.age = 140;
	}
	update(){
        this.size -= random(0.003, 0.008);
		this.age -= random(0.2, 2);
		if(this.dead === false && this.age <= 0){
			this.dead = true;
		}
		this.vel = [this.vel[0]*random(0.98, 1), this.vel[1]*random(0.97, 0.99), this.vel[2]*random(0.97, 0.99)];
		this.x += this.vel[0];
		this.y += this.vel[1];
		this.z += this.vel[2];
		if(this.color<240){
			fill(255, this.color, 0);
		}
		else{
			fill(this.color);
		}
		translate(this.x, this.y, this.z);
		sphere(8 * this.size, 8, 4);
		translate(-this.x, -this.y, -this.z);
	}
}

function mousePressed() {
    inflating = true;
}

function mouseReleased() {
    inflating = false;
    if(which_type == 0){ //only explosion has mouse released
      box_size -= 2;
      if(box_size < 1){
        box_size = 1;
      }
      for(var i = 0; i<600 * (box_size / 35); i++){
		particles.push(new particle);
	  }
    }
}

function keyReleased() {
  if (key == '1'){
      which_type = 0;
      backgroundColor = 50;
      fire_time = 40
  }
  if (key == '2'){
     which_type = 1;
     backgroundColor = 100;
	 background(backgroundColor);
  }
}

