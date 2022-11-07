var leftWristY=0;
var rightWristY=0;
var leftWristX=0;
var rightWristX=0;
var song="";
var scoreLeftWrist=0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}
function draw(){
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2){
        fill("cyan");
        stroke("lime");
        circle(leftWristX, leftWristY, 20);
        var numberLeftWrist=Number(leftWristY);
        remove_decimal=floor(numberLeftWrist);
        var volume=remove_decimal/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume = "+volume;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}
function modelloaded(){
    console.log("posenet is loaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftwristX = "+leftWristX+" leftWristY = "+leftWristY);
        console.log("rightwristX = "+rightWristX+" rightWristY = "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+ scoreLeftWrist);
        }

}
