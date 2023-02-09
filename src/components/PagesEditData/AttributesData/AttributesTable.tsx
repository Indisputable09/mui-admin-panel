import React from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { SketchPicker } from 'react-color';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import ColorizeIcon from '@mui/icons-material/Colorize';
import StyledField from '../../Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import Delete from '@mui/icons-material/Delete';
import { stopInputScroll } from '../../../constants';

interface IAttributesTableProps {
  headCells: string[];
  bodyCells: {
    id: string;
    valueUkr: string;
    valueEng: string;
    sort: number;
    attributeColor?: string;
    attributeImg?: null;
  }[];
  // fieldsValues: {
  //   attributeGroup: string | null;
  //   attributeValue: string;
  //   attributeValueEng: string;
  //   attributeType: string;
  //   attributesData: {
  //     id: string;
  //     valueUkr: string;
  //     valueEng: string;
  //     sort: number;
  //     attributeColor: string;
  //     attributeImg: null;
  //   }[];
  // };
  fieldsValues: any;
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
}

const AttributesTable: React.FC<IAttributesTableProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
  headCells,
  bodyCells,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const [openColorPicker, setOpenColorPicker] = React.useState<{
    index: null | number;
    open: boolean;
  }>({
    index: null,
    open: false,
  });

  const handleAddColorClick = (index: number) => {
    setOpenColorPicker({ index, open: true });
  };

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ index: null, open: false });
  };

  const handleColorChange = (index: number) => (color: any) => {
    const newArray = fieldsValues.data.map((item: any, i: number) => {
      if (index === i) {
        return {
          ...item,
          attributeColor: color.hex,
        };
      } else {
        return item;
      }
    });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return { ...prevState, data: [...newArray] };
    });
  };

  const handleDataChange = (index: number) => (e: React.ChangeEvent) => {
    const newArray = fieldsValues.data.map((item: any, i: number) => {
      if (index === i) {
        if ((e.target as HTMLInputElement).type === 'number') {
          return {
            ...item,
            [e.target.id]: Number((e.target as HTMLInputElement).value),
          };
        } else {
          return {
            ...item,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        }
      } else {
        return item;
      }
    });
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        data: [...newArray],
      };
    });
  };

  const handleDeleteDataClick = (id: string) => {
    const filteredData = fieldsValues.data.filter(
      (item: any) => item.id !== id
    );
    setOpenColorPicker({ index: null, open: false });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        data: filteredData,
      };
    });
  };

  return (
    <table className={classes.dataTable}>
      <thead>
        <tr className={classes.dataTableRow}>
          {headCells.map((item, index) => {
            return (
              <th key={index} className={classes.attributesDataTableHeadCell}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {bodyCells.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <tr className={classes.dataTableRow}>
                <td className={classes.attributesDataTableIdCell}>{item.id}</td>
                <td style={{ flexGrow: 1 }}>
                  <Box className={cx(classes.inputWithLang)}>
                    <StyledField
                      id="valueUkr"
                      variant="outlined"
                      sx={{ width: '100%', mt: '16px' }}
                      darkTheme={darkTheme}
                      value={item.valueUkr}
                      onChange={handleDataChange(index)}
                    />
                    <Box className={cx(classes.inputLangBlock)}>Укр</Box>
                  </Box>
                  <Box className={cx(classes.inputWithLang)}>
                    <StyledField
                      id="valueEng"
                      variant="outlined"
                      sx={{ width: '100%', mt: '16px' }}
                      darkTheme={darkTheme}
                      value={item.valueEng}
                      onChange={handleDataChange(index)}
                    />
                    <Box className={cx(classes.inputLangBlock)}>Eng</Box>
                  </Box>
                </td>
                <td className={cx(classes.attributesDataTableSortCell)}>
                  <StyledField
                    id="sort"
                    type="number"
                    onWheel={e => {
                      stopInputScroll(e);
                    }}
                    variant="outlined"
                    sx={{ width: '100%', mt: '16px' }}
                    darkTheme={darkTheme}
                    value={Number(item.sort).toString()}
                    onChange={handleDataChange(index)}
                  />
                </td>
                <td
                  className={cx(
                    classes.attributesDataTableAction,
                    !fieldsValues.attributeType ? 'noColor' : null
                  )}
                >
                  {fieldsValues.attributeType === 'Колір' && (
                    <>
                      {index === openColorPicker.index &&
                        openColorPicker.open && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '80%',
                              right: '120px',
                              zIndex: 10,
                            }}
                          >
                            <SketchPicker
                              className={cx(
                                classes.colorPicker,
                                darkTheme ? 'dark' : null
                              )}
                              color={item.attributeColor}
                              onChangeComplete={handleColorChange(index)}
                              disableAlpha
                            />
                            <IconButton
                              sx={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                border: '1px solid grey',
                                padding: '4px',
                              }}
                              onClick={handleCloseColorPicker}
                            >
                              <CloseIcon
                                sx={{ width: '20px', height: '20px' }}
                              />
                            </IconButton>
                          </Box>
                        )}
                      <IconButton
                        className={cx(
                          classes.attributeActionsButtons,
                          darkTheme ? 'dark' : null
                        )}
                        onClick={() => handleAddColorClick(index)}
                      >
                        <ColorizeIcon sx={{ width: '28px', height: '28px' }} />
                      </IconButton>
                      <Box
                        sx={{
                          backgroundColor: `${item.attributeColor}`,
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          marginLeft: '30px',
                          marginRight: '30px',
                          border: '1px solid grey',
                        }}
                      ></Box>
                    </>
                  )}
                  {fieldsValues.attributeType === 'Зображення' && (
                    <>
                      <IconButton
                        className={cx(
                          classes.attributeActionsButtons,
                          darkTheme ? 'dark' : null
                        )}
                      >
                        <AddPhotoAlternateIcon
                          sx={{ width: '28px', height: '28px' }}
                        />
                      </IconButton>
                      <Box
                        sx={{
                          width: '100px',
                          height: '60px',
                          marginLeft: '30px',
                          marginRight: '30px',
                          border: '1px solid grey',
                        }}
                      ></Box>
                    </>
                  )}
                  <IconButton
                    className={cx(
                      classes.deleteAttributeValues,
                      darkTheme ? 'dark' : null
                    )}
                    onClick={() => handleDeleteDataClick(item.id)}
                    name={item.id}
                  >
                    <Delete sx={{ width: '28px', height: '28px' }} />
                  </IconButton>
                </td>
              </tr>
              <tr className={classes.dataTableRow}>
                <td className={classes.attributesDataTableActionCell}>
                  <Divider
                    className={cx(
                      classes.tableDivider,
                      darkTheme ? 'dark' : null
                    )}
                  />
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttributesTable;
