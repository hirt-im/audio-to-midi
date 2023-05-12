import { SoundFontPlayer } from '@magenta/music/es6';
import { useState, useEffect } from 'react'


export default function PlayerM(props){
    const [playPause, setPlayPause] = useState('play');

    let p = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

    function handleClick(){

        if (playPause === 'play'){
          p.start(props.vis.noteSequence);
          console.log(p);
          setPlayPause('pause');
        }
    
        else {
          p.stop();
          setPlayPause('play');
          console.log('pause');
        }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}