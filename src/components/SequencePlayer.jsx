import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'
import * as mm from '@magenta/music/es6';
import TimeControl from './TimeControl';



export default function SequencePlayer(props){
  const [time, setTime] = useState(0);
  const [playState, setPlayState] = useState('stopped');

  useEffect(()=>{
    if(playState === 'play'){
      setTimeout(() => {
        setTime((parseFloat(time) + .1).toFixed(2))
      }, [100])
    }
  })


  function handleClick(){
    let state = props.player.getPlayState();
    if(state === 'stopped'){
      props.player.start(props.vis.noteSequence);
      setPlayState('play');
     
      // mm.Player.tone.Transport.seconds = 0;
      // console.log(mm.Player.tone.Transport.seconds);
    }
    else if (state === 'paused'){
      props.player.resume();
      setPlayState('play');
      // mm.Player.tone.Transport.seconds = 0;
      // console.log(mm.Player.tone.Transport.seconds);

    }
    else{
      props.player.pause();
      setPlayState('stopped');
      // console.log(mm.Player.tone.Transport.seconds);

    }
  }

  return (
      <div>
        <button onClick={handleClick}>Play/Pause</button>
        <TimeControl totalTime={props.totalTime} time={time}/>
      </div>
    );
}
