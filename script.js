const generateBtn = document.getElementsByClassName('generate-btn')[0];
const PinDisplay = document.getElementsByClassName('form-control')[0];
const notMatchMsg = document.getElementById('not-match');
const matchedMsg = document.getElementById('matched');
const inputBtns = document.querySelectorAll('.button')
const submitDisplay = document.getElementById('submit-display');
const submitButton = document.getElementsByClassName('submit-btn')[0];
const tryCounter = document.getElementById('try-counter');
const fullContainer = document.getElementsByClassName('container')[0];
let realPin = 0;
let userPin = '';
let matched = false;

//left side generate pic section functionality 
function randomNumber(max, min) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}
function resetAll() {
    notMatchMsg.style.display = 'none';
    matchedMsg.style.display = 'none';
    tryCounter.textContent = 3;
    matched = false;
    clearAll();
}

function generatePinFunc() {
    realPin = randomNumber(9999, 1111);
    PinDisplay.value = realPin;
    resetAll();
}

generateBtn.addEventListener('click', () => generatePinFunc());


//right side user pic functionality 
function numberValue(num) {
    if (tryCounter.textContent == 0) return; //lock display input after 3 try
    if (userPin.length < 4) {
        userPin += num;
        submitDisplay.value = userPin;
    }
}

function clearAll() {
    if (matched == true) return;
    userPin = '';
    submitDisplay.value = '';
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.textContent == 'C') {
        inputBtn.addEventListener('click', () => clearAll());
    }
    else if (inputBtn.textContent == 'del') {
        inputBtn.addEventListener('click', () => {
            if (matched == true) return;
            userPin = userPin.slice(0, -1);
            submitDisplay.value = userPin;
        });
    }
    else {
        inputBtn.addEventListener('click', () => numberValue(inputBtn.textContent));
    }
})

//submit button logic
function checkPin() {
    if (realPin == 0 || userPin.length == 0) return;
    if (realPin === Number(userPin)) {
        matched = true;
        matchedMsg.style.display = 'block';
        matched = true;
    }
    else if (realPin != userPin) {
        let tryNum = Number(tryCounter.textContent);
        tryCounter.textContent = tryNum - 1;
        clearAll();
        if (tryNum == 1) {
            notMatchMsg.style.display = 'block';
            return;
        }
    }
}


submitButton.addEventListener('click', () => checkPin());
