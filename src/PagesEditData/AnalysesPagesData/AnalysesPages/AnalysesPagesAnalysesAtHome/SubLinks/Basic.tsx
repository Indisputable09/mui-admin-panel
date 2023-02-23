import React from 'react';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    images: { label: string; image: string }[];
    weekdaysOrdersSchedule: string;
    weekendOrdersSchedule: string;
    weekdaysDrivingSchedule: string;
    weekendDrivingSchedule: string;
  };
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleFieldsChange = (e: React.ChangeEvent) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <>
      <Box className={cx(classes.bannerImagesBlock)}>
        {fieldsValues.images.map((image, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <Box>
                <Typography component="h2" className={classes.descriptionText}>
                  {image.label}
                </Typography>
              </Box>
              <Box className={cx(classes.newsImgBlock)}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '200px',
                    height: '150px',
                    marginRight: '30px',
                    border: '1px solid grey',
                  }}
                >
                  {image.image ? null : (
                    <IconButton onClick={() => console.log('Add img')}>
                      <AddIcon
                        className={cx(
                          classes.addImageIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                  )}
                </Box>
                {image.image ? (
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <IconButton
                      className={cx(classes.newsImgBlockButton)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="edit"
                      onClick={() => console.log('Edit img')}
                    >
                      <EditIcon
                        className={cx(
                          classes.editIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                    <IconButton
                      className={cx(classes.newsImgBlockButton)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="delete"
                      onClick={() => console.log('Delete img')}
                    >
                      <DeleteIcon
                        className={cx(
                          classes.deleteIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                  </Box>
                ) : null}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '80px',
          flexWrap: 'wrap',
          marginTop: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '16px',
            width: '400px',
          }}
        >
          <InputLabel
            className={cx(
              classes.label,
              darkTheme ? 'dark' : null,
              'noBottomMargin'
            )}
          >
            Графік прийому замовлень
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekdaysOrdersSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekdaysOrdersSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Пн-Пт
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekendOrdersSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekendOrdersSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Сб
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '16px',
            width: '400px',
          }}
        >
          <InputLabel
            className={cx(
              classes.label,
              darkTheme ? 'dark' : null,
              'noBottomMargin'
            )}
          >
            Графік виїзду
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekdaysDrivingSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekdaysDrivingSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Пн-Пт
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekendDrivingSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekendDrivingSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Сб
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
