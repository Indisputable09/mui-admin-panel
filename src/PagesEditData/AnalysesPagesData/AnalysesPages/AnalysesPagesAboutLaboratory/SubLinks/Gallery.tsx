import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { getAltText } from '../../../../../constants';
import { useFileManager } from '../../../../../hooks/useFileManager';

interface IGalleryProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    slider: string[];
  };
}

export const Gallery: React.FC<IGalleryProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { openFileManager } = useFileManager(handleImageChange);

  function handleImageChange(file: string | null) {
    return function (key?: string, index?: number, mainKey?: string) {
      setFieldsValues((prevState: typeof fieldsValues) => {
        const newArray = fieldsValues.slider.map((item: any, i: number) => {
          if (index === i) {
            return `${file}`;
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          slider: newArray,
        };
      });
    };
  }

  const handleDeleteImage = (index: number) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      const newArray = fieldsValues.slider.map((item: any, i: number) => {
        if (index === i) {
          return null;
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        slider: newArray,
      };
    });
  };

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        slider: [...prevState.slider, null],
      };
    });
  };

  return (
    <>
      {/* {fieldsValues.slider.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: index === 0 ? 0 : '16px',
            }}
          >
            <Box>
              <Typography component="h2" className={classes.descriptionText}>
                Зображення
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
                {item ? null : (
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
              {item ? (
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
      })} */}
      <Box className={cx(classes.bannerImagesBlock)}>
        {fieldsValues.slider.map((item, index) => {
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
                  Зображення
                </Typography>
              </Box>
              <Box className={cx(classes.newsImgBlock, 'grid')}>
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
                  {item ? (
                    <>
                      <img
                        src={item}
                        alt={getAltText(item)}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </>
                  ) : (
                    <IconButton
                      onClick={() => openFileManager(undefined, index)}
                    >
                      <AddIcon
                        className={cx(
                          classes.addImageIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                  )}
                </Box>
                {item ? (
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <IconButton
                      className={cx(classes.newsImgBlockButton)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="edit"
                      onClick={() => openFileManager(undefined, index)}
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
                      onClick={() => handleDeleteImage(index)}
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
      <Divider
        className={cx(
          classes.pricesBottomDivider,
          darkTheme ? 'dark' : null,
          'topMargin'
        )}
      />
      <Button
        onClick={handleAddClick}
        variant="contained"
        className={cx(classes.addButton, darkTheme ? 'dark' : null)}
      >
        <AddIcon /> Додати
      </Button>
    </>
  );
};
