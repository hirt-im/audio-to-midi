export default function TempoControl(props){
    function handleClick(){
        console.log(props.player);
        // props.player.setTempo(123);
        // console.log(props.player);
    }
    return(
        <button onClick={handleClick}>Set Tempo to 50</button>
    );
}