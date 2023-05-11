import { useState } from "react";


export default function PlayBackRate(props){
    const [rate, setRate] = useState(500);
    const [percent, setPercent] = useState(100);

    function handleChange(e){
        setRate(e.target.value);
        setPercent(Math.round((e.target.value / 500) * 100));
        props.audio.playbackRate = rate / 500;
    }

    return(
        <>
            <div>{percent}%</div>
            <input type="range" min="0" max="1000" value={rate} class="slider" onChange={handleChange}/>
        </>
    );
}