export default function Description(){
    return(
        <div id='description'>
            <p>Upload an audio file and have it converted into MIDI!
            <br></br><br></br>
            Works best on solo piano performances, but feel free 
            to upload audio of other instruments to see what happens! 😋
            <br></br><br></br>
            Please be patient after selecting your file. The longer the audio, the longer it takes to process!
            </p>
            <br></br><br></br>

            <div id='made-with'>
                Made with 
                <a href='https://magenta.tensorflow.org/'>
                    <img src="https://magenta.tensorflow.org/assets/magenta-logo.png" height='50' 
                    style={{ verticalAlign: 'center'}}>
                    </img>
                </a>
            </div>
        </div>
    );
}