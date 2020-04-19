//requires
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 

//uses 
app.use(express.static('server/public')); 
app.use(bodyParser.urlencoded({extended: true})); 

//globals
const port = 5000; 
let history = []; 
let answer; 
let answerArray = []; 

//spin up server
app.listen(port, () => {    
    console.log('server up', port);
    
})

//get request for history
app.get('/history', (req, res) => {
    console.log('in /history GET');
    res.send(history);
    console.log('this is history STRETCH', history);
    
}) //end history GET 

//get request for correct answer 
app.get('/answer', (req, res) => {
    console.log('in /answer GET');
    res.send({answer});
    console.log('this is answer STRETCH', answer);
}) //end answer GET

//post request for latest calculation 
app.post('/history', (req, res) => {
    console.log('in history POST', req.body);
    history.unshift(req.body);
    history[0].keyFour = '='; 
    console.log('this is the full history array:', history);
    
    computeNumbers(); 
   res.sendStatus(201); 
}) //end history POST

function computeNumbers() {
    console.log('number One:', history[0].numberOne);
    console.log('operator', history[0].operator);
    console.log('numberTwo', history[0].numberTwo);
    
//conditional for math logic 
    if(history[0].keyTwo === '+'){
        answer = parseInt(history[0].keyOne) + parseInt(history[0].keyThree); 
        
    } else if (history[0].keyTwo === '-') {
        answer = parseInt(history[0].keyOne) - parseInt(history[0].keyThree); 
        
        
    } else if (history[0].keyTwo === '*'){
        answer = parseInt(history[0].keyOne) * parseInt(history[0].keyThree); 
        
        
    } else if (history[0].keyTwo === '/' ) {
        answer = parseInt(history[0].keyOne) / parseInt(history[0].keyThree); 
        
    }

    console.log('answer is:', answer);

    //add key for answer 
    history[0].keyFive = answer; 
    
    console.log('FINAL ANSWER', answer);
    

    
    
}