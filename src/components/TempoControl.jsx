import { useState } from "react";


export default function TempoControl(props){
    const [tempo, setTempo] = useState(120);

    function handleChange(e){
        let newTempo = e.target.value
        setTempo(newTempo);
        props.player.setTempo(newTempo);
    }

    return(
        <>
            <div><b>Playback Rate</b></div>
            <div>{Math.round( (tempo / 120) * 100)}%</div>
            <input type="range" min="12" max="240" value={tempo} class="slider" onChange={handleChange}/>
        </>
    );
}