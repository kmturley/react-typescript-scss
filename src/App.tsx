import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { mainListItems, secondaryListItems } from './components/listItems';
import SimpleLineChart from './components/SimpleLineChart';
import SimpleTable from './components/SimpleTable';

const drawerWidth = 240;

const styles = (theme:any) => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  root: {
    display: 'flex',
  },
  tableContainer: {
    height: 320,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
  }
});

class Dashboard extends React.Component {
  public state = {
    open: true,
  };

  public handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  public handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const classes = this.props['classes'];

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes['root']}>
          <AppBar
            position="absolute"
            className={classNames(classes['appBar'], this.state.open && classes['appBarShift'])}
          >
            <Toolbar disableGutters={!this.state.open} className={classes['toolbar']}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes['menuButton'],
                  this.state.open && classes['menuButtonHidden'],
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes['title']}>
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes['drawerPaper'], !this.state.open && classes['drawerPaperClose']),
            }}
            open={this.state.open}
          >
            <div className={classes['toolbarIcon']}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes['content']}>
            <div className={classes['appBarSpacer']} />
            <Typography variant="display1" gutterBottom>
              Orders
            </Typography>
            <Typography component="div" className={classes['chartContainer']}>
              <SimpleLineChart />
            </Typography>
            <Typography variant="display1" gutterBottom>
              Products
            </Typography>
            <div className={classes['tableContainer']}>
              <SimpleTable />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard['propTypes'] = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles as any)(Dashboard);