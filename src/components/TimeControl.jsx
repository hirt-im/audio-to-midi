import { useEffect } from "react";
import { useState } from "react";
import * as mm from '@magenta/music/es6'


export default function TimeControl(props){
    // const [tempo, setTempo] = useState(120);

    const [time, setTime] = useState(0);

    // if(props.ns.totalTime == null){return}

    function handleChange(e){
        let newTime = e.target.value;
        props.player.seekTo(newTime);
        setTime(newTime);
    }

    return(
        <>
            <div>{Math.round( (time / props.totalTime) * 100)}%</div>
            <input type="range" min={0} max={props.totalTime} value={time} 
            class="slider" onChange={handleChange}/>
        </>
    );
}