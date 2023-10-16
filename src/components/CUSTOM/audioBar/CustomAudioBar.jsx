import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useThemeSettings } from '../../../hooks';

const CustomTimeLine = ({ bottom, ee }) => {
  const { theme, keyPress } = useThemeSettings();
  const { key, shiftKey, code } = keyPress;
  const { textColor } = theme;
  // total duration of the track
  const [duration, setDuration] = useState('00:00:00');

  // set max value for the slider to reach
  const [rawValue, setRawValue] = useState(0);

  //   when the track is playing or clicked the seeker time is updated
  const [seeker, setSeeker] = useState(0);

  // useState to display seeker position
  const [dpSeeker, setDpSeeker] = useState('00:00:00');

  // where the audio is playing or no
  const [isPlaying, setIsplaying] = useState(false);

  // Play Button Ref
  const playRef = useRef();
  useEffect(() => {
    function secondsToHMS(seconds) {
      const hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      if (minutes > 60) {
        minutes = parseFloat(0.0);
      }
      // const remainingSeconds = Math.round(seconds);
      let remainingSeconds = parseFloat(seconds % 60).toFixed(2);
      if (remainingSeconds > 60) {
        remainingSeconds = parseFloat(0.01);
      }

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    // get the total duration time of the longest track
    ee.on('getTrackDuration', (value) => {
      var newDuration = secondsToHMS(value);

      setDuration(() => newDuration);
      setRawValue(() => value);
    });

    // get new duration after editing or shifting a track
    ee.on('newTimeDurationAfterEdit', (value) => {
      var newDuration = secondsToHMS(value);

      setDuration(() => newDuration);
      setRawValue(() => value);
    });

    // when audio plays, cursor interaction
    ee.on('timeupdate', (start) => {
      // to fixed 4 based on input step prop
      setSeeker(() => parseFloat(start).toFixed(4));

      var newSeeked = secondsToHMS(start);

      setDpSeeker(() => newSeeked);
    });

    // when track has finished playing
    ee.on('fnishedPlaying', () => {
      setDpSeeker(() => '00:00:00');
      setSeeker(() => 0);
      setIsplaying(!isPlaying);
    });
    // if theres no audio
    if (bottom !== 0) {
      setDuration(() => '00:00:00');
      setDpSeeker(() => '00:00:00');
      setSeeker(() => 0);
      setIsplaying(() => !isPlaying);
    }
  }, []);

  useEffect(() => {
    if (code === 'Space' && shiftKey) {
      isPlaying ? ee.emit('play') : ee.emit('pause');
      setIsplaying(!isPlaying);
    }
  }, [key, code, shiftKey]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        left: 0,
        bottom,
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        sx={{
          height: 75,
          backgroundColor: bottom === 0 ? 'transparent' : 'white',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: bottom === 0 ? '0 8px' : '0 300px',
          transition: '.7s ease',
        }}
      >
        <Tooltip
          title={isPlaying ? 'Play(shft + space)' : 'Pause(shft + space)'}
        >
          <IconButton
            ref={playRef}
            onClick={() => {
              setIsplaying(!isPlaying);
              isPlaying ? ee.emit('play') : ee.emit('pause');
            }}
          >
            {isPlaying ? (
              <PlayArrow fontSize={'large'} sx={{ color: textColor }} />
            ) : (
              <Pause fontSize={'large'} sx={{ color: textColor }} />
            )}
          </IconButton>
        </Tooltip>

        <Box sx={{ width: '95px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{dpSeeker}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            input: {
              width: '100%',
              '::-webkit-slider-thumb': {
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                position: 'relative',
                bottom: '7px',
              },
              '::-webkit-slider-runnable-track': {
                height: '2px',
                cursor: 'pointer',
              },
            },
          }}
        >
          <input
            className={'audioBar'}
            type={'range'}
            min={0}
            max={rawValue}
            step={0.0001}
            value={seeker}
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              ee.emit('sliderTimeUpdate', value);
            }}
          />
        </Box>

        <Box sx={{ width: '95px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{duration}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomTimeLine;
