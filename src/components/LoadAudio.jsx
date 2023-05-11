import React from 'react'
import { useState, useEffect } from 'react'



export default function LoadAudio(){

  const [playPause, setPlayPause] = useState('play');
  const [audio, setAudio] = useState();


  function addFile(e){
    console.log(e.target.files[0]);
    let s = URL.createObjectURL(e.target.files[0]);
    let a = new Audio(s);
    setAudio(a);
  }
  
  function handleClick(){
    if (playPause === 'play'){
      audio.play();
      setPlayPause('pause');
    }

    else {
      audio.pause();
      setPlayPause('play');
    }
    
  }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
          <input type="file" onChange={addFile}/>
        </div>
      );
}

