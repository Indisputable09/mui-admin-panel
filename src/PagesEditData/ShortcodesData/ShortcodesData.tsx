import React from 'react';
import { Box, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import PagesDataCommon from '../PagesDataCommon';

interface IShortcodesDataProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const ShortcodesData: React.FC<IShortcodesDataProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  return (
    <>
      <PagesDataCommon
        chosenRowItem={{ name: pageName, id: nanoid() }}
        handleClickOpenModal={() => {}}
        linksData={{
          link,
          pageName,
          parentPageName,
        }}
        noDeleteIcon
        noBackIcon
        noSaveIcon
      />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          pt: '24px',
          pb: '48px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: '4px',
            padding: ' 8px 16px 8px 16px',
            backgroundColor: '#E0E0E0',
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: '#333333',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.15px',
            }}
          >
            Важливо
          </Typography>
          <Typography
            component="p"
            sx={{
              color: '#333333',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: 1.43,
              letterSpacing: '0.17px',
            }}
          >
            Some text
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            borderRadius: '4px',
            padding: ' 8px 16px 8px 16px',
            backgroundColor: '#E0E0E0',
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: '#333333',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.15px',
            }}
          >
            Аналіз
          </Typography>
          <Typography
            component="p"
            sx={{
              color: '#333333',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: 1.43,
              letterSpacing: '0.17px',
            }}
          >
            Some text
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ShortcodesData;
