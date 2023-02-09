import React from 'react';
import { InputLabel, Typography } from '@mui/material';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import Editor from '../../../Inputs/Editor';

interface IBasicPrivacyPolicyProps {
  darkTheme: boolean;
  privacyPolicyFieldsValues: {
    privacyPolicyName: string;
    privacyPolicyDescription: string;
  };
  setPrivacyPolicyFieldsValues: (obj: any) => void;
}

export const BasicPrivacyPolicy: React.FC<IBasicPrivacyPolicyProps> = ({
  darkTheme,
  setPrivacyPolicyFieldsValues,
  privacyPolicyFieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handlePrivacyPolicyFieldsChange = (e: React.ChangeEvent) => {
    setPrivacyPolicyFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <>
      <InputLabel
        htmlFor="privacyPolicyName"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Назва
        <StyledField
          id="privacyPolicyName"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={privacyPolicyFieldsValues.privacyPolicyName}
          onChange={handlePrivacyPolicyFieldsChange}
        />
      </InputLabel>
      <Typography component="h2" className={classes.descriptionText}>
        Опис
      </Typography>
      <Editor
        initData={privacyPolicyFieldsValues.privacyPolicyDescription}
        onChange={(e: any) => {
          setPrivacyPolicyFieldsValues((prevState: any) => {
            return {
              ...prevState,
              privacyPolicyDescription: e.editor.getData(),
            };
          });
        }}
      />
    </>
  );
};
