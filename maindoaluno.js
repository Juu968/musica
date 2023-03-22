song=""
function preload()
{
    song=loadSound("music.mp3");
}
scoreRightWrits = 0;
scoreLeftWrist= 0;
rightWritsX = 0;
rightWritsY = 0;
leftWritsY = 0;
leftWritsX = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide()
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized")
}
function gotPoses(results){
    if(results.lenght > 0){
        scoreRightWrits = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video, 0 , 0, 600, 500)
    fill("#FF0000");
    stroke("#FF0000");
}
if(scoreRightWrits > 0.2)
{
    circle(rightWritsX, rightWritsY, 20);
    if (rightWritsY >0 && rightWritsY <=100)
    {
        document.getElementById("speed").innetHTML = "Velocidade = 0.5x";
        song.rate(0.5)
        

    }
    else if(rightWritsY >100 && rightWritsY <=200 )
    {
        document.getElementById("speed").innerHTML= "Velocidade = 1x";
        song.rate(1);
    }
    else if(rightWritsY >200 && rightWritsY <=300 )
    {
        document.getElementById("speed").innerHTML= "Velocidade = 1.5x";
        song.rate(1.5);
    }
    else if(rightWritsY >300 && rightWritsY <=400 )
    {
        document.getElementById("speed").innerHTML= "Velocidade = 2x";
        song.rate(2);
    }
    else if(rightWritsY >400 )
    {
        document.getElementById("speed").innerHTML= "Velocidade = 2.5x";
        song.rate(2.5);
    }
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWritsX,leftWritsY,20);
InNumberleftWristY=Number(leftWritsY);
remove_decimals=floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "Volume =" + volume;

    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
