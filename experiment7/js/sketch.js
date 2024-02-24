let table0, table1, table2;
let tables = []
let choice = 0; let color = 150

let font; let date_text = "hour";

let r = 200;
let earth;

function preload() {
  earth = loadImage('earth.jpg');
  table0 = loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv',
    'header'
  );
  table1= loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv',
    'header'
  );
  table2= loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv',
    'header'
  );
  
  tables[0] = table0; tables[1] = table1; tables[2] = table2
  
  font = loadFont('Inconsolata.otf');
  
}

function setup() {
  createCanvas(700, 600, WEBGL);
}

function draw() {
  background(color);
  
  textFont(font);
  textSize(25);
  text('Earthquakes from past ' + date_text, -width / 4.5, -height / 2.4);
  
  rotateY(-mouseX / 70);
  rotateX(mouseY / 70);
  
  //lights();
  noStroke();
  texture(earth);
  sphere(r);

  for (let row of tables[choice].rows) {
    let lat = row.getNum('latitude');
    let lon = row.getNum('longitude');
    let magnitude = row.getNum('mag');

    let theta = radians(lat);

    let phi = radians(lon) + PI;

    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);

    let pos = createVector(x, y, z);

    magnitude += 0.5
    let h = pow(10, magnitude);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = createVector(1, 0, 0);
    
    let angleb = abs(xaxis.angleBetween(pos));

    let raxis = xaxis.cross(pos);
    
    push(); //boxes on earth
    translate(x, y, z);
    rotate(angleb, raxis);
    if(magnitude < 1){
      fill(255, 255, 255)
    }
    else if(magnitude < 2){
      fill(255, 170, 130)
    }
    else if(magnitude < 3){
      fill(255, 130, 90)
    }
    else if(magnitude < 4){
      fill(255, 90, 50)
    }
    else if(magnitude < 5){
      fill(255, 50, 0)
    }
    else{
      fill(255, 0, 0)
    }
    box(h, 4, 4);
    pop();
  }
}

function mousePressed(){
  color -= 50
  choice++
  if(choice == 3){
    color = 150
    choice = 0
  }
  switch(choice){
    case 0:
      date_text = "hour";
      break;
    case 1:
      date_text = "day";
      break;
    case 2:
      date_text = "week";
      break;
  }
}

function keyPressed(){
  r += 20
  if(r >= 360){
    r = 200
  }
}
