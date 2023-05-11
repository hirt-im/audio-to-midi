import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState } from 'react'
import PlayAudio from './components/PlayAudio';
import PlayBackRate from './components/PlaybackRate';

function App() {
  const [audio, setAudio] = useState();

  return (
    <>
      <h1>Audio to MIDI</h1>
      <PlayAudio audio={audio} />
      <LoadAudio setAudio={setAudio} />
      <PlayBackRate audio={audio} />
    </>
  )
}

export default App
