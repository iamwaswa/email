import * as React from "react";

import AttachFiles from "./attachFiles";
import { DialogContent } from "@material-ui/core";
import Receiver from "./receiver";
import Text from "./text";

type Props = {
  values: Email;
  setValues: React.Dispatch<React.SetStateAction<Email>>;
  inFileSizeLimit: boolean;
  setInFileSizeLimit: React.Dispatch<React.SetStateAction<boolean>>;
  fromData: EmailData;
  toHelperText: string;
  ccHelperText: string;
  bccHelperText: string;
  participantData: EmailData[];
};

export default (props: Props): JSX.Element => {
  return (
    <DialogContent id="send-email-dialog-content">
      <Receiver
        values={props.values}
        setValues={props.setValues}
        prompt="To"
        name="to"
        helperText={props.toHelperText}
        receiverOptions={props.participantData}
      />
      <Receiver
        values={props.values}
        setValues={props.setValues}
        prompt="Cc"
        name="cc"
        helperText={props.ccHelperText}
        receiverOptions={props.participantData}
      />
      <Receiver
        values={props.values}
        setValues={props.setValues}
        prompt="Bcc"
        name="bcc"
        helperText={props.bccHelperText}
        receiverOptions={props.participantData}
      />
      <Text
        values={props.values}
        setValues={props.setValues}
        helperText="Enter the subject of the email here"
        label="Subject"
        name="subject"
      />
      <Text
        values={props.values}
        setValues={props.setValues}
        helperText="Enter the body of the email here"
        label="Body"
        multiline={true}
        name="text"
      />
      <AttachFiles
        values={props.values}
        setValues={props.setValues}
        inFileSizeLimit={props.inFileSizeLimit}
        setInFileSizeLimit={props.setInFileSizeLimit}
      />
    </DialogContent>
  );
};
