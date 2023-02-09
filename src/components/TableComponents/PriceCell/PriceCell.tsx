import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { usePriceCellStyles } from './PriceCell.styles';

interface IPriceCellProps {
  price: number;
  discount?: number | null;
}

const PriceCell: React.FC<IPriceCellProps> = ({ price, discount }) => {
  const { darkTheme } = useGlobalContext();
  const { classes, cx } = usePriceCellStyles();
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        component="p"
        className={cx(
          classes.totalPrice,
          darkTheme ? 'dark' : null,
          discount ? 'discount' : null
        )}
      >
        {price} грн
      </Typography>
      {discount && (
        <>
          <Typography
            variant="h6"
            component="p"
            className={cx(classes.discountText, darkTheme ? 'dark' : null)}
          >
            -{discount}%
          </Typography>
          <Typography
            variant="h6"
            component="p"
            className={cx(classes.withDiscountPrice, darkTheme ? 'dark' : null)}
          >
            {price - (price * discount) / 100} грн
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PriceCell;
