import * as React from "react";

import { Box, Chip } from "@material-ui/core";

type Props = {
  values: Email;
  setValues: React.Dispatch<React.SetStateAction<Email>>;
  setTotalFileSizeInMB: React.Dispatch<React.SetStateAction<number>>;
};

export default (props: Props): JSX.Element[] => {
  if (props.values.attachments && props.values.attachments.length > 0) {
    return props.values.attachments.map(
      (attachment: Attachment): JSX.Element => {
        return (
          <Box key={attachment.filename} marginBottom={1} marginRight={1}>
            <Chip
              label={`${attachment.filename} - ${attachment.sizeInMB.toFixed(
                2
              )}MB`}
              onDelete={(event: any): void => {
                props.setTotalFileSizeInMB((previousTotal: number): number => {
                  const newTotal = previousTotal - attachment.sizeInMB;
                  return Math.round(newTotal) <= 0 ? 0 : newTotal;
                });

                props.setValues({
                  ...props.values,
                  attachments: props.values.attachments
                    ? props.values.attachments.filter(
                        ({ filename }: Attachment): boolean =>
                          filename !== attachment.filename
                      )
                    : []
                });
              }}
            />
          </Box>
        );
      }
    );
  }

  return [
    <Box key="text" marginTop={-2}>
      No attachments
    </Box>
  ];
};
