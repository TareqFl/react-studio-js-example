import { useCallback, useState } from 'react';
import { Box, Button, Card, Grid } from '@mui/material';
import ImageUpload from 'page-sections/admin-ecommerce/add-product/ImageUpload';
import { H5, H6 } from 'components/Typography';
import getLayout from 'components/getLayout';
import IconWrapper from 'components/IconWrapper';
import FlexBox from 'components/flexbox/FlexBox';
import AppTextField from 'components/input-fields/AppTextField';
import ShoppingBasket from 'icons/ShoppingBasket';
import useFireBaseAction from 'hooks/useFireBase';
import useAuth from 'hooks/useAuth';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
const CreateProduct = ({ handleClick }) => {
  const { query } = useRouter();
  const { title: podcast } = query;
  const { AddEpisodeFunc } = useFireBaseAction();
  const { user } = useAuth();
  const [files, setFiles] = useState([]);

  const [values, setValues] = useState({
    // title: "All about Turkey",
    // cover: "https://example.com/test.jpg",
    // date: "12-12-2012",
    // created_at: "12-12-2012",
    // user: user.uid, // uuid,
    // podcast: "podcast name", // uuid
    // duration: 1000, //in seconds
    // audio: "audio File",
    title: '',
    cover: '',
    date: new Date(),
    created_at: '12-12-2012',
    user: user.uid, // uuid,
    duration: 1000, //in seconds
    audio: 'audio File',
  });
  const { title, cover, date, duration, audio } = values;
  const handleDropFile = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  }, []);
  const handleDropImage = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  }, []);

  const handleRemoveImage = (file) => {
    const filteredFiles = files.filter((_file) => _file !== file);
    setFiles(filteredFiles);
  };

  function handleSubmit() {
    const value = {
      podcast,
      title,
      cover: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      date,
      created_at: date,
      duration: '5 hrs',
      audio,
    };
    AddEpisodeFunc(value);
  }

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FlexBox gap={0.5} alignItems="center">
            <IconWrapper>
              <ShoppingBasket
                sx={{
                  color: 'primary.main',
                }}
              />
            </IconWrapper>
            <H5>New Episode</H5>
          </FlexBox>
        </Grid>

        <Card
          sx={{
            padding: 3,
          }}
        >
          <H5 mb={3}>Main Parameters</H5>

          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <AppTextField
                label="Title"
                fullWidth
                value={values.title}
                onChange={({ target }) =>
                  setValues((prev) => ({ ...prev, title: target.value }))
                }
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <AppTextField label="Podcast" fullWidth value={podcast} />
            </Grid>

            <Grid item sm={6} xs={12}>
              {/* <AppTextField
                label="Date"
                fullWidth
                value={values.date}
                onChange={({ target }) =>setValues(prev=>({...prev, date:target.value}))}
              /> */}

              <H6 mb={1}>Deadline</H6>
              <DatePicker
                value={values.date}
                slots={{
                  textField: AppTextField,
                }}
                onChange={(newValue) => setValues(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Card>

        {/* <Grid item xs={12}> */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageUpload
              handleRemoveImage={handleRemoveImage}
              onDrop={handleDropImage}
              files={files}
              name={'Cover'}
              multiple={false}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              handleRemoveImage={handleRemoveImage}
              onDrop={handleDropFile}
              files={files}
              name={'Audio'}
              multiple={false}
            />
          </Grid>
        </Grid>
        {/* </Grid> */}

        <Grid item xs={12}>
          <FlexBox flexWrap="wrap" gap={2}>
            <Button variant="contained" onClick={handleSubmit}>
              Create New Product
            </Button>
            <Button variant="outlined" onClick={() => {}}>
              Cancel
            </Button>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}; // ==============================================================

CreateProduct.getLayout = getLayout; // ==============================================================

export default CreateProduct;
