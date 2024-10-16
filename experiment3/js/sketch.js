// M_1_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draws a chart based on noise values.
 *
 * MOUSE
 * position x          : specify noise input range
 * click               : new noise line
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var sketch = function(p) {

  p.setup = function() {
    p.createCanvas(1024,400);
    p.strokeWeight(5);
    p.strokeJoin(p.ROUND);
  };

  p.draw = function() {
    p.background(255);

    // line
    p.stroke(p.mouseX / 4, p.mouseY / 1.6, Math.sqrt((p.mouseX / 4) ** 2 + (p.mouseY / 1.6) ** 2));
    p.noFill();

    var noiseXRange = p.mouseX / 10;
    
    //console.log('noiseXRange: 0 - ' + noiseXRange);
    p.beginShape();
    for (var x = 0; x < p.width; x += 10) {
      var noiseX = p.map(x, 50, p.width, 50, noiseXRange);
      var y = p.noise(noiseX, p.frameCount * 0.01) * p.height;
      p.vertex(x,y);
      p.vertex(x + 20,y + 20);
    };
    p.endShape();
    
    p.stroke(p.mouseX / 6, p.mouseY / 3, Math.sqrt((p.mouseX / 4) ** 2 + (p.mouseY / 1.6) ** 2));
    p.beginShape();
    for (var x = 0; x < p.width; x += 10) {
      var noiseX = p.map(x, 50, p.width, 50, noiseXRange);
      var y = p.noise(noiseX, p.frameCount * 0.01) * p.height;
      p.vertex(x + 30,y + 30);
      p.vertex(x + 50,y + 50);
    };
    p.endShape();
    
    p.stroke(p.mouseX / 8, p.mouseY / 6, Math.sqrt((p.mouseX / 4) ** 2 + (p.mouseY / 1.6) ** 2));
    p.beginShape();
    for (var x = 0; x < p.width; x += 10) {
      var noiseX = p.map(x, 50, p.width, 50, noiseXRange);
      var y = p.noise(noiseX, p.frameCount * 0.01) * p.height;
      p.vertex(x + 60,y + 60);
      p.vertex(x + 80,y + 80);
    };
    p.endShape();

  };

  p.mousePressed = function() {
    p.noiseSeed(p.random(100000));
  };

};

var myp5 = new p5(sketch);
