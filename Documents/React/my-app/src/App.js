import React from "react"
import Joke from "./components/Joke.js"
import {data} from "./data.json"

function App(){
    return(
    <div>
        <Joke content={{question:"", punchline:"Punchline 1"}}/>
        <Joke content={{question:"test 2", punchline:"Punchline 21"}}/>
        <Joke content={{question:"test 3", punchline:"Punchline 3"}}/>
    </div>
    )
}

export default App