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
  const { pagesLinkName } = useParams();

  return (
    <Box>
      {pagesLinkName === 'main' && (
        <AnalysesPagesMain
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'analysesAndPrices' && (
        <AnalysesPagesAnalysesAndPrices
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'aboutLaboratory' && (
        <AnalysesPagesAboutLaboratory
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'examinationsPackages' && (
        <ExaminationsPackages
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'actions' && (
        <AnalysesPagesActions
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'privacyPolicy' && (
        <AnalysesPagesPrivacyPolicy
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'termsOfUse' && (
        <AnalysesPagesTermsOfUse
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'contacts' && (
        <AnalysesPagesContacts
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'FAQ' && (
        <AnalysesPagesFAQ
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'feedbacks' && (
        <AnalysesPagesFeedbacks
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'vacancies' && (
        <AnalysesPagesVacancies
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'laboratoryHandbook' && (
        <AnalysesPagesLaboratoryHandbook
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'news' && (
        <AnalysesPagesNews
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'coworking' && (
        <AnalysesPagesCoworking
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'franchise' && (
        <AnalysesPagesFranchise
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === '404' && (
        <AnalysesPages404
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'covid19' && (
        <AnalysesPagesCovid19
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'qualityPolitics' && (
        <AnalysesPagesQualityPolitics
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
      {pagesLinkName === 'analysesAtHome' && (
        <AnalysesPagesAnalysesAtHome
          initialLink={initialLink}
          pageName={pageName}
          parentPageName={parentPageName}
        />
      )}
    </Box>
  );
};

export default AnalysesPagesData;
