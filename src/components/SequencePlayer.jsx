import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'


const SHARP_NOTES = [70,73,75,78,80,82,85,87,90,92,94,97,99,102,104,106,
                    68,66,63,61,58,56,54,51,49,46,44,42,39,37,34,32,30,27,25,22];

const WHITE_KEY_FILL = '8, 41, 64';
const BLACK_KEY_FILL = '0, 204, 197';
const BLACK_ACTIVE = '235, 171, 52';
const WHITE_ACTIVE = '255, 215, 18';

const BLACK_KEY_COLOR = 'rgba(0, 204, 197, 0.79)';
let whiteWidth = Math.round(window.innerWidth / 65);
  let blackWidth = Math.round(whiteWidth * (5 / 9));

function colorBlackKeys(vis){
  let rects = vis.svg.children;
  for (let i = 0; i < rects.length; i++){
    console.log(rects[i].attributes[4].value);
    let width = rects[i].attributes[4].value;
    if (width == blackWidth){
      rects[i].attributes.fill.value = (BLACK_KEY_COLOR);
  }
}
}

export default function SequencePlayer(props){
    const [playPause, setPlayPause] = useState('play');

    let p = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
                                undefined,undefined,undefined,
                                {
                                    run: (note = NoteSequence.Note) => {
                                      // if(SHARP_NOTES.includes(note.pitch)){
                                      //   props.vis.config.activeNoteRGB = BLACK_ACTIVE;
                                      // }
                                      
                                      // else {
                                      //   props.vis.config.noteRGB = WHITE_ACTIVE; 
                                      // }
                                      colorBlackKeys(props.vis)

                                      props.vis.redraw(note, true);

                                      
                                      



                                        console.log(props.vis);
                                        console.log(SHARP_NOTES.includes(note.pitch), props.vis.config.noteRGB);

                                        
                                        //OHHHHHHH it redraws the entire sequence every time, thats why
                                        // lmaoooooooo
                                    }
                                });
    // p.setTempo(55);
    
    function handleClick(){

        if (playPause === 'play'){
          p.start(props.vis.noteSequence);
          console.log(p);
          setPlayPause('pause');
        }
    
        else {
          p.stop();
          setPlayPause('play');
          console.log('pause');
        }
    }

    return (
        <div>
          <button onClick={handleClick}>Play/Pause</button>
        </div>
      );
}