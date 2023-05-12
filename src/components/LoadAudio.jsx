import React, { useEffect, useState } from 'react'
import * as mm from "@magenta/music/es6";



export default function LoadAudio(props){

  const OAF = new mm.OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");
  OAF.initialize();

  function addFile(e){
    console.log(e.target.files[0]);
    let src = URL.createObjectURL(e.target.files[0]);
    let a = new Audio(src);
    props.setAudio(a);

    OAF.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
      props.setNoteSequence(ns);
      console.log(ns);
    })
  }
  
    return (
        <div>
          <input type="file" onChange={addFile}/>
        </div>
      );
}

