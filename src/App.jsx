import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState } from 'react'
import PlayAudio from './components/PlayAudio';
import PlayBackRate from './components/PlaybackRate';
import Magenta from './components/magenta';


function App() {
  const [audio, setAudio] = useState();
  const [rate, setRate] = useState(1);
  const [noteSequence, setNoteSequence] = useState();

  return (
    <>
      <h1>Audio to MIDI</h1>
      <PlayAudio audio={audio} />
      <LoadAudio setAudio={setAudio} 
                 setNoteSequence={setNoteSequence} 
      />
      <PlayBackRate audio={audio} setRate={setRate} />
      {/* <Magenta /> */}
    </>
  )
}

export default App
