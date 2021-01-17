song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;



function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#00FFFF");
    stroke("#008080");
    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("mage").innerHTML="Clair de Lune";
            

        }
    }
    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("maga").innerHTML="Peter Pan stuff";
        }
        
}

function preload() {
    song1 = loadSound("good.mp3");
    song2 = loadSound("music.mp3")
}

function play() {
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function stoop() {
    song2.stop();
    song1.stop();
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[9].score;
        console.log("score LeftWrist= " + score_leftWrist + "score rightWrist= " + score_rightWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
        console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    }

}}
