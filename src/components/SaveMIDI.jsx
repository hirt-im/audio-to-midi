import { sequenceProtoToMidi } from "@magenta/music/es6";


export default function SaveMIDI(props){

    function handleClick(){
        // Convert note sequence to a MIDI file
        const midiData = sequenceProtoToMidi(props.ns);

        // Create a Uint8Array from the MIDI data
        const uintArray = new Uint8Array(midiData);

        // Create a Blob from the Uint8Array
        const blob = new Blob([uintArray], { type: 'audio/midi' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a download link for the MIDI file
        const downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = url;
        downloadLink.download = 'output.mid';
        downloadLink.innerHTML = 'Download MIDI file';

        // Append the download link to the document
        document.body.appendChild(downloadLink);

        // Click the download link to trigger the download
        downloadLink.click();
    }

    return(
        <button disabled={(props.ns == null ? true : false)} 
                class='save-button' 
                onClick={handleClick}>Save MIDI
        </button>
    );
}