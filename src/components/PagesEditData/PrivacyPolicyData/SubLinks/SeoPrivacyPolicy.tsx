import React from 'react';
import { InputLabel, Typography } from '@mui/material';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import Editor from '../../../Inputs/Editor';

interface ISeoPrivacyPolicyProps {
  darkTheme: boolean;
  privacyPolicyFieldsValues: {
    privacyPolicyMetaTitle: string;
    privacyPolicyMetaDescription: string;
  };
  setPrivacyPolicyFieldsValues: (obj: any) => void;
}

export const SeoPrivacyPolicy: React.FC<ISeoPrivacyPolicyProps> = ({
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
        htmlFor="privacyPolicyMetaTitle"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Meta Title
        <StyledField
          id="privacyPolicyMetaTitle"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={privacyPolicyFieldsValues.privacyPolicyMetaTitle}
          onChange={handlePrivacyPolicyFieldsChange}
        />
      </InputLabel>
      <Typography component="h2" className={classes.descriptionText}>
        Опис
      </Typography>
      <Editor
        initData={privacyPolicyFieldsValues.privacyPolicyMetaDescription}
        onChange={(e: any) => {
          setPrivacyPolicyFieldsValues((prevState: any) => {
            return {
              ...prevState,
              privacyPolicyMetaDescription: e.editor.getData(),
            };
          });
        }}
      />
    </>
  );
};
