class Level
{
    constructor()
    {
        this.level = 0;
        this.count = 10;      //banyak pipa
        this.speed = 5;
        this.timerTime = 30; //dalam detik
        this.maxLetterCollected = 10;
    }
    show()
    {
        push();
        textSize(50);
        fill(211, 84, 0);
        text("Level : " + this.level, 10, windowHeight-30);
        pop();
    }
    upLevel()
    {
        //jumlah huruf yg harus disusun di arrange word belom disetting
        this.level++;
        if(this.count>10) this.count--;//banyak pipanya dikurangin
        if(this.level%2==0) this.speed++;//speed dicepetin
        if(this.level%3==0 && this.timerTime>20) this.timerTime -= 5;//waktu pas nyusun word-nya dicepetin
        if(this.level%5==0 && this.maxLetterCollected > 5) this.maxLetterCollected--;//jumlah huruf yg dikumpulin dikurangin

    }
    getTimerTime(){
        return this.timerTime*60;
    }
}