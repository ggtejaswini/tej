songchange = "";
Song1 = "";
Song2 = "";
scoreleftWrist
leftWristX =0;
leftWristY =0;
rightWristX = 0;
rightWristY = 0;
function preload(){
  Song1 = loadSound("As You Were - TrackTribe.mp3");
  Song2 = loadSound("Like that - Anno Domini Beats.mp3")
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet =  ml5.poseNet(video, model_loaded);
    posenet.on('pose' , gotposes);
}

function model_loaded(){
  console.log("Posenet is Initialized");
}
  function draw(){
    image(video,0,0,600,500);   

    if(scoreleftWrist > 0.2){
      circle(leftWristX,leftWristY,20);
      Song1.isPlaying()
      Song2.stop()
      document.getElementById("song_name").innerHTML = "Song name : As You Were ";
    }

    if(scorerightWrist > 0.2){
      circle(rightWristX,rightWristY,20);
      Song2.isPlaying()
      Song2.stop()
      document.getElementById("song_name").innerHTML = "Song name : Like That ";
    }
}
function play(){
  song.setvolume(1);
  song.rate(1)
}

function gotposes(error,results){
  if(error){
    console.error(error)
  }
  if(results.length > 0 ){
      console.log(results);
      scoreleftWrist = results[0].pose.keypoints[9].score;
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("LeftWristX = "+leftWristX+ "leftWristY = "+leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("RightWristX = "+rightWristX+ "RightWristY = "+rightWristX);
  }
}
