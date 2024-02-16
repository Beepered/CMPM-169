var inp, input_size;
var text_size, text_length;
var b = [];

function setup() {
  createCanvas(700,500)
  background(240)
  inp = createInput('')
  input_size = 150 //size of text input
  inp.position(width / 2 - (input_size / 2), 1560)
  inp.size(input_size)
  inp.input(myInputEvent)
  
  for (var i = 0; i < 15; i++) {
    b[i] = new text_block();
  }
  textSize(16)
}

function draw(){
  background(255 - (text_length * 15))
  text_size = textWidth(inp.value()); //size of word
  text_length = inp.value().length; //amount of letters
  lineSpawn();
  textSpawn();
}

function lineSpawn(){
  stroke(255, 20, 0)
  for(var i = 0; i < text_length * 3; i++){
    strokeWeight(random(1, 4))
    var which_x = floor(random(0, 3)); //0 = left, 1 = middle, 2 = right
    var which_y = floor(random(0, 2)); //0 = top, 1 = bottom
    var x, y
    switch(which_x){
        case(0):
          x = 0; y = random(height)
          break;
        case(1):
          x = random(width);
          switch(which_y){
              case(0):
                y = 0;
                break;
              default:
                y = height
          }
          break;
        default:
          x = width; y = random(height)
    }
    line(x, y, x + random(-10, 10) * (text_length / 2), y + random(-10, 10) * (text_length / 2));
  }
}

function textSpawn(){
  textSize(16 + (text_length / 2))
  stroke(text_length * 15)
  fill(text_length * 15);
  for (var i = 0; i < 15; i++) {
    b[i].update();
  }
}

function myInputEvent() { //what happens on input
  for (var i = 0; i < 15; i++) {
    b[i].changeText();
  }
}

class text_block{
  constructor(){
    this.x = random(30, width - 30);
    this.y = random(30, height - 30);
    this.mult = random(1, 4);
    this.string = ['']
  }
  
  update(){
    text(join(this.string, ''), this.x, this.y, 400)
    this.x += random(-0.1, 0.1) * text_size / 3;
    this.y += random(-0.1, 0.1) * text_size / 3;

    //prevent out of bounds
    if(this.x <= 30){
      this.x = 30
    }
    if(this.x >= width - text_size - 30){
      this.x = width - text_size -  30
    }
    if(this.y <= 30){
      this.y = 30
    }
    if(this.y >= height - 30){
      this.y = height - 30
    }
  }
  
  changeText(){
    this.string = [''];
	for (var t = 0; t < inp.value().length; t++) {
      var a = floor(random(0, inp.value().length))
	  this.string[t] = inp.value()[a]
	}
  }
}
