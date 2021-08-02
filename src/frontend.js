import React, {useState, useEffect} from "react"
import ReactDOM  from "react-dom"

const questionBlock = document.querySelectorAll(".frontend-block-questions")

questionBlock.forEach((div) => {
    const data = JSON.parse(div.querySelector("pre").innerHTML)
    div.style.backgroundColor = data.bgcolor
    ReactDOM.render(<Quiz {...data} />, div)
})

function Quiz(props) {

    const [iscorrect, setiscorrect] = useState(undefined)
    const [iscorrectDelayed, setiscorrectDelayed] = useState(undefined)

    function checkCorrect(index) {
        if ( index == props.correctAnswer ) {
            setiscorrect(true)
        } 
        if( index != props.correctAnswer ) {
            setiscorrect(false)
        }
    }

    useEffect(() => {
        if ( iscorrect === false ) {
        setTimeout(() => {
                setiscorrect(undefined)
            }, 2400);
        }

        if (iscorrect == true) {
            setTimeout(() => {
                setiscorrectDelayed(true)
            }, 1600);
        }
    }, [iscorrect])

    return (
        <>
        <h5>{props.question}</h5>
        <ul>
            {props.answers.map((answer, index) => {
                return (
                    <li className={
                            (iscorrectDelayed == true && index == props.correctAnswer ? "true-answer" : "") +
                            (iscorrectDelayed == true && index != props.correctAnswer ? "false-answer" : "") 
                        } 
                        onClick={ iscorrect == true ? undefined : () => checkCorrect(index) }>
                        {iscorrectDelayed == true && index == props.correctAnswer && (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>)}
                        {iscorrectDelayed == true && index != props.correctAnswer && (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>)}
                        {answer}
                    </li>
                ) 
            })}
        </ul>
        <div className={ "block_answer correct" + (iscorrect === true ? " clicked_answer" : "")}>
            <p>Congrats, you're paying attention!!</p>
        </div>
        <div className={ "block_answer incorrect" +  (iscorrect === false ? " clicked_answer" : "")} >
            <p>Sorry, try again.</p>
        </div>
        </>
    )
}