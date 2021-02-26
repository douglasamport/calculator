//  TODO
//
//possible improvements  +/- button
//backspace button
//keyboard support


/*******************************/

//arithmatic functions
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a)/Number(b);
// more than 2 arguments
// function add() { return [...arguments].reduce((a, b) => a + b, 0);}
// function multiply() {return [...arguments].reduce((a, b) => a * b, 1);}

function operate(func, a, b) {
    return func(a, b);
}

//working variables 
let total = '';
let workingValue = '';
let valueA = '';
let valueB = '';
let operation = '';
let sumbol = ''

let output = document.querySelector("#output");
let summary = document.querySelector("#summary")

//number key variables and event listeners
let allNumbers = document.querySelectorAll(".number-key")

startNumberListeners()
animateNumKeyOnTap()

function animateNumKeyOnTap() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].addEventListener("click", toggleActive);
    }
}

function startNumberListeners() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].addEventListener("click", numberButtonClick);   
    }
};

function endNumberListeners() {
    for (let i = 0; i < allNumbers.length; i++) {
        allNumbers[i].removeEventListener("click", numberButtonClick)
    }
}

let decimal = document.querySelector("#decimal");
decimal.addEventListener("click" , toggleActive);
decimal.addEventListener("click", numberButtonClick);

//function buttons variables and Event listeners

let allFuncKeys = document.querySelectorAll(".function-key")

animateFuncKeyOnTap()

function animateFuncKeyOnTap() {
    for (let i = 0; i < allFuncKeys.length; i++) {
        allFuncKeys[i].addEventListener("click", toggleActive);
    }
}

let sum = document.querySelector("#add");
sum.addEventListener("click", function() {
    valueB = ''
    valueA = checkValue(valueA, workingValue);
    symbol = '+'
    summary.innerText = `${valueA} ${symbol}`;
    output.innerText = formatDisplay(valueA);
    operation = add;
    workingValue = '';
    decimal.addEventListener("click", numberButtonClick);
    startNumberListeners()
    // console.log(valueA);
    // console.log(workingValue)
});

let difference = document.querySelector("#subtract");
difference.addEventListener("click", function() {
    valueB = ''
    valueA = checkValue(valueA, workingValue);
    symbol = '-'
    summary.innerText = `${valueA} ${symbol}`;
    output.innerText = formatDisplay(valueA);
    operation = subtract;
    workingValue = '';
    decimal.addEventListener("click", numberButtonClick);
    startNumberListeners()
    // console.log(valueA);
    // console.log(workingValue)
});

let product = document.querySelector("#multiply");
product.addEventListener("click", function() {
    valueB = ''
    valueA = checkValue(valueA, workingValue);
    symbol = 'x'
    summary.innerText = `${valueA} ${symbol}`;
    output.innerText = formatDisplay(valueA);
    operation = multiply;
    workingValue = '';
    decimal.addEventListener("click", numberButtonClick);
    startNumberListeners()
    // console.log(valueA);
    // console.log(workingValue)
});

let quotient = document.querySelector("#divide");
quotient.addEventListener("click", function() {
    valueB = '';
    valueA = checkValue(valueA, workingValue);
    symbol = '/'
    summary.innerText = `${valueA} ${symbol}`;
    output.innerText = formatDisplay(valueA);
    operation = divide;
    workingValue = '';
    decimal.addEventListener("click", numberButtonClick);
    startNumberListeners()
    // console.log(valueA);
    // console.log(workingValue)
});

let equals = document.querySelector("#equals");
equals.addEventListener("click", function() {
    if (valueB !== '') {
        valueB = valueB
    }
    else {valueB = workingValue}
    summary.innerText = `${valueA} ${symbol} ${valueB} =`;
    total = decimalCheckAndShift(valueA, valueB);
    output.innerText = formatDisplay(total);
    workingValue = total;
    valueA = '';
    endNumberListeners();
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
    workingValue = '';
    valueA = '';
    valueB = '';
    total = '';
    operation = '';
    output.innerText = '0';
    summary.innerText = '';
    decimal.addEventListener("click", numberButtonClick);
    startNumberListeners();
});

let sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
    if (Math.sign(workingValue) === -1) {
        workingValue = Math.abs(workingValue);
        output.innerText = workingValue
    }
    else if (Math.sign(workingValue)=== 1) {
        workingValue = -Math.abs(workingValue);
        output.innerText = workingValue
    }
    else {
        workingValue = ''
        output.innerText = 0;
    }
});




if (Math.sign(workingValue) === -1) {
    workingValue = Math.abs(workingValue);
}
else if (Math.sign(workingValue)=== 1) {
    workingValue = -Math.abs(workingValue);
}
else {workingValue = workingValue}



//Number Button Function
function numberButtonClick() {
    regEx = /\./
    
    workingValue += this.innerText;
    //console.log(workingValue);
    output.innerText = workingValue;

    if (regEx.test(workingValue)){
        decimal.removeEventListener("click", numberButtonClick)
    }
    if (workingValue.length >= 11) {
        endNumberListeners()
        
    }
};

function toggleActive() {
    this.classList.add("active");
    setTimeout( () => {
        //console.log(this.classList)
        this.classList.remove("active")
        //console.log(this.classList)
    }, 75)

};

function formatDisplay(value) {
    if (value.toString(10).length > 11) {
        if (value > 99999999999 ) {
            console.log(value)
            console.log(value.toString(10).length)
            let e = value.toString(10).length -1
            console.log(e + 'check here')
            let newValue = value / 10**(e)
            console.log(newValue)
            rounded = Math.trunc(newValue * 10**6) / 10**6
            console.log(rounded)
             return value = `${rounded}e${e}`
        }
        else {
            let i = value.toString(10).search(/\./)
            console.log(value + "this is where I print")
            return value.toFixed(11 -i -1)
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
                console.log(a + ' just before conversion')
                a = (a/(10**(2*maxDecimal)))
                return a
            }
            else  {
               return  a /= (10**maxDecimal);
            }
        }
        else {
            if (operation === divide && w === '') {
                w = 1;
            }
            else if (operation === multiply && w === '') {
                w = 1;
            }
            a =  operate(operation, a, w);
        }
        return a
}

function checkValue(a, w) {
    if (a !=='') {
        a = decimalCheckAndShift(a, w);
    }
    else {
        a = w;
    }
    return a;
}
