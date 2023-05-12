import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'


const SHARP_NOTES = [70,73,75,78,80,82,85,87,90,92,94,97,99,102,104,106,
                    68,66,63,61,58,56,54,51,49,46,44,42,39,37,34,32,30,27,25,22];

const WHITE_KEY_FILL = '8, 41, 64';
const BLACK_KEY_FILL = '0, 204, 197';


export default function SequencePlayer(props){
    const [playPause, setPlayPause] = useState('play');

    let p = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
                                undefined,undefined,undefined,
                                {
                                    run: (note = NoteSequence.Note) => {
                                      if(SHARP_NOTES.includes(note.pitch)){
                                        props.vis.config.noteRGB = BLACK_KEY_FILL;
                                      }
                                      
                                      else {
                                        props.vis.config.noteRGB = WHITE_KEY_FILL; 
                                      }

                                      props.vis.redraw(note, true);

                                      
                                      



                                        console.log(props.vis);
                                        console.log(SHARP_NOTES.includes(note.pitch), props.vis.config.noteRGB);

                                        
                                        // if note is sharp, make fill color BLACK_KEY
                                        // then redraw
                                        // then turn fill back to WHITE_KEY
                                    }
                                });
    p.setTempo(55);
    
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