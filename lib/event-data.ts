// Данные по ивентам для Nuanu Guide
// Аналогично audio-guide-data.ts

export interface EventCard {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  time: string;
  likes?: number;
  author: string;
  price: string;
  rating: number;
  reviews: number;
  card_color: string; // основной цвет карточки
  location?: string;
  capacity?: number;
  registered?: number;
  fullDescription?: string;
  videoUrl?: string;
}

export const EVENTS: EventCard[] = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Погрузитесь в мир современного искусства на нашей новой выставке, где представлены работы местных художников. Уникальная возможность увидеть работы талантливых мастеров Бали и пообщаться с ними лично.",
    image: "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?q=80&w=1000",
    category: "art",
    date: "24 марта",
    time: "19:00",
    likes: 128,
    author: "Мария Артова",
    price: "Бесплатно",
    rating: 4.8,
    reviews: 47,
    card_color: "#473656",
    location: "Nuanu Gallery",
    capacity: 150,
    registered: 89,
    fullDescription: `Мы приглашаем вас на уникальную выставку современного искусства в Nuanu Creative Village.\n\nНа выставке будут представлены работы более 20 талантливых художников Бали, работающих в различных стилях и техниках. Вы увидите живопись, скульптуру, инсталляции и цифровое искусство.\n\nПрограмма мероприятия:\n• 19:00 - Открытие выставки\n• 19:30 - Приветственное слово куратора\n• 20:00 - Знакомство с художниками\n• 21:00 - Фуршет и нетворкинг\n• 22:00 - Музыкальное выступление\n\nВсе работы можно приобрести. Часть средств пойдет на поддержку местного арт-сообщества.`,
  },
  {
    id: 2,
    title: "Jungle Kids - Детский центр развития",
    description: "Комплексный детский центр с дневным присмотром, летними лагерями и дополнительными занятиями. Для детей от 1 до 9 лет. Попробуйте бесплатный пробный день!",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1000",
    category: "kids",
    date: "Пн-Пт",
    time: "8:00-20:00",
    likes: 245,
    author: "Jungle Kids Team",
    price: "От 120.000 IDR",
    rating: 4.9,
    reviews: 156,
    card_color: "#3d693f",
    location: "Jungle Kids, Nuanu Creative City",
    capacity: 50,
    registered: 32,
    fullDescription: `Комплексный детский центр с дневным присмотром, летними лагерями и дополнительными занятиями. Для детей от 1 до 9 лет. Попробуйте бесплатный пробный день!`,
    videoUrl: "https://youtube.com/shorts/fbQaVcm5fAw?feature=share",
  },
  {
    id: 3,
    title: "Джазовый вечер под открытым небом",
    description: "Насладитесь живой джазовой музыкой в уютной атмосфере нашего сада. Выступают лучшие джазовые музыканты острова, а также специальные гости из Джакарты.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000",
    category: "music",
    date: "26 марта",
    time: "20:00",
    likes: 256,
    author: "Джон Смит",
    price: "350.000 IDR",
    rating: 4.9,
    reviews: 89,
    card_color: "#7a3c00",
  },
  {
    id: 4,
    title: "Кулинарный мастер-класс балийской кухни",
    description: "Научитесь готовить аутентичные балийские блюда под руководством опытного шеф-повара. В программе: традиционные специи, соусы и техники приготовления.",
    image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1000",
    category: "food",
    date: "28 марта",
    time: "12:00",
    likes: 189,
    author: "Вайан Путу",
    price: "500.000 IDR",
    rating: 4.7,
    reviews: 124,
    card_color: "#472a1a",
  },
  {
    id: 5,
    title: "Мастер-класс по гончарному искусству",
    description: "Создайте свое уникальное керамическое изделие под руководством опытного мастера. Все материалы включены в стоимость, подходит для начинающих.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000",
    category: "workshops",
    date: "30 марта",
    time: "15:00",
    likes: 145,
    author: "Анна Керамика",
    price: "400.000 IDR",
    rating: 4.9,
    reviews: 67,
    card_color: "#b45309",
  },
]; 