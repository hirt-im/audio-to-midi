import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState } from 'react'
import PlayAudio from './components/PlayAudio';

function App() {
  const [audio, setAudio] = useState();

  return (
    <>
      <h1>Audio to MIDI</h1>
      <PlayAudio audio={audio} />
      <LoadAudio setAudio={setAudio} />
    </>
  )
}

export default App
