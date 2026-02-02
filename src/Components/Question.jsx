import {useState, useEffect} from 'react'
import data from '../data/data'

export default function Question (props){

   let numOfCorrect = 0

   const [isSubmitted, setIsSubmitted] = useState(false)
   const [optionsArr] = useState(() => {
    return data.map((ques) => {
      const randNum = Math.floor(Math.random() * (ques.incorrect_answers.length + 1));
      const shuffled = [...ques.incorrect_answers];
      shuffled.splice(randNum, 0, ques.correct_answer);
      return shuffled;
    });
  });
  
    function submit(event) {
      event.preventDefault()
      const formEl = event.currentTarget
      const formData = new FormData(formEl)
      setIsSubmitted(true)
      props.setUserAnswers(Object.fromEntries(formData.entries()))
      // console.log(props.userAnswers)
      formEl.reset()
  }


   // useEffect(()=>{
   //    setOptionsArr(data.map((ques, i)=>{
   //         const randNum = Math.floor(Math.random() * (ques.incorrect_answers.length+1))
   //         console.log(randNum)
   //         return [...ques.incorrect_answers.slice(0,randNum), ques.correct_answer, ...ques.incorrect_answers.slice(randNum)]
  
   //      }))
   // },[])
   console.log(optionsArr)






  const fieldHtml = data.map((ques, i)=>{

      // const allOptions = [...ques.incorrect_answers, ques.correct_answer]


      // console.log(allOptions)

      
      // let tempOptions = []

      // if(!isSubmitted){
      //    while (allOptions.length){
      //       const randPos = Math.floor(Math.random() * allOptions.length)
      //       tempOptions = [...shuffledOption, allOptions.splice(randPos, 1)[0]]
      //    }
      //    setShuffledOption(tempOptions)
      // }
      
      const shuffledOption = optionsArr[i] // No shuffling happens
      

      // console.log(shuffledOption)
   
      return(
         <fieldset key={i}>
               <legend>
                  {ques.question}
               </legend>

               {shuffledOption.map((ans, index)=>{
               const numQuestAttempted = Object.keys(props.userAnswers).length

               let className = ''

               // console.log(props.userAnswers)
               // console.log(props.userAnswers[`question-${i+1}`]) 
               
               

               if(numQuestAttempted>0){
                     if(ans === props.userAnswers[`question-${i+1}`]){
                        // className += 'wrong' 
                        if(props.userAnswers[`question-${i+1}`] === data[i].correct_answer){
                           className += ' correct' 
                           numOfCorrect+=1

                           // console.log('Correct class added', `Correct answer=:${numOfCorrect}`)
                        }else{
                           className+=' wrong'
                        }
                     }
                        
                     // console.log(`Number of question attempted: ${numQuestAttempted}`)


                  }else{
                     console.log(`None of the question attempted`)
                     className = ''
                  }
                  if(isSubmitted){
                     className += ' disabled'
                  }
                  

                  return(
                     <label className={className}>
                        <input value ={ans} type="radio" name={`question-${i+1}`}/>
                        {ans}
                     </label>
               )})}
               <br />
            </fieldset>
         )
      }
   )

   // console.log(fieldHtml)
  
  return (
    <section>
      <form onSubmit={submit} >

         {fieldHtml} 

         <p 
            className="final-score"
            style={{ visibility: isSubmitted ? 'visible' : 'hidden' }}
            >
            Great effort! You got {numOfCorrect}/{data.length} questions right.
         </p>

         {isSubmitted ? <button type ='button'className='submit-btn'>Play Again</button> : <button type="submit" className='submit-btn'>Check Answer</button>}
        
        
      </form>
    </section>
  )
}