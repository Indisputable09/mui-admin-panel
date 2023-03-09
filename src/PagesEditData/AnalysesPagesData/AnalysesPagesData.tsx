import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  AnalysesPagesMain,
  AnalysesPagesAnalysesAndPrices,
} from './AnalysesPages';
import AnalysesPagesAboutLaboratory from './AnalysesPages/AnalysesPagesAboutLaboratory';
import { ExaminationsPackages } from './AnalysesPages/ExaminationsPackages';
import { AnalysesPagesActions } from './AnalysesPages/AnalysesPagesActions';
import { AnalysesPagesPrivacyPolicy } from './AnalysesPages/AnalysesPagesPrivacyPolicy';
import { AnalysesPagesTermsOfUse } from './AnalysesPages/AnalysesPagesTermsOfUse';
import { AnalysesPagesContacts } from './AnalysesPages/AnalysesPagesContacts';
import { AnalysesPagesFAQ } from './AnalysesPages/AnalysesPagesFAQ';
import { AnalysesPagesFeedbacks } from './AnalysesPages/AnalysesPagesFeedbacks';
import { AnalysesPagesVacancies } from './AnalysesPages/AnalysesPagesVacancies';
import { AnalysesPagesLaboratoryHandbook } from './AnalysesPages/AnalysesPagesLaboratoryHandbook';
import { AnalysesPagesNews } from './AnalysesPages/AnalysesPagesNews';
import { AnalysesPagesCoworking } from './AnalysesPages/AnalysesPagesCoworking';
import { AnalysesPagesFranchise } from './AnalysesPages/AnalysesPagesFranchise';
import { AnalysesPages404 } from './AnalysesPages/AnalysesPages404';
import { AnalysesPagesCovid19 } from './AnalysesPages/AnalysesPagesCovid19';
import AnalysesPagesQualityPolitics from './AnalysesPages/AnalysesPagesQualityPolitics';
import { AnalysesPagesAnalysesAtHome } from './AnalysesPages/AnalysesPagesAnalysesAtHome';

interface IAnalysesPagesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const AnalysesPagesData: React.FC<IAnalysesPagesDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { id } = useParams();

  return (
    <Box>
      {id === '1' && (
        <AnalysesPagesMain
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '2' && (
        <AnalysesPagesAnalysesAndPrices
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '3' && (
        <ExaminationsPackages
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '4' && (
        <AnalysesPagesAnalysesAtHome
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '5' && (
        <AnalysesPagesCovid19
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '6' && (
        <AnalysesPagesActions
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '7' && (
        <AnalysesPagesLaboratoryHandbook
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '8' && (
        <AnalysesPagesCoworking
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '9' && (
        <AnalysesPagesFranchise
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '10' && (
        <AnalysesPagesAboutLaboratory
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '11' && (
        <AnalysesPagesFAQ
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '12' && (
        <AnalysesPagesFeedbacks
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '13' && (
        <AnalysesPagesQualityPolitics
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '14' && (
        <AnalysesPagesVacancies
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '15' && (
        <AnalysesPagesNews
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '16' && (
        <AnalysesPagesTermsOfUse
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '17' && (
        <AnalysesPagesPrivacyPolicy
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '18' && (
        <AnalysesPagesContacts
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {id === '19' && (
        <AnalysesPages404
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
    </Box>
  );
};

export default AnalysesPagesData;
