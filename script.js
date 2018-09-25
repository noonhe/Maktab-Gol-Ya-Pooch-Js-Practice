//////////////////////////////////////////declarations///////////////////////////////////////////
const CHAP = 0;
const RAST = 1;
let number_of_players = getNumberOfPlayers(); // دریافت تعداد بازیکنان
let arry_of_players = [];

////////////////////////////////////////////////main/////////////////////////////////////////////



main()



/////////////////////////////////////////Functions!//////////////////////////////////////////////

//تعداد بازیکنان را دریافت میکند و اگر مقدار ناصحیح وارد کند اخطار میدهد و دوباره درخواست مقدار میکند
function getNumberOfPlayers() {
    let num;
    while (true) {
        num = prompt("سلام! لطفا تعداد شرکت کنندگان را وارد نمایید:");
        if (Number(num) == num) {
            break;
        }
        else {
            alert("مقدار صحیح (عدد) وارد کنید!!!");
        }
    }
    return Number(num);
}

//تابع اصلی برنامه
function main() {

    console.log("این بازی " + number_of_players + " نفر بازیکن دارد!");

    getPlayersNames(number_of_players, arry_of_players); // دریافت نام بازیکنان 

    console.log("بازی شروع میشود");

    theGameIsOn(number_of_players, arry_of_players);

}


//تابع زیر برای هر بازیکن یک شی میسازد که شامل نام او، شماره بازیکن، تعداد بازی ها و بردهایش است
function getPlayersNames(num , arr) {

    for (let i = 0; i < num; i++) {

        let name = prompt("Enter player number"+(i+1)+"'s name please!");
        arr[i] = makePlayer(name , i+1);
        console.log("نام بازیکن شماره "+ (i+1) +" "+ arr[i].name+ " است.");

    }

}

// تابع زیر مخصوص ساخت شی است
function makePlayer(name , num) {
    
    return {
        name : name, //نام بازیکن
        number : num,  // شماره بازیکن
        games : 0, // تعداد بازی های بازیکن
        wins: 0 //تعداد برد های بازیکن
    }; 

}

//تابع زیر برای هر بازیکن 5 دور بازی اجرا میشود
function theGameIsOn(num,arr) {

    let computer_choice;
    let player_choice;

    for (let i = 0; i<5; i++) { // پنج دور

        for (let j = 0; j < num; j++) { // برای هر بازیکن

            console.log("الان نوبت بازیکن شماره " + (j+1) + " یعنی " + arr[j].name + " است");
            arr[j].games ++; 
            console.log("شانس "+ arr[j].games + "ام");
            computer_choice = makeRandom();

            if (computer_choice === CHAP) {
                
                computer_choice = "چپ";

            }
            else{

                computer_choice = "راست";

            }
           
            while (true) {

               player_choice = prompt("گل تو کدومه؟ چپ یا راست؟");

               if (player_choice === "چپ" || player_choice === "راست") {
                   
                    break; 

               }
               else{

                   alert("مقدار اشتباه وارد کردی. دوباره امتحان کن!")

               }
            }

            console.log(arr[j].name + " " + player_choice + " رو انتخاب کرد!");

            if(player_choice === computer_choice){

                console.log("آفرین "+ arr[j].name+ " این بازی رو بردی!");
                arr[j].wins ++;

            }
            else{

                console.log("متاسفم! " + arr[j].name + " این بازی رو باختی!");

            }

            console.log("تعداد بردهای " + arr[j].name + " تاحالا:" + " " + arr[j].wins);
        }   

    }
    
    printWins(arry_of_players,number_of_players); //چاپ تعداد برد هر بازیکن
    let max_score = findMax(arry_of_players,number_of_players); //یافتن بیشترین امتیاز موجود
    let new_arry_of_players = deleteLosers(max_score, arry_of_players,number_of_players); //حذف بازنده ها از آرایه بازیکنان
    number_of_players = new_arry_of_players.length;

    if (number_of_players === 1) {

        console.log("تبریک! "+ new_arry_of_players[0].name+" برنده شدی.");

    }
    else{

        penalti(new_arry_of_players,number_of_players);

    }

    console.log("بازی تمام شد! خدانگهدار!");

}

//تابع زیر عددی رندوم 0 و 1 میدهد.
function makeRandom() {

    return Math.floor(Math.random() * Math.floor(2)); 

}

//بیشترین امتیاز را پیدا میکند
function findMax(arr , num) {

    console.log(arr , num);
    let max = arr[0].wins;

    for (let i = 1; i < num; i++) {
        
        if (arr[i].wins>max) {
            max = arr[i].wins;
        }
        
    }

    console.log("بزرگترین امتیاز کسب شده در این بازی: "+ max);
    return max;

}

//تابع زیر تمام بازیکنانی که امتیاز زیر ماکزیمم امتیازات را گرفته اند از آرایه بازیکنان حذف میکند
function deleteLosers(max , arr , num) {

    let new_arr = [];

    for (let i = 0; i < num; i++) {

        if(arr[i].wins === max){

            new_arr.push(arr[i]);

        } 
        else{

            console.log("متاسفم "+arr[i].name+"! تو باختی! بای بای!");
        }
    }

    return new_arr
    
}

//پنالتی در صورت مساوی شدن چند بازیکن با امتیاز بالا
function penalti(arr , num) {

    let player_choice;
    let computer_choice;
    let max_score;
    let num_of_maxs = 0

    while (true){
        num_of_maxs = 0
        for (let i = 0; i < num; i++) {

            console.log("الان نوبت بازیکن شماره " + (i + 1) + " یعنی " + arr[i].name + " است");
            arr[i].games++;
            console.log("شانس " + arr[i].games + "ام");
            computer_choice = makeRandom();

            if (computer_choice === CHAP) {

                computer_choice = "چپ";

            } else {

                computer_choice = "راست";

            }

            while (true) {
                player_choice = prompt("گل تو کدومه؟ چپ یا راست؟");

                if (player_choice === "چپ" || player_choice === "راست") {

                    break;

                } else {

                    alert("مقدار اشتباه وارد کردی. دوباره امتحان کن!")

                }
            }

            console.log(arr[i].name + " " + player_choice + " رو انتخاب کرد!");

            if (player_choice === computer_choice) {

                console.log("آفرین " + arr[i].name + " این بازی رو بردی!");
                arr[i].wins++;

            } else {

                console.log("متاسفم! " + arr[i].name + " این بازی رو باختی!");

            }

            console.log("تعداد بردهای " + arr[i].name + " تاحالا:" + " " + arr[i].wins);
        }
        
        max_score = findMax(arr, num); //یافتن بیشترین امتیاز موجود
        let losers_indexes=[]; //آرایه بازنده ها
        
        // یافتن تعداد برنده ها و پیدا کردن اندیس های بازنده ها
        for (let j = 0; j < num; j++) {

            if(arr[j].wins === max_score){

                num_of_maxs++;

            }  
            else{

                losers_indexes.push(j);
            }

        }
        //حذف بازنده ها
        for (let i = 0; i < losers_indexes.length; i++) {
            arr.splice(losers_indexes[i],1)
            
        }

        num = num_of_maxs;

        if(num_of_maxs===1){ //چک میکند ببیند بالاخره فقط یه نفر باقی مونده یا نه! 
                    
            console.log("آفرین " + arr[0].name + " برنده شدی!");
            break;

        }
        
    }
    
}

//بعد از تمام شدن 5 دور مسابقه، تعداد بردهای تمام بازیکنان را نمایش میدهد
function printWins(arr,num) {

    console.log("شرح امتیازات:")

    for (let i = 0; i < num; i++) {

        console.log(arr[i].name + ": "+ arr[i].wins); 

    } 

}