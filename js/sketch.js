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
    song.play();
    song.setVolume(0.5);
}

//------setup and draw------//

let backgrounds = [];
let char;

function setup()
{ 
    song = loadSound('../assets/songs/bgm.mp3', songLoaded);
    char = new Character();
    backgrounds.push(new Background(images, 1));
    backgrounds.push(new Background(images, 2));
    backgrounds.push(new Background(images, 3));
    //butt = createButton('Start Game');
    //butt.class('button');
}

function draw()
{
    createCanvas(windowWidth, windowHeight);
    background(66, 185, 244);
    for (const bg of backgrounds) {
        bg.update();
        bg.draw();
    }
    char.update();
    char.draw();
}