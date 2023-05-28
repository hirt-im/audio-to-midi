# Audio to MIDI

Upload an audio file and have the notes transcribed and displayed. Control playback with a slider to adjust the rate and a pause/play button. Go to a specific part of the song by clicking on the note visualization located directly below the controls. Save the transcription as a MIDI file to use as you please in other software.

Works best on solo piano performances, but audio files containing other instruments can be transcribed as well, though the results will be less accurate. Trying to transcribe audio files containing multiple different instruments playing at the same time is not likely to lead to good results.

Utilizes the [Onsets and Frames](https://magenta.tensorflow.org/onsets-frames) model from [Magenta.js](https://magenta.tensorflow.org/). 
