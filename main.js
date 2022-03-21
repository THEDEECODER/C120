function setup() {
    canvas = createCanvas(200, 200);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('mobilenet', modelloaded);
  }
  
  function draw(){
    image(video, 0, 0, 200, 200);
    classifier.classify(video, gotresults);
  }
  
  function preload(){
  
  }
  
  function modelloaded(){
    console.log("modelloaded");
  }
  var previous_result = "";
  
  function gotresults(error, results){
    if(error){
    console.error(error)}
    else{
      if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
        console.log(results);
        previous_result = results[0].label;
        var speech = window.speechSynthesis;
        speak_data = "The object detected is" + results[0].label;
        var utterthis = new SpeechSynthesisUtterance(speak_data);
        speech.speak(utterthis);
        document.getElementById("span1").innerHTML = results[0].label;
        document.getElementById("span2").innerHTML = results[0].confidence.toFixed(2);
      }
    }
  }