
import data from '../data/data'

export default function Question (props){
  
    function submit(formData) {
    console.log(email)
    console.log(formData)
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
                     <input type="radio" name={`question${i}`}/>
                     {ans}
                  </label>
               ))}
               <br />
            </fieldset>
         )
      }
   )

   console.log(fieldHtml)
  
  return (
    <section>
      <form action={submit} >

        {fieldHtml} 
        <button>Submit</button>
        
      </form>
    </section>
  )
 }