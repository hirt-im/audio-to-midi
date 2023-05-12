import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayAudio from './components/PlayAudio';
import PlayBackRate from './components/PlaybackRate';
// import Magenta from './components/magenta';
import { WaterfallSVGVisualizer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';


function App() {
  const [audio, setAudio] = useState();
  const [rate, setRate] = useState(1);
  const [noteSequence, setNoteSequence] = useState(null);
  const [vis, setVis] = useState();

  function visualize(){
    let newVis = new WaterfallSVGVisualizer(
            noteSequence, 
            document.getElementById('visualizer'),
            {
              activeNoteRGB: '255, 215, 18',
              noteHeight: 50,
              pixelsPerTimeStep: 200,
              noteSpacing: 50
            }
            // {showOnlyOctavesUsed: true}
    );
    console.log(newVis);
    setVis(newVis);
  }

  useEffect(()=>{
    if(noteSequence === null){return;}
    visualize();
    console.log('here');
  }, [noteSequence])

  return (
    <>
      <h1>Audio to MIDI</h1>
      {/* <PlayAudio audio={audio} /> */}
      <SequencePlayer vis={vis} ns={noteSequence}/>
      <LoadAudio setAudio={setAudio} setNoteSequence={setNoteSequence} />
      <PlayBackRate audio={audio} setRate={setRate} />
      {/* <Visualizer ns={noteSequence} /> */}
      <div id='visualizer'></div>
      {/* <Magenta /> */}
    </>
  )
}

export default App
