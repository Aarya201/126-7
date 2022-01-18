song = "";
function preload() {
    song = loadSound("music.mp3");
}
scoreRightWrist = 0;
scoreRightWrist = 0;

LeftWristy = 0;
LeftWristx = 0;

RightWristy = 0;
RightWristx = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on( 'pose',gotPoses);
}
function modelLoaded() {
    console.log('Posenet is Initialzed');
} 
function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        RightWristx = results[0].pose.rightWrist.x;
        RightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        LeftWristx = results[0].pose.leftWrist.x;
        LeftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    }
}
function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
	stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }else if(rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }else if(rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }else if(rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }else  if(rightWristY > 400) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

    }
        if(scoreLeftWrist > 0.2)
        {
            circle(LeftWristx,LeftWristy,20);
            InNumberleftWristy = Number(LeftWristy);
            new_leftwristy = floor(InNumberleftWristy*2);
            leftwristydivide = new_leftwristy/1000;
            document.getElementById("volume").innerHTML = "Volume =" + leftWristY_divide_1000;
            song.setVolume(leftwristydivide);	
        }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}