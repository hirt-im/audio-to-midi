import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'



export default function SequencePlayer(props){

    function handleClick(){
      let state = props.player.getPlayState();
      if(state === 'stopped'){
        props.player.start(props.vis.noteSequence);
      }
      else if (state === 'paused'){
        props.player.resume();
      }
      else{
        props.player.pause();
      }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}
