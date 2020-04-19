$(document).ready(onReady); 

//let currentOperator; 
let mathExpressionArray = []; 

function onReady () {
    console.log('JQuery working!');
    $('#submitButton').on ('click', sendMath); 
    $('#additionButton').on('click', createAddition); 
    $('#subtractionButton').on('click', createSubtraction); 
    $('#multiplicationButton').on('click', createMultiplication); 
    $('#divisionButton').on('click', createDivision); 
    $('#deleteButton').on('click', clearInputs); 
    $('#oneButton').on('click', oneFunction);
    $('#twoButton').on('click', twoFunction);
    $('#threeButton').on('click', threeFunction);
    $('#fourButton').on('click', fourFunction);
    $('#fiveButton').on('click', fiveFunction);
    $('#sixButton').on('click', sixFunction);
    $('#sevenButton').on('click', sevenFunction);
    $('#eightButton').on('click', eightFunction);
    $('#nineButton').on('click', nineFunction);
    $('#zeroButton').on('click', zeroFunction);
   // $('#decimalButton').on('click', decimalFunction);
     getHistory(); 
    //getCorrectAnswer(); 
}

function zeroFunction() {
    console.log('in oneFunction');

    mathExpressionArray.push('0');
    $('#mathRepresentation').append('0'); 
}

function oneFunction () {
    console.log('in oneFunction');
    
    mathExpressionArray.push('1');
    $('#mathRepresentation').append('1'); 
}

function twoFunction() {
    console.log('in twoFunction');
    mathExpressionArray.push('2');
    $('#mathRepresentation').append('2'); 
}

function threeFunction() {
    mathExpressionArray.push('3');
    console.log('in threeFunction');
    $('#mathRepresentation').append('3'); 

}

function fourFunction() {
    mathExpressionArray.push('4');
    console.log('in fourFunction');
    $('#mathRepresentation').append('4'); 
}

function fiveFunction() {
    mathExpressionArray.push('5');
    $('#mathRepresentation').append('5'); 
}

function sixFunction() {
    mathExpressionArray.push('6');
    $('#mathRepresentation').append('6'); 
}

function sevenFunction() {
    mathExpressionArray.push('7');
    $('#mathRepresentation').append('7'); 
}

function eightFunction() {
    mathExpressionArray.push('8');
    $('#mathRepresentation').append('8'); 
}

function nineFunction() {
    mathExpressionArray.push('9');
    $('#mathRepresentation').append('9'); 
}
function clearInputs() {
   mathExpressionArray = []; 
   $('#mathRepresentation').html(''); 
}


function createAddition(){
    console.log('in createAddition');
    mathExpressionArray.push('+');
    $('#mathRepresentation').append('+'); 
    
}

function createSubtraction(){
    console.log('in createSub');
    mathExpressionArray.push('-');
    $('#mathRepresentation').append('-'); 
    
}

function createMultiplication() {
    console.log('in createMult');
    mathExpressionArray.push('*');
    $('#mathRepresentation').append('*'); 
   
}

function createDivision() {
    console.log('in createDiv');
    mathExpressionArray.push('/');
    $('#mathRepresentation').append('/'); 
    
}

function getHistory(){
    console.log('in getHistory');

    //ajax get call
     $.ajax({
        type: 'GET', 
         url: '/history'
     }).then(function(response){
         //empty output element
         let el = $('#historyList'); 
         el.empty(); 
         //loop through response
        for(let i=0; i < response.length; i++) {
            //display each item on DOM
            el.append(`<li>  ${response[i].keyOne}  ${response[i].keyTwo}  ${response[i].keyThree} ${response[i].keyFour} ${response[i].keyFive} </li>`); 
        }
     }).catch(function(err){
        alert('error getting history. see console for details'); 
         console.log(err); 
     }) //end GET request 
        
    } //end getHistory

function sendMath(){
    console.log('in sendMath');
    $('#mathRepresentation').html(''); 
    
    let mathToSend = {
        keyOne: mathExpressionArray[0], 
        keyTwo: mathExpressionArray[1], 
        keyThree: mathExpressionArray[2],
    }
    console.log('mathToSend is:', mathToSend);
    

    //send to server via AJAX POST
    $.ajax({
        type: 'POST',
        url: '/history',
        data: mathToSend
    }).then( function(response){
        mathExpressionArray = []; 
        console.log('back from POST Stretch', response);
         getHistory();  
        getCorrectAnswer(); 
        $('#firstNumberInput').val(''); 
        $('#secondNumberInput').val(''); 
        // currentOperator = ''; 
    }).catch(function(err) {
        alert('error getting history. see console for details');
        console.log(err);
        
    }) //end AJAX
}
    
    


function getCorrectAnswer(){
    $.ajax({
        type: 'GET',
        url: '/answer'
    }).then(function (response) {
        console.log('this is the answer STRETCH:', response);
        el = $('#correctAnswer'); 
        el.empty(); 
        el.append(`${response.answer}`); 
        
    }).catch(function(err){
        alert('error getting answer. see console for details');
        console.log(err); 
    }) //end GET request 

    

    }


console.log('JS running!');

//unused code 
// let mathToSend = {
//     equation: $('#mathRepresentation').val(),
// }