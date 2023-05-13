import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayBackRate from './components/PlaybackRate';
import { WaterfallSVGVisualizer, NoteSequence, SoundFontPlayer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';
import colorBlackKeys, { classifySharps } from './components/colorBlackKeys';



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


  function visualize(){
    let visualizer = new WaterfallSVGVisualizer(
            noteSequence, 
            document.getElementById('visualizer'),
            {
              noteRGB: WHITE_KEY_COLOR,
              // activeNoteRGB: ACTIVE_KEY_COLOR,
              noteHeight: 50,
              pixelsPerTimeStep: 200,
              noteSpacing: 10,
              whiteNoteWidth: WHITE_WIDTH,
              blackNoteWidth: BLACK_WIDTH
            }
    );
    // colorBlackKeys(visualizer);
    classifySharps(visualizer);
    setVis(visualizer);
  }

  useEffect(()=>{
    if(noteSequence === null){return;}
    visualize();
  }, [noteSequence])



  const p = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
                                undefined,undefined,undefined,
                                {
                                    run: (note = NoteSequence.Note) => {
                                      // if(SHARP_NOTES.includes(note.pitch)){
                                      //   props.vis.config.activeNoteRGB = BLACK_ACTIVE;
                                      // }
                                      
                                      // else {
                                      //   props.vis.config.noteRGB = WHITE_ACTIVE; 
                                      // }
                                      // colorBlackKeys(vis)

                                      vis.redraw(note, true);
                                      // if(!SHARP_NOTES.includes(note.pitch)){
                                      //   colorBlackKeys(props.vis)
                                      // }
                                      // colorBlackKeys(vis)

                                      // you would have to color all black keys except the active ones
                                      // good luck


                                        // console.log(props.vis);
                                        // console.log(SHARP_NOTES.includes(note.pitch), props.vis.config.noteRGB);

                                        
                                        //OHHHHHHH it redraws the entire sequence every time, thats why
                                        // lmaoooooooo
                                    }
                                });







  return (
    <>
      <h1>Audio to MIDI</h1>
      <SequencePlayer vis={vis} ns={noteSequence} player={p}/>
      <LoadAudio setAudio={setAudio} setNoteSequence={setNoteSequence} />
      <PlayBackRate audio={audio} setRate={setRate} />
      <div id='visualizer'></div>
    </>
  )
}

export default App
