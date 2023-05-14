import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayBackRate from './components/TempoControl';
import { WaterfallSVGVisualizer, NoteSequence, SoundFontPlayer, PianoRollCanvasVisualizer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';
import colorBlackKeys from './components/colorBlackKeys';
import classifySharps from './components/classifySharps';
import TempoControl from './components/TempoControl';
import TimeControl from './components/TimeControl';
import * as mm from '@magenta/music/es6';



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


// mm.Player.tone.Transport.now() gets current time, but it doesn't start/stop when Player starts/stops
// also try mm.Player.tone.Transport.seconds

function App() {
  const [audio, setAudio] = useState();
  const [rate, setRate] = useState(1);
  const [noteSequence, setNoteSequence] = useState(null);
  const [vis, setVis] = useState();
  const [vis2, setVis2] = useState();
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState();


  function updateTime(time){
    setTime(time);
  }


  let visualizer;
  function visualize(){
    visualizer = new WaterfallSVGVisualizer(
            noteSequence, 
            document.getElementById('vis1'),
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

  let visualizer2;
  function visualize2(){
    visualizer2 = new PianoRollCanvasVisualizer(noteSequence, document.getElementById('vis2'),
      {
        noteRGB: WHITE_KEY_COLOR,
        activeNoteRGB: ACTIVE_KEY_COLOR
      }
    );
    setVis2(visualizer2);
  }

  useEffect(()=>{
    if(noteSequence === null){return;}
    visualize();
    visualize2();
    setTotalTime(noteSequence.totalTime);
  }, [noteSequence])



  const player = new SoundFontPlayer(
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
    undefined,undefined,undefined,
    {
      run: (note = NoteSequence.Note) => {
        vis.redraw(note, true);
        vis2.redraw(note,true);
      }
    }
  );

  function changeTime(e){
    if(!player.isPlaying()){
      player.start(noteSequence);
    }


    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let ratio = x / rect.width;
    let newTime = ratio * totalTime;
    player.seekTo(newTime);

    //scroll down visualizer1 when you seek
    let container = document.getElementsByClassName('waterfall-notes-container')[0];
    container.scrollTop = container.scrollHeight - (ratio * container.scrollHeight);
    //doesn't work correctly when playback rate is changed
  }       
  
  function showLine(e){
    return;
    // show vertical line while hovering over vis2
    // console.log(e);
    let cvs = document.getElementById('vis2');
    console.log(cvs);
    let ctx = cvs.getContext('2d');
    console.log(ctx);

    let rect = cvs.getBoundingClientRect();
    let x = e.clientX - rect.left;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    // ctx.strokeStyle('white');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.lineTo(x, rect.bottom);
    ctx.stroke();
    // ctx.clearRect(0,0,cvs.width, cvs.height);

    // this is no good cause youre drawing directly on canvas with the notes also drawn directly on
    // wont work

    //IDEA: change cursor to long vertical line upon hover

  }




  return (
    <>
      <div id='controls'>
        <SequencePlayer vis={vis} ns={noteSequence} player={player} totalTime={totalTime} updateTime={updateTime}/>
        <LoadAudio setAudio={setAudio} setNoteSequence={setNoteSequence} />
        <TempoControl player={player} />
      </div>
      <div id='visualizers'>
        <canvas onClick={changeTime} onMouseMove={showLine} id='vis2'></canvas>
        <div id='vis1'></div>
      </div>
      
      
    </>
  )
}

export default App
