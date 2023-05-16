import { useState } from "react";

export default function SequencePlayer(props){

  const [playState, setPlayState] = useState(props.player.getPlayState())

  function handleClick(){
    switch (props.player.getPlayState()) {
      case 'stopped':
        props.player.start(props.vis.noteSequence);
        setPlayState('started');
        break;

      case 'paused':
        props.player.resume();
        setPlayState('started');
        break;

      case 'started':
        props.player.pause();
        setPlayState('paused');
    }
  }

  return (
      <div>
        <button onClick={handleClick}>{(playState === 'stopped' || playState === 'paused' ? 'Play' : 'Pause')}</button>
      </div>
    );
}
