var backColor = -10; var changeRate = 1;
var change = true

var x, y;
var dirChange;
var xDir, yDir; //current direction

var circleW, circleH;
var sizeChange;
var wDir, hDir; //current growth direction

var circleColor = 255;

function setup() {
  createCanvas(600, 600);
  x = random(width);
  y = random(height);
  circleW = random(30, 60);
  circleH = random(30, 60);
  
  xDir = random(-1, 1);
  yDir = random(-1, 1);
  
  wDir = random(-1, 1);
  hDir = random(-1, 1);
}

function draw() {
  background(backColor);
  stroke(circleColor)
  ColorChange();
  DirectionChange(40);
  SizeChange(15);
  fill(circleColor, circleColor, circleColor);
  ellipse(x, y, circleW, circleH);
}

function ColorChange(){ //changes color of background and circle
  backColor += changeRate;
  circleColor -= changeRate;
  if(backColor < 265 && change){ //if background not white, increase color
    changeRate = 0.7;
  }
  else{
    changeRate = -0.7;
    change = false;
    if(backColor <= -10){
      change = true;
    }
  }
}

function DirectionChange(changeRate){ //change direction of circle
  if(dirChange > 0){
    let tempX = x + random(1, 3) * xDir;
    if(tempX < width - 10 && tempX > 10){ //make sure it does not go outside
      x = tempX
    }
    let tempY = y + random(1, 3) * yDir;
    if(tempY < height - 10 && tempY > 10){
      y = tempY
    }
    dirChange--;
  }
  else{
    dirChange = changeRate;
    xDir = random(-1, 1);
    yDir = random(-1, 1);
    MouseInfluence(0.5);
  }
}

function SizeChange(changeRate){ //change size of circle
  if(sizeChange > 0){
    circleW += random(1, 3) * wDir;
    circleH += random(1, 3) * hDir;
    sizeChange--;
  }
  else{
    sizeChange = changeRate;
    wDir = random(-1, 1);
    hDir = random(-1, 1);
  }
}

function MouseInfluence(influence){
  if(mouseX < x){
    xDir -= influence;
  }
  else if(mouseX > x){
    xDir += influence;
  }
  
  if(mouseY < y){
    yDir -= influence;
  }
  else if(mouseY > y){
    yDir += influence;
  }
}
