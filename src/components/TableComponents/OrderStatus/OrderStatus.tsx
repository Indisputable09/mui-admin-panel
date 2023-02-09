import { Typography } from '@mui/material';
import React from 'react';
import { useOrderStatusStyles } from './OrderStatus.styles';

interface IOrderStatusProps {
  text: string;
}

const OrderStatus: React.FC<IOrderStatusProps> = ({ text }) => {
  const color = '#ffff00';
  const { classes, cx } = useOrderStatusStyles({ color });
  return (
    <Typography component="p" className={cx(classes.text)}>
      {text}
    </Typography>
  );
};

export default OrderStatus;
