import React, { useState } from 'react'
import * as mm from "@magenta/music/es6";



export default function LoadAudio(props){

  const [notes, setNotes] = useState();

    const OAF = new mm.OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");

  function addFile(e){
    console.log(e.target.files[0]);
    let s = URL.createObjectURL(e.target.files[0]);
    let a = new Audio(s);
    props.setAudio(a);
    // props.setBlob(s);
    let notes = OAF.transcribeFromAudioFile(e.target.files[0]);
    // setNotes(notes);
    console.log(notes);

  
    
  }
  
    return (
        <div>
          <input type="file" onChange={addFile}/>
        </div>
      );
}

