import * as React from "react";

import { Button, DialogActions } from "@material-ui/core";

type Props = {
  sending: boolean;
  inFileSizeLimit: boolean;
  values: Email;
  handleCancel: (event: React.MouseEvent) => void;
  handleSend: (values: Email) => void;
};

export default (props: Props): JSX.Element => {
  const noTo = (): boolean => {
    return props.values.to === undefined || props.values.to.length === 0;
  };

  const noCc = (): boolean => {
    return props.values.cc === undefined || props.values.cc.length === 0;
  };

  const noBcc = (): boolean => {
    return props.values.bcc === undefined || props.values.bcc.length === 0;
  };

  const noReceiver = (): boolean => {
    return noTo() && noCc() && noBcc();
  };

  const disableSend = (): boolean => {
    return !props.inFileSizeLimit || noReceiver() || props.sending;
  };

  return (
    <DialogActions>
      <Button variant="text" color="primary" onClick={props.handleCancel}>
        CANCEL
      </Button>
      <Button
        variant="text"
        color="primary"
        disabled={disableSend()}
        onClick={(event: React.MouseEvent): void =>
          props.handleSend(props.values)
        }
      >
        SEND
      </Button>
    </DialogActions>
  );
};
