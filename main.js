/** Class for players.@fcom software.
 * @param {string} somebody Player's name.
 * @param {string} cellValue Player's symbol when click cell.
 * @param {string} color Cell color for each player.
 */
class Player {
    constructor(name, cellValue, color) {
        this.name = name;
        this.cellValue = cellValue;
        this.color = color;

    }
}

class GameBoard {
    constructor() {
        this.cells = document.querySelectorAll(".cell");
        this.turnText = document.getElementById("turnText");
        this.scoreText = document.getElementById("scoreText");
        this.player1 = new Player;
        this.player2 = new Player;
        this.activePlayer = this.player1;
        this.winner = new Player;
        this.turnCountForTie = 1;
        this.round = 1;
        this.score = [0, 0];
        this.arrangementNumber = ["Zero", "First", "Scond", "Third", "Fourth", "Fifth"]
        this.cellArray = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]


    }

    setPlayer1(name, cellValue, color) {
        this.player1.name = name;
        this.player1.cellValue = cellValue;
        this.player1.color = color;

    }
    setPlayer2(name, cellValue, color) {
        this.player2.name = name;
        this.player2.cellValue = cellValue;
        this.player2.color = color;
    }

    findPlayer(cellValue) {
        if (this.player1.cellValue === cellValue) {
            return this.player1
        }
        else if (this.player2.cellValue === cellValue) { return this.player2 }
    }
    changePlayer(cellValue) {
        if (this.player1.cellValue === cellValue) {
            return this.player2
        }
        else if (this.player2.cellValue === cellValue) { return this.player1 }
    }
    changeActivePlayer() {
        this.activePlayer = this.changePlayer(this.activePlayer.cellValue)
        this.setActivePlayerText()

    }
    setActivePlayerText() {
        this.turnText.textContent = this.activePlayer.name + " 's Turn !";
        this.turnText.style.color = this.activePlayer.color
    }
    setScoreText() {
        this.scoreText.innerHTML = this.player1.name.fontcolor("red") + " : " + this.score[0] + "  vs  " + this.player2.name.fontcolor("blue") + " : " + this.score[1]

    }
    setScore() {

        if (this.winner.cellValue === this.player1.cellValue) {
            this.score[0] += 1
        }
        else if (this.winner.cellValue === this.player2.cellValue) {
            this.score[1] += 1;
        }
        this.setScoreText()
    }
    checkTripleDone() {
        for (let i = 0; i < this.cellArray.length; i++) {
            if (this.cells[this.cellArray[i][0]].innerText === this.cells[this.cellArray[i][1]].innerText && this.cells[this.cellArray[i][0]].innerText === this.cells[this.cellArray[i][2]].innerText && this.cells[this.cellArray[i][0]].innerText != "") {
                this.winner = this.findPlayer(this.cells[this.cellArray[i][0]].innerText)
                return true;
            }
        }
        return false
    }

    checkTie() {
        if (this.turnCountForTie < 9) {
            this.turnCountForTie++
            return false;
        }
        this.turnText.style.color = "black"
        this.turnText.innerHTML = "Tie." + "<br>" + this.activePlayer.name.fontcolor(this.activePlayer.color) + "'s turn."
        gameBoard.resetDivInnerHTML();
        return true;
    }

    resetDivInnerHTML() {

        this.cells.forEach(cell => cell.textContent = "")
        this.turnCountForTie = 1;
    }


    roundOver() {
        this.turnText.style.color = "black"
        this.turnText.innerHTML = this.arrangementNumber[this.round] + " round's winner " + this.winner.name.fontcolor(this.winner.color) + "." + "<br>" + this.activePlayer.name.fontcolor(this.activePlayer.color) + "'s turn."
        this.round++

    }
    resetValues() {
        this.round = 1;
        this.resetDivInnerHTML()
        this.activePlayer = this.player1;
        this.round = 1;
        this.score = [0, 0];
        this.winner = new Player;
        this.setScoreText();
    }
    gameover() {
        if (this.round == 5 || this.score[0] == 3 || this.score[1] == 3) {

            if (this.score[0] > this.score[1]) {
                alert("Game Over, " + this.player1.name + " Won");
                this.resetValues();
                return true;
            }
            else if (this.score[0] < this.score[1]) {
                alert("Game Over, " + this.player2.name + " Won");
                this.resetValues();
                return true;
            }
        }
        return false;
    }
}

let gameBoard = new GameBoard()
gameBoard.setPlayer1(prompt("First Player Name?").toLocaleUpperCase(), "X", "red");
gameBoard.setPlayer2(prompt("Second Player Name?").toLocaleUpperCase(), "O", "blue");
gameBoard.setActivePlayerText();
gameBoard.setScoreText();
gameBoard.cells.forEach(cell => cell.addEventListener("click", () => handleClick(cell)))
console.log(gameBoard.round)
function handleClick(cell) {
    if (cell.textContent === "") {
        cell.textContent = gameBoard.activePlayer.cellValue;
        cell.style.color = gameBoard.activePlayer.color;
        gameBoard.changeActivePlayer();
        if (gameBoard.checkTripleDone()) {
            gameBoard.setScore();
            if (!gameBoard.gameover()) {
                gameBoard.roundOver();

                gameBoard.resetDivInnerHTML()
            }

        }
        else {
            gameBoard.checkTie()

        }

    }


}


/// For add emoji as player's symbol (not completed code. It shows emojies.)//////////////
// let emojiDiv = document.getElementsByClassName(".emoji"); 
// let emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,   //for add symbol to player
//     0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
//     0x1F431, 0x1F42A, 0x1F439, 0x1F424]; 
// let div=document.createElement("div");
// div.style.borderColor="black";
// div.style.backgroundColor="red";
// div.style.display="grid";
// div.style.gridTemplateColumns= "auto auto auto";
// document.body.appendChild(div);
//  emojis.forEach(emoji => {
//      console.log(emoji)
//     let emodiv=document.createElement("div");
//     emodiv.innerText=String.fromCodePoint(emoji);    /////convert  hex code to emoji.

//     div.appendChild(emodiv);

//  });