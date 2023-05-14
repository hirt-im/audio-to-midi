import { useEffect } from "react";
import { useState } from "react";
import * as mm from '@magenta/music/es6'


export default function TimeControl(props){
    // const [tempo, setTempo] = useState(120);

    const [time, setTime] = useState(0);

    // useEffect(() => {
    //     setTime(time + 1)
    // }, [Math.round(mm.Player.tone.Transport.seconds) > time])

    // useEffect(() => {
    //     if(props.player.isPlaying()){
    //         setInterval(() => {
    //             setTime(parseFloat(time) + 1);
    //             console.log(time);
    //         }, [1000])
    //     }
    // }, [props.player.isPlaying()])
    
    // if(props.ns.totalTime == null){return}

    // function handleChange(e){
    //     // return;
    //     console.log(props.player.isPlaying());
    //     let newTime = e.target.value;
    //     props.player.seekTo(newTime);
    //     setTime(newTime);
    // }

    return(
        <>
            {/* <div>{Math.round((props.time / props.totalTime) * 100)}%</div> */}
            <div>{(props.totalTime == null ? 0 : Math.round( (props.time / props.totalTime) * 100))}%</div>
            <input  type="range" min={0} max={props.totalTime} value={props.time} 
            class="slider" />
        </>
    );
}