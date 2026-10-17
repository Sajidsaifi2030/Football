const attacker = document.getElementById("attacker");
const defender = document.getElementById("defender");
const passer = document.getElementById("passer");
const ball = document.getElementById("ball");
const line = document.getElementById("line");

const attackerRange = document.getElementById("attackerRange");
const defenderRange = document.getElementById("defenderRange");
const ballRange = document.getElementById("ballRange");

const result = document.getElementById("result");
const turn = document.getElementById("turn");

let scores = [0,0];
let currentPlayer = 1;
let roundChecked = false;

function place(element,x,y = 50) {
    element.style.left = x+"%";
    element.style.top = y+"%";
}

function updatePitch() {
    const a = Number(attackerRange.value);
    const d = Number(defenderRange.value);
    const b = Number(ballRange.value);

    place(attacker,a);
    place(defender,d);
    place(passer,12);
    place(ball,b);

    const offsideLine = Math.max(d,b);
    line.style.left = offsideLine + "%";
}

attackerRange.addEventListener("input",updatePitch);
defenderRange.addEventListener("input",updatePitch);
ballRange.addEventListener("input",updatePitch);

document.getElementById("checkBtn").addEventListener("click",() => {
    if (roundChecked) {
        result.textContent="Click Next Round to Continue !!!";
        return;
    }
    
    const a = Number(attackerRange.value);
    const d = Number(defenderRange.value);
    const b = Number(ballRange.value);

    const isOffside = a>Math.max(d,b);

    if (isOffside) {
        result.textContent="-------OFFSIDE! Attacker is beyond the ball and defender.";
    } else {
        result.textContent="-------ONSIDE! Attacker is level with or behind the offside line.";
    }

    //Player 1 earns a point for an offside setup.
    //Player 2 earns a point for an onside setup.

    if(currentPlayer === 1 && !isOffside) {
        scores[0]++;
    } else if (currentPlayer === 2 && !isOffside) {
        scores[1]++;
    }

    document.getElementById("score1").textContent=scores[0];
    document.getElementById("score2").textContent=scores[1];

    roundChecked = true;
});

 document.getElementById("nextBtn").addEventListener("click",() => {
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    turn.textContent = "Player" + currentPlayer + "'s Turn";
    roundChecked = false;

    attackerRange.value = 65;
    defenderRange.value = 58;
    ballRange.value = 50;

    updatePitch();

    result.textContent = "Player" + currentPlayer + ": set the positions and check the result";
});

document.getElementById("resetBtn").addEventListener("click",() => {
    scores = [0,0];
    currentPlayer = 1;
    roundChecked = false;

    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";

    turn.textContent = "Player 1's Turn";

    attackerRange.value = 65;
    defenderRange.value = 58;
    ballRange.value = 50;

    updatePitch();
    result.textContent = "Game reset! Player 1 starts.";
});

updatePitch();