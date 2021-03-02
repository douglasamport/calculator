//TODO
//1. combine keydown events for active class & input.


/*******************************/

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a)/Number(b);
const operate = (func, a, b) => func(a, b)

let total = '';
let workingValue = '';
let valueA = '';
let valueB = '';
let operation = '';
let symbol = ''

const output = document.querySelector("#output");
const summary = document.querySelector("#summary")

//Keyboard support for data entry
startKeyboardNumberListener();
startKeyboardFuncListener();

document.addEventListener('keydown', keyboardToggleActive)
document.addEventListener('keyup', keyboardToggleActive)

function keyboardToggleActive(e) {
    let thisValue;
        switch (e.key) {
            case '1':
                thisValue = 'one';
                break;
            case '2':
                thisValue = 'two';
                break;
            case '3':
                thisValue = 'three';
                break;
            case '4':
                thisValue = 'four';
                break;
            case '5':
                thisValue = 'five';
                break;
            case '6':
                thisValue = 'six';
                break;
            case '7':
                thisValue = 'seven';
                break;
            case '8':
                thisValue = 'eight';
                break;
            case '9':
                thisValue = 'nine';
                break;
            case '0':
                thisValue = 'zero';
                break;
            case '+':
                thisValue = 'add';
                break;
            case '-':
                thisValue = 'subtract';
                break;
            case '*':
                thisValue = 'multiply';
                break;
            case '/':
                    thisValue = 'divide';
                    break;
            case '=': 
                thisValue = 'equals';
                break;
            case 'Enter':
                thisValue = 'equals';
                break;
            case 'Backspace':
                thisValue = 'del';
                break;
            default:
                return;
                break;
    }
    let item = document.querySelector(`#${thisValue}`);
    item.classList.toggle('active');
}

function startKeyboardNumberListener() {
document.addEventListener("keydown", keyDownNumHandler);
};

function keyDownNumHandler(e) {
    if (e.key >= 0 || e.key<= 9) {
        keyboardNumberInput(e.key)
    }
};

function startKeyboardFuncListener () {
document.addEventListener('keydown', keyDownFuncHandler);
};

function keyDownFuncHandler(e) {
    let regEx = /\./;
    if (e.key === '+') {
        sumFunction();
    }
    else if (e.key === '-') {
        differenceFunction();
    }
    else if (e.key === '*') {
        productFunction();
    }
    else if (e.key === '/') {
        quotientFunction();
    }
    else if (e.key === '=' || e.key === 'Enter') {
        equalsFunction();
    }
    else if (e.key === 'Backspace') {
        deleteFunction();
    }
    else if (!regEx.test(workingValue) && e.key === '.') {
        
        keyboardNumberInput(e.key);
    }
}

function keyboardNumberInput(value) {
    let regEx = /\./
    workingValue += value
    output.innerText = workingValue;
    if (regEx.test(workingValue)){
        decimal.removeEventListener("click", clickNumberInput)
    }
    if (workingValue.length >= 11) {
        endNumberListeners()
        endKeyboardNumberListener()   
    }
};

function endKeyboardNumberListener() {
    document.removeEventListener("keydown", keyDownNumHandler)
}

//number key variables and event listeners
let allNumbers = document.querySelectorAll(".number-key")

startNumberListeners()

function startNumberListeners() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].addEventListener("click", clickNumberInput);   
    }
};

//declared num keys seperately to limit number length
animateNumKeyOnTap()

function animateNumKeyOnTap() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].addEventListener("click", toggleActiveClass);
    }
}

//declared seperately to limit usage per number
let decimal = document.querySelector("#decimal");
decimal.addEventListener("click" , toggleActiveClass);
decimal.addEventListener("click", clickNumberInput);

//function Key Animation
let allFuncKeys = document.querySelectorAll(".function-key")

animateFuncKeyOnTap()

function animateFuncKeyOnTap() {
    for (let i = 0; i < allFuncKeys.length; i++) {
        allFuncKeys[i].addEventListener("click", toggleActiveClass);
    }
}

//function keys
function clearPartial() {
    valueB = '';
    total = '';
    valueA = combineValues(valueA, workingValue);
    summary.innerText = `${valueA} ${symbol}`;
    output.innerText = '';

}
function resetPartial() {
    workingValue = '';
    decimal.addEventListener("click", clickNumberInput);
    startNumberListeners()
    startKeyboardNumberListener()

}

let sum = document.querySelector("#add");
sum.addEventListener("click", sumFunction);

function sumFunction() {
    symbol = '+';
    clearPartial();
    operation = add;
    resetPartial();
};

let difference = document.querySelector("#subtract");
difference.addEventListener("click", differenceFunction);

function differenceFunction() {
    symbol = '-';
    clearPartial();
    operation = subtract;
    resetPartial();
};

let product = document.querySelector("#multiply");
product.addEventListener("click", productFunction);

function productFunction() {
    symbol = 'x';
    clearPartial();
    operation = multiply;
    resetPartial();
};

let quotient = document.querySelector("#divide");
quotient.addEventListener("click", quotientFunction);

function quotientFunction() {
    symbol = '/';
    clearPartial();
    operation = divide;
    resetPartial();
};

let equals = document.querySelector("#equals");
equals.addEventListener("click", equalsFunction)

function equalsFunction() {
    if (valueB !== '') {
        valueB = valueB
    }
    else {valueB = workingValue}
    summary.innerText = `${valueA} ${symbol} ${valueB} =`;
    total = decimalCheckAndShift(valueA, valueB);
    output.innerText = formatDisplay(total);
    workingValue = '' ;
    valueA = total;
    endNumberListeners();
    endKeyboardNumberListener()
};

let clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
    workingValue = '';
    valueA = '';
    valueB = '';
    total = '';
    operation = '';
    symbol = ''
    output.innerText = '0';
    summary.innerText = '';
    decimal.addEventListener("click", clickNumberInput);
    startNumberListeners();
    startKeyboardNumberListener();
});

let sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
    if (valueA !== '' && valueA === total) {
        total = convertOppositeSign(total)
        valueA = convertOppositeSign(valueA);
        summary.innerText = `${valueA} ${symbol} ${valueB} =`;
    }
    else {
       workingValue =  convertOppositeSign(workingValue)
       output.innerValue = workingValue;
    }
});

function convertOppositeSign(value) {
    if (Math.sign(value) === -1) {
        value = Math.abs(value);
        output.innerText = value;
        return value
    }
    else if (Math.sign(value)=== 1) {
        value = -Math.abs(value);
        output.innerText = value
        return value
    }
}

let del = document.querySelector("#del");
del.addEventListener("click", deleteFunction)

function deleteFunction() {
    if (workingValue !== '') {
        workingValue = workingValue.slice(0, (workingValue.length-1));
        if (workingValue === '') {output.innerText = 0; return}
        output.innerText = workingValue;
    }
    startNumberListeners();
    startKeyboardNumberListener();
};



//Number Button Function - turns off number at length 11
function clickNumberInput() {
    regEx = /\./
    workingValue += this.innerText
    output.innerText = workingValue;
    if (regEx.test(workingValue)){
        decimal.removeEventListener("click", clickNumberInput)
    }
    if (workingValue.length >= 11) {
        endNumberListeners()
        
    }
};

function endNumberListeners() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].removeEventListener("click", clickNumberInput)
    }
}


function toggleActiveClass() {
    this.classList.add("active");
    setTimeout( () => {
        this.classList.remove("active")
    }, 75)

};

function formatDisplay(value) {
    if (value.toString(10).length > 11) {
        if (value > 99999999999 ) {
            let e = value.toString(10).length -1;
            let newValue = value / 10**(e);
            rounded = Math.trunc(newValue * 10**6) / 10**6;
             return value = `${rounded}e${e}`;
        }
        else {
            let i = value.toString(10).search(/\./);
            return value.toFixed(11 -i -1);
        }    
    }
    else {return value}
}

function decimalCheckAndShift(a, w) {
    //a is for valueA and w is workingValue or valueB in the equals function
    let regEx = /\./
        if (regEx.test(a) || regEx.test(w) ) {
            //check for multiply or divide against ''
            if (operation === divide && w === '') {
                w = 1;
            }
            else if (operation === multiply && w === '') {
                w = 1;
            }
//get the minimum number of zeros needed to convert the decimals to integars
            let arr = [a.toString(10), w.toString(10)]
                      .filter(a => regEx.test(a))
                      .map(a => a.length - a.search(regEx) -1);
            let maxDecimal = Math.max(...arr); 
//convert both numbers to integars
            a *= Math.pow(10, maxDecimal);
            w *= Math.pow(10, maxDecimal);
//perform the desired operation
            a = operate(operation, a, w);
//and return the decimal to the correct place
                if (operation === divide) {
                    return a;
                }
                else if (operation === multiply) {
                    a = (a/(10**(2*maxDecimal)))
                    return a
                }
                else  {
                 a /= (10**maxDecimal);
                }
            }
            else {
                if (operation === divide && w === '') {
                    w = 1;
                }
                else if (operation === multiply && w === ''){ 
                    w = 1;
                }
                else {a =  operate(operation, a, w);}
                
                }
        return a
}

function combineValues(a, w) {
    if (a !=='') {
        a = decimalCheckAndShift(a, w);
    }
    else {
        a = w;
    }
    return a;
}
