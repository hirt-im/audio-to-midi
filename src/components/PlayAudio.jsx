import { useState } from 'react'


export default function PlayAudio(props){
    const [playPause, setPlayPause] = useState('play');

    function handleClick(){
        if(!props.audio){return;}

        if (playPause === 'play'){
          props.audio.play();
          setPlayPause('pause');
        }
    
        else {
          props.audio.pause();
          setPlayPause('play');
        }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}