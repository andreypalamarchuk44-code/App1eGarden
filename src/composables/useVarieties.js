
import fudzhiImg from '../assets/styles/images/fudzhi.jpg'
import apple1Img from '../assets/styles/images/apple1.jpg'
import apple8Img from '../assets/styles/images/apple8.png'
import apple6Img from '../assets/styles/images/apple6.jpg'
import apple7Img from '../assets/styles/images/apple7.jpg'
import apple3Img from '../assets/styles/images/apple3.jpg'
import apple2Img from '../assets/styles/images/apple2.jpg'
import apple12Img from '../assets/styles/images/apple12.jpg'


export const varieties = [
{
  id: 1,
  slug: 'holden',
  name: 'Голден делішес',
  image: apple1Img,
    origin: 'Вінниця',
    season: 'autumn',
    seasonLabel: 'Осінній',
    taste: 'sweet',
    color: 'yellow',
    price: 45,
    rating: 4.9,
    reviews: 38,
    badge: 'Популярне',
    badgeType: 'popular',
    tags: ['Солодкий', 'Хрусткий', 'Лежкий'],
    desc: 'Класичний осінній сорт із золотистою шкірою та солодким медовим смаком. Чудово підходить для свіжого вживання та соків.',
    months: [0,0,0,0,0,0,0,1,2,2,1,0]
  },
  {
    id: 2,
    slug: 'antonivka',
    name: 'Антонівка',
    image: apple8Img,
    origin: 'Вінниця',
    season: 'autumn',
    seasonLabel: 'Осінній',
    taste: 'mixed',
    color: 'green',
    price: 32,
    rating: 4.7,
    reviews: 25,
    badge: 'Хіт',
    badgeType: 'hit',
    tags: ['Кисло-солодкий', 'Соковитий', 'Ароматний'],
    desc: 'Народний улюбленець. Яскравий аромат, ніжна соковита м\'якоть із приємною кислинкою. Ідеальний для варення і запікання.',
    months: [0,0,0,0,0,0,0,1,2,1,0,0]
  },
  {
    id: 3,
    slug: 'melba',
    name: 'Мелба',
    image: apple12Img,
    origin: 'Вінниця',
    season: 'summer',
    seasonLabel: 'Літній',
    taste: 'sweet',
    color: 'pale',
    price: 35,
    rating: 4.8,
    reviews: 14,
    badge: 'Новинка',
    badgeType: 'new',
    tags: ['Ніжний', 'Ранній', 'М\'який'],
    desc: 'Ранній літній сорт із ніжною кремовою м\'якоттю та тонким фруктовим ароматом. Перші яблука сезону.',
    months: [0,0,0,0,0,0,1,2,1,0,0,0]
  },
  {
    id: 4,
    slug: 'fudzhi',
    name: 'Фуджі',
    image: fudzhiImg,
    origin: 'Вінниця',
    season: 'winter',
    seasonLabel: 'Зимовий',
    taste: 'sweet',
    color: 'red',
    price: 55,
    rating: 5.0,
    reviews: 12,
    badge: 'Популярне',
    badgeType: 'popular',
    tags: ['Солодкий', 'Хрусткий', 'Зимовий'],
    desc: 'Японський зимовий сорт із щільною хрусткою м\'якоттю та насиченим солодким смаком. Зберігається до весни.',
    months: [1,1,0,0,0,0,0,0,1,2,2,1]
  },
  {
    id: 5,
    slug: 'aidared',
    name: 'Айдаред',
    image: apple6Img ,
    origin: 'Вінниця',
    season: 'summer',
    seasonLabel: 'Літній',
    taste: 'mixed',
    color: 'green',
    price: 28,
    rating: 4.5,
    reviews: 22,
    badge: 'Хіт',
    badgeType: 'hit',
    tags: ['Кисло-солодкий', 'Соковитий', 'Ранній'],
    desc: 'Соковитий літній сорт із приємним кисло-солодким смаком. Дуже популярний серед дітей.',
    months: [0,0,0,0,0,1,2,1,0,0,0,0]
  },
  {
    id: 6,
    slug: 'dzhanhold',
    name: 'Джанголд',
    image: apple7Img,
    origin: 'Вінниця',
    season: 'winter',
    seasonLabel: 'Зимовий',
    taste: 'sweet',
    color: 'gold',
    price: 60,
    rating: 4.9,
    reviews: 8,
    badge: 'Новинка',
    badgeType: 'new',
    tags: ['Солодкий', 'Великий', 'Зимовий'],
    desc: 'Новий зимовий сорт із великими плодами та цукровою насиченою м\'якоттю. Золотисте забарвлення при дозріванні.',
    months: [1,1,0,0,0,0,0,0,0,1,2,1]
  },
  {
    id: 7,
    slug: 'symirenka',
    name: 'Симиренка',
    image: apple3Img,
    origin: 'Вінниця',
    season: 'autumn',
    seasonLabel: 'Осінній',
    taste: 'mixed',
    color: 'green',
    price: 38,
    rating: 4.6,
    reviews: 17,
    badge: 'Топ продажу',
    badgeType: 'popular',
    tags: ['Кисло-солодкий', 'Зелений', 'Лежкий'],
    desc: 'Легендарний українській сорт зеленого кольору. Характерний пряний аромат та соковита кисло-солодка м\'якоть.',
    months: [1,1,0,0,0,0,0,0,1,2,1,0]
  },
  {
    id: 8,
    slug: 'pinova',
    name: 'Пінова',
    image: apple2Img,
    origin: 'Вінниця',
    season: 'autumn',
    seasonLabel: 'Осінній',
    taste: 'sweet',
    color: 'red',
    price: 50,
    rating: 4.8,
    reviews: 19,
    badge: null,
    badgeType: null,
    tags: ['Солодкий', 'Ароматний', 'Яскравий'],
    desc: 'Яскраво-червоне яблуко з насиченим солодким смаком та чудовим ароматом. Один із найкрасивіших сортів.',
    months: [0,0,0,0,0,0,0,0,1,2,1,0]
  }
]

export function useVarieties() {
  const MONTHS = ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру']

  function getBySlug(slug) {
    return varieties.find(v => v.slug === slug)
  }

  function filterVarieties({ season = 'all', taste = 'all' } = {}) {
    return varieties.filter(v => {
      const matchSeason = season === 'all' || v.season === season
      const matchTaste  = taste === 'all'  || v.taste === taste
      return matchSeason && matchTaste
    })
  }

  return { varieties, MONTHS, getBySlug, filterVarieties }
}
