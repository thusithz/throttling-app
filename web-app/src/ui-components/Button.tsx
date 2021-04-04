import React, { Fragment, memo, FC } from 'react';
import ButtonAlias, { ButtonProps } from '@material-ui/core/Button';

const Button: FC<ButtonProps> = (props) => {
  return (
    <Fragment>
      <ButtonAlias {...props} />
    </Fragment>
  );
};

export default memo(Button);
