import React, { memo, FC, useEffect } from 'react';
import TextFieldAlias from '@material-ui/core/TextField';
import { connect as connectFormik } from 'formik';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1),
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
    marginBottom: theme.spacing(2),
  },
}));

const TextField: FC<any> = (props) => {
  const classes = useStyles();
  const { name, formik, value, onChange } = props;
  const { setFieldValue, setFieldTouched, errors, touched } = formik || {};

  const handleChange = (e: any) => {
    if (formik) {
      setFieldValue(name, e.target.value, true);
      setFieldTouched(name, true, true);
    } else if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (value === '') {
      const input = document.querySelector(
        `input[name="${name}"]`,
      ) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  }, [value, name]);

  return (
    <TextFieldAlias
      {...props}
      onChange={handleChange}
      onFocus={handleChange}
      className={classes.textField}
      variant="outlined"
      helperText={
        formik && errors[name] && touched[name] ? errors[name] : undefined
      }
      error={formik && errors[name] && touched[name]}
    />
  );
};

export default memo(connectFormik(TextField));
