import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { useControlledSwitchStyles } from './ControlledSwitch.styles';

interface IControlledSwitchProps {
  status: boolean;
}

const ControlledSwitch: React.FC<IControlledSwitchProps> = ({ status }) => {
  const { darkTheme } = useGlobalContext();
  // const [checked, setChecked] = React.useState<boolean>(
  //   status === 'Active' ? true : false
  // );
  const [checked, setChecked] = React.useState<boolean>(status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { classes, cx } = useControlledSwitchStyles();

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      color="success"
      className={cx(classes.switch, darkTheme ? 'dark' : null)}
    />
  );
};

export default ControlledSwitch;
