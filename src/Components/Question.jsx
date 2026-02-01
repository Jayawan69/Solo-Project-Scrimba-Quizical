import {useState, useEffect} from 'react'
import data from '../data/data'

export default function Question (props){

   let numOfCorrect = 0

   const [isSubmitted, setIsSubmitted] = useState(false)
  
    function submit(event) {
      event.preventDefault()
      const formEl = event.currentTarget
      const formData = new FormData(formEl)
      setIsSubmitted(true)
      props.setUserAnswers(Object.fromEntries(formData.entries()))
      // console.log(props.userAnswers)
      formEl.reset()
  }



  const fieldHtml = data.map((ques, i)=>{

      const allOptions = [...ques.incorrect_answers, ques.correct_answer]

      // console.log(allOptions)

      let shuffledOption = []


      if(!isSubmitted){
         while (allOptions.length){
            const randPos = Math.floor(Math.random() * allOptions.length)
            shuffledOption = [...shuffledOption, allOptions.splice(randPos, 1)[0]]
         }
      }else{
         shuffledOption = allOptions
      }

      

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
                     if(ans ===props.userAnswers[`question-${i+1}`]){
                        if(props.userAnswers[`question-${i+1}`] === data[i].correct_answer){
                           className = 'correct' 
                           numOfCorrect+=1

                           console.log('Correct class added', `Correct answer=:${numOfCorrect}`)
                        }else{
                           className+=' wrong'
                        }
                     }
                        
                     // console.log(`Number of question attempted: ${numQuestAttempted}`)


                  }else{
                     console.log(`None of the question attempted`)
                     className = ''
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

        {isSubmitted && <p className="final-score">Great effort! You got {numOfCorrect}/{data.length} questions right.</p>}
        <button type="submit" className='submit-btn'>Check Answer</button>
        
      </form>
    </section>
  )
 }