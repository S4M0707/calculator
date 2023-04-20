/* Initializing the main variables */
let var1 = undefined;
let var2 = undefined;
let prevAns = undefined;
let operator = undefined;
let var1Dot = undefined;
let var2Dot = undefined;
let currentPos = undefined;

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

function operate(op, a, b) {

    let soln;

    switch (op) {

        case '+':
            soln = add(a, b);
            break;

        case '-':
            soln = subtract(a, b);
            break;

        case '*':
            soln = multiply(a, b);
            break;

        case '/':
            soln = divide(a, b);
            break;

    }

    return soln;
}

function resetData() {

    var1 = undefined;
    var2 = undefined;
    operator = undefined;
    var1Dot = undefined;
    var2Dot = undefined;
    currentPos = undefined;
}

function buttonMap(e) {

    console.log(this);

    const buttonClass = this.className;

    switch (buttonClass) {

        case 'operator':

            if (currentPos === undefined) {
                if (prevAns === undefined)
                    break;

                var1 = prevAns;
                prevAns = undefined;
                operator = this.textContent;
            }

            else if (currentPos === 'var1') {
                operator = this.textContent;
                var1Dot = undefined;
            }

            // else if (currentPos === 'operator')

            else if (currentPos === 'var2') {
                var1 = operate(operator, var1, var2);
                var2 = undefined;
                var2Dot = undefined;
            }

            currentPos = 'operator';
            break;

        case 'number':

            if (currentPos === undefined) {

                var1 = parseInt(this.textContent);
                currentPos = 'var1';
                dispAns.textContent = `${var1}`;
            }

            else if (currentPos === 'var1') {

                if (var1Dot !== undefined) {
                    var1Dot++;
                    const power = Math.pow(10, var1Dot);
                    var1 *= power;
                    var1 += parseInt(this.textContent);
                    var1 = Math.round(var1) / power;
                }
                else {
                    var1 *= 10;
                    var1 += parseInt(this.textContent);
                }

                currentPos = 'var1';
                dispAns.textContent = `${var1}`;
            }

            else if (currentPos === 'operator') {

                var2 = parseInt(this.textContent);
                currentPos = 'var2';
                dispAns.textContent = `${var2}`;
            }

            else if (currentPos === 'var2') {

                if (var2Dot !== undefined) {
                    var2Dot++;
                    const power = Math.pow(10, var2Dot);
                    var2 *= power;
                    var2 += parseInt(this.textContent);
                    var2 = Math.round(var2) / power;
                }
                else {
                    var2 *= 10;
                    var2 += parseInt(this.textContent);
                }

                currentPos = 'var2';
                dispAns.textContent = `${var2}`;
            }

            break;

        case 'equal':

            if (currentPos != 'var2')
                break;

            const res = operate(operator, var1, var2);
            prevAns = res;
            dispAns.textContent = `${res}`;

            resetData();
            break;

        case 'clear':

            dispAns.textContent = `${0}`;
            resetData();
            break;

        case 'dot':

            if (currentPos === undefined) {
                var1 = 0;
                var1Dot = 0;
                currentPos = 'var1';
                dispAns.textContent = `0.`;
            }

            else if (currentPos === 'var1') {
                if (var1Dot === undefined) var1Dot = 0;
                dispAns.textContent = `${dispAns.textContent}.`;
            }

            else if (currentPos === 'operator') {
                var2 = 0;
                var2Dot = 0;
                currentPos = 'var2';
            }

            else if (currentPos === 'var2') {
                if (var2Dot === undefined) var2Dot = 0;
                dispAns.textContent = `0.`;
            }

            break;
        case 'del':

            if (currentPos === undefined) {
                break;
            }

            else if (currentPos === 'var1') {

                if (var1 === 0) {
                    resetData();
                    break;
                }

                if (var1Dot !== undefined) {
                    var1 *= Math.pow(10, var1Dot);
                    var1 = Math.floor(var1 / 10);
                    var1Dot--;
                    var1 /= Math.pow(10, var1Dot);
                    if (var1Dot === 0) var1Dot = undefined;
                }
                else {
                    var1 /= 10;
                    var1 = Math.floor(var1);
                }
                dispAns.textContent = `${var1}`;
            }

            else if (currentPos === 'operator') {
                operator = undefined;
                currentPos = 'var1';
            }

            else if (currentPos === 'var2') {

                if (var2 === 0) {
                    var2 = undefined;
                    var2Dot = undefined;
                    currentPos = 'operator';
                    break;
                }

                if (var2Dot !== undefined) {
                    var2 *= Math.pow(10, var2Dot);
                    var2 = Math.floor(var2 / 10);
                    var2Dot--;
                    var2 /= Math.pow(10, var2Dot);
                    if (var2Dot === 0) var2Dot = undefined;
                }
                else {
                    var2 /= 10;
                    var2 = Math.floor(var2);
                }
                dispAns.textContent = `${var2}`;
            }

            break;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonMap);
});

const dispAns = document.querySelector('.disp .ans');