/* Initializing the main variables */
let var1 = undefined;
let var2 = undefined;
// let prevAns = 0;
let operator = undefined;

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

function resetData(v1, v2, op) {
    var1 = v1;
    var2 = v2;
    operator = op;
}

function showAns(res) {
    dispAns.textContent = `${res}`;
}

function buttonMap(e) {
    console.log(this);
    const buttonClass = this.className;

    switch (buttonClass) {
        case 'operator':
            if (var2 !== undefined) {
                var1 = operate(operator, var1, var2);
                var2 = undefined;
            }
            else if (var1 === undefined)
                break;
            operator = this.textContent;
            break;
        case 'number':
            if (operator === undefined) {
                if (var1 === undefined) var1 = 0;
                var1 *= 10;
                var1 += parseFloat(this.textContent);
                showAns(var1);
            }
            else {
                if (var2 === undefined) var2 = 0;
                var2 *= 10;
                var2 += parseFloat(this.textContent);
                showAns(var2);
            }
            break;
        case 'equal':
            if (operator === undefined || var1 === undefined || var2 === undefined)
                break;
            const res = operate(operator, var1, var2);
            showAns(res);

            resetData(undefined, undefined, undefined);
            break;
        case 'clear':
            showAns(0);
            resetData(undefined, undefined, undefined);
            break;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonMap);
});

const dispAns = document.querySelector('.disp .ans');