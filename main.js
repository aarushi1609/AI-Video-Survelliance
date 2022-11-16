objects= [];
status1 = "";

function preload()
{
    video = createVideo("video.mp4");
}


function setup()
{
    canvas = createCanvas(350,350);
    canvas.center();
    video.hide();
}

function draw()
{
    image(video, 0, 0, 350, 350);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        console.log("reached");
    

    for(i=0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("objects_number").innerHTML = "Number of objects: " + objects.length;
        console.log("reached2")
        fill("#FF0000");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status1 =true;
    video.loop();
    video.volume(0);
    video.speed(1);
}