import { makeStyles } from 'tss-react/mui';

export const usePagesDataCommonStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    //   COMMON TOOLBAR
    panel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    productTitle: { fontSize: '3rem', mb: '20px' },
    buttonsBlock: { display: 'flex', gap: '16px' },
    button: { display: 'flex', justifyContent: 'center', height: '34px' },
    linksList: {
      display: 'flex',
      gap: '32px',
      paddingBottom: 0,
      flexWrap: 'wrap',
    },
    linksListItem: {
      width: 'inherit',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    linksListText: {
      fontSize: '14px',
      '&.active': {
        color: ' #1976D2',
        '&:after': {
          content: `''`,
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 'calc(100% - 1px)',
          borderBottom: '2px solid #1976D2',
        },
        '&.dark': {
          color: '#90CAF9',
          '&:after': {
            borderBottom: '2px solid #90CAF9',
          },
        },
      },
    },
    divider: {
      borderColor: 'rgba(17, 17, 17, 0.25)',
      transition: 'all 250ms ease-out',
      '&.dark': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    // COMMON CONTENT AND INPUTS
    languagesList: {
      display: 'flex',
      columnGap: '32px',
      flexWrap: 'wrap',
      marginBottom: '36px',
      paddingBottom: 0,
    },
    languagesListItem: {
      width: 'inherit',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    languagesListText: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '1.7',
      color: '#00000061',
      '&.dark': {
        color: '#ffffff',
      },
      '&.active': {
        color: ' #1F2A38',
        '&:after': {
          content: `''`,
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 'calc(100% - 1px)',
          borderBottom: '2px solid #5D5FEF',
        },
        '&.dark': {
          color: '#90CAF9',
          '&:after': {
            borderBottom: '2px solid #90CAF9',
          },
        },
      },
    },
    label: {
      fontFamily: '"Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '24px',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
      '&.topMargin': {
        marginTop: '16px',
      },
      '&.noBottomMargin': {
        marginBottom: 0,
      },
    },
    descriptionText: {
      marginBottom: '24px',
      fontFamily: '"Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
    },
    smallText: {
      fontFamily: '"Roboto", "sans-serif" !important',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.15',
    },
    attributeAutocomplete: {
      width: '100%',
      marginTop: '16px',
      '&.dark button': {
        color: '#ffffff',
        transition: 'all 250ms ease-out',
      },
    },
    autocomplete: {
      width: '100%',
      marginTop: '16px',
      '& input': {
        padding: '12px 14px',
      },
      '&.dark button': {
        color: '#ffffff',
        transition: 'all 250ms ease-out',
      },
    },
    attributesDivider: {
      width: '124px',
      margin: '10px 32px 0 32px',
      borderColor: 'rgba(17, 17, 17, 0.25)',
      transition: 'all 250ms ease-out',
      '&.dark': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    deleteAttributeButton: {
      margin: '11px 0 0 32px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
      '&:hover, &:focus': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      '&.dark:hover, &.dark:focus': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    pricesBottomDivider: {
      borderColor: 'rgba(17, 17, 17, 0.25)',
      width: '100%',
      marginBottom: '16px',

      transition: 'all 250ms ease-out',
      '&.dark': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
      '&.topMargin': {
        marginTop: '24px',
      },
      '&.noBottomMargin': {
        marginBottom: 0,
      },
    },
    addButton: {
      width: '116px',
      marginLeft: 'auto',
      marginTop: '24px',
      padding: '8px 16px 8px 16px',
      fontSize: '11px',
      backgroundColor: '#3A57E8',
      color: '#fff',
      transition: 'all 250ms ease-out',
      '&:hover, &:focus': { backgroundColor: '#1565C0 !important' },
      '&.dark:hover, &.dark:focus': { backgroundColor: '#90CAF914 !important' },
      '&.dark': {
        backgroundColor: 'transparent',
        border: '1px solid #90CAF9',
        color: '#90CAF9',
      },
    },
    radioButtonsLabel: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
      color: '#000',
      marginBottom: '16px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    radioButton: {
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#90CAF9',
      },
    },
    publishedText: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
      marginTop: '24px',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    switch: {
      '&.dark .Mui-checked > .MuiSwitch-thumb': {
        color: '#90CAF9',
      },
      '&.dark .MuiSwitch-track': {
        backgroundColor: '#E0E0E0 !important',
      },
      '&.dark .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#90CAF9 !important',
      },
    },
    noMarginLabel: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
      display: 'flex',
      flexDirection: 'column',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    datePickerField: {
      transition: 'all 250ms ease-out',
      '&.dark svg': {
        color: '#fff',
      },
    },
    imagesNavigation: {
      display: 'flex',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '16px',
      padding: 0,
      borderBottom: '1px solid #1111113f',
      '&.dark': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      },
      '& p': {
        fontWeight: 500,
        fontSize: '14px',
      },
    },
    imagesNavigationMainItem: {
      paddingLeft: '8px',
      paddingRight: '8px',
      justifyContent: 'center',
      width: '150px',
    },
    imagesNavigationLanguagesItem: {
      padding: 0,
      borderLeft: '1px solid #1111113f',
      '&.dark': {
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      },
    },
    imagesLanguagesBox: { display: 'flex', width: '100%', height: '100%' },
    altText: { marginLeft: 'auto', marginRight: 'auto' },
    engBtn: {
      marginLeft: 'auto',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '8px',
      borderLeft: '1px solid #1111113f',
      '&.dark': {
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    ukrBtn: {
      paddingRight: '8px',
      paddingLeft: '8px',
      paddingTop: '8px',
      borderRight: '1px solid #1111113f',
      '&.dark': {
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    imagesLanguagesUkrBox: {
      display: 'flex',
      paddingTop: '8px',
      paddingLeft: '8px',
      width: '100%',
      borderBottom: '1px solid #1976D2',
      '&.dark': { borderBottom: '1px solid #90CAF9' },
    },
    imagesLanguagesEngBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: '8px',
      paddingRight: '8px',
      width: '100%',
      borderBottom: '1px solid #1976D2',
      '&.dark': { borderBottom: '1px solid #90CAF9' },
    },
    imagesNavigationSortItem: {
      padding: '8px',
      justifyContent: 'center',
      width: '150px',
      borderLeft: '1px solid #1111113f',
      '&.dark': {
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      },
    },
    imagesNavigationMainImageItem: {
      padding: '8px',
      justifyContent: 'center',
      flexShrink: 0,
      width: '180px',
      borderLeft: '1px solid #1111113f',
      '&.dark': {
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      },
    },
    imagesNavigationActionItem: {
      padding: '8px',
      justifyContent: 'center',
      width: '92px',
      borderLeft: '1px solid #1111113f',
      '&.dark': {
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      },
    },
    bottomDivider: {
      borderColor: 'rgba(17, 17, 17, 0.25)',
      width: '100%',
      marginBottom: '24px',

      transition: 'all 250ms ease-out',
      '&.dark': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    mainLanguageText: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '1.15',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    inputWithLang: {
      position: 'relative',
      '& input': {
        paddingRight: '88px',
      },
    },
    inputLangBlock: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
      bottom: 0,
      width: '80px',
      height: '44px',
      borderRadius: '0 4px 4px 0',
      borderLeft: '2px solid grey',
    },
    deleteAttributeValueButton: {
      height: '50px',
      margin: '11px 0 0 32px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
      '&:hover, &:focus': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      '&.dark:hover, &.dark:focus': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    noResultsText: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '1.15',
      textAlign: 'center',
      marginBottom: '16px',
    },
    dataTable: {
      display: 'flex',
      flexDirection: 'column',
    },
    dataTableRow: {
      display: 'flex',
    },
    attributesDataTableHeadCell: {
      width: '50px',
      '&:nth-of-type(2)': {
        flexGrow: '1',
      },
      '&:nth-of-type(3)': {
        width: '700px',
      },
      '&:nth-of-type(4)': {
        width: '100px',
      },
    },
    // attributesDataTableHeadSecondCell: { flexGrow: '1' },
    // attributesDataTableHeadThirdCell: { width: '700px' },
    // attributesDataTableHeadFourthCell: { width: '100px' },
    attributesDataTableIdCell: {
      width: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '16px',
    },
    attributesDataTableSortCell: {
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 8px 0 16px',
    },
    tableDivider: {
      borderColor: 'rgba(17, 17, 17, 0.25)',
      width: '100%',
      marginTop: '16px',

      transition: 'all 250ms ease-out',
      '&.dark': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    attributesDataTableAction: {
      position: 'relative',
      width: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&.noColor': {
        width: '100px',
      },
    },
    attributesDataTableActionCell: { flexGrow: '1' },
    colorPicker: {},
    deleteAttributeValues: {
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
      '&:hover, &:focus': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      '&.dark:hover, &.dark:focus': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    deleteBanner: {
      color: '#000000DE',
      width: '44px',
      marginLeft: 'auto',
      marginTop: '8px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
      '&:hover, &:focus': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      '&.dark:hover, &.dark:focus': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    attributeActionsButtons: {
      transition: 'all 250ms ease-out',
      color: '#000000DE',
      '&.dark': {
        color: '#fff',
      },
      '&.banner': { width: '40px' },
    },
    optionsDataHeadRow: {
      display: 'flex',
      '& th': {
        width: 'calc((100% + (100% / 7 - 60px)) / 7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:last-child': {
          width: '60px',
        },
      },
    },
    optionsDataRow: {
      display: 'flex',
      marginBottom: '16px',
      marginTop: '16px',
      ' & td': {
        width: 'calc((100% + (100% / 7 - 60px)) / 7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
        '&:last-child': {
          width: '60px',
        },
      },
    },
    optionsInput: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      '& .MuiAutocomplete-inputRoot': {
        height: '100%',
      },
      '& .MuiInputBase-formControl': {
        width: '100%',
      },
      '&.dark button': {
        color: '#ffffff',
        transition: 'all 250ms ease-out',
      },
      '&.rightSpace input': {
        paddingRight: '48px',
      },
      '&.noPaddingDiscount input': {
        paddingRight: '78px',
      },
    },
    optionsDiscountDatePicker: {
      transition: 'all 250ms ease-out',
      marginTop: 0,
      width: '100%',
      height: '50px',
      flexDirection: 'row',
      '&.dark svg': {
        color: '#fff',
      },
    },
    optionsDiscountDataHeadRow: {
      display: 'flex',
      '& th': {
        width: 'calc(100% / 5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '&.discounts th': {
        width: 'calc((100% + (100% / 6 - 60px)) / 6)',
        '&:last-child': {
          width: '60px',
        },
      },
      '&.attributes th': {
        width: 'calc((100% + (100% / 3 - 60px)) / 3)',
        '&:nth-of-type(2)': {
          width: '124px',
          marginLeft: '12px',
          marginRight: '12px',
        },
        '&:last-child': {
          width: '60px',
        },
      },
    },
    optionsDiscountDataRow: {
      display: 'flex',
      marginBottom: '16px',
      marginTop: '16px',
      width: '100%',
      '& td': {
        width: 'calc(100% / 5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
      },
      '&.discounts td': {
        width: 'calc((100% + (100% / 6 - 60px)) / 6)',
        '&:last-child': {
          width: '60px',
        },
      },
      '&.attributes td': {
        width: 'calc((100% + (100% / 3 - 60px)) / 3)',
        '&:nth-of-type(2)': {
          width: '124px',
          marginLeft: '12px',
          marginRight: '12px',
        },
        '&:last-child': {
          width: '60px',
        },
      },
    },
    priceInfluenceInput: {
      position: 'relative',
      '& input': {
        // paddingRight: '88px',
      },
    },
    discountPriceTypeList: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '5px',
      right: '5px',
      '& > li > button': {
        backgroundColor: 'inherit',
        '&.active': {
          backgroundColor: '#d3d3d370',
          '&.dark': {
            backgroundColor: '#4c4646',
          },
        },
      },
      '& > li:last-child > button': {
        borderRadius: '0 4px 4px 0',
        '&.active': {
          backgroundColor: '#d3d3d370',
          '&.dark': {
            backgroundColor: '#4c4646',
          },
        },
      },
    },
    discountPriceTypeButton: {
      backgroundColor: 'inherit',
      border: 'none',
      height: '51px',
      padding: 0,
      width: '35px',
      borderLeft: '1px solid grey',
      color: '#000000',
      '&.dark': { color: '#ffffff', borderLeft: '1px solid grey' },
    },
    selectMenu: {
      '& ul': {
        padding: '0',
      },
      '&.dark ul': {
        backgroundColor: '#1F2A38',
        color: '#ffffff',
      },
      '&.dark li': {
        fontSize: 12,
      },
    },
    menuItem: {
      '& svg': {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      '&.dark svg': {
        color: '#ffffff',
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      '&.active': {
        backgroundColor: '#d3d3d370',
        '&.dark': {
          backgroundColor: '#4c4646',
        },
      },
    },
    priceInfluenceBlock: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '5px',
      right: '5px',
      borderLeft: '1px solid grey',
      borderRadius: '0 4px 4px 0',
      width: '40px',
      height: '51px',
      '&.active': {
        backgroundColor: '#d3d3d370',
        '&.dark': {
          backgroundColor: '#4c4646',
        },
      },
      '&.dark svg': {
        color: '#ffffff',
      },
    },
    priceInfluenceButton: {
      minWidth: 'auto',
      width: '100%',
      fontSize: '21px',
      color: 'rgba(0, 0, 0, 0.54)',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#ffffff',
      },
    },
    discountsTable: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '16px',
    },
    metaTagRobots: {
      fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '1.15',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    formControlLabel: {
      display: 'inline-flex',
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      margin: '24px 0 16px 0',
      width: '150px',
      '& .MuiFormControlLabel-label': {
        fontFamily: '"Work Sans", "Roboto", "sans-serif" !important',
        fontWeight: 700,
        fontSize: '16px',
        marginBottom: '16px',
        lineHeight: '1.15',
        color: '#000',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiFormControlLabel-label': {
        color: '#fff',
      },
      '&.inline': {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '0',
        marginTop: '0',
        width: '200px',
        '& span': {
          marginBottom: '0',
        },
      },
    },
    formControlCheckBox: {
      fontFamily: '"Roboto", "sans-serif" !important',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '1.15',
      color: '#000',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    checkbox: {
      color: 'inherit',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#90CAF9',
        transition: 'all 250ms ease-out',
      },
    },
    bannerImagesBlock: { display: 'flex', gap: '20%', flexWrap: 'wrap' },
    newsImgBlock: {
      width: '350px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
    },
    newsImgBlockButton: {
      display: 'flex',
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      '&[disabled]': {
        opacity: '0.4',
        color: 'inherit',
      },
    },
    addImgIcon: {
      width: '32px',
      height: '32px',
      color: '#000000DE',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    addImageIcon: {
      width: '64px',
      height: '64px',
      transition: 'all 250ms ease-out',
      color: '#000000DE',
      '&.dark': {
        color: '#FFFFFF',
      },
    },
    editIcon: {
      width: '32px',
      height: '32px',
      transition: 'all 250ms ease-out',
      color: '#000000DE',
      '&.dark': {
        color: '#FFFFFF',
      },
      'button:hover > &': {
        color: '#219653',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      'button:hover > &.dark, button:focus > &.dark': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    deleteIcon: {
      width: '32px',
      height: '32px',
      transition: 'color 250ms ease-out',
      'button:hover > &, button:focus > &': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      'button:hover > &.dark, button:focus > &.dark': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
  })
);
