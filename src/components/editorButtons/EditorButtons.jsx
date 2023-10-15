import {
  Abc,
  CallSplit,
  ContentCut,
  Download,
  DragIndicator,
  FileUpload,
  FontDownload,
  FontDownloadOff,
  NearMe,
  SettingsEthernet,
  SouthEast,
  SouthWest,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { useThemeSettings } from '../../hooks';

const EditorButtons = ({
  handleClick,
  cutButton,
  disabled,
  splitButton,
  enableAnnotations,
}) => {
  const {
    theme: { mode },
  } = useThemeSettings();
  const actionButtons = [
    {
      name: 'cursor',
      icon: (
        <NearMe
          name={'cursor'}
          onClick={() => {
            const event = { target: { name: 'cursor' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'shift',
      icon: (
        <SettingsEthernet
          onClick={() => {
            const event = { target: { name: 'shift' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'region',
      icon: (
        <DragIndicator
          sx={{
            rotate: '90deg',
          }}
          name={'region'}
          onClick={() => {
            const event = { target: { name: 'region' } };
            handleClick(event);
          }}
        />
      ),
    },

    // { name: 'trim', icon: '' },
    {
      name: 'cut',
      icon: (
        <ContentCut
          onClick={() => {
            const event = { target: { name: 'cut' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'split',
      icon: (
        <CallSplit
          onClick={() => {
            const event = { target: { name: 'split' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'fadein',
      icon: (
        <SouthWest
          onClick={() => {
            const event = { target: { name: 'fadein' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'fadeout',
      icon: (
        <SouthEast
          onClick={() => {
            const event = { target: { name: 'fadeout' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'zoomin',
      icon: (
        <ZoomIn
          onClick={() => {
            const event = { target: { name: 'zoomin' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'zoomout',
      icon: (
        <ZoomOut
          onClick={() => {
            const event = { target: { name: 'zoomout' } };
            handleClick(event);
          }}
        />
      ),
    },

    // {
    //   name: 'saveToCloudStorage',
    //   icon: (
    //     <CloudUpload
    //       onClick={() => {
    //         const event = { target: { name: 'saveToCloudStorage' } };
    //         handleClick(event);
    //       }}
    //     />
    //   ),
    // },
    // "LoadFromStorage",
    // "uploadToCloudStorage",
    {
      name: 'addAnnotation',
      icon: (
        <Abc
          onClick={() => {
            const event = { target: { name: 'addAnnotation' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'downloadAnnotation',
      icon: (
        <FontDownload
          onClick={() => {
            const event = { target: { name: 'downloadAnnotation' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'clearAnnotations',
      icon: (
        <FontDownloadOff
          onClick={() => {
            const event = { target: { name: 'clearAnnotations' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'upload',
      icon: (
        <FileUpload
          onClick={() => {
            const event = { target: { name: 'upload' } };
            handleClick(event);
          }}
        />
      ),
    },
    {
      name: 'download',
      icon: (
        <Download
          onClick={() => {
            const event = { target: { name: 'download' } };
            handleClick(event);
          }}
        />
      ),
    },
  ];

  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      flexWrap={'wrap'}
      gap={1}
      mb={2}
      flexGrow={1}
    >
      {actionButtons.map((button, index) => {
        const { name, icon } = button;
        let toBeDisabled = disabled;
        if (name === 'upload') {
          toBeDisabled = false;
        }
        if (name === 'cut') {
          toBeDisabled = cutButton;
        }
        if (name === 'split') {
          if (disabled) {
            return;
          }
          toBeDisabled = splitButton;
        }
        if (name === 'downloadAnnotation' || name === 'clearAnnotations') {
          toBeDisabled = enableAnnotations;
        }
        return (
          <Tooltip title={name} key={index}>
            <span>
              <Button
                disabled={toBeDisabled}
                name={name}
                variant="text"
                onClick={handleClick}
                color={'info'}
                sx={{
                  ':hover': {
                    transform: 'scale(1.2)',
                    outline: `1px solid ${
                      mode === 'light' ? '#0088d1' : '#9c27b0'
                    }`,
                  },

                  transition: '0.25s',
                }}
              >
                {icon}
              </Button>
            </span>
          </Tooltip>
        );
      })}
    </Stack>
  );
};

export default EditorButtons;
