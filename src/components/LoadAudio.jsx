import React, { useEffect, useState } from 'react'
import * as mm from "@magenta/music/es6";



export default function LoadAudio(props){

  const OAF = new mm.OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");
  OAF.initialize();

  function loadFromFile(e){
    console.log(e.target.files[0]);
    let src = URL.createObjectURL(e.target.files[0]);
    let a = new Audio(src);
    props.setAudio(a);

    OAF.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
      props.setNoteSequence(ns);
      console.log(quantizedNS);
    })
  }

  function loadFromURL(e){
    let url = document.getElementById('URL').value;

    //this doesn't work
    OAF.transcribeFromAudioURL(url).then((ns) => {
      props.setNoteSequence(ns);
      console.log(ns);
    })

    e.preventDefault();
    }
  
  
    return (
      <>
      {/* from File */}
        <div>
          <input type="file" onChange={loadFromFile}/>
        </div>

      {/* from URL */}
        <form>
            <input id='URL' type='text' placeholder='Enter URL' />
            <input type="submit" onClick={loadFromURL} />
        </form>
      </>
      
      );
}

