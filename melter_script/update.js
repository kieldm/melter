function setText(val){
  var enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.match(/[^\r\n]+/g);

  if(keyArray == null){
    keyArray = "";
  }

  selector = 0;
  pickScene();
}

function setSceneLength(val){
  sceneLength = int(val);
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function clearAllScenes(){
  for(var n = 0; n < flashCount; n++){
    sceneOn[n] = false;
  }
  document.getElementById('arcer').checked = false;
  document.getElementById('bend').checked = false;
  document.getElementById('bugeyes').checked = false;
  document.getElementById('shutters').checked = false;
  document.getElementById('shutters2').checked = false;
  document.getElementById('slotmachine').checked = false;
  document.getElementById('snap').checked = false;
  document.getElementById('split').checked = false;
  document.getElementById('twist').checked = false;
  document.getElementById('droop').checked = false;
  document.getElementById('glitch').checked = false;
  document.getElementById('scatter').checked = false;
  document.getElementById('scan').checked = false;
  document.getElementById('oddone').checked = false;
  document.getElementById('slitscan').checked = false;

  sceneCount = 0;
}

function setScene(val){
  sceneOn[val] = !sceneOn[val];

  sceneCount = 0;
  for(var n = 0; n < flashCount; n++){
    if(sceneOn[n]){
      sceneCount++;
    }
  }
}

function toggleRecMessage(){
  recMessageOn = !recMessageOn;

  if(recMessageOn){
    document.getElementById('recStatus').style.display = "block";
  } else {
    document.getElementById('recStatus').style.display = "none";
  }
}

function setSceneRepeats(val){
  sceneRepeats = round(val);
}

function sizeSaveChange(val){
  saveMode = val;
  resizeForPreview();
}