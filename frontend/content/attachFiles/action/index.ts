import * as React from "react";

import { Box, IconButton, Tooltip } from "@material-ui/core";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import { MaxEmailFileSizeInMB } from "src/Global/Constants";
import Progress from "./Progress";
import { UseFileUpload } from "src/Hooks/File/Upload";
import styles from "./styles";

type Props = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  totalFileSizeInMB: number;
  fileUploadHook: UseFileUpload;
};

export default (props: Props): JSX.Element => {
  const classes = styles();

  return (
    <Tooltip placement="right" title="Attach files">
      <Box className={classes.progressContainer}>
        <IconButton
          disabled={
            props.fileUploadHook.uploading ||
            props.totalFileSizeInMB >= MaxEmailFileSizeInMB
          }
          onClick={(event: React.MouseEvent): void => {
            if (props.fileInputRef.current) {
              props.fileInputRef.current.click();
            }
          }}
        >
          <AttachFileIcon />
        </IconButton>
        <Progress
          uploading={props.fileUploadHook.uploading}
          uploadProgress={props.fileUploadHook.uploadProgress}
        />
      </Box>
    </Tooltip>
  );
};
