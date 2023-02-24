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

export const navBarMenuItems = [
  {
    name: 'Дашборд',
    primaryLinkName: 'dashboard',
    id: 0,
    Icon: DashboardIcon,
    link: '/dashboard',
    Component: Dashboard,
  },
  {
    name: 'Каталог',
    primaryLinkName: 'catalog',
    id: 1,
    Icon: InventoryIcon,
    items: [
      {
        name: 'Аналізи',
        link: '/catalog/analyses',
        Component: AnalysesPage,
        DataComponent: AnalysesData,
      },
      {
        name: 'Категорії аналізів',
        link: '/catalog/analysesCategories',
        Component: AnalysesCategoriesPage,
        DataComponent: AnalysesCategoryData,
      },
      {
        name: 'Пакети аналізів',
        link: '/catalog/analysesPackages',
        Component: AnalysesPackagesPage,
        DataComponent: AnalysesPackagesData,
      },
      {
        name: 'Акції',
        link: '/catalog/actions',
        Component: ActionsPage,
        DataComponent: ActionsData,
      },
    ],
  },
  {
    name: 'Контент',
    primaryLinkName: 'content',
    id: 4,
    Icon: SourceIcon,
    items: [
      {
        name: 'Сторінки',
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
        name: 'Відгуки',
        link: '/content/feedbacks',
        Component: FeedbacksPage,
        DataComponent: FeedbacksData,
      },
      {
        name: 'Рекламні оголошення',
        link: '/content/advertisements',
        Component: AdvertisementsPage,
        DataComponent: AdvertisementsData,
      },
      {
        name: 'Новини',
        link: '/content/news',
        Component: NewsPage,
        DataComponent: NewsData,
      },
      {
        name: 'Вакансії',
        link: '/content/vacancies',
        Component: VacanciesPage,
        DataComponent: VacanciesData,
      },
    ],
  },
  {
    name: 'Налаштування',
    primaryLinkName: 'settings',
    id: 5,
    Icon: SettingsIcon,
    items: [
      {
        name: 'Мови',
        link: '/settings/languages',
        Component: LanguagesPage,
        DataComponent: LanguagesData,
      },
      {
        name: 'Міста',
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
        name: 'Редіректи',
        link: '/settings/redirects',
        Component: RedirectsPage,
        DataComponent: RedirectsData,
      },
      // {
      //   name: 'Користувачі',
      //   link: '/settings/users',
      // },
      {
        name: 'GTM',
        link: '/settings/GTM',
        Component: GTMData,
      },
      {
        name: 'Shortcodes',
        link: '/settings/shortcodes',
        Component: ShortcodesData,
      },
    ],
  },
];
