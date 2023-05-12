import { SoundFontPlayer, NoteSequence } from '@magenta/music/es6';
import { useState, useEffect } from 'react'


export default function SequencePlayer(props){
    const [playPause, setPlayPause] = useState('play');

    let p = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
                                undefined,undefined,undefined,
                                {
                                    run: (note = NoteSequence.Note) => {
                                      if(note.pitch > 58){
                                        props.vis.config = {noteRGB: '233, 111, 199'};
                                      }


                                        props.vis.redraw(note, true);
                                        console.log(props.vis);
                                        console.log(note.pitch);

                                        
                                        // if note is sharp, make fill color BLACK_KEY
                                        // then redraw
                                        // then turn fill back to WHITE_KEY
                                    }
                                });
    
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