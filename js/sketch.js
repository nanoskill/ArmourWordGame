let alphabet    = "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZAABCDEEFGHIIJKLMNOOOPRSTUUUY"
let images      = [];       //background images
let backgrounds = [];       //background
let pipes       = [];       //pipa
let letters     = [];       //huruf-huruf dalam jalur
var resultCards = [];       //container untuk result betul/salah
let upDownFlag  = 0;        //up = 1, down = 2
let gap         = 200;      //besar jalur
let pipeTime    = gap;      //counter buat generate pipa
let count       = 0;        //jumlah pipa atau panjang jalur
let inRoom      = false;    //penanda jika sudah ada didalam ruangan untuk menyusun kata
let speed;                  //kecepatan jalan game
let timer;                  //timer saat ada didalam ruangan untuk menyusun kata
let fontFam;                //font
let char;                   //karakter
let curPipeHeight;          //tinggi pipa yang sekarang
let yPosition;              //posisi titik y untuk huruf dalam jalur
var score;                  //score
let myLetters;              //huruf-huruf yang dipilih
let arrangeWord;            //mode menyusun kata
let life;                   //life
let powerUp;                //powerup
let letterSound;
let arrangeWordSound;
var yeaySound   = [];
let level;
let started = false;
let logo;
let dieSound;
let dieScreen;
let endState = false;
let highScore   = 0;
let newHighScore = false;
let countDie;
let clickable = false;
var powerUpCandidate = [];

function preload()
{
    images.push(loadImage('../assets/img/houses-1.png'));
    images.push(loadImage('../assets/img/houses-2.png'));
    images.push(loadImage('../assets/img/houses-3.png'));
    images.push(loadImage('../assets/img/travel-1.png'));
    images.push(loadImage('../assets/img/travel-2.png'));
    images.push(loadImage('../assets/img/travel-3.png'));

    arrangeWordSound = loadSound('../assets/songs/pop.mp3');
    fontFam = loadFont('../assets/font/HunDIN1451.ttf');
    logo = loadImage('../assets/img/Logo.png');
}

function songLoaded()
{
    song.loop();
    song.setVolume(0.5);
}

function setup()
{ 
    createCanvas(windowWidth, windowHeight);

    backgrounds.push(new Background(images, 1));
    backgrounds.push(new Background(images, 2));
    backgrounds.push(new Background(images, 3));
       
    char        = new Character();
    score       = new Score();
    myLetters   = new MyLetter();
    life        = new Life();
    powerUp     = new PowerUp();
    level       = new Level();
    power       = new PowerUp()
    timer       = new Timer();

    song        = loadSound('../assets/songs/Lovable_Clown_Sit_Com.mp3', songLoaded);
    letterSound = loadSound('../assets/songs/button.mp3');

    for(let i=1 ; i<=8 ; i++){
        yeaySound.push(loadSound(`../assets/songs/Yeay/Yeay (${i}).mp3`));
    }

    dieSound = loadSound('../assets/songs/die.mp3');
    dieSound.onended(resetGame);
}

function resetGame()
{
    let n = pipes.length;
    pipes.splice(0, n);
    myLetters.delete();

    n = letters.length;
    letters.splice(0, n);
    clickable = true;
    startGame();
}

function startGame()
{
    if(!song.isLooping() && song.isLoaded()) songLoaded();
    char.respawn();
    speed       = level.speed;
    myLetters.setMax(level.maxLetterCollected);
    
    tempTop     = windowHeight * 4 / 10;        //tinggi pipa atas
    tempBot     = windowHeight - tempTop - gap; //tinggi pipa bawah
    yPosition   = tempTop + (gap / 2);        //posisi huruf dalam jalur

    dieScreen   = false;
    char.die    = false;
    inRoom      = false;
    pipeTime    = gap;
    count       = 0;
    upDownFlag  = 0;

    pipes.push(new Pipe(tempTop, tempBot, gap - speed));
    started = true;
    generateLetter();
}

//jika mouse diclick
function mouseClicked() 
{
    if(!started) startGame();
    if(endState && clickable){
        resetGame();
        life        = new Life();
        powerUp     = new PowerUp();
        level       = new Level();
        endState = false;
        started = false;
        newHighScore = false;
    }
    if(arrangeWord!=undefined) arrangeWord.isClicked(char);
}

//jika keyboard diketik
function keyPressed()
{
    if(timer.active)
    {
        arrangeWord.useHint(keyCode);
    }
}

function draw()
{
    background(66, 185, 244);           //warna background permainan
    
    //menampilkan background
    for (const bg of backgrounds) 
    {
        bg.update();
        bg.draw();
    }

    //menampilkan home page
    if(!started) 
    {
        score.value = 0;
        push();
        noStroke();
        fill(255,255,255,200);
        rect(0, windowHeight/24*15-20, windowWidth, 75);
        image(logo, windowWidth/2-250, windowHeight/12, 500, 300);
        fill(0);
        textAlign(CENTER, TOP);
        textFont(fontFam);
        textSize(45);
        text('click anywhere to start!', windowWidth/2, windowHeight/24*15);
        pop();
        char.update();
        char.draw();
        return;
    }
    countDie++;
    if(endState && countDie >= 10){
        push();
        
        fill(255,255,255,200);
        rect(100,100,windowWidth-200, windowHeight-200,20);
        fill(42,62,80);    
        textAlign(CENTER);
        textSize(40);
        text("Your Score", windowWidth/2, 200);
        textSize(75);
        text(score.value, windowWidth/2, 280);
        textSize(40);
        if(newHighScore){
            fill(231,76,60);
            text("New  High Score", windowWidth/2, 350);
            textSize(75);
            text(highScore, windowWidth/2, 430);
        }else{
            text("High Score", windowWidth/2, 350);
            textSize(75);
            text(highScore, windowWidth/2, 430);
        }
        fill(42,62,80);
        textSize(15);
        text("Click to continue", windowWidth/2, 480);
        pop();
        return;
    }
    
    pipeTime -= speed;
    //selama timer masih berjalan, maka akan ditampilkan
    if(timer.time > 0)
    {
        arrangeWord.show();
    }

    timer.show();
    //jika waktu timer sudah habis
    if(timer.time == 0 && speed == 0)
    {
        speed       = level.speed;
        pipeTime    = 0;
        count       = 0;

        level.upLevel();
        timer.deactive();       //menonaktifkan timer
        myLetters.delete();     //menghapus kata-kata yang sudah dipilih
        arrangeWord.delete();   //menghapus kata-kata yang sudah dipilih
    }

    //jika sudah dalam ruangan
    if(pipeTime <= -(windowWidth) && inRoom)
    {
        speed            = 0;
        inRoom           = false;
        myLetters.active = false;
        arrangeWord      = new ArrangeWord(myLetters.getLetter(), yeaySound);
       
        timer.setTimer(level.getTimerTime());
    }

    //jika sudah mau memasuki ruangan
    if(count == level.count)
    {
        count   = 0;
        inRoom  = true;
    }

    //resultCard print
    for (let i = 0; i < resultCards.length; i++) {
        resultCards[i].draw();
        if(resultCards[i].color.levels[3] < 0) resultCards.splice(i, 1);
    }

    if(!dieScreen)
    {
        //jika sedang dijalur
        if(pipeTime == 0 && count < level.count && !inRoom)
        {
            generatePipe();

            //setiap 5 pipa generate power up
            if(count % 5 == 0){
                generatePowerUp();
            } else {
                generateLetter();
            }

            pipeTime = gap;
            count++;
        }

        checkPipe();
        checkLetter();
    }

    for(const pipe of pipes)
    {
        if(!dieScreen) pipe.update();
        pipe.show();
    }
    for(const letter of letters)
    {
        if(!dieScreen) letter.update();
        letter.show();
    }

    level.show();
    score.show();
    life.show();
    powerUp.show();
    myLetters.show();
    char.update();
    char.draw();
} 

//random tinggi pipa
function randomHeight() 
{
    return Math.floor(random(1, 8)) * windowHeight / 10;
}

//membuat pipa
function generatePipe()
{
    let topValue, botValue;

    prevPipe = pipes[pipes.length - 1];
    
    if(upDownFlag == 0)
    {
        curPipeHeight = randomHeight();
        if(curPipeHeight > prevPipe.top)
        {
            topValue    = prevPipe.top;
            botValue    = prevPipe.bottom - (curPipeHeight - prevPipe.top);
            upDownFlag += 2;                //sedang turun
        } 
        else 
        {
            topValue    = curPipeHeight;
            botValue    = prevPipe.bottom;
            upDownFlag += 1;                //sedang naik
        }
        yPosition = topValue + ((windowHeight - topValue - botValue) / 2);
    } 
    else 
    {
        if (upDownFlag & 2) 
        {
            topValue    = curPipeHeight;
            botValue    = prevPipe.bottom;
            upDownFlag -= 2;
        } 
        else if (upDownFlag & 1)
        {
            topValue    = prevPipe.top;
            botValue    = windowHeight - prevPipe.top - gap;
            upDownFlag -= 1;
        }
        yPosition = topValue + (gap / 2);
    }
    pipes.push(new Pipe(topValue, botValue, gap));
}

//check pipanya apakah nabrak atau tidak
function checkPipe()
{
    for (var i = pipes.length - 1; i >= 0; i--) 
    {
        //jika karakter menabrak pipa
        if (pipes[i].hits(char))
        {
            char.kill();
            dieScreen = true;
            song.stop();
            dieSound.play();
            dieSound.setVolume(1);
            if(life.life == 0){
                if(score.value > highScore){
                    highScore = score.value;
                    newHighScore = true;
                }
                endState = true;
                countDie = 0;
                clickable = false;
                return;
            }
            inRoom = false;
            life.dec();
            return;
        }

        //jika karakter berada di jalur
        /*if(pipes[i].with(char))
        {
            score.upScore();
        }*/

        //jika pipa sudah diluar layar
        if(pipes[i].offscreen() && pipes.length > 1)
        {
            pipes.splice(i, 1);
        }
    }
}

//check hurufnya apakah ditabrak
function checkLetter()
{
    for (var i = letters.length - 1; i >= 0; i--) 
    {

        //jika karakter menabrak huruf
        if (letters[i].hits(char, letters[i]))
        {
            letterSound.play();
            letterSound.setVolume(1);
            myLetters.setLetter(letters[i]);
            score.hitLetter();
        }

        //jika huruf sudah diluar layar
        if(letters[i].offscreen())
        {
            letters.splice(i, 1);
        }
    }

}

function generatePowerUp()
{
    let colour;
    let type;
    let letter       = alphabet.charAt(Math.floor(random() * alphabet.length)); 
    let randomColour = Math.floor(random() * 3);
    
    switch (randomColour) 
    {
        case 0:
            colour  = new Colour(231, 76, 60);
            type    = "life";
            break;
        case 1:
            colour  = new Colour(39, 174, 96);
            type    = "hint";
            break;
        case 2:
            colour  = new Colour(230, 126, 34);
            type    = "slow";
            break;
    }

    letters.push(new Letter(letter, (gap / 2), yPosition + 15, colour, type));
}

function generateLetter()
{
    let letter = alphabet.charAt(Math.floor(random() * alphabet.length)); 

    letters.push(new Letter(letter, (gap / 2), yPosition + 15, new Colour(236, 240, 241), ""));
}