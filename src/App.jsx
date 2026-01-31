import {useState, useEffect, useRef} from 'react'


//components
import FirstPage from './Components/FirstPage'
import MainPage from './Components/MainPage'
import Question from './Components/Question'




export default function App(){

   const [frontPage, setFrontPage] = useState(false)

   function startQuizBtn(){
      setFrontPage(prev=>!prev)
   }

   let htmlToReturn = ''

   // useEffect(() => {
   // fetch('https://opentdb.com/api.php?amount=10')
   //    .then(res => res.json())
   //    .then(data => console.log(data));
   // }, []);






   
   if(frontPage){
      htmlToReturn = <FirstPage startQuizBtn={startQuizBtn}/>
   }else{
      htmlToReturn = 
         <>
            <Question/>
            <MainPage setFrontPage={setFrontPage}/>
         </>
   }

   return htmlToReturn
}