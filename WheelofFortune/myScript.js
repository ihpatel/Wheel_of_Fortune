/**
 * Created by Patel2391 on 11/28/2017.
 */
//Make some global variables...
var names = [];
var player1score = 0;
var player2score = 0;
var player3score= 0;
var wordFood = ["cheeseburger", "taco", "spaghetti", "cake", "chips", "raisins", "apples", "steak", "chicken"];
var wordPlace = ["chuckecheese", "walmart", "suburbs", "downtown", "highway", "home", "bedroom", "target", "kitchen"];
var wordObject = ["computer", "monitor", "sharpener", "chair", "charger", "clothes", "bottle", "clock", "towel"];
var gameBoard;
var choices = [];
var vowels = ["a", "e", "i", "o", "u"];
var myGuess;
var totalGuessed = 0;
var randNum = ["Bankrupt", "Lose a Turn", 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
var word;
var spin = false;
var numberOfPlayers = 3;
var playerturn = 0;
var dollarAmount = 0;
var randomNumber = 0;
var rand2 = 0;
var categoryPicked;
var roundNumber = 1;
var playAgain;
var categories = [wordFood, wordPlace, wordObject];
var randomCategory = 0;

//starts game
function makeName()
{
    document.getElementById('startGame').style.display = "none";
    for (var i=0; i< numberOfPlayers; i++)
    {
        names.push(prompt("Enter player " + (i+1) + "'s name"));
    }
    alert("Welcome to the game " + names[0] + ", " + names[1] + ", and " + names[2] + "!");
    categoryPicked = prompt("Pick the category for the word: 'a' for Food, 'b' for Place, 'c' for Object");
    initializeWord();
}

//function that initializes the word
function initializeWord()
{
    document.getElementById('gaming').style.display="block";
    document.getElementById('letters').style.display="block";
    var randomName;
    playerturn = Math.floor(Math.random() * 3 + 1);
    randomName = names[playerturn - 1];
    document.getElementById('turn').innerHTML="Turn of player: " + randomName + "'s turn";
    if (categoryPicked === "a" || categoryPicked === categories[0])
    {
        document.getElementById('cat').innerHTML="Category: Food";
        //code for random array generator from stack overflow
        randomNumber =  Math.floor(Math.random() * wordFood.length);
        word = wordFood[randomNumber];
        makeGameBoard();
    }
    else if (categoryPicked === "b" || categoryPicked === categories[1])
    {
        document.getElementById('cat').innerHTML="Category: Places";
        randomNumber = Math.floor(Math.random() * wordPlace.length);
        word = wordPlace[randomNumber];
        makeGameBoard();
    }
    else if (categoryPicked === "c" || categoryPicked === categories[2])
    {
        document.getElementById('cat').innerHTML="Category: Object";
        randomNumber = Math.floor(Math.random() * wordObject.length);
        word = wordObject[randomNumber];
        makeGameBoard();
    }
}

function makeGameBoard()
{
    document.getElementById('roundNumberG').innerHTML = "Round Number: " + roundNumber;
    document.getElementById('gaming').style.display="block";
    document.getElementById('letters').style.display = "block";
    document.getElementById('player1money').innerHTML = names[0] + "'s money: $" + player1score;
    document.getElementById('player2money').innerHTML = names[1] + "'s money: $" + player2score;
    document.getElementById('player3money').innerHTML = names[2] + "'s money: $" + player3score;
    var found = false;
    gameBoard = "";
    for (var i=0; i<word.length; i++)
    {
        found = false;
        for (var j=0; j<choices.length; j++)
        {
            //compare
            if (choices[j] === word[i])
            {
                //correct guess!
                gameBoard = gameBoard + choices[j];
                found = true;
            }
        }
        if (found === false)
        {
            gameBoard = gameBoard + "_ ";
        }
    }
    //update the board
    document.getElementById('guessTheWord').innerHTML="Game board: " + gameBoard;
}


//keeps tracks of money and total letter guessed
function addMoney()
{
    var correctGuess = false;
    for (var i=0; i<word.length; i++)
    {
        if (myGuess === word[i])
        {
            correctGuess = true;
            totalGuessed++;
            if (playerturn === 1)
            {
                player1score = player1score + dollarAmount;
            }
            if (playerturn === 2)
            {
                player2score = player2score + dollarAmount;
            }
            if (playerturn === 3)
            {
                player3score = player3score + dollarAmount;
            }
        }
    }
    endGame();
    if (correctGuess === false)
    {
        alert("Your guess is incorrect, next player's turn now");
        changeTurns();
    }
    document.getElementById('player1money').innerHTML = names[0] + "'s money: $" + player1score;
    document.getElementById('player2money').innerHTML = names[1] + "'s money: $" + player2score;
    document.getElementById('player3money').innerHTML = names[2] + "'s money: $" + player3score;
}

function endGame()
{
    if (totalGuessed === word.length)
    {
        if (roundNumber === 3)
        {
            if (player1score > player2score && player1score > player3score)
            {
                alert(names[0] + " has won the game with a grand total of $" + player1score);
                document.getElementById('player1money').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('player2money').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('player3money').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('dollarAmount').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('guessTheWord').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('turn').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('roundNumberG').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('cat').innerHTML = names[0] + " HAS WON GAME OVER";
                document.getElementById('guessing').innerHTML = names[0] + " HAS WON GAME OVER";
            }
            else if (player2score > player1score && player2score > player3score)
            {
                alert(names[1] + " has won the game with a grand total of $" + player2score);
                document.getElementById('player1money').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('player2money').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('player3money').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('dollarAmount').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('guessTheWord').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('turn').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('roundNumberG').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('cat').innerHTML = names[1] + " HAS WON GAME OVER";
                document.getElementById('guessing').innerHTML = names[1] + " HAS WON GAME OVER";
            }
            else if (player3score > player1score && player3score > player2score)
            {
                alert(names[2] + " has won the game with a grand total of $" + player3score);
                document.getElementById('player1money').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('player2money').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('player3money').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('dollarAmount').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('guessTheWord').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('turn').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('roundNumberG').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('cat').innerHTML = names[2] + " HAS WON GAME OVER";
                document.getElementById('guessing').innerHTML = names[2] + " HAS WON GAME OVER";
            }
        }
        else
        {
            if (playerturn === 1) {
                alert(names[0] + " has won the round by correctly solving the puzzle!");
            }
            else if (playerturn === 2) {
                alert(names[1] + " has won the round by correctly solving the puzzle!");
            }
            else if (playerturn === 2) {
                alert(names[2] + " has won the round by correctly solving the puzzle!");
            }
            playAgain = prompt("Would you like to continue with the game? Answer 'yes' or 'no'");
            if (playAgain.toLowerCase() === "yes") {
                replayGame();
            }
            else {
                document.getElementById('player1money').innerHTML = "GAME OVER";
                document.getElementById('player2money').innerHTML = "GAME OVER";
                document.getElementById('player3money').innerHTML = "GAME OVER";
                document.getElementById('dollarAmount').innerHTML = "GAME OVER";
                document.getElementById('guessTheWord').innerHTML = "GAME OVER";
                document.getElementById('turn').innerHTML = "GAME OVER";
            }
        }
    }
}

function endGameV2()
{
    if (roundNumber === 3)
    {
        if (player1score > player2score && player1score > player3score)
        {
            alert(names[0] + " has won the game with a grand total of $" + player1score);
            document.getElementById('player1money').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('player2money').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('player3money').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('dollarAmount').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('guessTheWord').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('turn').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('roundNumberG').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('cat').innerHTML = names[0] + " HAS WON GAME OVER";
            document.getElementById('guessing').innerHTML = names[0] + " HAS WON GAME OVER";
        }
        else if (player2score > player1score && player2score > player3score)
        {
            alert(names[1] + " has won the game with a grand total of $" + player2score);
            document.getElementById('player1money').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('player2money').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('player3money').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('dollarAmount').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('guessTheWord').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('turn').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('roundNumberG').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('cat').innerHTML = names[1] + " HAS WON GAME OVER";
            document.getElementById('guessing').innerHTML = names[1] + " HAS WON GAME OVER";
        }
        else if (player3score > player1score && player3score > player2score)
        {
            alert(names[2] + " has won the game with a grand total of $" + player3score);
            document.getElementById('player1money').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('player2money').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('player3money').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('dollarAmount').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('guessTheWord').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('turn').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('roundNumberG').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('cat').innerHTML = names[2] + " HAS WON GAME OVER";
            document.getElementById('guessing').innerHTML = names[2] + " HAS WON GAME OVER";
        }
    }
    else
    {
        if (playerturn === 1) {
            alert(names[0] + " has won the round by correctly solving the puzzle!");
        }
        else if (playerturn === 2) {
            alert(names[1] + " has won the round by correctly solving the puzzle!");
        }
        else if (playerturn === 2) {
            alert(names[2] + " has won the round by correctly solving the puzzle!");
        }
        playAgain = prompt("Would you like to continue with the game? Answer 'yes' or 'no'");
        if (playAgain.toLowerCase() === "yes") {
            replayGame();
        }
        else {
            document.getElementById('player1money').innerHTML = "GAME OVER";
            document.getElementById('player2money').innerHTML = "GAME OVER";
            document.getElementById('player3money').innerHTML = "GAME OVER";
            document.getElementById('dollarAmount').innerHTML = "GAME OVER";
            document.getElementById('guessTheWord').innerHTML = "GAME OVER";
            document.getElementById('turn').innerHTML = "GAME OVER";
        }
    }
}

function replayGameInside()
{

    document.getElementById('gaming').style.display = "block";
    document.getElementById('letters').style.display = "block";
    totalGuessed = 0;
    spin = false;
    document.getElementById('player1money').innerHTML = names[0] + "'s money: $" + player1score;
    document.getElementById('player2money').innerHTML = names[1] + "'s money: $" + player2score;
    document.getElementById('player3money').innerHTML = names[2] + "'s money: $" + player3score;
    choices.length = 0;
    document.getElementById('guessing').innerHTML="Guessed letters: ";
    document.getElementById('dollarAmount').innerHTML="...";
    randomCategory = Math.floor(Math.random() * categories.length);
    categoryPicked = categories[randomCategory];
    gameBoard = "";
    for (var i=0; i<word.length; i++)
    {
        gameBoard = gameBoard + "_ ";
    }
    initializeWord(categoryPicked);
    document.getElementById('guessTheWord').innerHTML="Game board: " + gameBoard;
}

function replayGame()
{
    roundNumber++;
    if (roundNumber === 2)
    {
        alert("ROUND 2");
        document.getElementById('roundNumberG').innerHTML="Round Number: " + roundNumber;
        replayGameInside();
    }
    else if (roundNumber === 3)
    {
        alert("ROUND 3! FINAL ROUND");
        document.getElementById('roundNumberG').innerHTML="Round Number: " + roundNumber;
        replayGameInside();
    }

}

//spins wheel and generates random dollar amount
function generateMoney()
{
    if (spin === true)
    {
        alert("You must guess a letter before you can spin again!")
    }
    else
    {
        document.getElementById('image').src="img/wheel.gif";
        //code for interval from w3schools
        setTimeout(changeWheel, 1000);
        spin = true;
        rand2 = Math.floor(Math.random() * randNum.length);
        dollarAmount = randNum[rand2];
        document.getElementById('dollarAmount').innerHTML="You have spun: " + dollarAmount;
        if (dollarAmount === "Bankrupt")
        {
            alert("Uh oh! You spun a bankrupt!");
            if (playerturn === 1)
            {
                player1score = 0;
                spin = false;
            }
            else if (playerturn === 2)
            {
                player2score = 0;
                spin = false;
            }
            else if (playerturn === 3)
            {
                player3score = 0;
                spin = false;
            }
            document.getElementById('player1money').innerHTML = names[0] + "'s money: $" + player1score;
            document.getElementById('player2money').innerHTML = names[1] + "'s money: $" + player2score;
            document.getElementById('player3money').innerHTML = names[2] + "'s money: $" + player3score;
            changeTurns();
        }
        else if (dollarAmount === "Lose a Turn")
        {
            alert("Uh oh! You lose a turn!");
            spin = false;
            changeTurns();
        }
    }
}

function changeWheel()
{
    document.getElementById('image').src="img/wheel.jpg.jpg";
}

function guess()
{
    if (spin === false)
    {
        alert("Please spin the wheel and then guess");
    }
    else
    {
        spin = false;
        myGuess = prompt("What letter would you like to guess?");
        /* for (var j=0; j<=vowels.length; j++)
         {
         if (myGuess === vowels[j])
             {
                 alert("You can't guess a vowel as a consonant!");
                 myGuess = prompt("What letter would you like to guess");
             }
         } */
        for (var i=0; i<=choices.length+1; i++)
        {
            if (myGuess === choices[i])
            {
                alert("You already picked that letter! Guess again");
                myGuess = prompt("What letter would you like to guess?");
                return;
            }
        }
        choices.push(myGuess);
        document.getElementById('guessing').innerHTML="Guessed letters: " + choices + ",   ";
        makeGameBoard(); //display the updated gameboard
        addMoney(); //update money
    }

}

function solve()
{
    var myWordGuess =  prompt("What is your puzzle guess?");
    if (myWordGuess === word)
    {
        if (playerturn === 3)
        {
            player3score = player3score + 2500;
            document.getElementById('player3money').innerHTML = names[2] + "'s money: $" + player3score;
            alert("Congratulations " + names[2] + "! You solved the puzzle!");
            endGameV2();
        }
        else if (playerturn === 2)
        {
            player2score = player2score + 2500;
            document.getElementById('player2money').innerHTML = names[1] + "'s money: $" + player2score;
            alert("Congratulations " + names[1] + "! You solved the puzzle!");
            endGameV2();
        }
        else if (playerturn === 1)
        {
            player1score = player1score + 2500;
            document.getElementById('player1money').innerHTML = names[0] + "'s money: $" + player1score;
            alert("Congratulations " + names[0] + "! You solved the puzzle!");
            endGameV2();
        }
        //gameBoard = word;
        document.getElementById('guessTheWord').innerHTML="Game board: " + gameBoard;
    }
    else
    {
        alert("Sorry, wrong puzzle guess");
        changeTurns();
    }
}

function changeTurns()
{
    if (playerturn === 1)
    {
        playerturn = 2;
        document.getElementById('turn').innerHTML = "Turn of player: " + names[1] + "'s turn";
    }
    else if (playerturn === 2)
    {
        playerturn = 3;
        document.getElementById('turn').innerHTML = "Turn of player: " + names[2] + "'s turn";
    }
    else if (playerturn === 3)
    {
        playerturn = 1;
        document.getElementById('turn').innerHTML = "Turn of player: " + names[0] + "'s turn";
    }
}
/*function vowel()
{
    if (spin === false)
    {
        alert("Please spin the wheel and then guess");
    }
    else
    {
        spin = false;
        myGuess = prompt("What vowel would you like to guess?");
        for (var j=0; j<=vowels.length; j++)
        {
            if (myGuess != vowels[j])
            {
                alert("That's not a vowel! Please guess again!");
                myGuess = prompt("What vowel would you like to guess?");
            }
        }
        for (var i=0; i<=choices.length+1; i++)
        {
            if (myGuess === choices[i])
            {
                alert("You already picked that letter! Guess again");
                myGuess = prompt("What vowel would you like to guess?");
                return;
            }
        }
        if (playerturn === 1)
        {
            player1score = player1score - 250;
        }
        else if (playerturn === 2)
        {
            player2score = player2score - 250;
        }
        else if (playerturn === 3)
        {
            player3score = player3score - 250;
        }
        choices.push(myGuess);
        makeGameBoard(); //display the updated gameboard
        addMoney(); //update money
    }
}
*/