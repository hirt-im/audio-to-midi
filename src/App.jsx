import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState } from 'react'
import PlayAudio from './components/PlayAudio';
import PlayBackRate from './components/PlaybackRate';
import Magenta from './components/magenta';


function App() {
  const [audio, setAudio] = useState();
  const [blob, setBlob] = useState();
  const [rate, setRate] = useState(1);

  return (
    <>
      <h1>Audio to MIDI</h1>
      <PlayAudio audio={audio} />
      <LoadAudio setAudio={setAudio} setBlob={setBlob} />
      <PlayBackRate audio={audio} setRate={setRate} />
      <Magenta blob={blob} />
    </>
  )
}

export default App
