class SlotMachine {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.track = -20;
    this.currentFont = tFont[int(random(4))];
    this.repeats = 2;
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.track = -this.pgTextSize * trackFactor;
    this.trackFix = -(this.inp.length - 1) * this.track/2;
    this.xSpots = [];
    this.findXpos();

    this.yAnim = [];
    this.yTarget = [];
    this.yStart = 50;
    this.yMin = 0;
    this.yMax = -150;
    this.setYtarget();

    this.ticker = 0;

    this.blPadding = 25;
    this.blSpacing = (width - 2*this.blPadding)/(keyArray.length - 1);

    this.ramp = ramp_;

    this.strokeOn = false;
    if(random(10) < 5){
      this.strokeOn = true;
    }
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    for(var n = 0; n < this.inp.length; n++){
      var tk1;
      var a0, b0;
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a0 = this.yStart;
        b0 = (this.yStart + this.yTarget[n])/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a0 = (this.yStart + this.yTarget[n])/2;
        b0 = this.yTarget[n];
      }

      this.yAnim[n] = map(tk1, 0, 1, a0, b0);
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(this.trackFix, (this.pgTextSize * thisFontAdjust)/2);
      textSize(this.pgTextSize);
      textAlign(LEFT);

      fill(foreColor);
      noStroke();

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], height/2);
          translate(0, this.yAnim[n]);

          translate(0, -this.repeats*(this.pgTextSize*0.8)/2);
          for(var p = 0; p < this.repeats; p++){
            text(this.inp.charAt(n), 0, p * this.pgTextSize * 0.8);
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

  setYtarget(){
    for(var n = 0; n < this.inp.length; n++){
      this.yTarget[n] = random(-this.pgTextSize*2, this.pgTextSize*2);;
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

    this.repeats = round((height*2)/this.pgTextSize) + 5;
  }

  removeGraphics(){
    
  }  
}
