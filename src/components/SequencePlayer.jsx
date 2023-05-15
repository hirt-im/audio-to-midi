import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'
import * as mm from '@magenta/music/es6';



export default function SequencePlayer(props){
  const [playState, setPlayState] = useState('stopped');



  function handleClick(){
    let state = props.player.getPlayState();
    if(state === 'stopped'){
      props.player.start(props.vis.noteSequence);
      setPlayState('play');
    }
    else if (state === 'paused'){
      props.player.resume();
      setPlayState('play');

    }
    else{
      props.player.pause();
      setPlayState('stopped');
    }
  }

  return (
      <div>
        <button onClick={handleClick}>Play/Pause</button>
      </div>
    );
}
