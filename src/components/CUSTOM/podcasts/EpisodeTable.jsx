import { useState } from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Button, Tab, Box, styled } from '@mui/material';
import { H5 } from 'components/Typography';
import getLayout from 'components/getLayout';
import FlexBox from 'components/flexbox/FlexBox';
import IconWrapper from 'components/IconWrapper';
import FlexBetween from 'components/flexbox/FlexBetween';
import Add from 'icons/Add';
import ShoppingBasket from 'icons/ShoppingBasket';
import ProductListView from 'page-sections/admin-ecommerce/product-list/list-view'; //  styled components
import AllModals from 'components/CUSTOM/AllModals';
import AddEpisodeForm from 'components/CUSTOM/podcasts/AddEpisodeForm';
const HeadingWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 8,
  flexWrap: 'wrap',
  [theme.breakpoints.down(453)]: {
    '& .MuiButton-root': {
      order: 2,
    },
    '& .MuiTabs-root': {
      order: 3,
      width: '100%',
      '& .MuiTabs-flexContainer': {
        justifyContent: 'space-between',
      },
    },
  },
}));

const ProductList = () => {
  const [selectTab, setSelectTab] = useState('1');

  const handleChangeTab = (_, newTab) => setSelectTab(newTab);

  const [open, setOpenModal] = useState(false);

  return (
    <Box pt={2} pb={4} sx={{ flexGrow: 1 }}>
      <AllModals openModal={open} handleClose={() => setOpenModal(false)}>
        <AddEpisodeForm />
      </AllModals>
      <TabContext value={selectTab}>
        <HeadingWrapper>
          <FlexBox gap={0.5} alignItems="center">
            <IconWrapper>
              <ShoppingBasket
                sx={{
                  color: 'primary.main',
                }}
              />
            </IconWrapper>
            <H5>Episodes</H5>
          </FlexBox>

          <TabList onChange={handleChangeTab}>
            <Tab disableRipple label="All" value="1" />
            <Tab disableRipple label="Published" value="2" />
            <Tab disableRipple label="Draft" value="3" />
          </TabList>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Add Episode
          </Button>
        </HeadingWrapper>

        <ProductListView />
      </TabContext>
    </Box>
  );
}; // ==============================================================

ProductList.getLayout = getLayout; // ==============================================================

export default ProductList;
