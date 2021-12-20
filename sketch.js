var sliderVolume;
var sliderRate;
var sliderPan;
var amp;
var volhistory = [];

function setup() {
  createCanvas(720, 420);

  angleMode(DEGREES);

  // testSound = loadSound("testSound.mp3", loaded);

  // innerSound = loadSound("innerSound.mp3", loaded);
  // movingSound = loadSound("movingSound.mp3", loaded);
  outsideSound = loadSound("outsideSound.m4a", loaded);

  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 2, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01); //슬라이더 생성

  amp = new p5.Amplitude();
}

function loaded() {
  // testSound.play();

  // innerSound.play();
  // movingSound.play();
  outsideSound.play(); //사운드 재생
}

function draw() {
  background(0);

  outsideSound.setVolume(sliderVolume.value());
  outsideSound.rate(sliderRate.value());
  outsideSound.pan(sliderPan.value()); //슬라이더 속성 부여

  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++){
    var r = map(volhistory[i], 0, 1, 200, 400);
    var x = r * cos(i);
    var y = r * sin(i);

    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }  //길이 지나면 기존에 있던 거 없애고 새로 시작하기
}
