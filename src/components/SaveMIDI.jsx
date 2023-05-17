import { sequenceProtoToMidi } from "@magenta/music/es6";
import saveAs from "./saveAs";


export default function SaveMIDI(props){

    function handleClick(){
        // console.log('saved');
        // let midi = sequenceProtoToMidi(props.ns);
        // console.log(midi);
        // let file1 = new File([sequenceProtoToMidi(props.ns)], 'AudioToMIDI.mid');
        // console.log(file1);
        // saveAs(new File([sequenceProtoToMidi(props.ns)], 'AudioToMIDI.mid'));

        
    }

    return(
        <button disabled={(props.ns == null ? true : false)} 
                class='save-button' 
                onClick={handleClick}>Save MIDI
        </button>
    );
}