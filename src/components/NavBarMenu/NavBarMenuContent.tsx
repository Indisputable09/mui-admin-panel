import InventoryIcon from '@mui/icons-material/Inventory';
import SourceIcon from '@mui/icons-material/Source';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalysesPage from '../../Pages/AnalysesPage';
import Dashboard from '../../Pages/Dashboard';
import AnalysesData from '../../PagesEditData/AnalysesData';
import AnalysesCategoriesPage from '../../Pages/AnalysesCategoriesPage';
import AnalysesCategoryData from '../../PagesEditData/AnalysesCategoryData';
import AnalysesPackagesPage from '../../Pages/AnalysesPackagesPage';
import AnalysesPackagesData from '../../PagesEditData/AnalysesPackagesData';
import AnalysesPagesPage from '../../Pages/AnalysesPagesPage';
import CitiesPage from '../../Pages/CitiesPage';
import CitiesData from '../../PagesEditData/CitiesData';
import LanguagesPage from '../../Pages/LanguagesPage';
import LanguagesData from '../../PagesEditData/LanguagesData';
import NewsPage from '../../Pages/NewsPage';
import NewsData from '../../PagesEditData/NewsData';
import AnalysesPagesData from '../../PagesEditData/AnalysesPagesData';
import FAQPage from '../../Pages/FAQPage';
import FAQData from '../../PagesEditData/FAQData';
import RobotsTxtData from '../../PagesEditData/RobotsTxtData';
import RedirectsPage from '../../Pages/RedirectsPage';
import RedirectsData from '../../PagesEditData/RedirectsData';
import GTMData from '../../PagesEditData/GTMData';
import AdvertisementsPage from '../../Pages/AdvertisementsPage';
import AdvertisementsData from '../../PagesEditData/AdvertisementsData';
import ActionsPage from '../../Pages/ActionsPage';
import ActionsData from '../../PagesEditData/ActionsData';
import VacanciesPage from '../../Pages/VacanciesPage';
import VacanciesData from '../../PagesEditData/VacanciesData';
import ShortcodesData from '../../PagesEditData/ShortcodesData';
import FeedbacksPage from '../../Pages/FeedbacksPage';
import FeedbacksData from '../../PagesEditData/FeedbacksData';
import UsersPage from '../../Pages/UsersPage';
import UsersData from '../../PagesEditData/UsersData';

export const navBarMenuItems = [
  {
    name: '??????????????',
    primaryLinkName: 'dashboard',
    id: 0,
    Icon: DashboardIcon,
    link: '/dashboard',
    Component: Dashboard,
  },
  {
    name: '??????????????',
    primaryLinkName: 'catalog',
    id: 1,
    Icon: InventoryIcon,
    items: [
      {
        name: '??????????????',
        link: '/catalog/analyses',
        Component: AnalysesPage,
        DataComponent: AnalysesData,
      },
      {
        name: '?????????????????? ????????????????',
        link: '/catalog/analysesCategories',
        Component: AnalysesCategoriesPage,
        DataComponent: AnalysesCategoryData,
      },
      {
        name: '???????????? ????????????????',
        link: '/catalog/analysesPackages',
        Component: AnalysesPackagesPage,
        DataComponent: AnalysesPackagesData,
      },
      {
        name: '??????????',
        link: '/catalog/actions',
        Component: ActionsPage,
        DataComponent: ActionsData,
      },
    ],
  },
  {
    name: '??????????????',
    primaryLinkName: 'content',
    id: 4,
    Icon: SourceIcon,
    items: [
      {
        name: '????????????????',
        link: '/content/pages',
        Component: AnalysesPagesPage,
        DataComponent: AnalysesPagesData,
      },
      {
        name: 'FAQ',
        link: '/content/FAQ',
        Component: FAQPage,
        DataComponent: FAQData,
      },
      {
        name: '??????????????',
        link: '/content/feedbacks',
        Component: FeedbacksPage,
        DataComponent: FeedbacksData,
      },
      {
        name: '???????????????? ????????????????????',
        link: '/content/advertisements',
        Component: AdvertisementsPage,
        DataComponent: AdvertisementsData,
      },
      {
        name: '????????????',
        link: '/content/news',
        Component: NewsPage,
        DataComponent: NewsData,
      },
      {
        name: '????????????????',
        link: '/content/vacancies',
        Component: VacanciesPage,
        DataComponent: VacanciesData,
      },
    ],
  },
  {
    name: '????????????????????????',
    primaryLinkName: 'settings',
    id: 5,
    Icon: SettingsIcon,
    items: [
      {
        name: '????????',
        link: '/settings/languages',
        Component: LanguagesPage,
        DataComponent: LanguagesData,
      },
      {
        name: '??????????',
        link: '/settings/cities',
        Component: CitiesPage,
        DataComponent: CitiesData,
      },
      {
        name: 'Robots.txt',
        link: '/settings/robots',
        Component: RobotsTxtData,
      },
      {
        name: '??????????????????',
        link: '/settings/redirects',
        Component: RedirectsPage,
        DataComponent: RedirectsData,
      },
      {
        name: '??????????????????????',
        link: '/settings/users',
        Component: UsersPage,
        DataComponent: UsersData,
      },
      {
        name: 'Shortcodes',
        link: '/settings/shortcodes',
        Component: ShortcodesData,
      },
      {
        name: 'GTM',
        link: '/settings/GTM',
        Component: GTMData,
      },
    ],
  },
];
