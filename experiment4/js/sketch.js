let img
let x_pos, y_pos, x_vel, x_direction

function setup() {
  createCanvas(650, 500);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  
  img = loadImage("image.png")
  
  x_pos = 0
  x_vel = 0.6
  x_direction = 1
  y_pos = 260;
}

function draw() {
  background(220);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();

  // Draw an ellipse with height based on volume
  let h = height - (vol * height * 1.3)
  
  let img_width = img.width - 20 + (vol * 30)
  let img_height = img.height - 20 + (vol * 100)
  
  tint(255, 90); // opacity
  image(img, (width / 2) - img_width / 2 - 270, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 270, h - img_height, img_width, img_height);
  
  img_width = img.width - 15 + (vol * 80)
  img_height = img.height - 15 + (vol * 180)
  tint(255, 130); // opacity
  image(img, (width / 2) - img_width / 2 - 180, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 180, h - img_height, img_width, img_height);
  
  img_width = img.width - 10 + (vol * 120)
  img_height = img.height - 10 + (vol * 350)
  tint(255, 190);
  image(img, (width / 2) - img_width / 2 - 90, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 90, h - img_height, img_width, img_height);
  
  img_width = img.width + (vol * 300)
  img_height = img.height + (vol * 750)
  tint(255, 255);
  image(img, (width / 2) - img_width / 2, h - img_height, img_width, img_height)
  
  
  // FLAPPY BIRD THING
  
  image(img, x_pos, y_pos, img.width, img.height);
  if(vol < 0.05){
    x_vel -= 0.25
    if(x_vel < 0.6){
      x_vel = 0.6
    }
    x_pos += x_vel * x_direction
    y_pos += 0.5;
  }
  else{
    x_vel += vol * 20
    y_pos -= vol * 90;
  }
  
  if(x_pos < 0){ //bounce off walls
    x_direction = 1;
    x_pos = 0
  }
  else if(x_pos > width - img.width){
    x_direction = -1;
    x_pos = width - img.width;
  }
  if(x_vel > 200){
    x_vel = 200
  }
  if(y_pos > 260){ //y bounds
      y_pos = 270;
  }
  if(y_pos < 0){
      y_pos = 0
  }
  
}