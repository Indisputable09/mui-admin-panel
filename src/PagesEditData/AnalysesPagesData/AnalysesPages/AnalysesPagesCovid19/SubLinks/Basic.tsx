import React from 'react';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../../../components/Inputs/MultipleAutocomplete';
import { useFileManager } from '../../../../../hooks/useFileManager';
import { getAltText } from '../../../../../constants';
import { fetchFAQ } from '../../../../../services/faqAPI';
import { fetchAnalyses } from '../../../../../services/analysesAPI';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banner: {
      additionalColor: string;
      primaryColor: string;
      primaryText: { code: string; value: string }[];
      additionalText: { code: string; value: string }[];
      image: null | string;
      imageMobile: null | string;
      imageDesktop: null | string;
    };
    analyses: number[] | null;
    faqs: number[] | null;
  };
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { openFileManager } = useFileManager(handleImageChange);
  const { classes, cx } = usePagesDataCommonStyles();
  const [faqList, setFaqList] = React.useState([]);
  const [analysesList, setAnalysesList] = React.useState([]);

  React.useEffect(() => {
    const getLists = async () => {
      const faqs = await fetchFAQ();
      const analyses = await fetchAnalyses();
      setFaqList(faqs);
      setAnalysesList(analyses);
    };
    getLists();
  }, []);

  function handleImageChange(file: string | null) {
    return function (key?: string, index?: number) {
      setFieldsValues((prevState: typeof fieldsValues) => {
        if (key) {
          return {
            ...prevState,
            banner: {
              ...prevState.banner,
              [key]: file,
            },
          };
        } else {
          return {
            ...prevState,
          };
        }
      });
    };
  }

  const handleDeleteImage = (key: string, index?: number) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banner: {
          ...prevState.banner,
          [key]: null,
        },
      };
    });
  };

  const handleAutocompleteChange =
    (key: string) => (e: any, values: { id: number; value: string }[]) => {
      const chosenIds = values.map(item => item.id);
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: chosenIds,
        };
      });
    };

  const getAutocompleteValue = (
    list: { id: number; value: string }[],
    key: string
  ) => {
    if (list) {
      const array = list.filter(item => fieldsValues[key]?.includes(item.id));
      return array.map((obj: { id: number; value: string }) => obj.value);
    }
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
              {fieldsValues.banner.image ? (
                <>
                  <img
                    src={fieldsValues.banner.image}
                    alt={getAltText(fieldsValues.banner.image)}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </>
              ) : (
                <IconButton
                  onClick={() => openFileManager('image', undefined, 'banner')}
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
            {fieldsValues.banner.image ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <IconButton
                  className={cx(classes.newsImgBlockButton)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="edit"
                  onClick={() => openFileManager('image')}
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
                  onClick={() => handleDeleteImage('image')}
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
              Фон для мобільної версії
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
              {fieldsValues.banner.imageMobile ? (
                <>
                  <img
                    src={fieldsValues.banner.imageMobile}
                    alt={getAltText(fieldsValues.banner.imageMobile)}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </>
              ) : (
                <IconButton
                  onClick={() =>
                    openFileManager('imageMobile', undefined, 'banner')
                  }
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
            {fieldsValues.banner.imageMobile ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <IconButton
                  className={cx(classes.newsImgBlockButton)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="edit"
                  onClick={() =>
                    openFileManager('imageMobile', undefined, 'banner')
                  }
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
                  onClick={() => handleDeleteImage('imageMobile')}
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
            marginTop: '16px',
          }}
        >
          <Box>
            <Typography component="h2" className={classes.descriptionText}>
              Фон для десктопу
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
              {fieldsValues.banner.imageDesktop ? (
                <>
                  <img
                    src={fieldsValues.banner.imageDesktop}
                    alt={getAltText(fieldsValues.banner.imageDesktop)}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </>
              ) : (
                <IconButton
                  onClick={() =>
                    openFileManager('imageDesktop', undefined, 'banner')
                  }
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
            {fieldsValues.banner.imageDesktop ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <IconButton
                  className={cx(classes.newsImgBlockButton)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="edit"
                  onClick={() =>
                    openFileManager('imageDesktop', undefined, 'banner')
                  }
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
                  onClick={() => handleDeleteImage('imageDesktop')}
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
      <InputLabel
        htmlFor="faq"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        Питання
        <MultipleAutocomplete
          id="faqs"
          darkTheme={darkTheme}
          onChange={handleAutocompleteChange('faqs')}
          value={getAutocompleteValue(faqList, 'faqs') || null}
          list={faqList}
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
        />
      </InputLabel>
      <InputLabel
        htmlFor="analyses"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Аналізи
        <MultipleAutocomplete
          id="analyses"
          darkTheme={darkTheme}
          onChange={handleAutocompleteChange('analyses')}
          value={getAutocompleteValue(analysesList, 'analyses') || null}
          list={analysesList}
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
        />
      </InputLabel>
    </>
  );
};
