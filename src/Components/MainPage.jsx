//data
import data from '../data/data'

import yellowBallon from '../assets/yellowBallon.png';


// console.log(question)

export default function MainPage(props){

  function handleClick(){
    props.setFrontPage(prev=>!prev)
  }

  const firstQues = {
    question: "According to Overwatch's lore, who was once a member of the Deadlock Gang?",
    correct_answer: "McCree",
    incorrect_answers: ["Roadhog", "Soldier 76", "Junkrat"]
  }

  return(
    <>
        <section > {/* this is for background images */}
          <img src={yellowBallon} className='top-yellow-blob' alt="yellow blob" />
          <img src={yellowBallon} className='bot-yellow-blob' alt="yellow blob" />
          <button onClick={handleClick}>Want to get back?</button>
        </section>

        <section>

        </section>

    </>
  )
}
