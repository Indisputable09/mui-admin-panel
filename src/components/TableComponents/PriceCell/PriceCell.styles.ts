import { makeStyles } from 'tss-react/mui';

export const usePriceCellStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    totalPrice: {
      fontSize: '12px',
      position: 'absolute',
      textDecoration: 'none',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '&.discount': {
        fontSize: '12px',
        position: 'absolute',
        textDecoration: 'line-through',
        bottom: '0',
        marginTop: '8px',
        transform: 'translateX(-50%)',
      },
    },
    discountText: {
      fontSize: '9px',
      position: 'absolute',
      color: 'red',
      top: '0',
      left: '0',
      border: '2px solid grey',
      borderRadius: '4px',
      padding: '0 0.5px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        backgroundColor: '#ffffff',
        opacity: '0.9',
      },
    },
    withDiscountPrice: {
      fontSize: '12px',
      position: 'absolute',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'green',
    },
  })
);
