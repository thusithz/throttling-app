import React, { memo } from 'react';
import CircluarProgress from '@material-ui/core/CircularProgress';

function Loading() {
  return (
    <div>
      <CircluarProgress
        size="60"
        variant="static"
        color="primary"
        thickness={3}
      />
    </div>
  );
}

export default memo(Loading);
