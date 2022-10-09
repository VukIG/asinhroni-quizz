const start=document.querySelector('.start')
const quiz=document.querySelector('.quiz');
const quizQuestion=document.querySelector('.question');
let answers=document.querySelectorAll('.answers');
let points=0;

let questions=[];
let i;

class question{
    constructor(question,incorrectAnswers,correctAnswer){
        this.question=question;
        //u incoret answere stavljam sve answere
        this.incorrectAnswers=incorrectAnswers;
        this.correctAnswer=correctAnswer;
    }
    check(option){
        if(option==this.correctAnswer){
            return 1;
        }
        else{
            return 0;
        }
    }
}


function generalCheck(option,answer,brojpitanja) {
    if (questions[brojpitanja].check(option)==1) {
        answer.classList.toggle('answers');
        answer.classList.toggle('correct');
        setTimeout(() => {
            answer.classList.toggle('answers');
            answer.classList.toggle('correct');
        }, 500);

        points++;
        i--;
        if(i==-1){
            endscreen();
        }
        else{
            setTimeout(() => {
                next(brojpitanja+1);
            }, 500);    
        }
    }
    else{
        answer.classList.toggle('answers');
        answer.classList.toggle('incorrect');
        setTimeout(() => {
            answer.classList.toggle('answers');
            answer.classList.toggle('incorrect');
        },  500);
        i--;
        if(i==-1){
            endscreen();
        }
        else{
            setTimeout(() => {
                next(brojpitanja+1);
            },  500);    
        }
    }
}

function endscreen() {
    let percent=points/5*100;
    console.log(percent)
    const congratulations = document.querySelector('.congratulations');
    congratulations.style.display='block';
    congratulations.querySelector('h1').innerHTML=`You have scored ${percent} %`
    quiz.style.display='none';
}


function startt(brojpitanja) {
    answers.forEach(answer => {
        answer.addEventListener('click', ()=>{
            let h1opt=answer.querySelector('h1').innerHTML;
             generalCheck(h1opt,answer,brojpitanja);
            
        });
    });
}
function next(brojpitanja) {
    let brojodgovora=0;
    quizQuestion.querySelector('h1').innerHTML=questions[brojpitanja].question;
    answers.forEach(answer => {
        answer.querySelector('h1').innerHTML=questions[brojpitanja].incorrectAnswers[brojodgovora];
        brojodgovora++;
    });
    brojpitanja++;
    startt(brojpitanja);
}

async function zgrabiPitanja() {
    let url = 'https://the-trivia-api.com/api/questions';
    let odziv = await fetch(url);
    let odgovor = await odziv.json();
    odgovor.forEach( pitanje => {
        let text =  pitanje.question;
        let resenja =  pitanje.incorrectAnswers;
        resenja.push(pitanje.correctAnswer);
        let tacnoResenje= pitanje.correctAnswer;
        questions.push( new question(text,resenja,tacnoResenje));
    });
    i=odgovor.length;
    next(0)
}

start.addEventListener('click',async (e)=>{
    e.preventDefault();
    start.style.display='none';
    quiz.style.display='block';
    await zgrabiPitanja();
});