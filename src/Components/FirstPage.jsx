import yellowBallon from '../assets/yellowBallon.png'


export default function FrontPage(props){
  return(
    <>
      <img src={yellowBallon} className='top-yellow-blob' alt="yellow blob" />
      <img src={yellowBallon} className='bot-yellow-blob' alt="yellow blob" />
      <h1 className='first-page-title'>Quizzical</h1>
      <p className='first-page-desc'>Ready for Quick Quiz??</p>
      <button className='start-btn' onClick={props.startQuizBtn}>Start Quiz</button>
   </>
  )
}