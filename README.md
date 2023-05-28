# audio-to-midi

Transcribe audio files to MIDI, utilizing the [Onsets and Frames](https://magenta.tensorflow.org/onsets-frames) model [from Magenta.js](https://magenta.tensorflow.org/). Works best on solo piano performances, but audio files containing other instruments can be transcribed as well, though the results will be less accurate. Trying to transcribe audio files containing multiple different instruments playing at the same time is not likely to lead to good results.
