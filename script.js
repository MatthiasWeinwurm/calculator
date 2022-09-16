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
        case '/':
            return divide(a, b);
        default:
            break;
    }
}

function click(e) {
    let pressed = e.target.innerText;
    if (pressed == 'CLEAR') {
        display = "";
        operation = {
            first: null,
            operator: null,
            second: null
        }
    } else if (['+', '-', '%', '*'].includes(pressed)) {
        if (operation.operator) {
            operation.second = Number(display);
            console.log(operation);
            console.log(operate(operation.first, operation.operator, operation.second));
            operation.first = operate(operation.first, operation.operator, operation.second);
            operation.second = null;
        } else {
            operation.first = Number(display);
        }
        operation.operator = pressed;
        display = "";
    } else if (pressed == ".") {
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
    } else {
        display += pressed;
    }
    document.querySelector('#displayText').innerText = display;
    console.log(operation);
}

function mouseOver(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 180, 180)";
    } else {
        e.target.style.backgroundColor = "rgb(200, 200, 200)";
    }
}

function mouseDown(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 150, 150)";
    } else {
        e.target.style.backgroundColor = "rgb(160, 160, 160)";
    }
}

function mouseLeave(e) {
    if (e.target.innerText == "CLEAR") {
        e.target.style.backgroundColor = "rgb(255, 200, 200)";
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

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', click);
    btn.addEventListener('mouseover', mouseOver);
    btn.addEventListener('mousedown', mouseDown);
    btn.addEventListener('mouseup', mouseOver);
    btn.addEventListener('mouseleave', mouseLeave);
})