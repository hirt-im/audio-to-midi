import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayBackRate from './components/PlaybackRate';
import { WaterfallSVGVisualizer, NoteSequence, SoundFontPlayer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';
import colorBlackKeys from './components/colorBlackKeys';
import classifySharps from './components/classifySharps';
import TempoControl from './components/TempoControl';



// const BLACK_KEY_COLOR = 'rgba(0, 204, 197, 0.79)';
const WHITE_KEY_COLOR = '195, 219, 222';
const ACTIVE_KEY_COLOR = '255, 215, 18';


const WHITE_KEY_FILL = '8, 41, 64';
const BLACK_KEY_FILL = '0, 204, 197';
const BLACK_ACTIVE = '235, 171, 52';
const WHITE_ACTIVE = '255, 215, 18';

const WHITE_WIDTH = Math.round(window.innerWidth / 65);
const BLACK_WIDTH = Math.round(WHITE_WIDTH * (5 / 9));


const SHARP_NOTES = [70,73,75,78,80,82,85,87,90,92,
                     94,97,99,102,104,106,68,66,63,
                     61,58,56,54,51,49,46,44,42,39,
                     37,34,32,30,27,25,22
                    ];



function App() {
  const [audio, setAudio] = useState();
  const [rate, setRate] = useState(1);
  const [noteSequence, setNoteSequence] = useState(null);
  const [vis, setVis] = useState();

  let visualizer;
  function visualize(){
    visualizer = new WaterfallSVGVisualizer(
            noteSequence, 
            document.getElementById('visualizer'),
            {
              noteRGB: WHITE_KEY_COLOR,
              activeNoteRGB: ACTIVE_KEY_COLOR,
              noteHeight: 50,
              pixelsPerTimeStep: 200,
              noteSpacing: 10,
              whiteNoteWidth: WHITE_WIDTH,
              blackNoteWidth: BLACK_WIDTH
            }
    );
    classifySharps(visualizer);
    setVis(visualizer);
  }

  useEffect(()=>{
    if(noteSequence === null){return;}
    visualize();
  }, [noteSequence])



  const player = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
                                undefined,undefined,undefined,
                                {
                                  run: (note = NoteSequence.Note) => {
                                    vis.redraw(note, true);
                                    console.log(vis.noteSequence);
                                  }
                                });



  return (
    <>
      <h1>Audio to MIDI</h1>
      <TempoControl player={player} />
      <SequencePlayer vis={vis} ns={noteSequence} player={player}/>
      <LoadAudio setAudio={setAudio} setNoteSequence={setNoteSequence} />
      <PlayBackRate audio={audio} setRate={setRate} />
      <div id='visualizer'></div>
    </>
  )
}

export default App
