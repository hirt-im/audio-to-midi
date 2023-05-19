import LoadAudio from './components/LoadAudio'
import './App.css'
import { useState } from 'react'
import { WaterfallSVGVisualizer, 
         NoteSequence, 
         SoundFontPlayer, 
         PianoRollCanvasVisualizer,
         OnsetsAndFrames } from '@magenta/music/es6';
import SequencePlayer from './components/SequencePlayer';
import classifySharps from './components/classifySharps';
import TempoControl from './components/TempoControl';
import SaveMIDI from './components/SaveMIDI';
import Description from './components/Description';
import { create } from 'zustand'


export const useStore = create((set) => ({
  loading: false,
  setLoading: () => set({loading: true})
}))

const ACTIVE_KEY_COLOR = '255, 201, 25';
const VIS2_KEY_COLOR = '200, 200, 200';
const WHITE_WIDTH = Math.round(window.innerWidth / 85);
const BLACK_WIDTH = Math.round(WHITE_WIDTH * (5 / 9));

const OAF = new OnsetsAndFrames("https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni");
OAF.initialize();


function App() {
  const [noteSequence, setNoteSequence] = useState(null);
  
  let vis, vis2, player;
  if(noteSequence != null){
    vis = new WaterfallSVGVisualizer(
      noteSequence, 
      document.getElementById('vis1'),
      {
        activeNoteRGB: ACTIVE_KEY_COLOR,
        noteHeight: 50,
        pixelsPerTimeStep: 200,
        noteSpacing: 10,
        whiteNoteWidth: WHITE_WIDTH,
        blackNoteWidth: BLACK_WIDTH
      }
    );
    classifySharps(vis, BLACK_WIDTH);

    vis2 = new PianoRollCanvasVisualizer(
      noteSequence, 
      document.getElementById('vis2'),
      {
        noteRGB: VIS2_KEY_COLOR,
        activeNoteRGB: ACTIVE_KEY_COLOR
      }
    );

    player = new SoundFontPlayer(
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
    player.loadSamples(noteSequence);
  }


  function changeTime(e){
    let playState = player.getPlayState();
    if(playState === 'stopped'){player.start(noteSequence);}
    else if(playState === 'paused'){player.resume();}

    //calculate time to seekTo using ratio of x position over total width of visualizer2
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let ratio = x / rect.width;
    let newTime = ratio * noteSequence.totalTime;

    //account for altered tempo
    let tempo;
    (player.desiredQPM == undefined ? tempo = 120 : tempo = player.desiredQPM);
    let tempoRatio = tempo / 120;
    player.seekTo(newTime / tempoRatio);

    //scroll down visualizer1
    let container = document.getElementsByClassName('waterfall-notes-container')[0];
    container.scrollTop = container.scrollHeight - (ratio * container.scrollHeight);
  }       

  
  return (
    <div id='container'>
      <div id='controls'>
        <LoadAudio OAF={OAF} setNoteSequence={setNoteSequence} />
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
            <Description />
          </div>
        </div>
      </div> 
    </div>
  )
}


export default App
