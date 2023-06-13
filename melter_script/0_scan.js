class Scan {
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

    this.res = 100;
    this.ySpace = this.pgA.height/this.res;
    
    this.xAnim = [];
    this.xAnimMax = [];

    for(var m = 0; m < this.res; m++){
      this.xAnim[m] = 0;

      var noiseCone = 0;
      if(m < this.res/2){
        var tk0 = map(m, 0, this.res/2, 0, 1);
        noiseCone = map(easeInOutQuad(tk0), 0, 1, 0, -300);
      } else {
        var tk0 = map(m, this.res/2, this.res, 0, 1);
        noiseCone = map(easeInOutQuad(tk0), 0, 1, -300, 0);
      }

      noiseDetail(2, 0.1);
      this.xAnimMax[m] = map(noise(m * 0.06), 0, 1, -noiseCone, noiseCone);
    }
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      for(var m = 0; m < this.res; m++){
        this.xAnim[m] = map(tk1, 0, 1, 0, this.xAnimMax[m]/2);
      }
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      for(var m = 0; m < this.res; m++){
        this.xAnim[m] = map(tk1, 0, 1, this.xAnimMax[m]/2, this.xAnimMax[m]);
      }
    }
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
          var xL = 0;
          var xR = this.pgA.width;
          var y = n * this.ySpace;

          var v = map(n, 0, this.res, 0, 1);

          vertex(xL + this.xAnim[n], y, 0, v);
          vertex(xR + this.xAnim[n], y, 1, v);
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
