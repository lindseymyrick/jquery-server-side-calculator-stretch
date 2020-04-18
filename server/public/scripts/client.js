$(document).ready(onReady); 

let currentOperator; 

function onReady () {
    console.log('JQuery working!');
    $('#submitButton').on ('click', sendMath); 
    $('#additionButton').on('click', createAddition); 
    $('#subtractionButton').on('click', createSubtraction); 
    $('#multiplicationButton').on('click', createMultiplication); 
    $('#divisionButton').on('click', createDivision); 
    $('#deleteButton').on('click', clearInputs); 
    getHistory(); 
    //getCorrectAnswer(); 
}

function clearInputs() {
    $('#firstNumberInput').val('');
    $('#secondNumberInput').val('');
    currentOperator = '';
}


function createAddition(){
    console.log('in createAddition');
    currentOperator = '+'; 
    
}

function createSubtraction(){
    console.log('in createSub');
    currentOperator = '-'; 
    
}

function createMultiplication() {
    console.log('in createMult');
    currentOperator = '*';
   
}

function createDivision() {
    console.log('in createDiv');
    currentOperator = '/';
    
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
            el.append(`<li>  ${response[i].numberOne}  ${response[i].operator}  ${response[i].numberTwo}  ${response[i].equal}  ${response[i].output}</li>`); 
        }
     }).catch(function(err){
        alert('error getting history. see console for details'); 
         console.log(err); 
     }) //end GET request 
        
    } //end getHistory

function sendMath(){
    console.log('in sendMath');
    let mathToSend = {
        numberOne: $('#firstNumberInput').val(),
        operator: currentOperator,
        numberTwo: $('#secondNumberInput').val(),
        equal: '=',
    }
    console.log('mathToSend is:', mathToSend);

    //alert if the math operation is incomplete
    if (mathToSend.numberOne === '' || mathToSend.operator === ''|| mathToSend.numberTwo == '' ) {
        alert('Your math operation is incomplete!')
    } else (

    //send to server via AJAX POST
    $.ajax({
        type: 'POST',
        url: '/history',
        data: mathToSend
    }).then( function(response){
        console.log('back from POST Stretch', response);
        getHistory(); 
        getCorrectAnswer(); 
        $('#firstNumberInput').val(''); 
        $('#secondNumberInput').val(''); 
        currentOperator = ''; 
    }).catch(function(err) {
        alert('error getting history. see console for details');
        console.log(err);
        
    }) //end AJAX
    )
    
    
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
