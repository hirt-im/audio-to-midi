import { Player } from '@magenta/music/es6';
import { useState, useEffect } from 'react'


export default function PlayerM(props){
    const [playPause, setPlayPause] = useState('play');

    let p = new Player();

 
    function handleClick(){
        // if(!props.vis){return;}

        if (playPause === 'play'){
          p.start(props.vis.noteSequence);
          console.log(props.vis);
          setPlayPause('pause');
        }
    
        else {
          p.stop();
          setPlayPause('play');
        }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}