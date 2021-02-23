import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Clear } from '@material-ui/icons';
import * as React from 'react';

const ConfirmationDialog = (props: {
  title: string;
  message?: string;
  content?: any;
  centered?: boolean;
  continueText?: string;
  red?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onContinue(): void;
  onCancel?(): void;
  onClose(): void;
} & WithStyles<typeof styles>) => {
  const { classes } = props;

  return (
    <Dialog
      className={classes.paper}
      fullWidth={true}
      maxWidth={props.size || 'sm'}
      open={true}
      onClose={() => (typeof props.onClose === 'function') ? props.onClose() : null}
      aria-labelledby="simple-protocol-title"
    >
      <DialogTitle
        disableTypography={true}
        className={props.centered ? classes.centerTitleBar : classes.titleBar}
        color={'#fff'}
        id="simple-protocol-title"
      >
        {props.title}
      </DialogTitle>
      { (typeof props.onClose === 'function') &&
        <IconButton aria-label="close" className={classes.close} onClick={props.onClose}>
          <Clear color="inherit">Clear</Clear>
        </IconButton>
      }
      <DialogContent className={classes.content}>
        { props.content != null &&
          {...props.content}
        }
        { props.message != null &&
          <DialogContentText className={props.centered ? classes.centerContent : ''}>
            {props.message}
          </DialogContentText>
        }
      </DialogContent>
      { (typeof props.onContinue === 'function' || typeof props.onCancel === 'function') &&
        <DialogActions className={props.centered ? classes.centerButtonRow : classes.buttonRow}>
          { (typeof props.onCancel === 'function') &&
            <Button
              variant="contained"
              color="default"
              className={classes.secondaryButton}
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          }
          { (typeof props.onContinue === 'function') &&
            <Button
              variant="contained"
              color="primary"
              className={props.red ? classes.redButton : classes.primaryButton}
              onClick={props.onContinue}
            >
              {props.continueText ? props.continueText : 'Continue'}
            </Button>
          }
        </DialogActions>
      }
    </Dialog>
  );
}

const styles = (theme: Theme) => ({
  paper: {
    zIndex: '10000 !important' as any,
    position: 'absolute' as 'absolute',
    overflow: 'hidden' as 'hidden',
    boxShadow: theme.shadows[5],
    padding: '15px',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    padding: '10px',
  },
  titleBar: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'row' as 'row',
    color: theme.palette.background.default,
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: '25px',
    padding: '7px',
    paddingLeft: '15px',
    backgroundColor: theme.palette.primary.light,
  },
  centerTitleBar: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row' as 'row',
    color: theme.palette.background.default,
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: '25px',
    padding: '7px',
    paddingLeft: '15px',
    backgroundColor: theme.palette.primary.light,
  },
  close: {
    position: 'absolute' as 'absolute',
    top: '2px',
    right: '0px',
    margin: '5px',
    padding: '4px',
    color: theme.palette.background.default,
  },
  title: {
    flex: '1 1 auto',
    paddingLeft: '5px',
    // whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden' as 'hidden',
  },
  content: {
    paddingTop: '24px',
  },
  buttonRow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  centerButtonRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  redButton: {
    backgroundColor: '#d44444',
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#c13c3c',
    }
  },
  centerSecondaryButton: {
    marginRight: '0px',
    color: theme.palette.primary.dark,
  },
  secondaryButton: {
    color: 'white',
    marginRight: 'auto',
    backgroundColor: '#7b7b7b',
    '&:hover': {
      backgroundColor: '#6f6f6f',
    }
  },
  centerContent: {
    textAlign: 'center' as 'center',
  }
});

export default withStyles(styles)(ConfirmationDialog);
