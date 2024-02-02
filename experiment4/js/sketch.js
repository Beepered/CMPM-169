let img

function setup() {
  createCanvas(650, 500);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  
  img = loadImage("image.png")
}

function draw() {
  background(220);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();

  // Draw an ellipse with height based on volume
  let h = height - (vol * height * 1.3)
  
  let img_width = img.width + (vol * 30)
  let img_height = img.height + (vol * 100)
  
  tint(255, 90); // opacity
  image(img, (width / 2) - img_width / 2 - 270, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 270, h - img_height, img_width, img_height);
  
  img_width = img.width + (vol * 80)
  img_height = img.height + (vol * 180)
  tint(255, 130); // opacity
  image(img, (width / 2) - img_width / 2 - 180, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 180, h - img_height, img_width, img_height);
  
  img_width = img.width + (vol * 120)
  img_height = img.height + (vol * 350)
  tint(255, 190);
  image(img, (width / 2) - img_width / 2 - 90, h - img_height, img_width, img_height);
  image(img, (width / 2) - img_width / 2 + 90, h - img_height, img_width, img_height);
  
  img_width = img.width + (vol * 300)
  img_height = img.height + (vol * 750)
  tint(255, 255);
  image(img, (width / 2) - img_width / 2, h - img_height, img_width, img_height);
}