import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'
import * as mm from '@magenta/music/es6';



export default function SequencePlayer(props){

  function handleClick(){
    switch (props.player.getPlayState()) {
      case 'stopped':
        props.player.start(props.vis.noteSequence);
        break;

      case 'paused':
        props.player.resume();
        break;

      case 'started':
        props.player.pause();
    }
  }

  return (
      <div>
        <button onClick={handleClick}>Play/Pause</button>
      </div>
    );
}
