import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'
import * as mm from '@magenta/music/es6';



export default function SequencePlayer(props){

    function handleClick(){
      let state = props.player.getPlayState();
      if(state === 'stopped'){
        props.player.start(props.vis.noteSequence);
        // mm.Player.tone.Transport.seconds = 0;
        console.log(mm.Player.tone.Transport.seconds);
      }
      else if (state === 'paused'){
        props.player.resume();
        // mm.Player.tone.Transport.seconds = 0;
        console.log(mm.Player.tone.Transport.seconds);

      }
      else{
        props.player.pause();
        console.log(mm.Player.tone.Transport.seconds);

      }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}
