# React-react-studio-js

![Screenshot](img/ref_1.png?raw=true 'stem tracks mute solo volume control')

features
Record track,
cut,
split,
shift track,
CRUD operations for Annotations,
save to local storage(optional)
![Screenshot](img/ref_2.png?raw=true 'add annotations and crud operations')

## for TypeScript Support
download the file "react-studio-js.d.ts" and add to your source
https://github.com/TareqFl/-types-react-studio-js

## Demo

[React Example](https://react-studio-js-example.vercel.app/) |
[React Example Github](https://github.com/TareqFl/react-studio-js-example)

## Browser Support

react-studio-js requires webaudio in the browser to function correctly: [Can I Use?](http://caniuse.com/#search=webaudio)

## Installation

`npm i react-studio-js`

## Basic Usage

```javascript
import ReactStudio from 'react-studio-js';

// =============Annotations Actions================>
const actions = [
  {
    class: 'fas.fa-play',
    title: 'Play Annotation',
    action: (annotation) => {
      ee.emit('play', annotation.start, annotation.end);
    },
  },
  {
    class: 'fas.fa-plus',
    title: 'Insert New Annotation',
    action: (annotation, i, annotations, opts) => {
      if (i === annotations.length - 1) {
        return console.log('not possible');
      }

      let newIndex = i + 1;
      const newAnnotation = {
        id: String(newIndex),
        start: annotation.end,
        end: annotations[i + 1].start,
        lines: ['New Draft'],
        lang: 'en',
      };

      annotations.forEach((ann, indx) => {
        if (indx >= newIndex) {
          return (ann.id = String(indx + 1));
        }
      });
      annotations.splice(i + 1, 0, newAnnotation);
    },
  },

  {
    class: 'fas.fa-trash',
    title: 'Delete annotation',
    action: (annotation, i, annotations) => {
      annotations.splice(i, 1);
    },
  },
];

// =============Annotations Actions================>

var playlist = ReactStudio({
  samplesPerPixel: 3000,
  mono: true,
  waveHeight: 70,
  timescale: true,
  container: document.getElementById('playlist'),
  state: 'cursor',
  colors: {
    waveOutlineColor: '#222B36',
    timeColor: 'grey',
    fadeColor: 'black',
  },
  controls: {
    show: true,
    width: 175,
    widgets: {
      collapse: false,
    },
  },
  annotationList: {
    annotations: [],
    controls: actions,
    editable: true,
    isContinuousPlay: false,
    linkEndpoints: false,
  },
  zoomLevels: [500, 1000, 3000, 5000],
});

playlist
  .load([
    {
      src: 'track 1 source',
      name: 'name',
      gain: 1,
    },
    {
      src: 'track 2 source',
      name: 'name',
      start: 8.5,
      fadeIn: {
        duration: 0.5,
      },
      fadeOut: {
        shape: 'logarithmic',
        duration: 0.5,
      },
    },
  ])
  .then(function () {
    // can do stuff with the playlist.
  });
```

### Playlist Options

```javascript
var options = {
  // webaudio api AudioContext
  ac: new (window.AudioContext || window.webkitAudioContext)(),

  // DOM container element REQUIRED
  container: document.getElementById('playlist'),

  // sample rate of the project. (used for correct peaks rendering)
  sampleRate: new (
    window.AudioContext || window.webkitAudioContext
  ).sampleRate(),

  // number of audio samples per waveform peak.
  // must be an entry in option: zoomLevels.
  samplesPerPixel: 4096,

  // whether to draw multiple channels or combine them.
  mono: true,

  // enables "exclusive solo" where solo switches between tracks
  exclSolo: false,

  // default fade curve type.
  fadeType: 'logarithmic', // (logarithmic | linear | sCurve | exponential)

  // whether or not to include the time measure.
  timescale: false,

  // control panel on left side of waveform
  controls: {
    // whether or not to include the track controls
    show: false,

    // width of controls in pixels
    width: 150,

    // whether to render the widget or not in the controls panel.
    widgets: {
      // Mute & solo button widget
      muteOrSolo: true,

      // Volume slider
      volume: true,

      // Stereo pan slider
      stereoPan: true,

      // Collapse track button
      collapse: true,

      // Remove track button
      remove: true,
    },
  },

  colors: {
    // color of the wave background
    waveOutlineColor: 'white',

    // color of the time ticks on the canvas
    timeColor: 'grey',

    // color of the fade drawn on canvas
    fadeColor: 'black',
  },

  // height in pixels of each canvas element a waveform is on.
  waveHeight: 128,

  // width in pixels of waveform bars.
  barWidth: 1,

  // spacing in pixels between waveform bars.
  barGap: 0,

  // interaction state of the playlist
  // (cursor | select | fadein | fadeout | shift)
  state: 'cursor',

  // (line | fill)
  seekStyle: 'line',

  // Array of zoom levels in samples per pixel.
  // Smaller numbers have a greater zoom in.
  zoomLevels: [512, 1024, 2048, 4096],

  // Whether to automatically scroll the waveform while playing
  isAutomaticScroll: false,

  // configuration object for the annotations add on.
  annotationList: {
    // Array of annotations in [Aeneas](https://github.com/readbeyond/aeneas) JSON format
    annotations: [],

    // Whether the annotation texts will be in updateable contenteditable html elements
    editable: false,

    // User defined functions which can manipulate the loaded annotations
    controls: [
      {
        // class names for generated <i> tag separated by '.'
        class: 'fa.fa-minus',

        // title attribute for the generated <i> tag
        title: 'Reduce annotation end by 0.010s',

        // function which acts on the given annotation row
        // when the corresponding <i> is clicked.
        action: (annotation, i, annotations, opts) => {
          // @param Object annotation - current annotation
          // @param Number i - index of annotation
          // @param Array annotations - array of annotations in the playlist
          // @param Object opts - configuration options available
          //      - opts.linkEndpoints
        },
      },
    ],

    // If false when clicking an annotation id segment
    // playback will stop after segment completion.
    isContinuousPlay: false,

    // If true annotation endpoints will remain linked when dragged
    // if they were the same value before dragging started.
    linkEndpoints: false,

    // pass a custom function which will receive the mastergainnode for this playlist and the audio context's destination.
    // if you pass a function, you must connect these two nodes to hear sound at minimum.
    // if you need to clean something up when the graph is disposed, return a cleanup function. react-studio-js will cleanup the nodes passed as arguments.
    effects: function (masterGainNode, destination, isOffline) {
      // analyser nodes don't work offline.
      if (!isOffline) masterGainNode.connect(analyser);
      masterGainNode.connect(destination);

      // return function cleanup() {
      //   // if you create webaudio nodes that need to be cleaned up do that here
      //   // see the track effects example.
      // };
    },
  },
};
```

### Track Options

```javascript
{
  // a media path for XHR, a Blob, a File, or an AudioBuffer object.
  src: 'track source .mp3 .wav',

  // name that will display in the playlist control panel.
  name: 'name',

  // volume level of the track between [0-1]
  gain: 1,

  // whether the track should initially be muted.
  muted: false,

  // whether the track should initially be soloed.
  soloed: false,

  // time in seconds relative to the playlist
  // ex (track will start after 8.5 seconds)
  // DEFAULT 0 - track starts at beginning of playlist
  start: 8.5,

  // track fade in details
  fadeIn: {
    // fade curve shape
    // (logarithmic | linear | sCurve | exponential)
    shape: 'logarithmic',

    // length of fade starting from the beginning of this track, in seconds.
    duration: 0.5,
  },

  // track fade out details
  fadeOut: {
    // fade curve shape
    // (logarithmic | linear | sCurve | exponential)
    shape: 'logarithmic',

    //length of fade which reaches the end of this track, in seconds.
    duration: 0.5,
  }

  // where the waveform for this track should begin from
  // ex (Waveform will begin 15 seconds into this track)
  // DEFAULT start at the beginning - 0 seconds
  cuein: 15,

  // where the waveform for this track should end
  // ex (Waveform will end at 30 second into this track)
  // DEFAULT duration of the track
  cueout: 30,

  // custom class for unique track styling
  customClass: 'vocals',

  // custom background-color for the canvas-drawn waveform
  waveOutlineColor: '#f3f3f3',

  // interaction states allowed on this track.
  // DEFAULT - all true
  states: {
    cursor: true,
    fadein: true,
    fadeout: true,
    select: true,
    shift: true,
  },

  // pre-selected section on track.
  // ONLY ONE selection is permitted in a list of tracks, will take most recently set if multiple passed.
  // This track is marked as 'active'
  selected: {
    // start time of selection in seconds, relative to the playlist
    start: 5,

    // end time of selection in seconds, relative to the playlist
    end: 15,
  },

  // value from -1 (full left pan) to 1 (full right pan)
  stereoPan: 0,

  // pass a custom function which will receive the last graphnode for this track and the mastergainnode.
  // if you pass a function, you must connect these two nodes to hear sound at minimum.
  // if you need to clean something up when the graph is disposed, return a cleanup function. react-studio-js will cleanup the nodes passed as arguments.
  effects: function(graphEnd, masterGainNode, isOffline) {
    var reverb = new Tone.Reverb(1.2);

    Tone.connect(graphEnd, reverb);
    Tone.connect(reverb, masterGainNode);

    return function cleanup() {
      reverb.disconnect();
      reverb.dispose();
    }
  }
}
```

### Playlist Events

react-studio-js uses an instance of [event-emitter](https://www.npmjs.com/package/event-emitter) to send & receive messages from the playlist.

```javascript
import EventEmitter from 'event-emitter';
import ReactStudio from 'react-studio-js';

var playlist = WaveformPlaylist(
  {
    container: document.getElementById('playlist'),
  },

  // you can pass your own event emitter
  EventEmitter()
);

// retrieves the event emitter the playlist is using.
var ee = playlist.getEventEmitter();
```

An example of using the event emitter to control the playlist can be found in [/dist/js/examples/emitter.js](https://github.com/naomiaro/waveform-playlist/blob/main/dist/waveform-playlist/js/emitter.js)

#### Events to Invoke

| event                 | arguments                                            | description                                                                                                                                                                                          |
| --------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `play`                | `start:optional, end:optional`                       | Starts playout of the playlist. Takes optional Number parameters in seconds `start` and `end` to play just an audio segment. `start` can be passed without an `end` to play to the end of the track. |
| `pause`               | _none_                                               | Pauses playout of the playlist.                                                                                                                                                                      |
| `stop`                | _none_                                               | Stops playout of the playlist.                                                                                                                                                                       |
| `rewind`              | _none_                                               | Stops playout if playlist is playing, resets cursor to the beginning of the playlist.                                                                                                                |
| `fastforward`         | _none_                                               | Stops playout if playlist is playing, resets cursor to the end of the playlist.                                                                                                                      |
| `clear`               | _none_                                               | Stops playout if playlist is playing, removes all tracks from the playlist.                                                                                                                          |
| `record`              | _none_                                               | Starts recording an audio track. Begins playout of other tracks in playlist if there are any.                                                                                                        |
| `zoomin`              | _none_                                               | Changes zoom level to the next smallest entry (if one exists) from the array `zoomLevels`.                                                                                                           |
| `zoomout`             | _none_                                               | Changes zoom level to the next largest entry (if one exists) from the array `zoomLevels`.                                                                                                            |
| `trim`                | _none_                                               | Trims currently active track to the cursor selection.                                                                                                                                                |
| `cut`                 | _none_                                               | cuts currently active track to the cursor selection.                                                                                                                                                 |
| `split`               | _none_                                               | split currently active track                                                                                                                                                                         |
| `statechange`         | `cursor` / `select` / `fadein` / `fadeout` / `shift` | Changes interaction state to the state given.                                                                                                                                                        |
| `fadetype`            | `logarithmic` / `linear` / `sCurve` / `exponential`  | Changes playlist default fade type.                                                                                                                                                                  |
| `newtrack`            | `File`                                               | Loads `File` object into the playlist.                                                                                                                                                               |
| `addAnnotation`       | `json`                                               | adds Annotations for current playlist.                                                                                                                                                               |
| `clearAnnotations`    | _none_                                               | clears loaded annotations.                                                                                                                                                                           |
| `volumechange`        | `volume, track`                                      | Set volume of `track` to `volume` (0-100)                                                                                                                                                            |
| `mastervolumechange`  | `volume`                                             | Set a new master volume `volume` (0-100)                                                                                                                                                             |
| `select`              | `start, end, track:optional`                         | Seek to the start time or start/end selection optionally with active track `track`.                                                                                                                  |
| `startaudiorendering` | `wav` / `buffer`                                     | Request for a downloadable file or web Audio buffer that represent the current work                                                                                                                  |
| `automaticscroll`     | `true`/`false`                                       | Change property `isAutomaticScroll`.                                                                                                                                                                 |
| `continuousplay`      | `true`/`false`                                       | Change property `isContinuousPlay`.                                                                                                                                                                  |
| `linkendpoints`       | `true`/`false`                                       | Change property `linkEndpoints`.                                                                                                                                                                     |
| `annotationsrequest`  | _none_                                               | Requests to download the annotations to a json file.                                                                                                                                                 |
| `stereopan`           | `panvalue, track`                                    | Set pan value of `track` to `panvalue` (-1-1)                                                                                                                                                        |

#### Events to Listen to

| event                      | arguments                       | description                                                                                                                                                                                                         |
| -------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `select`                   | `start, end, track`             | Cursor selection has occurred from `start` to `end` with active Track `track`.                                                                                                                                      |
| `timeupdate`               | `playbackPosition`              | Sends current position of playout `playbackPosition` in seconds.                                                                                                                                                    |
| `scroll`                   | `scrollLeft`                    | Sends current position of scroll `scrollLeft` in seconds.                                                                                                                                                           |
| `statechange`              | `state`                         | Sends current interaction state `state`.                                                                                                                                                                            |
| `shift`                    | `deltaTime, track`              | Sends `deltaTime` in seconds change for Track `track`                                                                                                                                                               |
| `mute`                     | `track`                         | Mute button has been pressed for `track`                                                                                                                                                                            |
| `solo`                     | `track`                         | Solo button has been pressed for `track`                                                                                                                                                                            |
| `enableCut`                | `boolean`                       | Emits a boolean value when a region is made (optional)                                                                                                                                                              |
| `enableSplit`              | `boolean`                       | Emits a boolean value to enable split (optional)                                                                                                                                                                    |
| `removeTrack`              | `track`                         | Remove button has been pressed for `track`                                                                                                                                                                          |
| `removeTrackFromDb`        | `track`                         | Event listener to remove track from local storage (opotional)`track`                                                                                                                                                |
| `saveTracksToLocalStorage` | `track`                         | Event listener for track update and save to local storage (optional) `track`                                                                                                                                        |
| `saveToLocalFromSplit`     | `track`                         | Event listener for track update on split and save to local storage(optional)`track`                                                                                                                                 |
| `getTrackDuration`         | `playlist duration`             | Event listener for playlist duration.                                                                                                                                                                               |
| `newTimeDurationAfterEdit` | `playlist duration`             | Event listener for playlist duration after edit.                                                                                                                                                                    |
| `changeTrackView`          | `track, opts`                   | Collapse button has been pressed for `track`                                                                                                                                                                        |
| `volumechange`             | `volume, track`                 | Volume of `track` has changed to `volume` (0-100)                                                                                                                                                                   |
| `mastervolumechange`       | `volume`                        | Master volume of the playlist has changed to `volume` (0-100)                                                                                                                                                       |
| `audiorequeststatechange`  | `state, src`                    | Loading audio `src` (`string` or `File`) is now in state (Number) UNINITIALIZED = 0, LOADING = 1, DECODING = 2,FINISHED = 3,                                                                                        |
| `loadprogress`             | `percent, src`                  | Loading audio `src` has loaded percent `percent` (0-100)                                                                                                                                                            |
| `audiosourcesloaded`       | _none_                          | Audio decoding has finished for all tracks                                                                                                                                                                          |
| `tracksUpdated`            | `boolean`                       | Event Listener when tracks are loaded that recieves a bool.                                                                                                                                                         |
| `audiosourcesrendered`     | _none_                          | Tracks are rendered to the playlist                                                                                                                                                                                 |
| `tracksLeft`               | _none_                          | Tracks remaining in the playlist.                                                                                                                                                                                   |
| `audiosourceserror`        | `err`                           | Error thrown while loading tracks                                                                                                                                                                                   |
| `finished`                 | _none_                          | Event fired when cursor ( while playing ) reaches the end (maximum duration)                                                                                                                                        |
| `audiorenderingstarting`   | `offlineCtx, setUpPromiseArray` | Event fired after the OfflineAudioContext is created before any rendering begins. If any setup is async before offline redering, push a promise to the setUpPromiseArray.                                           |
| `audiorenderingfinished`   | `type, data`                    | Return the result of the rendering in the desired format. `type` can be `buffer` or `wav` and can be used to dertermine the `data` type. When `type` is `wav`, data is a `blob` object that represent the wav file. |
| `stereopan`                | `panvalue, track`               | Pan value of `track` has been changed to `panvalue`                                                                                                                                                                 |

## Tests

`npm test`

## Development without example changes

`npm install && npm start`

This will install dependencies and start the webpack server.

`npm install && npm run dev`

This will build and watch the jekyll site and startup the webpack dev server.

## License

[MIT License](http://doge.mit-license.org)
