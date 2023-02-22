import React from 'react';
import { Box } from '@mui/material';
import Modal from '../../components/Modal';
import { useLocation, useParams } from 'react-router-dom';
import { privacyPolicyRows } from '../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import { BasicPrivacyPolicy, SeoPrivacyPolicy } from './SubLinks';
import { useGlobalContext } from '../../hooks/GlobalContext';

interface IPrivacyPolicyDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'seo', id: 2 },
];

const PrivacyPolicyData: React.FC<IPrivacyPolicyDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenItem = privacyPolicyRows.find(row => row.id === Number(id));

  const [privacyPolicyFieldsValues, setPrivacyPolicyFieldsValues] =
    React.useState(
      chosenItem && chosenAction === 'edit'
        ? {
            privacyPolicyName: chosenItem.name,
            privacyPolicyDescription: '<p>description</p>',
            privacyPolicyMetaTitle: 'privacyPolicyMetaTitle',
            privacyPolicyMetaDescription: 'privacyPolicyMetaDescription',
          }
        : {
            privacyPolicyName: '',
            privacyPolicyDescription: '',
            privacyPolicyMetaTitle: '',
            privacyPolicyMetaDescription: '',
          }
    );
  console.log('privacyPolicyFieldsValues', privacyPolicyFieldsValues);

  const handleClickOpenModal = (variant: string) => {
    if (variant === 'back') {
      setOpenBackModal(true);
    } else if (variant === 'delete') {
      setOpenDeleteModal(true);
    } else if (variant === 'save') {
      setOpenSaveModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenBackModal(false);
    setOpenDeleteModal(false);
    setOpenSaveModal(false);
  };

  const handleClickLink = (id: number) => {
    setLinkId(id as number);
  };

  return (
    <Box>
      <PagesDataCommon
        chosenRowItem={chosenItem}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenItem ? chosenItem.name : null,
          pageName,
          parentPageName,
        }}
      />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: '24px',
          pb: '48px',
        }}
      >
        {linkId === 1 && (
          <BasicPrivacyPolicy
            darkTheme={darkTheme}
            privacyPolicyFieldsValues={privacyPolicyFieldsValues}
            setPrivacyPolicyFieldsValues={setPrivacyPolicyFieldsValues}
          />
        )}
        {linkId === 2 && (
          <SeoPrivacyPolicy
            darkTheme={darkTheme}
            privacyPolicyFieldsValues={privacyPolicyFieldsValues}
            setPrivacyPolicyFieldsValues={setPrivacyPolicyFieldsValues}
          />
        )}
      </Box>
      {openBackModal && (
        <Modal
          shouldOpenModal={openBackModal}
          handleCloseModal={handleCloseModal}
          type={'back'}
          link={initialLink}
        />
      )}
      {openDeleteModal && (
        <Modal
          shouldOpenModal={openDeleteModal}
          handleCloseModal={handleCloseModal}
          type={'delete'}
        />
      )}
      {openSaveModal && (
        <Modal
          shouldOpenModal={openSaveModal}
          handleCloseModal={handleCloseModal}
          type={'save'}
        />
      )}
    </Box>
  );
};

export default PrivacyPolicyData;
