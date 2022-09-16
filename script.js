function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '%':
            return divide(a, b);
        default:
            break;
    }
}

function process(pressed) {
    if (pressed == 'CLEAR') {
        display = "";
        operation = {
            first: null,
            operator: null,
            second: null
        }
        opHigh = false;
    } else if (pressed == 'DELETE') {
        if (display == "") {
            return;
        } else {
            display = display.substring(0, display.length - 1);
        }
    } else if (['+', '-', '%', '*'].includes(pressed)) {
        if (operation.operator) {
            operation.second = Number(display);
            operation.first = operate(operation.first, operation.operator, operation.second);
            display = operation.first;
            operation.second = null;
        } else {
            operation.first = Number(display);
        }
        operation.operator = pressed;
        opHigh = true;
        //display = "";
    } else if (pressed == ".") {
        if (opHigh) {
            opHigh = false;
            display = "";
        }
        if (display.includes('.')) {
            return;
        } else if (display == "") {
            display = "0.";
        } else {
            display += pressed;
        }
    } else if (pressed == '=') {
        operation.second = Number(display);
        display = operate(operation.first, operation.operator, operation.second);
        opHigh = false;
    } else {
        if (opHigh) {
            opHigh = false;
            display = "";
        }
        display += pressed;
    }
    document.querySelector('#displayText').innerText = display;
    /*
    if (opHigh) {
        e.target.style.backgroundColor = "rgb(100, 200, 200)";
    } else {
        e.target.style.backgroundColor = "rgb(200, 200, 200)";
    }*/
}

function click(e) {
    let pressed = e.target.innerText;
    process(pressed);
}

function key(e) {
    if (e.key == "Backspace") {
        process('DELETE');
    } else if (acceptableKeys.includes(e.key)) {
        process(e.key)
    }
}

function mouseOver(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 180, 180)";
    } else if (e.target.innerText == "DELETE") {
        e.target.style.backgroundColor = "rgb(180, 180, 255)";
    } else {
        e.target.style.backgroundColor = "rgb(200, 200, 200)";
    }
}

function mouseDown(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 150, 150)";
    } else if (e.target.innerText == "DELETE") {
        e.target.style.backgroundColor = "rgb(150, 150, 255)";
    } else {
        e.target.style.backgroundColor = "rgb(160, 160, 160)";
    }
}

function mouseLeave(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 200, 200)";
    } else if (e.target.innerText == "DELETE") {
        e.target.style.backgroundColor = "rgb(200, 200, 255)";
    } else {
        e.target.style.backgroundColor = "rgb(240, 240, 240)";
    }
}

let display = "";
let operation = {
    first: null,
    operator: null,
    second: null
}
let opHigh = false;

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', click);
    btn.addEventListener('mouseover', mouseOver);
    btn.addEventListener('mousedown', mouseDown);
    btn.addEventListener('mouseup', mouseOver);
    btn.addEventListener('mouseleave', mouseLeave);
});

let acceptableKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '=', '+', '-', '%', '*'];
window.addEventListener('keydown', key);