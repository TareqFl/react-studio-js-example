import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  InputBase,
  Tooltip,
  Button,
  IconButton,
} from '@mui/material';
import ModeSwitch from './ModeSwitch';
import { useThemeSettings } from '../hooks';
import { dark, light } from '../theme';
import { Bars, ColorRing } from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';
import { GitHub } from '@mui/icons-material';

function ButtonAppBar() {
  const {
    theme: { mode, textColor },
    changeTitle,
    podcast,
    event_Emitter,
    setShowAnnotations,
    setEnableAnnotations,
    setAnnotations,
    setDialogBox,
  } = useThemeSettings();

  const [loading, setLoading] = React.useState(false);

  async function showDemo() {
    setLoading(() => true);
    event_Emitter.emit('clear');
    event_Emitter.emit('clearAnnotations');
    setDialogBox(true);
    try {
      const track =
        'https://raw.githubusercontent.com/TareqFl/samples_data/main/Podcast.wav';
      const annotation =
        'https://raw.githubusercontent.com/TareqFl/samples_data/main/annotations.json';

      const response = await fetch(track);
      const data = await response.blob();

      const blob = new Blob([data], {
        type: 'audio/wav',
      });

      event_Emitter.emit('newtrack', {
        src: blob,
        name: 'Demo',
        id: uuidv4(),
        url: true,
      });
      const anno_response = await fetch(annotation);
      const annotations = await anno_response.json();
      event_Emitter.emit('addAnnotation', annotations);
      setAnnotations(annotations);
      setShowAnnotations(true);
      setEnableAnnotations(false);
      setLoading(() => false);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: mode === 'light' ? light : dark,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          svg: {
            width: '20px',
            height: '20px',
          },
        }}
      >
        <Toolbar>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'start'}
            gap={0.5}
          >
            {/* <img src={wave} style={{ width: '40px' }} /> */}
            <Bars
              height="80"
              width="80"
              color="#9c27b0"
              ariaLabel="bars-loading"
              visible={open}
            />
            <Typography color={mode === 'light' ? dark : light}>
              React-Studio
            </Typography>
          </Stack>
          <Stack
            flexGrow={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Tooltip title={'Click to edit'}>
              <InputBase
                sx={{
                  color: mode === 'light' ? dark : light,
                  fontWeight: 'bold',
                }}
                value={podcast}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;

                  changeTitle(value.slice(0, 19));
                }}
                multiline
              />
            </Tooltip>
          </Stack>

          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#1860aa', '#1860aa', '#1860aa', '#1860aa', '#1860aa']}
            />
          ) : (
            <Button onClick={showDemo}>Load Demo</Button>
          )}
          <ModeSwitch />
          <IconButton onClick={() => window.open('https://github.com/TareqFl')}>
            <GitHub
              fontSize="large"
              sx={{
                color: textColor,
                ':hover': { scale: '1.5', transition: '.35s' },
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
