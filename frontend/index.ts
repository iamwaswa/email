import * as React from "react";

import EmailClientActions from "./actions";
import EmailClientContent from "./content";

type EmailData = {
  name: string,
  address: string,
};

type Attachment = {
  content: string | ArrayBuffer | null;
  filename: string;
  sizeInMB: number;
  contentType: string;
};

type Email = {
  from: EmailData,
  to?: EmailData[],
  cc?: EmailData[],
  bcc?: EmailData[],
  subject?: string,
  text?: string,
  attachments?: Attachment[],
};

type Props = {
  sending: boolean;
  fromData: EmailData;
  participantData: EmailData[];
  toHelperText: string;
  ccHelperText: string;
  bccHelperText: string;
  handleCancel: (event: React.MouseEvent) => void;
  handleSend: (values: Email) => void;
};

export default (props: Props): JSX.Element => {
  const [inFileSizeLimit, setInFileSizeLimit] = React.useState<boolean>(true);
  const [values, setValues] = React.useState<Email>({
    from: props.fromData,
    subject: ``,
    text: ``,
    to: [...props.participantData]
  });

  return (
    <>
      <EmailClientContent
        values={values}
        setValues={setValues}
        inFileSizeLimit={inFileSizeLimit}
        setInFileSizeLimit={setInFileSizeLimit}
        fromData={props.fromData}
        toHelperText={props.toHelperText}
        ccHelperText={props.ccHelperText}
        bccHelperText={props.bccHelperText}
        participantData={props.participantData}
      />
      <EmailClientActions
        inFileSizeLimit={inFileSizeLimit}
        sending={props.sending}
        values={values}
        handleCancel={props.handleCancel}
        handleSend={props.handleSend}
      />
    </>
  );
};
