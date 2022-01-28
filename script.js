const screen = document.querySelector('.screen');
const keyPad = document.querySelector('.keyPad');
const clearButton = document.querySelector('.clearButton')
const powerButtom = document.querySelector('img');

let numbersInputted = [];
let copyOfNumbersInputted = [];
let numbersCondensed = [];
let operationsInputted = [];
let counter = 0;
let dotCounter = 0;
let firstCounter = 0;
let operationsCount = 0;


function elementCreator(num){
    firstCounter = 1;
    if (num == `.`){
        dotCounter++;
    }
    let operations = document.createElement('span');
    operations.classList.add('operations');
    
    operations.textContent = `${num}`;
    
    screen.appendChild(operations);
    counter=0;
    numbersInputted.push(operations.textContent);
}

function operatorCreator(operator){
    if (operator != `=`){
        let command = document.createElement('span');
        command.classList.add('operations');
        command.textContent = `${operator}`;
        operationsInputted.push(command.textContent);
        screen.appendChild(command);
    }
    dotCounter = 0;
 
    counter++;
    copyOfNumbersInputted = numbersInputted.map(element => element);
    numbersCondensed.push(copyOfNumbersInputted.join(''));
    numbersInputted.splice(0,numbersInputted.length);

    let copyOfOperationsInputted = operationsInputted.map(element => element);

    if (operator == `=`){
        for (let i=0; i < (operationsInputted.filter(item => item == `/`).length) + (operationsInputted.filter(item => item == `x`).length); i++){
            let q = operationsInputted.filter(item => {return item == `/` || item == `x`}).indexOf(`/`, i) - i; 
            let z = operationsInputted.filter(item => {return item == `/` || item == `x`}).indexOf(`x`, i) - i;
            if (z == 0){
                numbersCondensed.splice(copyOfOperationsInputted.indexOf(`x`), 2, numbersCondensed[copyOfOperationsInputted.indexOf(`x`)] * numbersCondensed[copyOfOperationsInputted.indexOf(`x`) + 1]);
                copyOfOperationsInputted.splice(copyOfOperationsInputted.indexOf(`x`), 1);
            }
            if (q == 0){
                numbersCondensed.splice(copyOfOperationsInputted.indexOf(`/`), 2, numbersCondensed[copyOfOperationsInputted.indexOf(`/`)] / numbersCondensed[copyOfOperationsInputted.indexOf(`/`) + 1]);
                copyOfOperationsInputted.splice(copyOfOperationsInputted.indexOf(`/`), 1);
            }
        }   
        for (let i=0; i < (operationsInputted.filter(item => item == `-`).length) + (operationsInputted.filter(item => item == `+`).length); i++){

            let q = operationsInputted.filter(item => {return item == '-' || item == '+'}).indexOf(`-`, i) - i; 
            let z = operationsInputted.filter(item => {return item == '-' || item == '+'}).indexOf(`+`, i) - i;
            console.log(numbersCondensed + ' add/sub')
            if (z == 0){
                numbersCondensed.splice(copyOfOperationsInputted.indexOf(`+`), 2, parseFloat(numbersCondensed[copyOfOperationsInputted.indexOf(`+`)]) + parseFloat(numbersCondensed[copyOfOperationsInputted.indexOf(`+`) + 1]));
                copyOfOperationsInputted.splice(copyOfOperationsInputted.indexOf(`+`), 1);
            }
            if (q == 0){
                numbersCondensed.splice(copyOfOperationsInputted.indexOf(`-`), 2, numbersCondensed[copyOfOperationsInputted.indexOf(`-`)] - numbersCondensed[copyOfOperationsInputted.indexOf(`-`) + 1]);
                copyOfOperationsInputted.splice(copyOfOperationsInputted.indexOf(`-`), 1);
            }
        }
        operationsCount++;
        keyPad.removeEventListener('click', displayOnScreen);
        clearButton.addEventListener('click', emptyAll);  
    }
}

function displayOnScreen(ev){
    if (ev.target.classList == "num9"){
        elementCreator(9);
    }
    if (ev.target.classList == "num8"){
        elementCreator(8);
    }
    if (ev.target.classList == "num7"){
        elementCreator(7);
    }
    if (ev.target.classList == "num6"){
        elementCreator(6);
    }
    if (ev.target.classList == "num5"){
        elementCreator(5);
    }
    if (ev.target.classList == "num4"){
        elementCreator(4);
    }
    if (ev.target.classList == "num3"){
        elementCreator(3);
    }
    if (ev.target.classList == "num2"){
        elementCreator(2);
    }
    if (ev.target.classList == "num1"){
        elementCreator(1);
    }
    if (ev.target.classList == "num0"){
        elementCreator(0);
    }
    if (ev.target.classList == "keyDot"){
        if (dotCounter == 0){
            elementCreator(`.`);
        }
    }
    if (ev.target.classList == "keyAdd"){
        if (counter == 0 && firstCounter != 0){
            operatorCreator(`+`);
        }
    }
    if (ev.target.classList == "keyDiv"){
        if (counter == 0 && firstCounter !=0){
            operatorCreator(`/`);
        }
    }
    if (ev.target.classList == "keySub"){
        if (counter == 0 && firstCounter !=0){
            operatorCreator(`-`);
        }
    }
    if (ev.target.classList == "keyMult"){
        if (counter == 0 && firstCounter !=0){
            operatorCreator(`x`);
        }
    }

    if (ev.target.classList == "keyEquals"){
        operatorCreator(`=`);
        let result = document.createElement('span');
        result.classList.add('result');
        result.textContent = numbersCondensed;
        screen.appendChild(result);
    }
}

function emptyAll(){
    numbersCondensed = [];
    numbersInputted = [];
    copyOfNumbersInputted = [];
    operationsInputted = [];
    counter = 0;
    dotCounter = 0;
    firstCounter = 0;
    document.querySelectorAll('.operations').forEach(function(e){
        e.textContent = '';
    });
    document.querySelectorAll('.result').forEach(function(e){
        e.textContent = '';
    });
    keyPad.addEventListener('click', displayOnScreen);
    
}
const numClick = keyPad.addEventListener('click', displayOnScreen);
clearButton.addEventListener('click', emptyAll);  