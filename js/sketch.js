let images = [];

function preload()
{
    /*song = loadSound('../songs/bgm.mp3', songLoaded);*/
    images.push(loadImage('../assets/img/houses-1.png'));
    images.push(loadImage('../assets/img/houses-2.png'));
    images.push(loadImage('../assets/img/houses-3.png'));
    images.push(loadImage('../assets/img/travel-1.png'));
    images.push(loadImage('../assets/img/travel-2.png'));
    images.push(loadImage('../assets/img/travel-3.png'));
}

function songLoaded()
{
    song.loop();
    song.setVolume(0.5);
}

//------setup and draw------//

let backgrounds = [];
let char;
let pipes = [];
let upDownFlag = 0; //up = 1, down = 2
let gap = 200;
let pipeTime = gap;
let curPipeHeight;
var speed = 2;

function setup()
{ 
    song = loadSound('../assets/songs/bgm.mp3', songLoaded);
    char = new Character();
    backgrounds.push(new Background(images, 1));
    backgrounds.push(new Background(images, 2));
    backgrounds.push(new Background(images, 3));
    //butt = createButton('Start Game');
    //butt.class('button');
    createCanvas(windowWidth, windowHeight);

    //score = new Score();

    tempTop = randomHeight();
    tempBot = windowHeight-tempTop-gap;
    pipes.push(new Pipe(tempTop,tempBot,gap));
}

function draw()
{
    background(66, 185, 244);
    for (const bg of backgrounds) {
        bg.update();
        bg.draw();
    }
    pipeTime-=speed;
    if(pipeTime == 0)
    {
        generatePipe();
        pipeTime = gap;
    }
    checkPipe();
    char.update();
    char.draw();
}  

function randomHeight() {
    return Math.floor(random(1,10)) * windowHeight/10;
}

function generatePipe()
{
    prevPipe = pipes[pipes.length-1];
    let topValue, botValue;
    if(upDownFlag == 0){
        curPipeHeight = randomHeight();
        if(curPipeHeight > prevPipe.top){
            topValue = prevPipe.top;
            botValue = prevPipe.bottom-(curPipeHeight-prevPipe.top);
            upDownFlag += 2;
        } else {
            topValue = curPipeHeight;
            botValue = prevPipe.bottom;
            upDownFlag += 1;   
        }
    } else {
        if (upDownFlag & 2) {
            topValue = curPipeHeight;
            botValue = prevPipe.bottom;
            upDownFlag -= 2;
        } else if (upDownFlag & 1){
            topValue = prevPipe.top;
            botValue = windowHeight-prevPipe.top-gap;
            upDownFlag -= 1;
        }
    }
    pipes.push(new Pipe(topValue,botValue,gap));
}

function checkPipe()
{
    for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(char)){

        }

        if(pipes[i].offscreen()){
            pipes.splice(i, 1);
        }
    }
}