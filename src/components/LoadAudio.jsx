import * as mm from "@magenta/music/es6";
import { useStore } from '../App';


export default function LoadAudio(props){
  const {setLoading} = useStore();

  function loadFromFile(e){
    mm.Player.tone.Transport.stop();
    mm.Player.tone.Transport.cancel();
    setLoading();
    props.OAF.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
      props.setNoteSequence(ns);
    })
  }

  return (
    <>
      <input type="file"  onChange={loadFromFile} id="files"/>
      <label id='file-label' for="files">Upload File</label>
    </>
  );
}

