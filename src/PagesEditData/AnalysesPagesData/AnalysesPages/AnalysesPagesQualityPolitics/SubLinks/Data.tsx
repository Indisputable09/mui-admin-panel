import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';

interface IGalleryProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: string;
    mobileImage: string;
    gallery: { id: string; image: string }[];
  };
}

export const Data: React.FC<IGalleryProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        gallery: [...prevState.gallery, { id: nanoid(), image: '' }],
      };
    });
  };

  return (
    <>
      <Box className={cx(classes.bannerImagesBlock)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography component="h2" className={classes.descriptionText}>
              Зображення у банері
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
              {fieldsValues.image ? null : (
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
            {fieldsValues.image ? (
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
                    className={cx(classes.editIcon, darkTheme ? 'dark' : null)}
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography component="h2" className={classes.descriptionText}>
              Зображення у банері (моб)
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
              {fieldsValues.mobileImage ? null : (
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
            {fieldsValues.mobileImage ? (
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
                    className={cx(classes.editIcon, darkTheme ? 'dark' : null)}
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
      </Box>
      <Divider
        className={cx(
          classes.pricesBottomDivider,
          darkTheme ? 'dark' : null,
          'topMargin'
        )}
      />
      {fieldsValues.gallery.map((item, index) => {
        return (
          <Box
            key={item.id}
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
                {item.image ? null : (
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
              {item.image ? (
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
