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

function operate(operator, a, b) {

    let soln;
    switch(operator) {
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
}