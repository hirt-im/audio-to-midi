import { useState } from "react";
import { useStore } from "../App";


export default function SequencePlayer(props){

  // const [playState, setPlayState] = useState(props.player.getPlayState())

  // const playState = useStore((state) => state.playState);
  // const playPlayer = useStore((state) => state.start);
  // const pausePlayer = useStore((state) => state.pause);

  const {playState, playPlayer, pausePlayer } = useStore()


  function handleClick(){
    switch (props.player.getPlayState()) {
      case 'stopped':
        props.player.start(props.vis.noteSequence);
        playPlayer();
        console.log(playState);
        break;

      case 'paused':
        props.player.resume();
        playPlayer();
        console.log(playState);

        break;

      case 'started':
        props.player.pause();
        pausePlayer();
        console.log(playState);
    }
  }

  let pause = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
    stroke-linejoin="round" class="feather feather-pause">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>;

  let play = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round" class="feather feather-play">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>


  return (
      <button onClick={handleClick}>
        {(playState === 'stopped' || playState ==='paused' ? play : pause)}
      </button>
    );
}
