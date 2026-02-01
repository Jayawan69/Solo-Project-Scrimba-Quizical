
import data from '../data/data'

export default function Question (props){
  
    function submit(event) {
      event.preventDefault()
      const formEl = event.currentTarget
      const formData = new FormData(formEl)
      props.setUserAnswers(Object.fromEntries(formData.entries()))

      formEl.reset()
  }



  const fieldHtml = data.map((ques, i)=>{

      const allOptions = [...ques.incorrect_answers, ques.correct_answer]

      // console.log(allOptions)

      let shuffledOption = []

      while (allOptions.length){
         const randPos = Math.floor(Math.random() * allOptions.length)
         shuffledOption = [...shuffledOption, allOptions.splice(randPos, 1)[0]]
      } 

      // console.log(shuffledOption)
   
      return(
         <fieldset key={i}>
               <legend>
                  {ques.category}
               </legend>

               {shuffledOption.map((ans, index)=>(
                  <label >
                     <input value ={ans} type="radio" name={`question-${i+1}`}/>
                     {ans}
                  </label>
               ))}
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
        <button type="submit" className='submit-btn'>Check Answer</button>
        
      </form>
    </section>
  )
 }