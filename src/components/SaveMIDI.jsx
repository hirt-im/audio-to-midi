

export default function SaveMIDI(props){

    let loaded;
    (props.ns == null ? loaded = false : loaded = true);


    function handleClick(){
        console.log('saved');
    }

    if(!loaded){
        return(
            <button disabled='true' class='save-button' >Save MIDI</button>
        );
    }

    return(
        <button class='save-button' onClick={handleClick}>Save MIDI</button>
    );
}