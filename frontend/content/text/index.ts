import * as React from "react";

import { TextField } from "@material-ui/core";

type Props = {
  values: Email;
  setValues: React.Dispatch<React.SetStateAction<Email>>;
  helperText: string;
  label: string;
  name: string;
  multiline?: boolean;
};

export default (props: Props): JSX.Element => {
  return (
    <TextField
      autoComplete="off"
      fullWidth={true}
      helperText={props.helperText}
      label={props.label}
      margin="normal"
      multiline={props.multiline}
      name={props.name}
      type="text"
      value={props.values[props.name]}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
        props.setValues({
          ...props.values,
          [event.target.name]: event.target.value
        })
      }
    />
  );
};
