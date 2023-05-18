import React, { useEffect, useState } from 'react'
import * as mm from "@magenta/music/es6";
import { useStore } from '../App';



export default function LoadAudio(props){
  const {setLoading} = useStore();

  // const [loaded, setLoaded] = useState(false);

  // const OAF = new mm.OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");
  // OAF.initialize();

  function loadFromFile(e){
    mm.Player.tone.Transport.stop();
    mm.Player.tone.Transport.cancel();
    setLoading();
    props.OAF.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
      props.setNoteSequence(ns);
    })
    // setLoaded(true);
  }

  // function handleClick(){
  //   if(loaded){location.reload();}
  // }

  return (
    <>
      {/* <div>
        <input id='load-file' type="file" onClick={handleClick} onChange={loadFromFile}/>
      </div> */}
      <input type="file"  onChange={loadFromFile} id="files"/>
      <label id='file-label' for="files">Upload File</label>
    </>
  );
}

