class Droop {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.yOutside = (height - this.pgA.height)/2;

    this.res = 200;

    // this.w1 = random(0.6);
    // this.w2 = this.w1 + random((1 - this.w1)/2);
    // this.w3 = this.w2 + random((1 - this.w2));

    this.w = [];
    this.w[0] = 0;
    this.w[1] = random(0.6);
    this.w[2] = this.w[1] + random(0.025, 0.15);
    this.w[3] = this.w[2] + random(0.025, 0.15);
    this.w[4] = this.w[3] + random(0.025, 0.15);
    this.w[5] = this.w[4] + random(0.025, 0.15);
    this.w[6] = 1;

    this.resA = [];
    for(var m = 0; m < 7; m++){
      this.resA[m] = floor(this.w[m] * this.res);
    }

    this.p = [];
    this.yDroop = [];
    for(var m = 0; m < 7; m++){
      this.p[m] = createVector(this.pgA.width * this.w[m], 0);

      if(m <= 2 || m >= 5){
        this.yDroop[m] = 0;
      } else {
        this.yDroop[m] = random(20, height/3);
      }

    }
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, a1;
    var a1, b1;

    for(var m = 0; m < 7; m++){

      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
  
        a0 = 0;
        a1 = this.yDroop[m]/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
  
        a0 = this.yDroop[m]/2;
        a1 = this.yDroop[m];
      }
        this.p[m].y = map(tk1, 0, 1, a0, a1);
    }
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      texture(this.pgA);
      // stroke(foreColor);
      noStroke();

      beginShape(TRIANGLE_STRIP);
        for(var n = 0; n <= this.res; n++){
          let xCore, yCore;

          if(n < this.resA[1]){
            let t = (n ) / (this.resA[1]);

            xCore = bezierPoint(this.p[0].x, (this.p[1].x + this.p[0].x)/2, (this.p[1].x + this.p[0].x)/2, this.p[1].x, t);
            yCore = bezierPoint(this.p[0].y, this.p[0].y, this.p[1].y, this.p[1].y, t);
          } else if(n < this.resA[2]){
            let t = (n - this.resA[1] ) / (this.resA[2] - this.resA[1]);

            xCore = bezierPoint(this.p[1].x, (this.p[2].x + this.p[1].x)/2, (this.p[2].x + this.p[1].x)/2, this.p[2].x, t);
            yCore = bezierPoint(this.p[1].y, this.p[1].y, this.p[2].y, this.p[2].y, t);
          } else if(n < this.resA[3]){
            let t = (n - this.resA[2] ) / (this.resA[3] - this.resA[2]);

            xCore = bezierPoint(this.p[2].x, (this.p[3].x + this.p[2].x)/2, (this.p[3].x + this.p[2].x)/2, this.p[3].x, t);
            yCore = bezierPoint(this.p[2].y, this.p[2].y, this.p[3].y, this.p[3].y, t);
          } else if(n < this.resA[4]){
            let t = (n - this.resA[3] ) / (this.resA[4] - this.resA[3]);

            xCore = bezierPoint(this.p[3].x, (this.p[4].x + this.p[3].x)/2, (this.p[4].x + this.p[3].x)/2, this.p[4].x, t);
            yCore = bezierPoint(this.p[3].y, this.p[3].y, this.p[4].y, this.p[4].y, t);
          } else if(n < this.resA[5]){
            let t = (n - this.resA[4] ) / (this.resA[5] - this.resA[4]);

            xCore = bezierPoint(this.p[4].x, (this.p[5].x + this.p[4].x)/2, (this.p[5].x + this.p[4].x)/2, this.p[5].x, t);
            yCore = bezierPoint(this.p[4].y, this.p[4].y, this.p[5].y, this.p[5].y, t);
          } else {
            let t = (n - this.resA[5] ) / (this.resA[6] - this.resA[5]);

            xCore = bezierPoint(this.p[5].x, (this.p[6].x + this.p[6].x)/2, (this.p[6].x + this.p[5].x)/2, this.p[6].x, t);
            yCore = bezierPoint(this.p[5].y, this.p[5].y, this.p[6].y, this.p[6].y, t);
          }

          var u = map(xCore, 0, this.pgA.width, 0, 1);

          vertex(xCore, yCore, u, 0);
          vertex(xCore, yCore + this.pgA.height, u, 1);
        }
      endShape();

      
      // ellipse(this.p[0].x, this.p[0].y, 5, 5);
      // line(this.p[0].x, this.p[0].y, (this.p[1].x + this.p[0].x)/2, this.p[1].y);
      // line(this.p[0].x, this.p[0].y, this.p[0].x, this.p[0].y + 200);
      
      // stroke(255, 0, 0);
      // ellipse(this.p[1].x, this.p[1].y, 5, 5);
      // line((this.p[1].x + this.p[0].x)/2, this.p[1].y, (this.p[2].x + this.p[1].x)/2, this.p[2].y);
      // line(this.p[1].x, this.p[1].y, this.p[1].x, this.p[1].y + 200);
      
      // stroke(0, 255, 0);
      // line((this.p[2].x + this.p[1].x)/2, this.p[2].y, (this.p[3].x + this.p[2].x)/2, this.p[2].y);
      // line(this.p[2].x, this.p[2].y, this.p[2].x, this.p[2].y + 200);

      // stroke(0,0,255);
      // line((this.p[3].x + this.p[2].x)/2, this.p[3].y, this.p[3].x, this.p[2].y);
      // line(this.p[3].x, this.p[3].y, this.p[3].x, this.p[3].y + 200);

    pop();
  }

  findTextSize(){
    var measured = 0;
    while(measured < width){
      textSize(this.pgTextSize)
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  drawTextures(){
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.05));
    this.pgA.background(bkgdColor);
  
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width/2, thisAdjust);
  }

  removeGraphics(){
    this.pgA.remove();
  }
}
