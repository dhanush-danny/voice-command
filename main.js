x = 0;
y = 0;
screen_width=0;
 screen_height = 0;
draw_apple = "";
apple = "";
speak_data = "";
to_number = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    for(var i=0;i<to_number;i++) {
      image(apple,Math.random()*screen_width-150,Math.random()*500,50,50);
      console.log(i);
    }
    document.getElementById("status").innerHTML=to_number+" apples drawn";
    speak_data=to_number+" apples drawn";
    speak();
    draw_apple = "";
  }
}


function start() {
  background("pink");
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();

}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;
  to_number = Number(content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "speech has not recognized a number";
  }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150);
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}