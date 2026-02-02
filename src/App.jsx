import {useState, useEffect, useRef} from 'react'


//components
import FirstPage from './Components/FirstPage'
import MainPage from './Components/MainPage'
import Question from './Components/Question'




export default function App(){

   const [frontPage, setFrontPage] = useState(false)
   const [userAnswers, setUserAnswers] = useState({})
   const [isSubmitted, setIsSubmitted] = useState(false)

   const [gameId, setGameId] = useState(0);

   console.log(userAnswers, 'Its re-rendering')

   function startQuizBtn(){
      setFrontPage(prev=>!prev)
   }

   let htmlToReturn = ''

   function playAgain() {
    setGameId(prev => prev + 1);
    setUserAnswers({});
    setIsSubmitted(false);
  }

   // useEffect(() => {
   // fetch('https://opentdb.com/api.php?amount=10')
   //    .then(res => res.json())
   //    .then(data => console.log(data));
   // }, []);






   
   if(frontPage){
      htmlToReturn = <FirstPage startQuizBtn={startQuizBtn}/>
   }else{
      htmlToReturn = 
         <main>
            <Question 
               key={gameId}
               userAnswers={userAnswers} 
               setUserAnswers={setUserAnswers} 
               isSubmitted={isSubmitted} 
               setIsSubmitted={setIsSubmitted}
               playAgain={playAgain}
            />
            <MainPage setFrontPage={setFrontPage}/>
         </main>
   }

   return htmlToReturn
}