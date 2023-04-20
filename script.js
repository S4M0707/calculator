/* Initializing the main variables */
let var1 = undefined;
let var2 = undefined;
let prevAns = undefined;
let operator = undefined;
let var1Dot = undefined;
let var2Dot = undefined;

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
    var1Dot = undefined;
    var2Dot = undefined;
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
            else if (var1 === undefined) {
                if(prevAns === undefined)
                    break;
                var1 = prevAns;
                prevAns = undefined;
            }
            operator = this.textContent;
            break;
        case 'number':
            if (operator === undefined) {
                if (var1 === undefined) var1 = 0;
                var1 *= 10;
                var1 += parseFloat(this.textContent);
                if(var1Dot !== undefined) {
                    var1Dot++;
                    var1 /= Math.pow(10, var1Dot);
                }
                showAns(var1);
            }
            else {
                if (var2 === undefined) var2 = 0;
                var2 *= 10;
                var2 += parseFloat(this.textContent);
                if(var2Dot !== undefined) {
                    var2Dot++;
                    var2 /= Math.pow(10, var2Dot);
                }
                showAns(var2);
            }
            break;
        case 'equal':
            if (operator === undefined || var1 === undefined || var2 === undefined)
                break;
            const res = operate(operator, var1, var2);
            showAns(res);
            prevAns = res;

            resetData(undefined, undefined, undefined);
            break;
        case 'clear':
            showAns(0);
            resetData(undefined, undefined, undefined);
            break;
        case 'dot':
            if(var2 !== undefined && var2Dot === undefined) {
                var2Dot = 0;
            }
            if(var1 !== undefined && var1Dot === undefined) {
                var1Dot = 0;
            }
            dispAns.textContent = `${dispAns.textContent}.`;
            break;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', buttonMap);
});

const dispAns = document.querySelector('.disp .ans');