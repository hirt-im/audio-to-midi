import { useState } from "react";


export default function PlayBackRate(props){
    const [percent, setPercent] = useState(100);

    function handleChange(e){
        let rate = e.target.value / 500;
        props.audio.playbackRate = rate;
        props.setRate(rate);

        setPercent(Math.round(rate * 100));
    }

    return(
        <>
            <div>{percent}%</div>
            <input type="range" min="125" max="1000" value={percent * 5} class="slider" onChange={handleChange}/>
        </>
    );
}