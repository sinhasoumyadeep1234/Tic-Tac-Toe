let greet=prompt("Enter your name to start playing");
document.getElementById("player").innerText=`Hello ${greet} !! `
console.log("Welcome to MyTicTacToe")
let music=new Audio("main bgm.mp3")
let audioTurn=new Audio("ting.mp3")
let gameover=new Audio("gameOver.wav")

let isgameover = false;
let turn="X"

// bg music//
music.play()

// function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X" //if turn===x then return 0 else turn===0 thus return x
}
// Function to check for a win//
const checkWin=()=>{
    // first acquire all the span boxes as an array of html collection
    let boxtext=document.getElementsByClassName('boxtext');
    // create an array of all possible wining combination
    let wins=[
        // the 1st 3 items in each list represents the spans and the last 3 items represents transform x,transform y and roatate by degree values..//
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ]
    // Now apply for each loop and use logic to compare
    // boxtext[e[0]].innertext: e[0]=[0,1,2] boxtext[0,1,2]= span0,span1,span2 as boxtext is an html collection of spans having classname boxtext..then boxtext[e[0]].innertext means span0 innertext is === to span1's inner text[XX] then span 2's of innnertext is equal to span1's innertext[XX] and we also need to check that span0's box is not epmty because in first situation when our all boxes are empty we will get winning message..
    // As we have used for each loop in our next iteration it will check for [3,4,5] next [6,7,8] etc... like this all our conditions will get checked and winner will be announced..
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText) && (boxtext[e[2]].innerText===boxtext[e[1]].innerText) && (boxtext[e[0]].innerText!='')){
        // display the winner
            document.querySelector('.info').innerText=boxtext[e[0]].innerText+" Won "  
        isgameover=true;
        music.pause();
        // play the winning bgm
        gameover.play();
        // make the winner image appear
        document.querySelector('.imageBox').getElementsByTagName('img')[0].style.width="300px"
        // make the line visible where the player won initial width of line was 0
        document.querySelector('.line').style.width="20vw"
        // rotate/place the line as per the list defined in array wins//
        document.querySelector('.line').style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
        }
    })

}

// game logic //
let boxes=document.getElementsByClassName("box");   //this will return an html collection having all the div having class box
// As it returns an html collection hence we can use array.from and use for each method to access each and every element of the array//
Array.from(boxes).forEach(element =>{
    // now we will use queryselector to get the spans having class boxtext and attach each of them an event listener such that whenever they will be clicked we gate a sound 
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        // check if span is empty
        if(boxtext.innerText === ''){
            // then add innnertext as turn or at first chance it will be x itself
            boxtext.innerText = turn;
            // now change the turn
            turn = changeTurn();
            // play the audio when turn changes
            audioTurn.play();
            // check if someone won in that turn or not
            checkWin();
            // mention whose turn is now by changing the span text of info
            if(!isgameover){
                // means game is not won yet hence continue change the turns
                document.getElementsByClassName("info")[0].innerText = "Now it's "+turn+"'s turn !! ";//we have to do [0] as get elements by class name returns an html collection
            }
        }
    })

})

// adding functionality to reset button

reset.addEventListener('click',()=>{
    // get all the span boxes and mark them empty
    let boxtext=document.querySelectorAll('.boxtext');
    // we have to use array.from as query selector all returns a html collection
    Array.from(boxtext).forEach(element=>{
        element.innerText="";
    });
    // after clearing all the boxes turn should be again of X
    turn="X";
    // gameover should be false we are again restarting the game
    isgameover=false;
    // print x's turn
    document.getElementsByClassName("info")[0].innerText = "Turn for "+turn;
    // reset the winning image width to 0 again
    document.querySelector('.imageBox').getElementsByTagName('img')[0].style.width="0px"
    // remove the line
    document.querySelector('.line').style.width="0vw"
    // play the bgm again
    

})