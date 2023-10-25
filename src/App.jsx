import React, { useCallback, useReducer, useRef } from 'react';
import ReactStudio from 'react-studio-js';
import * as Tone from 'tone';
import EventEmitter from 'event-emitter';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
// ===========================================================>
import { Box, Paper } from '@mui/material';
// ===========================================================>
import DialogBox from './components/DialogBox';
import CustomAudioBar from './components/CUSTOM/audioBar/CustomAudioBar';
import { dark } from './theme';
import NavBar from './components/NavBar';
import { useThemeSettings } from './hooks';
import EditorButtons from './components/editorButtons/EditorButtons';
// ===========================================================>

const Editor = () => {
  const {
    theme,
    setEventEmitter,
    podcast,
    showAnnotations,
    setShowAnnotations,
    enableAnnotations,
    setEnableAnnotations,
    dialogBox,
    setDialogBox,
  } = useThemeSettings();

  const { backgroundColor, textColor } = theme;

  // =============Types================>
  const SETBUTTONS = 'SETBUTTONS';
  const SETENABLECUT = 'SETENABLECUT';
  const SETENEABLESPLIT = 'SETENEABLESPLIT';
  const PLAYLIST = 'PLAYLIST';
  // =============Types================>

  // =============Initial State================>
  const initialState = {
    ee: new EventEmitter(),
    toneCtx: Tone.getContext(),
    setUpChain: useRef(),
    uploadRef: useRef(null),
    uploadAnnRef: useRef(null),
    allbuttons: true,
    enableCut: true,
    enableSplit: true,
    playlist: () => {},
  };
  // =============Initial State================>
  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case SETBUTTONS:
        return { ...state, allbuttons: payload };

      case SETENABLECUT:
        return { ...state, enableCut: payload };
      case SETENEABLESPLIT:
        return { ...state, enableSplit: payload };
      case PLAYLIST:
        return { ...state, playlist: payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    ee,
    toneCtx,
    setUpChain,
    uploadRef,
    uploadAnnRef,
    allbuttons,
    enableCut,
    enableSplit,
  } = state;

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

  // =============>Init React-Studio<================>
  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
        const playlist = ReactStudio(
          {
            ac: toneCtx.rawContext,
            container: node,
            state: 'cursor',
            mono: true,
            samplesPerPixel: 500,
            waveHeight: 100,
            isAutomaticScroll: true,
            timescale: false,
            barGap: 1,
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

            zoomLevels: [500, 1000, 2000],
            seekStyle: 'fill',
          },
          ee
        );
        dispatch({
          type: PLAYLIST,
          payload: playlist,
        });
        ee.on('audiorenderingstarting', function (offlineCtx, a) {
          // Set Tone offline to render effects properly.
          const offlineContext = new Tone.OfflineContext(offlineCtx);
          Tone.setContext(offlineContext);
          setUpChain.current = a;
        });

        ee.on('audiorenderingfinished', function (type, data) {
          //restore original ctx for further use.
          Tone.setContext(toneCtx);
          if (type === 'wav') {
            saveAs(data, `${podcast}.wav`);
          }
        });
        // open Modal when adding a track or tracks on init
        ee.on('audiosources_rendering', () => setDialogBox(true));
        // close modal when all tracks are added
        ee.on('audiosourcesrendered', () => {
          setDialogBox(false);
        });

        // display audio Bar
        ee.on('tracksUpdated', (e) =>
          dispatch({
            type: SETBUTTONS,
            payload: e,
          })
        );

        ee.on(
          'tracksLeft',
          (tracks) =>
            tracks === 0 &&
            dispatch({
              type: SETBUTTONS,
              payload: true,
            })
        );

        //  handle wrong audio type load error
        ee.on('audiosourceserror', (e) =>
          alert(e.message + ' ' + 'please only use type mp3')
        );
        // disable enable cut when a region is made
        ee.on('enableCut', (fact) =>
          dispatch({
            type: SETENABLECUT,
            payload: fact,
          })
        );

        ee.on('enableSplit', (fact) =>
          dispatch({
            type: SETENEABLESPLIT,
            payload: fact,
          })
        );
        ee.on('clearAnnotations', () => {
          // Enable interaction Buttons
          setEnableAnnotations(true);
          // Display Annotations
          setShowAnnotations(false);
        });

        // ===========================================

        playlist.initExporter();
        // set Event emitter to context api
        setEventEmitter(ee);
      }
    },
    [ee, toneCtx]
  );
  // =============>Init React-Studio<================>

  // Handlers

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    ee.emit('newtrack', {
      file: file,
      name: file.name,
      id: uuidv4(),
    });
    uploadRef.current.value = '';
  }

  function handleClick(event) {
    const { name } = event.target;

    switch (name) {
      case 'play':
        return ee.emit('play');
      case 'pause':
        return ee.emit('pause');
      case 'cursor':
        return ee.emit('statechange', 'cursor');
      case 'region':
        return ee.emit('statechange', 'select');
      case 'shift':
        return ee.emit('statechange', 'shift');
      case 'trim':
        return ee.emit('trim');
      case 'cut':
        ee.emit('cut');
        return dispatch({
          type: SETENABLECUT,
          payload: true,
        });
      case 'split':
        return ee.emit('split');
      case 'fadein':
        return ee.emit('statechange', 'fadein');
      case 'fadeout':
        return ee.emit('statechange', 'fadeout');
      case 'zoomin':
        return ee.emit('zoomin');
      case 'zoomout':
        return ee.emit('zoomout');
      case 'upload':
        return uploadRef.current.click();
      case 'download':
        return ee.emit('startaudiorendering', 'wav');
      case 'addAnnotation':
        return uploadAnnRef.current.click();
      case 'downloadAnnotation':
        return ee.emit('annotationsrequest');
      case 'clearAnnotations':
        return ee.emit('clearAnnotations');

      default:
        break;
    }
  }

  // upload Annotation
  function handleAnnUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const fileContents = e.target.result;

        const jsonData = JSON.parse(fileContents);

        ee.emit('addAnnotation', jsonData);

        setShowAnnotations(true);

        setEnableAnnotations(false);
        uploadAnnRef.current.value = '';
      } catch (err) {
        console.log(err);
      }
    };
    reader.readAsText(file);
  }

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor,
        color: textColor,
        paddingTop: 10,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <NavBar />
      <DialogBox open={dialogBox} />

      <Box>
        <EditorButtons
          handleClick={handleClick}
          cutButton={enableCut}
          disabled={allbuttons}
          splitButton={enableSplit}
          enableAnnotations={enableAnnotations}
        />

        {/* Editor and upload button */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <input
            ref={uploadRef}
            type="file"
            accept=".mp3, .wav"
            multiple={false}
            onChange={handleUpload}
            style={{
              display: 'none',
            }}
          />
          <input
            ref={uploadAnnRef}
            type="file"
            accept=".json"
            onChange={handleAnnUpload}
            style={{
              display: 'none',
            }}
          />
          <Paper
            elevation={16}
            ref={container}
            onDragOver={() => console.log('ure dragging')}
            id={'editor'}
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '32px',
              mb: 8,
              input: {
                backgroundColor: 'transparent',
              },

              '#remove': {
                borderRadius: '6px',
                position: 'relative',
                ':after': {
                  position: 'absolute',
                  content: `""`,
                  width: '3px',
                  height: '65%',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  left: '45%',
                  translate: '-50%',
                  transform: 'rotate(45deg)',
                },
                ':before': {
                  position: 'absolute',
                  content: `""`,
                  width: '3px',
                  height: '65%',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  left: '45%',
                  translate: '-50%',
                  transform: 'rotate(-45deg)',
                },
              },
              '.annotations': {
                height: showAnnotations ? 215 : 0,
                overflow: 'hidden',
                transition: '0.35s',
                '.current': {
                  transition: '0.65s',
                },
                span: {
                  color: dark,
                  fontWeight: 'bold',
                },
              },
            }}
          />
        </Box>
        {/* End of Editor and upload button */}
      </Box>
      <CustomAudioBar bottom={!allbuttons ? 0 : -100} ee={ee} />
    </Box>
  );
};

export default Editor;
