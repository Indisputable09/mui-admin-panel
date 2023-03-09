import React from 'react';
import { Box, Typography } from '@mui/material';
import PagesDataCommon from '../PagesDataCommon';
import { Status } from '../../constants';
import { fetchShortcodes } from '../../services/shortcodesAPI';
import Loader from '../../components/Loader';

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
  const { idle, pending, resolved, rejected } = Status;
  const [status, setStatus] = React.useState(idle);
  const [shortcodes, setShortcodes] = React.useState<
    { name: string; value: string; hint: string }[] | null
  >(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const shortcodesValue = await fetchShortcodes();
        setShortcodes(shortcodesValue);
        setStatus(resolved);
      } catch (error) {
        setStatus(rejected);
      }
    };
    fetchData();
  }, [pending, rejected, resolved]);

  return (
    <>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={() => {}}
            linksData={{
              link,
              pageName,
              parentPageName,
              name: 'Shortcodes',
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
            {shortcodes &&
              shortcodes.map((item, index) => {
                return (
                  <React.Fragment key={index}>
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
                        {item.name}{' '}
                        <em style={{ fontWeight: 400 }}>({item.hint})</em>
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
                        {item.value}
                      </Typography>
                    </Box>
                  </React.Fragment>
                );
              })}
          </Box>
        </>
      )}
    </>
  );
};

export default ShortcodesData;
