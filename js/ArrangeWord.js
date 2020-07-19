class ArrangeWord
{
    constructor(letters, yeaySound)
    {
        this.submittedWord  = [];
        this.letters        = letters;                                  //huruf-huruf yang sudah dipilih di jalur sebelumnya
        this.choosen        = "";                                       //huruf-huruf yang dipilih
        this.button         = [];                                       //kumpulan button awan
        this.buttonColor    = new Colour(46, 204, 113);                 //warna button
        this.width          = (windowWidth * 0.8) / (letters.length);   //lebar button awan
        this.height         = 100;                                      //posisi y button                                
        //generate button awan
        for (let i = 0 ; i <= letters.length - 1 ; i++) 
        {
            this.button.push(new Button(letters[i], (i * this.width) + windowWidth * 0.1, this.height, this.width));
        }
        this.words          = [];
        this.isWord         = false;
    }

    updateButton()
    {
        this.width = (windowWidth * 0.8) / (this.button.length);
        for (let i = 0 ; i <= this.button.length - 1 ; i++) 
        {
            this.button[i].x = (i * this.width) + windowWidth * 0.1;   
            this.button[i].width = this.width;     
        }
    }

    show()
    {
        //menampilkan button awan
        for (let i = 0 ; i <= this.button.length - 1 ; i++) 
        {
            this.button[i].show();
        }

        push();
        let high = windowHeight / 2;

        //bikin button check
        this.buttonColor.filling(); 
        rectMode(CENTER); 
        rect(windowWidth / 2, high, 175, windowHeight * 0.1, 20);    
       
        textAlign(CENTER, CENTER); 
        textSize(windowHeight / 15); 
       
        fill(255); 
        text("Check", windowWidth / 2, high);
        
        //bikin tampilan huruf yang dipilih
        fill(0, 160); 
        rectMode(CENTER);
        rect(windowWidth / 2, high + 150, windowHeight * 0.15 * (this.choosen.length), windowHeight * 0.25, 20); 
        
        textSize(windowHeight * 0.2); 
        textAlign(CENTER, CENTER); 
        textStyle(BOLD); 
        fill(255, 255);
        text(this.choosen, windowWidth / 2, high + 150);
        
        pop();
    }

    isClicked(char){
        //jika button diclick
        for (let i = 0 ; i <= this.button.length - 1 ; i++) 
        {
            //check apakah user click button
            if(dist((this.button[i].x + (this.button[i].width * 0.45)), this.button[i].y + (this.button[i].width * 0.50), char.pos.x, char.pos.y) < this.button[i].width / 3 && !this.button[i].clicked)
            {
                this.choosen += this.letters[i].letter; //huruf yang diclick disimpan
                this.button[i].didClicked();            //menandakan button sudah diclick
                this.button[i].hide();
                arrangeWordSound.play();
                arrangeWordSound.setVolume(1);                  //menyembunyikan button yang sudah diclick
                return true;
            }
        }
        
        //jika button check diklik
        if(dist(char.pos.x, char.pos.y, windowWidth / 2, windowHeight / 2) < 50)
        {
            //cek huruf
            this.isWordAvailable(this.choosen);

            this.buttonColor = new Colour(150, 255, 190);

            for (let i = 0 ; i <= this.button.length - 1 ; i++)
            {
                this.buttonColor = new Colour(46, 204, 113);
                this.button[i].unHide();
                this.button[i].unClicked();
                this.choosen = "";
            }
        }
        return false;
    }

    useHint(keyCode)
    {
        if(keyCode == 88)
        {
            if(powerUp.slow == 0) return;
            timer.addTime(10*60);
            powerUp.slow--;
        }
        else if(keyCode == 90)
        {
            if(powerUp.hint == 0) return;
            this.button.push(new Button(new Letter('?', 0, 0, 0, ""), 0, this.height, this.width));
            this.letters.push(new Letter('?', 0, 0, 0, ""));
            this.updateButton();
            powerUp.hint--;
        }
    }

    delete()
    {
        while(this.button.length!=0)
        {
            this.button.splice(0, 1);
        }
        this.letters = null;
    }

    trueWord(word){
        let sound = random(yeaySound);
        sound.play();
        sound.setVolume(4);
        let exist = 1;
        if(arrangeWord.submittedWord.includes(word))
            exist = exist | 2;
        else
            score.correctWord(word.length);
        if(!(exist&2))
        {
            //pwup di ++
            for (const letter of powerUpCandidate) {
                if(letter.type == 'life')
                    life.inc();
                if(letter.type == 'hint')
                    powerUp.hint++;
                if(letter.type == 'slow')
                    powerUp.slow++;
                letter.type = "";
            }
        }
        resultCards.push(new ResultCard(word, exist));
        arrangeWord.submittedWord.push(word);
    }

    falseWord(word)
    {
        let exist = 0;
        if(arrangeWord.submittedWord.includes(word))
            exist = exist | 2;
        else
            score.wrongWord(word.length);
        resultCards.push(new ResultCard(word, exist));
        arrangeWord.submittedWord.push(word);
    }

    isWordAvailable(word)
    {
        let result;
        let trueWord = this.trueWord;
        let falseWord = this.falseWord;
        let response = function(ev)
        {
            let req = ev.currentTarget;
            if(req.readyState == 4 && req.status == 200)
            {
                let result = JSON.parse(req.responseText);
                if(result.length == 0 || word.length <= 1)
                {
                    falseWord(word);
                }
                else
                {
                    word = word.toLowerCase();
                    if(word.includes("?") && result[0].score > 1000) trueWord(result[0].word);
                    else if(result[0].word === word && result[0].score > 1000){
                        trueWord(word);
                    }
                    else
                        falseWord(word);
                }
            }
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", `https://api.datamuse.com/words?sp=${word}&max=1`, true);
        xhttp.send();
        xhttp.onreadystatechange = response;
    }
}