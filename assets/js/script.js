//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType)
            }
        });

    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer()
        }
    })

    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {

    document.getElementById("answer-box").value = ""
    document.getElementById("answer-box").focus()
    

    //creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25)
    let num2 = Math.floor(Math.random()*25)

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2)
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2)
    } else {
        alert(`Unknown Game Type: ${gameType}`)
        throw `Unknown Game Type: ${gameType}.Aborting!`
    }
}

/**
 * Checks the answer against the first element in the returnedCorrectAnswer function
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value)
    let calculatedAnswer = calculateCorrectAnswer()
    let isCorrect = calculatedAnswer[0] === userAnswer
    if (isCorrect) {
        incrementScore()
    } else {
        incrementWrongAnswer()
    }

    runGame(calculatedAnswer[1])
}
/**
 * Gets the operand and the operator directly from the dom, and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText)
    let operand2 = parseInt(document.getElementById("operand2").innerText)
    let operator = document.getElementById("operator").innerText

    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"]
    } else if (operator === "/") {
        return [Math.round(operand1 / operand2), "division"]
    } else {
        alert(`Unimplemented operator ${operator}`)
        throw `Unimplemented operator ${operator}`
    }
}

function incrementScore() {
    let score = document.getElementById("score")
    let scoreValue = parseInt(score.textContent)
    scoreValue += 1
    score.textContent = scoreValue
}

function incrementWrongAnswer() {
    let wrongAnswerElement = document.getElementById("incorrect")
    let wrongAnswerNumber= parseInt(wrongAnswerElement.textContent)
    wrongAnswerNumber += 1
    wrongAnswerElement.textContent = wrongAnswerNumber
}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1
    document.getElementById("operand2").textContent = operand2
    document.getElementById("operator").textContent = "+"

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1
    document.getElementById("operator").textContent = "-"
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1
    document.getElementById("operand2").textContent = operand2
    document.getElementById("operator").textContent = "x"
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 % 2 == 1 ? ++operand1 : operand1
    document.getElementById("operand2").textContent = operand2 % 2 == 1 ? ++operand2 : operand2
    document.getElementById("operator").textContent = "/"
}