var particles = [];
let box_size = 35;
let inflating = false;

function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(100);
	for(var i = 0; i<600; i++){
		particles.push(new particle);
	}
	noStroke();
}

function draw() {
	rotateX(-mouseY);
	rotateY(mouseX);
	offset = 0;
	background(51);
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

function mousePressed() {
    inflating = true;
}

function mouseReleased() {
    inflating = false;
    box_size -= 2;
    if(box_size < 1){
      box_size = 1;
    }
	for(var i = 0; i<600 * (box_size / 35); i++){
		particles.push(new particle);
	}
}
