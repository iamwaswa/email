import * as React from "react";

import {
  Box,
  Chip,
  FormControlLabel,
  Switch,
  Typography
} from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";

type ShowDisplayName = {
  [email: string]: boolean;
};

type Props = {
  values: Email;
  setValues: React.Dispatch<React.SetStateAction<Email>>;
  prompt: string;
  name: string;
  helperText: string;
  receiverOptions: EmailData[];
};

export default (props: Props): JSX.Element => {
  const [showDisplayName, setShowDisplayName] = React.useState<ShowDisplayName>(
    props.receiverOptions.reduce(
      (
        initialState: ShowDisplayName,
        { address }: EmailData
      ): ShowDisplayName => {
        initialState[address] = false;
        return initialState;
      },
      {}
    )
  );

  const renderChips = (): JSX.Element[] => {
    return props.receiverOptions.map(
      (option: EmailData): JSX.Element => {
        const set = new Set<EmailData>(props.values[props.name]);

        const toggleDisplayName = (show: boolean): void => {
          setShowDisplayName({
            ...showDisplayName,
            [option.address]: show
          });
        };

        return (
          <Box key={option.address} marginBottom={1} marginRight={1}>
            <Chip
              color={set.has(option) ? `primary` : `default`}
              icon={set.has(option) ? <DoneIcon /> : undefined}
              label={
                showDisplayName[option.address] ? option.name : option.address
              }
              onClick={(event: React.MouseEvent): void => {
                if (set.has(option)) {
                  set.delete(option);
                } else {
                  set.add(option);
                }

                props.setValues({
                  ...props.values,
                  [props.name]: Array.from(set)
                });
              }}
              onMouseEnter={(event: React.MouseEvent): void =>
                toggleDisplayName(true)
              }
              onMouseLeave={(event: React.MouseEvent): void =>
                toggleDisplayName(false)
              }
            />
          </Box>
        );
      }
    );
  };

  return (
    <Box>
      <Typography component="p" variant="subtitle1">
        {props.prompt}:
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography component="p" variant="caption">
          {props.helperText}
        </Typography>
        <Box marginTop="-9px" marginLeft={2}>
          <FormControlLabel
            control={
              <Switch
                checked={
                  Array.isArray(props.values[props.name]) &&
                  Array.from(props.values[props.name]).length ===
                    props.receiverOptions.length
                }
                onChange={(event: React.ChangeEvent, checked: boolean): void =>
                  props.setValues({
                    ...props.values,
                    [props.name]: checked
                      ? [...props.receiverOptions]
                      : undefined
                  })
                }
              />
            }
            label="Select all"
            style={{ textAlign: `center` }}
          />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" padding={2}>
        {renderChips()}
      </Box>
    </Box>
  );
};
