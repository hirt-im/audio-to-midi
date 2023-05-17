import React, { useEffect, useState } from 'react'
import * as mm from "@magenta/music/es6";
import { uesStore } from '../App';



export default function LoadAudio(props){
  const {setLoading} = uesStore();

  const [loaded, setLoaded] = useState(false);

  const OAF = new mm.OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");
  OAF.initialize();

  function loadFromFile(e){
    setLoading();
    OAF.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
      props.setNoteSequence(ns);
    })
    setLoaded(true);
  }

  function handleClick(){
    if(loaded){location.reload();}
  }

  return (
    <>
      {/* <div>
        <input id='load-file' type="file" onClick={handleClick} onChange={loadFromFile}/>
      </div> */}
      <input type="file" onClick={handleClick} onChange={loadFromFile} id="files"/>
      <label id='file-label' for="files">Upload File</label>
    </>
  );
}

