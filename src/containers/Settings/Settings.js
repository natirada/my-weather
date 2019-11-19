import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux'
import * as action from '../../store/Actions/index';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
 const [open, setopen] = React.useState(true)
 const [degrees, setdegrees] = React.useState({ name: 'Celsius', stateSwitch: props.isCelsius})
 const [theme, settheme] = React.useState({ name: 'Light', stateSwitch: props.isLight})


  const handleCloseDegrees = () => {
    setdegrees({
        name: degrees.stateSwitch ? 'Fahrenheit' : 'Celsius' ,
        stateSwitch: !degrees.stateSwitch
    })
  }
  const handleCloseTheme = () => {
    settheme({
        name: theme.stateSwitch ? 'Dark':'Light' ,
        stateSwitch: !theme.stateSwitch
    })
  }
  const handleAgree = () => {
    setopen(false);
    props.updateSettings(theme.stateSwitch, degrees.stateSwitch);
    props.history.push('/');
  }
  
  const handleDisagree = () => {
    setopen(false);
    props.history.push('/');
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDegrees}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
 
          <DialogContentText id="alert-dialog-slide-description">
            <span>Degrees : </span>          
            <FormControlLabel style={{display: 'in-line'}}
                    control={
                    <Switch
                        checked={degrees.stateSwitch}
                        onChange={handleCloseDegrees}
                        value="checkedB"
                        color="primary"
                    />
                    }
                    label={degrees.name}
                />
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description" >
           <span>theme : </span> 
            <FormControlLabel  
                    control={
                    <Switch
                        checked={theme.stateSwitch}
                        onChange={handleCloseTheme}
                        value="checkedB"
                        color="primary"
                    />
                    }
                    label={theme.name}
                />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        isLight: state.Favorite.isLight,
        isCelsius: state.Favorite.isCelsius
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (isLight, isCelsius) => dispatch(action.onUpdateSettings(isLight, isCelsius))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlide);