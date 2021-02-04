import React from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Platform,View,Image} from 'react-native';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
      },
    
      root: {
        flexGrow: 1,
      },
    form:{
        marginLeft:theme.spacing(5),
      },
    
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0),
        color: theme.palette.grey[500],
      },
    submit: {
      margin: theme.spacing(3, 0, 2),
},
}));

const ColorButton = withStyles(theme => ({
    root: {
      
      backgroundColor:'#0168fa',
      
    },
  }))(Button);


  const ColorButton1 = withStyles(theme => ({
    root: {
      
        backgroundColor : '#0168fa',
      
    },
  }))(Button);

  const styles = (theme) => ({
    root: {
      "@media print": {
        margin: 0,
        padding: theme.spacing(1),
        borderRadius: 0,
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: "-2px",
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)(props => {
    
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {onClose ? (
            <Grid container item xs={12} justify="flex-end">
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
          </Grid>
        ) : null}
        <Grid item xs={10} className={classes.form}>
        <Typography variant="body1">{children}</Typography></Grid>
      </MuiDialogTitle>
    );
  });
 
  

/**
 * Description:This function is used for InvitePeople for str8line popup
 * @param {*} props 
 */

export default function MakeDefaultCard(props) {
   // const [open]= props;
   const classes = useStyles();
    const {openDefaultCard}= props;
   

    const handleClose = () => {
      props.handleDeleteCancle();
    };

    return (
        
        <View>
        <Dialog open={openDefaultCard} onClose={handleClose}>
        <Grid className={classes.form}>
          <DialogTitle id="form-dialog-title" onClose={handleClose}>
           Do You want to make this card as a default?
          </DialogTitle>
          </Grid>
          <DialogContent>
          <form className={classes.form}>
          <Grid container spacing={1} justify="center">
        <Grid item xs={4} sm={3} justify="center">
        <ColorButton1
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.handleDeleteCancle}
        >
      No
        </ColorButton1>
        </Grid>

        <Grid item xs={4} sm={3} justify="center">
        <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.submit}
          onClick={props.updateCardDefault}
        >
       Yes
        </ColorButton>
        </Grid>
      </Grid>
         </form>
          </DialogContent>
        </Dialog>
        </View>
    );
  }


  MakeDefaultCard.propTypes = {
    openDefaultCard : PropTypes.bool,
    handleClose: PropTypes.func,
    handleDeleteCancle:PropTypes.func,
    deleteCard:PropTypes.func

  };