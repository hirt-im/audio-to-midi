import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayAudio from './components/PlayAudio';
import PlayBackRate from './components/PlaybackRate';
// import Magenta from './components/magenta';
import { WaterfallSVGVisualizer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';

const BLACK_KEY_COLOR = 'rgba(0, 204, 197, 0.79)';
const WHITE_KEY_COLOR = '195, 219, 222';
const ACTIVE_KEY_COLOR = '255, 215, 18';

function App() {
  const [audio, setAudio] = useState();
  const [rate, setRate] = useState(1);
  const [noteSequence, setNoteSequence] = useState(null);
  const [vis, setVis] = useState();


  let whiteWidth = Math.round(window.innerWidth / 65);
  let blackWidth = Math.round(whiteWidth * (5 / 9));
  console.log(whiteWidth, blackWidth, 'here');
  function visualize(){
    let newVis = new WaterfallSVGVisualizer(
            noteSequence, 
            document.getElementById('visualizer'),
            {
              noteRGB: WHITE_KEY_COLOR,
              activeNoteRGB: ACTIVE_KEY_COLOR,
              noteHeight: 50,
              pixelsPerTimeStep: 200,
              noteSpacing: 10,
              whiteNoteWidth: whiteWidth,
              blackNoteWidth: blackWidth
            }
            // {showOnlyOctavesUsed: true}
    );

    // change color of black keys
    // Issue: they turn back to white color key after being redrawn by visualizer :/ 
    let rects = newVis.svg.children;
    console.log(newVis.svg.children);
    for (let i = 0; i < rects.length; i++){
      console.log(rects[i].attributes[4].value);
      let width = rects[i].attributes[4].value;
      if (width == blackWidth){
        rects[i].attributes.fill.value = (BLACK_KEY_COLOR);
    }


  }





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
