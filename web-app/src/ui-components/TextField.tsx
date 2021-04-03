import React, { Fragment, memo, FC } from "react";
import TextFieldAlias from "@material-ui/core/TextField";
import { connect as connectFormik } from "formik";

// interface iTextFieldProps extends StandardTextFieldProps {
//   id: string;
//   label: string;
//   placeholder: string;
//   multiline: boolean;
//   variant: any;
//   name: string;
//   margin: string;
//   formik?: any;
//   required: boolean;
//   fullWidth: boolean;
//   autoFocus: boolean;
//   autoComplete: string;
// }

const TextField: FC<any> = (props) => {
  const { name, formik } = props;
  const { setFieldValue, setFieldTouched, errors, touched } = formik;

  const onChange = (e: any) => {
    setFieldValue(name, e.target.value, true);
    setFieldTouched(name, true, true);
  };
  return (
    <Fragment>
      <TextFieldAlias
        {...props}
        onChange={onChange}
        onFocus={onChange}
        helperText={errors[name] && touched[name] ? errors[name] : undefined}
        error={errors[name] && touched[name] ? true : false}
      />
    </Fragment>
  );
};

export default memo(connectFormik(TextField));
