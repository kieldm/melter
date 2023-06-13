class OddOne {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.track = -20;
    this.currentFont = tFont[int(random(4))];
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.track = -this.pgTextSize * trackFactor;
    this.trackFix = -(this.inp.length - 1) * this.track/2;
    this.xSpots = [];
    this.findXpos();

    this.strokeOn = false;
    if(random(10) < 5){
      this.strokeOn = true;
    }

    this.pg = [];
    this.makeTextures();

    // this.theOddOne = int(random(1,this.inp.length-1));
    this.theOddOne = int(random(this.inp.length));
    this.res = 100;

    this.xAnim = [];
    this.xAnimMax = [];
    this.rAnim = 0;
    this.rAnimMax = random(-PI/4, PI/4);

    this.ySpace = this.pg[0].height/this.res;
    this.waveSize = 25;
    this.waveOffset1 = 0.025;
    this.waveOffset2 = 0.1;

    this.ticker = 0;

    this.shutterAnim = [];
    this.shutterAnimBot = [];
    this.shutterYanim = [];

    this.ramp = ramp_;

    // this.pacer = (sceneLength/4)/this.inp.length;

    for(var m = 0; m < this.res; m++){
      this.xAnim[m] = 0;
      this.xAnimMax[m] = sin(m * this.waveOffset1) * sin(-m * this.waveOffset2) * this.waveSize;
    }
  }

  update(){
    this.ticker ++;

    // for(var n = 0; n < this.inp.length; n++){
    //   var tk00 = constrain(this.ticker - this.pacer*n, 0, sceneLength);
    //   var tk0 = map(tk00, 0, sceneLength, 0, 1.0);

    //   var tk1;

    //   if(tk0 < 0.5){
    //     var tk0b = map(tk0, 0, 0.5, 0, 1);
    //     tk1 = easeOutExpo(tk0b);
    //   } else {
    //     var tk0b = map(tk0, 0.5, 1, 0, 1);
    //     tk1 = easeInExpo(tk0b);
    //   }

    //   // this.shutterAnim[n] = map(tk1, 0, 1, a0, b0);
    // }
    var tk00 = constrain(this.ticker, 0, sceneLength);
    var tk0 = map(tk00, 0, sceneLength, 0, 1.0);
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      var tk1 = easeOutExpo(tk0b);

      this.rAnim = map(tk1, 0, 1, 0, this.rAnimMax/2);
      for(var m = 0; m < this.res; m++){
        this.xAnim[m] = map(tk1, 0, 1, 0, this.xAnimMax[m]);
      }
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
    
      this.rAnim = map(tk1, 0, 1, this.rAnimMax/2, this.rAnimMax);
      for(var m = 0; m < this.res; m++){
        this.xAnim[m] = map(tk1, 0, 1, this.xAnimMax[m], this.xAnimMax[m] * 2);
      }
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(0, height/2);
      translate(this.trackFix, -this.pg[0].height/2);

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], 0);

          // stroke(0,0,255);
          noStroke();
          texture(this.pg[n]);

          if(n == this.theOddOne){
            translate(this.pg[n].width/2, this.pg[n].height/2);
            rotateZ(this.rAnim);
            translate(-this.pg[n].width/2, -this.pg[n].height/2);

            // ellipse(0, 0, 20, 20);
            beginShape(TRIANGLE_STRIP);
              for(var m = 0; m <= this.res; m++){
                var xL = 0 + this.xAnim[m];
                var xR = this.pg[n].width + this.xAnim[m];
                var y = m * this.ySpace;

                var v = map(m, 0, this.res, 0, 1);
                vertex(xL, y, 0, v);
                vertex(xR, y, 1, v);
              }
            endShape();
          } else {
            rect(0, 0, this.pg[n].width, this.pg[n].height);
          }

        pop();
      }
    pop();
  }

  findXpos(){
    textFont(this.currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width/2 - fullSize/2;

    for(var n = 0; n < this.inp.length; n++){
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0,n+1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference + n * this.track;
    }
  }

  findTextSize(){
    var measured = 0;
    while(measured < (width - (this.inp.length - 1) * this.track)){
      textSize(this.pgTextSize)
      textFont(this.currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  makeTextures(){
    textSize(this.pgTextSize);
    textFont(this.currentFont);

    for(var n = 0; n < this.inp.length; n++){

      var repeatSize = round(textWidth(this.inp.charAt(n)));
    
      this.pg[n] = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.05));
      // this.pg[n].background(bkgdColor);
    
      if(this.strokeOn){
        this.pg[n].stroke(foreColor);
        this.pg[n].strokeWeight(3);
        this.pg[n].noFill();
      } else {
        this.pg[n].fill(foreColor);
        this.pg[n].noStroke();
      }
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(this.currentFont);
      var thisAdjust = this.pg[n].height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width/2, thisAdjust);
    }
  }

  removeGraphics(){
    for(var n = 0; n < this.inp.length; n++){
      this.pg[n].remove();
    }
  }
}
