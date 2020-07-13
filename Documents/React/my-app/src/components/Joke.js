import React from "react"

function Joke(props){
    let question = ""
    if(props.content.question){
        question="<p>"+props.content.question+"</p>"
    }
    return (
        <div>
            {question}
            <p style={{color:!props.content.question&&"red"}}>{props.content.punchline}</p>
            <hr />
        </div>
    )
}

export default Joke