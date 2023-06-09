class Bend {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.currentFont = tFont[int(random(4))];
    this.pgTextSize = 2;
    this.findTextSize();

    this.strokeOn = false;
    if(random(10) < 5){
      this.strokeOn = true;
    }

    this.pgA;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.res = 200;
    this.xSpace = this.pgA.width/this.res;
    this.yTopAnim;
    this.yBotAnim;

    this.yTopCorner = (height - this.pgA.height)/2;
    this.yBotCorner = (height - this.pgA.height)/2 + this.pgA.height;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      a0 = 0;
      b0 = -this.yTopCorner/2;

      a1 = this.pgA.height;
      b1 = (this.yBotCorner + this.pgA.height)/2;
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      a0 = -this.yTopCorner/2;
      b0 = -this.yTopCorner;

      a1 = (this.yBotCorner + this.pgA.height)/2;
      b1 = this.yBotCorner;
    }

    this.yTopAnim = map(tk1, 0, 1, a0, b0);
    this.yBotAnim = map(tk1, 0, 1, a1, b1);
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      noStroke();
      texture(this.pgA);

      beginShape(TRIANGLE_STRIP);
        for(var n = 0; n <= this.res; n++){
          let t = n / this.res;

          let x = bezierPoint(0, width/2, width/2, width, t);
          let yTop = bezierPoint(this.yTopAnim, 0, 0, this.yTopAnim, t);
          let yBot = bezierPoint(this.yBotAnim, this.pgA.height, this.pgA.height, this.yBotAnim, t);

          var u = map(x, 0, this.pgA.width, 0, 1);

          vertex(x, yTop, u, 0);
          vertex(x, yBot, u, 1);
        }
      endShape();
    pop();
  }

  findTextSize(){
    var measured = 0;
    while(measured < width){
      textSize(this.pgTextSize)
      textFont(this.currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  drawTextures(){
    textSize(this.pgTextSize);
    textFont(this.currentFont);
    var repeatSize = round(textWidth(this.inp));
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.1));
    // this.pgA.background(bkgdColor);
    
    if(this.strokeOn){
      this.pgA.stroke(foreColor);
      this.pgA.strokeWeight(3);
      this.pgA.fill(bkgdColor);
    } else {
      this.pgA.fill(foreColor);
      this.pgA.noStroke();
    }

    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(this.currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width/2, thisAdjust);
  }

  removeGraphics(){
    this.pgA.remove();
  }
}
