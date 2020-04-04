function eval() {
    // Do not use eval!!!
}

function expressionCalculator(expr) {
    let inputArray = expr.split('');
    validationArray(inputArray);
    let numbArray = numberArray(inputArray);

    numbArray.push(')');
    numbArray.unshift('(')
    let arr = [];
    let x = 0;
    console.log(numbArray);
    for (let i = 0; numbArray.length > 1; i++) {
        if (numbArray[i] === ')') {
            let j = i - 1;
            while (numbArray[j] !== '(') {
                j--;
            }
            arr = numbArray.splice(j + 1, i - j - 1)
            x = noBracketsCalculator(arr);
            numbArray.splice(j, 2, x);
            i = 1;
            console.log(arr);
        }
    }

    return numbArray[0];
}

function noBracketsCalculator(numbArray) {
    let x = 0;
    let y = 0;
    let operator = '';

    x = numbArray[0];

    for (let i = 1; i < numbArray.length; i++) {
        if (/[\-\+]/.test(numbArray[i]) && numbArray[i].length == 1 ) {
            if (operator == '') {
                operator = numbArray[i];
                y = numbArray[i + 1];
            } else {
                x = basicCalculator(x, y, operator);
                operator = numbArray[i];
                y = numbArray[i + 1];
            }
        }
        if (/[\*\/]/.test(numbArray[i])) {
            if (operator == '') {
                x = basicCalculator(x, numbArray[i + 1], numbArray[i]);
                console.log(x);
                console.log(numbArray[i + 1]);
                console.log(numbArray[i]);
            } else {
                y = basicCalculator(y, numbArray[i + 1], numbArray[i]);
                console.log(x);
                console.log(numbArray[i + 1]);
                console.log(numbArray[i]);
            }
        }
    }
    if (operator != '') {
        x = basicCalculator(x, y, operator);
    }

    return x;
}

function numberArray(inputArray) {
    let accum = '';
    let numbArray = [];
    inputArray.forEach(element => {
        if (/[0-9]/.test(element)) {
            accum += element;
        }
        if (/[\/\*\-\+()]/.test(element)) {
            if (accum != '') {
                numbArray.push(Number(accum));
                accum = '';
            }
            numbArray.push(element);
        }
    });
    if (accum != '') {
        numbArray.push(Number(accum));
    }
    return numbArray;
}

function basicCalculator(x, y, operator) {
    if (operator == '/' && y == 0) {
        throw new Error("TypeError: Division by zero.")
    }
    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
    }
}

function validationArray(inputArray) {
    let x = 0;
    let y = 0;
    inputArray.forEach(element => {
        if (element == '(') {
            x++;
        } else if (element == ')') {
            y++;
        }
    });
    if (x != y) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}


module.exports = {
    expressionCalculator
}