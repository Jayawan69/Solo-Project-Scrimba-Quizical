//data
import question from '../data/question'

import yellowBallon from '../assets/yellowBallon.png';


// console.log(question)

export default function MainPage(props){

  function handleClick(){
    props.setFrontPage(prev=>!prev)
  }

  return(
    <>
      <img src={yellowBallon} className='top-yellow-blob' alt="yellow blob" />
      <img src={yellowBallon} className='bot-yellow-blob' alt="yellow blob" />
      <button onClick={handleClick}>Want to get back?</button>
    </>
  )
}
