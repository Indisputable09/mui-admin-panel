import img1 from '../images/product_mini_1.jpeg';
import img2 from '../images/product_mini_1.jpeg';

export const analysesRows = [
  {
    id: 1,
    sku: 'ART-2',
    price: 1000,
    category: 'Дослідження крові',
    name: 'В цій бібліотеці ще немає можливості робити рядки автоматичної висоти залежно від вмісту контенту, тому приходиться виходити з цієї ситуації кастомними шляхами',
    status: false,
  },
  {
    id: 2,
    name: 'В цій бібліотеці ще немає можливості робити рядки автоматичної висоти залежно від вмісту контенту, тому приходиться виходити з цієї ситуації кастомними шляхами',
    sku: 'ART-3',
    quantity: 20,
    discount: 20,
    status: false,
    category: 'Дослідження крові',
  },
  {
    id: 3,
    name: 'Jaime',
    sku: 'ART-4',
    price: 1800,
    status: true,
    category: 'Дослідження крові',
  },
  {
    id: 4,
    name: 'Arya',
    sku: 'ART-5',
    price: 20000,
    discount: 20,
    status: true,
    category: 'Дослідження крові',
  },
  {
    id: 5,
    name: 'Daenerys',
    sku: 'ART-6',
    price: 20000,
    status: false,
    category: 'Дослідження крові',
  },
  {
    id: 6,
    name: 'Daenerys',
    sku: 'ART-7',
    price: 1500,
    discount: 80,
    status: true,
    category: 'Дослідження крові',
  },
  {
    id: 7,
    name: 'Ferrara',
    sku: 'ART-8',
    price: 100,
    discount: 20,
    status: true,
    category: 'Дослідження крові',
  },
  {
    id: 8,
    name: 'Rossini',
    sku: 'ART-9',
    price: 1000,
    discount: 25,
    status: false,
    category: 'Дослідження крові',
  },
  {
    id: 9,
    name: 'Harvey',
    sku: 'ART-10',
    price: 300,
    discount: 5,
    status: true,
    category: 'Дослідження крові',
  },
];

export const analysesCategoriesRows = [
  {
    id: 1,
    name: 'Тут буде довга категорія товару, щоб зрозуміти, як все працює. Якщо так сподобається - то ми так і залишимо. Сподіваюсь, що все сподобається!',
    sort: 5,
  },
  {
    id: 2,
    name: 'Рандомна категорія 2',
    sort: 15,
  },
  {
    id: 3,
    name: 'Рандомна категорія 3',
    sort: 22,
  },
  {
    id: 4,
    name: 'Рандомна категорія 4',
    sort: 1,
  },
  {
    id: 5,
    name: 'Рандомна категорія 5',
    sort: 44,
  },
  {
    id: 6,
    name: 'Рандомна категорія 6',
    sort: 4,
  },
  {
    id: 7,
    name: 'Рандомна категорія 7',
    sort: 40,
  },
  {
    id: 8,
    name: 'Рандомна категорія 8',
    sort: 3,
  },
  {
    id: 9,
    name: 'Рандомна категорія 9',
    sort: 1,
  },
];

export const analysesPackagesRows = [
  {
    id: 1,
    name: 'Тут буде довга категорія товару, щоб зрозуміти, як все працює. Якщо так сподобається - то ми так і залишимо. Сподіваюсь, що все сподобається!',
    sort: 5,
  },
  {
    id: 2,
    name: 'Рандомний пакет 2',
    sort: 15,
  },
  {
    id: 3,
    name: 'Рандомний пакет 3',
    sort: 22,
  },
  {
    id: 4,
    name: 'Рандомний пакет 4',
    sort: 1,
  },
  {
    id: 5,
    name: 'Рандомний пакет 5',
    sort: 44,
  },
  {
    id: 6,
    name: 'Рандомний пакет 6',
    sort: 4,
  },
  {
    id: 7,
    name: 'Рандомний пакет 7',
    sort: 40,
  },
  {
    id: 8,
    name: 'Рандомний пакет 8',
    sort: 3,
  },
  {
    id: 9,
    name: 'Рандомний пакет 9',
    sort: 1,
  },
];

export const analysesPagesRows = [
  { id: 0, name: 'Головна', linkName: 'main' },
  { id: 1, name: 'Аналізи та ціни', linkName: 'analysesAndPrices' },
  { id: 2, name: 'Пакети досліджень', linkName: 'examinationsPackages' },
  { id: 3, name: 'Аналізи вдома', linkName: 'analysesAtHome' },
  { id: 4, name: 'COVID - 19', linkName: 'covid19' },
  { id: 5, name: 'Акції', linkName: 'actions' },
  { id: 6, name: 'Лабораторний довідник', linkName: 'laboratoryHandbook' },
  { id: 7, name: 'Співпраця', linkName: 'coworking' },
  { id: 8, name: 'Франшиза', linkName: 'franchise' },
  { id: 9, name: 'Про лабораторію', linkName: 'aboutLaboratory' },
  { id: 10, name: 'Найчастіші запитання', linkName: 'FAQ' },
  { id: 11, name: 'Відгуки', linkName: 'feedbacks' },
  { id: 12, name: 'Політика якості', linkName: 'qualityPolitics' },
  { id: 13, name: 'Вакансії', linkName: 'vacancies' },
  { id: 14, name: 'Новини', linkName: 'news' },
  { id: 15, name: 'Політика конфедонційності', linkName: 'privacyPolicy' },
  { id: 16, name: 'Угода користувача', linkName: 'termsOfUse' },
  { id: 17, name: 'Контакти', linkName: 'contacts' },
  { id: 18, name: '404', linkName: '404' },
];

export const FAQRows = [
  {
    id: 1,
    name: 'Тут буде довге питання, щоб зрозуміти, як все працює. Якщо так сподобається - то ми так і залишимо. Сподіваюсь, що все сподобається!',
  },
  {
    id: 2,
    name: 'Рандомне питання 2',
  },
  {
    id: 3,
    name: 'Рандомне питання 3',
  },
  {
    id: 4,
    name: 'Рандомне питання 4',
  },
  {
    id: 5,
    name: 'Рандомне питання 5',
  },
  {
    id: 6,
    name: 'Рандомне питання 6',
  },
  {
    id: 7,
    name: 'Рандомне питання 7',
  },
  {
    id: 8,
    name: 'Рандомне питання 8',
  },
  {
    id: 9,
    name: 'Рандомне питання 9',
  },
];

export const newsRows = [
  {
    id: 0,
    image: img1,
    name: 'Some text0',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 1,
    image: img1,
    name: 'Some text1',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 2,
    image: img1,
    name: 'Some text2',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 3,
    image: img1,
    name: 'Some text3',
    active: false,
    creationDate: '2023-01-19',
  },
  {
    id: 4,
    image: img1,
    name: 'Some text4',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 5,
    image: img1,
    name: 'Some text5',
    active: false,
    creationDate: '2023-01-19',
  },
  {
    id: 6,
    image: img1,
    name: 'Some text6',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 7,
    image: img1,
    name: 'Some text7',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 8,
    image: img1,
    name: 'Some text8',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 9,
    image: img1,
    name: 'Some text9',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 10,
    image: img1,
    name: 'Some text 10',
    active: true,
    creationDate: '2023-01-19',
  },
  {
    id: 11,
    image: img1,
    name: 'Some text 11',
    active: true,
    creationDate: '2023-01-19',
  },
];

export const languagesRows = [
  {
    id: 1,
    name: 'Українська',
  },
  {
    id: 2,
    name: 'English',
  },
];

export const citiesRows = [
  {
    id: 1,
    name: 'Київ',
  },
  {
    id: 2,
    name: 'Харків',
  },
];

export const manufacturersRows = [
  {
    id: 1,
    image: img1,
    name: 'Mobile phone',
  },
  {
    id: 2,
    image: img1,
    name: 'Mobile phone > Apple',
  },
  {
    id: 3,
    image: img2,
    name: 'Mobile phone > Apple',
  },
  {
    id: 4,
    image: img2,
    name: 'Mobile phone > Apple',
  },
  {
    id: 5,
    image: img1,
    name: 'Mobile phone > Apple',
  },
  {
    id: 6,
    image: img1,
    name: 'Mobile phone > Apple',
  },
  {
    id: 7,
    image: img1,
    name: 'Mobile phone > Apple',
  },
  {
    id: 8,
    image: img1,
    name: 'Mobile phone > Apple',
  },
];

export const attributesRows = [
  {
    id: 1,
    name: 'attribute 1',
    position: 1,
    values: 0,
  },
  {
    id: 2,
    name: 'attribute 2',
    position: 2,
    values: 1,
  },
  {
    id: 3,
    name: 'attribute 3',
    position: 3,
    values: 2,
  },
  {
    id: 4,
    name: 'attribute 5',
    position: 4,
    values: 3,
  },
  {
    id: 5,
    name: 'attribute 6',
    position: 5,
    values: 4,
  },
  {
    id: 6,
    name: 'attribute 7',
    position: 6,
    values: 5,
  },
  {
    id: 7,
    name: 'attribute 8',
    position: 7,
    values: 6,
  },
  {
    id: 8,
    name: 'attribute 9',
    position: 8,
    values: 7,
  },
];

export const attributesCategoriesRows = [
  {
    id: 1,
    name: 'attribute category 1',
    position: 1,
  },
  {
    id: 2,
    name: 'attribute category 2',
    position: 2,
  },
  {
    id: 3,
    name: 'attribute category 3',
    position: 3,
  },
  {
    id: 4,
    name: 'attribute category 5',
    position: 4,
  },
  {
    id: 5,
    name: 'attribute category 6',
    position: 5,
  },
  {
    id: 6,
    name: 'attribute category 7',
    position: 6,
  },
  {
    id: 7,
    name: 'attribute category 8',
    position: 7,
  },
  {
    id: 8,
    name: 'attribute category 9',
    position: 8,
  },
];

export const privacyPolicyRows = [
  {
    id: 1,
    name: 'Політика конфіденційності',
  },
  {
    id: 2,
    name: 'Політика конфіденційності',
  },
  {
    id: 3,
    name: 'Політика конфіденційності',
  },
  {
    id: 4,
    name: 'Політика конфіденційності',
  },
  {
    id: 5,
    name: 'Політика конфіденційності',
  },
  {
    id: 6,
    name: 'Політика конфіденційності',
  },
  {
    id: 7,
    name: 'Політика конфіденційності',
  },
  {
    id: 8,
    name: 'Політика конфіденційності',
  },
  {
    id: 9,
    name: 'Політика конфіденційності',
  },
];

export const redirectsRows = [
  {
    id: 1,
    from: '/services/solnichney-ochki 5',
    to: '/services/solnichney-ochki',
  },
  {
    id: 2,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 3,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 4,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 5,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 6,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 7,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 8,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
  {
    id: 9,
    from: '/services/solnichney-ochki',
    to: '/services/solnichney-ochki',
  },
];

export const clientsRows = [
  {
    id: 1,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 2,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: false,
    registration: '2023-01-19',
  },
  {
    id: 3,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: false,
    registration: '2023-01-19',
  },
  {
    id: 4,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 5,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 6,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 7,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 8,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
  {
    id: 9,
    telephoneNumber: '+380-99-999-99-99',
    name: 'Олександр',
    surname: 'Прізвище',
    email: 'someemail000999@gmail.com',
    sales: 1800,
    active: true,
    registration: '2023-01-19',
  },
];

export const ordersRows = [
  {
    id: 1,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Оброблений - Анастасія',
    date: '2023-01-19',
  },
  {
    id: 2,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Відмінений',
    date: '2023-01-19',
  },
  {
    id: 3,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Очікування платежу',
    date: '2023-01-19',
  },
  {
    id: 4,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Відмінений',
    date: '2023-01-19',
  },
  {
    id: 5,
    orderId: 'ASDFGHJKL',
    delivery: 'Самовивіз',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Очікування платежу',
    date: '2023-01-19',
  },
  {
    id: 6,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Оброблений - Анастасія',
    date: '2023-01-19',
  },
  {
    id: 7,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Оброблений - Анастасія',
    date: '2023-01-19',
  },
  {
    id: 8,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Оброблений - Анастасія',
    date: '2023-01-19',
  },
  {
    id: 9,
    orderId: 'ASDFGHJKL',
    delivery: 'Нова пошта',
    name: 'О. Прізвище',
    telephoneNumber: '+380-99-999-99-99',
    toPay: 1800,
    payment: 'Карта',
    orderStatus: 'Оброблений - Анастасія',
    date: '2023-01-19',
  },
];

export const optionsRows = [
  {
    id: 1,
    name: 'option 1',
    position: 1,
    values: 0,
  },
  {
    id: 2,
    name: 'option 2',
    position: 2,
    values: 1,
  },
  {
    id: 3,
    name: 'option 3',
    position: 3,
    values: 2,
  },
  {
    id: 4,
    name: 'option 5',
    position: 4,
    values: 3,
  },
  {
    id: 5,
    name: 'option 6',
    position: 5,
    values: 4,
  },
  {
    id: 6,
    name: 'option 7',
    position: 6,
    values: 5,
  },
  {
    id: 7,
    name: 'option 8',
    position: 7,
    values: 6,
  },
  {
    id: 8,
    name: 'option 9',
    position: 8,
    values: 7,
  },
];
