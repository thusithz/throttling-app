import React, { Dispatch, Fragment, memo } from 'react';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

export interface iAlert {
  severity: any;
  message: string;
  id: number;
}

interface alertProps {
  alertQueue: iAlert[];
  setAlertQueue: Dispatch<React.SetStateAction<iAlert[]>>;
}

const Alert = (props: alertProps) => {
  const { alertQueue, setAlertQueue } = props;

  const onClose = (id: number) => {
    setAlertQueue(alertQueue.filter((el: iAlert) => el.id !== id));
  };

  return (
    <Fragment>
      {alertQueue.map((alert: iAlert, key) => {
        return (
          <Snackbar
            open
            key={key}
            autoHideDuration={5000}
            onClose={() => onClose(alert.id)}
            disableWindowBlurListener
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert
              elevation={6}
              variant="standard"
              severity={alert.severity}
              onClose={() => onClose(alert.id)}
            >
              <AlertTitle>{alert.severity}</AlertTitle>
              {alert.message}
            </MuiAlert>
          </Snackbar>
        );
      })}
    </Fragment>
  );
};

export default memo(Alert);
