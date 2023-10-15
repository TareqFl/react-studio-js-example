import { Button, ClickAwayListener, Paper, Stack } from '@mui/material';
import { useThemeSettings } from '../hooks';
import React, { useEffect, useState } from 'react';
import {
  CallSplit,
  DragIndicator,
  FileDownload,
  NearMe,
  SettingsEthernet,
  SouthEast,
  SouthWest,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';

const ContextMenu = ({ position, closeContextMenu }) => {
  const { event_Emitter } = useThemeSettings();

  const { clientX, clientY, display } = position;

  useEffect(() => {
    event_Emitter.on('finished', () => console.log('finished'));
  }, []);

  return (
    <ClickAwayListener onClickAway={() => closeContextMenu()}>
      <Paper
        sx={{
          position: 'absolute',
          left: clientX + 2,
          top: clientY - 6,
          zIndex: 999,
          display: display ? 'block' : 'none',
          backgroundColor: '#121212',
          borderRadius: 2,
        }}
      >
        <Stack width={175}>
          <Button
            startIcon={<NearMe />}
            variant="text"
            onClick={() => {
              event_Emitter.emit('statechange', 'cursor');
              closeContextMenu();
            }}
          >
            Cursor
          </Button>
          <Button
            startIcon={<DragIndicator sx={{ rotate: '90deg' }} />}
            variant="text"
            onClick={() => {}}
          >
            region
          </Button>
          <Button
            startIcon={<SettingsEthernet />}
            variant="text"
            onClick={() => {
              event_Emitter.emit('statechange', 'shift');
              closeContextMenu();
            }}
          >
            shift
          </Button>
          <Button startIcon={<CallSplit />} variant="text" onClick={() => {}}>
            split
          </Button>
          <Button startIcon={<SouthWest />} variant="text" onClick={() => {}}>
            fade in
          </Button>
          <Button startIcon={<SouthEast />} variant="text" onClick={() => {}}>
            fade out
          </Button>
          <Button startIcon={<ZoomIn />} variant="text" onClick={() => {}}>
            zoom in
          </Button>
          <Button startIcon={<ZoomOut />} variant="text" onClick={() => {}}>
            zoom out
          </Button>
        </Stack>
      </Paper>
    </ClickAwayListener>
  );
};

export default ContextMenu;
