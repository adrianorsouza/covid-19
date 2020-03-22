import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const ToolbarCustom = withStyles(theme => {
  return {
    root: {
      justifyContent: 'center',
      background: theme.palette.green
    },
  }
})(Toolbar);

const Header = props => {
  return (
    <AppBar position="static" elevation={0}>
      <ToolbarCustom>
        <Typography variant="h4">
          Números em Tempo Real
        </Typography>
      </ToolbarCustom>
    </AppBar>
  );
};

export default Header;
