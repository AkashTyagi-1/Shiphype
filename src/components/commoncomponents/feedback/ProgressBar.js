import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {View} from 'react-native';
import PropTypes from "prop-types";
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  }));


  export default function ProgressBar(props) {
    const classes = useStyles();
    const {loading} =props;

    return (
      <View className={classes.root}>
          <View>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '0ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade></View>
        </View>
    );
  }

  ProgressBar.propTypes = {
    loading: PropTypes.bool
  };