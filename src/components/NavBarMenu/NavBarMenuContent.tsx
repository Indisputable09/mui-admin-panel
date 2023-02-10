import InventoryIcon from '@mui/icons-material/Inventory';
import SourceIcon from '@mui/icons-material/Source';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalysesPage from '../../Pages/AnalysesPage';
import Dashboard from '../../Pages/Dashboard';
import AnalysesData from '../PagesEditData/AnalysesData';
import AnalysesCategoriesPage from '../../Pages/AnalysesCategoriesPage';
import AnalysesCategoryData from '../PagesEditData/AnalysesCategoryData';
import AnalysesPackagesPage from '../../Pages/AnalysesPackagesPage';
import AnalysesPackagesData from '../PagesEditData/AnalysesPackagesData';
import AnalysesPagesPage from '../../Pages/AnalysesPagesPage';
import CitiesPage from '../../Pages/CitiesPage';
import CitiesData from '../PagesEditData/CitiesData';
import LanguagesPage from '../../Pages/LanguagesPage';
import LanguagesData from '../PagesEditData/LanguagesData';
import NewsPage from '../../Pages/NewsPage';
import NewsData from '../PagesEditData/NewsData';

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
      // {
      //   name: 'Акції',
      //   link: '/catalog/actions',
      //   Component: AnalysesPage,
      //   DataComponent: AnalysesData,
      // },
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
        DataComponent: AnalysesPackagesData,
      },
      // {
      //   name: 'FAQ',
      //   link: '/content/FAQ',
      // },
      // {
      //   name: 'Відгуки',
      //   link: '/content/feedbacks',
      // },
      // {
      //   name: 'Рекламні оголошення',
      //   link: '/content/advertisements',
      // },
      {
        name: 'Новини',
        link: '/content/news',
        Component: NewsPage,
        DataComponent: NewsData,
      },
      // {
      //   name: 'Вакансії',
      //   link: '/content/vacancies',
      // },
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
      // {
      //   name: 'Robots.txt',
      //   link: '/settings/robots',
      // },
      // {
      //   name: 'Редіректи',
      //   link: '/settings/redirects',
      // },
      // {
      //   name: 'Користувачі',
      //   link: '/settings/users',
      // },
      // {
      //   name: 'Shortcodes',
      //   link: '/settings/shortcodes',
      // },
    ],
  },
];
