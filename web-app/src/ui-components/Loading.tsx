import React, { memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
  return (
    <div>
      <CircularProgress
        size="60"
        variant="determinate"
        color="primary"
        thickness={3}
      />
    </div>
  );
}

export default memo(Loading);
