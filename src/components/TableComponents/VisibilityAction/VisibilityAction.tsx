import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useVisibilityActionStyles } from './VisibilityAction.styles';
import { useGlobalContext } from '../../../hooks/GlobalContext';

interface IVisibilityActionProps {
  id: string;
}

const VisibilityAction: React.FC<IVisibilityActionProps> = ({ id }) => {
  const { classes, cx } = useVisibilityActionStyles();
  const { darkTheme } = useGlobalContext();

  return (
    <Link to={`${id}/edit`}>
      <IconButton
        sx={{ display: 'flex', justifyContent: 'center', ml: 1 }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="edit"
      >
        <VisibilityIcon
          className={cx(classes.visibilityIcon, darkTheme ? 'dark' : null)}
        />
      </IconButton>
    </Link>
  );
};

export default VisibilityAction;
