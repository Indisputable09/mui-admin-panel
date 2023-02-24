import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import CatalogAdvertisement from './CatalogAdvertisement';
import HeaderAdvertisement from './HeaderAdvertisement';

interface IAdvertisementsDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const AdvertisementsData: React.FC<IAdvertisementsDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { pagesLinkName } = useParams();

  return (
    <Box>
      {pagesLinkName === 'headerAdvertisement' && (
        <HeaderAdvertisement
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'catalogAdvertisement' && (
        <CatalogAdvertisement
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
    </Box>
  );
};

export default AdvertisementsData;
