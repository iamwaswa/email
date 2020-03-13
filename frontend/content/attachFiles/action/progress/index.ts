import * as React from "react";

import { CircularProgress } from "@material-ui/core";
import { Nullable } from "src/Global/Types";
import styles from "./styles";

type Props = {
  uploading: boolean;
  uploadProgress: number;
};

export default (props: Props): Nullable<JSX.Element> => {
  const classes = styles();

  if (props.uploading) {
    return (
      <CircularProgress
        className={classes.progress}
        color="primary"
        value={props.uploadProgress}
        variant="determinate"
      />
    );
  }

  return null;
};
