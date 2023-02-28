import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { useControlledSwitchStyles } from './ControlledSwitch.styles';

interface IControlledSwitchProps {
  status: boolean;
}

const ControlledSwitch: React.FC<IControlledSwitchProps> = ({ status }) => {
  const { darkTheme } = useGlobalContext();

  const { classes, cx } = useControlledSwitchStyles();

  return (
    <Switch
      checked={status}
      inputProps={{ 'aria-label': 'controlled' }}
      color="success"
      className={cx(classes.switch, darkTheme ? 'dark' : null)}
    />
  );
};

export default ControlledSwitch;
