

export default function SaveMIDI(props){

    function handleClick(){
        console.log('saved');
        // saveAs(new File([mm.sequenceProtoToMidi(props.ns)], 'AudioToMIDI.mid'));
    }

    return(
        <button disabled={(props.ns == null ? true : false)} 
                class='save-button' 
                onClick={handleClick}>Save MIDI
        </button>
    );
}