import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState, useEffect } from 'react'
import PlayBackRate from './components/TempoControl';
import { WaterfallSVGVisualizer, NoteSequence, SoundFontPlayer, PianoRollCanvasVisualizer } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';
import colorBlackKeys from './components/colorBlackKeys';
import classifySharps from './components/classifySharps';
import TempoControl from './components/TempoControl';
import * as mm from '@magenta/music/es6';
import SaveMIDI from './components/SaveMIDI';
import Description from './components/Description';
import { create } from 'zustand'

export const uesStore = create((set) => ({
  loading: false,
  setLoading: () => set({ loading: true})
}))


// const BLACK_KEY_COLOR = 'rgba(0, 204, 197, 0.79)';
const WHITE_KEY_COLOR = '195, 219, 222';
const ACTIVE_KEY_COLOR = '255, 215, 18';
// const ACTIVE_KEY_COLOR = '81, 207, 252';


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
  const [noteSequence, setNoteSequence] = useState(null);
  const [vis, setVis] = useState();
  const [vis2, setVis2] = useState();


  function visualize(){
    let visualizer = new WaterfallSVGVisualizer(
      noteSequence, 
      document.getElementById('vis1'),
      {
        noteRGB: WHITE_KEY_COLOR,
        activeNoteRGB: ACTIVE_KEY_COLOR,
        noteHeight: 50,
        pixelsPerTimeStep: 200,
        noteSpacing: 10,
        whiteNoteWidth: WHITE_WIDTH,
        blackNoteWidth: BLACK_WIDTH,
        showOnlyOctavesUsed: true
      }
    );
   
    let visualizer2 = new PianoRollCanvasVisualizer(noteSequence, document.getElementById('vis2'),
      {
        noteRGB: WHITE_KEY_COLOR,
        activeNoteRGB: ACTIVE_KEY_COLOR
      }
    );

    classifySharps(visualizer, BLACK_WIDTH);
    setVis(visualizer);
    setVis2(visualizer2);
  }


  useEffect(()=>{
    if(noteSequence === null){return;}
    visualize();
  }, [noteSequence])



  const player = new SoundFontPlayer(
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
    undefined,undefined,undefined,
    {
      run: (note = NoteSequence.Note) => {
        vis.redraw(note, true);
        vis2.redraw(note,true);

        // draw vertical line where active note is on vis2
        let canvas = vis2.ctx.canvas;
        let x = (note.startTime / noteSequence.totalTime) * canvas.width;
        vis2.ctx.strokeStyle = 'white';
        vis2.ctx.beginPath();
        vis2.ctx.moveTo(x, 0);
        vis2.ctx.lineTo(x, canvas.height);
        vis2.ctx.stroke();
      }
    }
  );

  function changeTime(e){
    if(!player.isPlaying()){
      player.start(noteSequence);
    }
    else if(player.getPlayState() === 'paused'){
      player.resume();
    }

    let tempo;
    (player.desiredQPM == undefined ? tempo = 120 : tempo = player.desiredQPM);
    let tempoRatio = tempo / 120;

    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let ratio = x / rect.width;
    let newTime = ratio * noteSequence.totalTime;
    player.seekTo(newTime / tempoRatio);

    //scroll down visualizer1 when you seek
    let container = document.getElementsByClassName('waterfall-notes-container')[0];
    container.scrollTop = container.scrollHeight - (ratio * container.scrollHeight);
  }       
  

  return (
    <div id='container'>
      <div id='controls'>
        <LoadAudio setNoteSequence={setNoteSequence} />
        <div id='audio-controls'>
          <SequencePlayer vis={vis} ns={noteSequence} player={player} />
          <TempoControl player={player} />
        </div>
        <SaveMIDI ns={noteSequence} />
      </div>
      <div id='visualizers'>
        <canvas onClick={changeTime} id='vis2'></canvas>
        <div id='vis1-container'>
          <div id='vis1'>
            {(noteSequence == null ? <Description /> : null)}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default App
