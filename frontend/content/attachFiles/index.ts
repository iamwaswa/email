import * as React from "react";

import { Box, Typography } from "@material-ui/core";

import AttachFilesAction from "./action";
import { MaxEmailFileSizeInMB } from "src/Global/Constants";
import renderChips from "./chips";
import styles from "./styles";
import useFileUpload from "src/Hooks/File/Upload";

type Props = {
  values: Email;
  setValues: React.Dispatch<React.SetStateAction<Email>>;
  inFileSizeLimit: boolean;
  setInFileSizeLimit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default (props: Props): JSX.Element => {
  const classes = styles();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [totalFileSizeInMB, setTotalFileSizeInMB] = React.useState<number>(0);
  const fileUploadHook = useFileUpload();

  React.useEffect((): void => {
    setTotalFileSizeInMB(
      (previousTotal: number): number =>
        previousTotal + fileUploadHook.fileSizeInMB
    );
  }, [fileUploadHook.fileSizeInMB]);

  React.useEffect((): void => {
    if (totalFileSizeInMB >= MaxEmailFileSizeInMB) {
      props.setInFileSizeLimit(false);
    } else {
      props.setInFileSizeLimit(true);
    }
  }, [totalFileSizeInMB]);

  React.useEffect((): void => {
    if (fileUploadHook.file && fileUploadHook.result) {
      const currentAttachments = props.values.attachments ?? [];

      props.setValues({
        ...props.values,
        attachments: [
          ...currentAttachments,
          {
            content: fileUploadHook.result,
            filename: fileUploadHook.file.name,
            contentType: fileUploadHook.file.type,
            sizeInMB: fileUploadHook.fileSizeInMB
          }
        ]
      });
    }
  }, [fileUploadHook.result]);

  React.useEffect((): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ``;
    }

    if (fileUploadHook.uploading) {
      fileUploadHook.setUploading(false);
      fileUploadHook.setUploadProgress(0);
    }
  }, [props.values]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      fileUploadHook.setFile(event.target.files[0]);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" marginTop={2}>
      <Box display="flex" flexDirection="column">
        <Box component="p" fontSize="body1.fontSize" marginBottom={-1.5}>
          Attachments
        </Box>
        <Box display="flex" alignItems="center" marginTop={2}>
          <Typography
            className={
              !props.inFileSizeLimit ? classes.attachmentsError : undefined
            }
            component="p"
            variant="body2"
          >
            {`File size: ${totalFileSizeInMB}MB (must be less than ${MaxEmailFileSizeInMB}MB)`}
          </Typography>
          <Box marginLeft={1} marginTop={-2.5}>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ height: 0, width: 0 }}
            />
            <AttachFilesAction
              fileUploadHook={fileUploadHook}
              fileInputRef={fileInputRef}
              totalFileSizeInMB={totalFileSizeInMB}
            />
          </Box>
        </Box>
        <Box marginY={1} display="flex" flexWrap="wrap">
          {renderChips({
            values: props.values,
            setValues: props.setValues,
            setTotalFileSizeInMB
          })}
        </Box>
      </Box>
    </Box>
  );
};
