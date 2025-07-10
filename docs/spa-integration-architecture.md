# Архитектура интеграции аудиогида в SPA

## Обзор

Система аудиогида полностью интегрирована в существующее Single Page Application (SPA) Nuanu Guide. Интеграция обеспечивает бесшовный переход между разделами приложения и аудиогидом через QR-коды без перезагрузки страницы.

## Архитектурные принципы

### 1. Единое состояние приложения
- Все навигация управляется через единый `useState` в `app/page.tsx`
- Аудиогид является специальным разделом SPA (`audio-guide`)
- Состояние аудиогида хранится отдельно от основной навигации

### 2. URL-параметры для QR-кодов
- QR-коды генерируют ссылки с параметрами: `?audio-guide=<slug>&lang=<language>`
- При загрузке страницы параметры обрабатываются и автоматически открывается аудиогид
- URL очищается после обработки для чистоты адресной строки

### 3. Условное отображение UI
- Нижнее меню скрывается в режиме аудиогида
- Аудиогид имеет собственную навигацию и кнопку "Назад"
- Возврат осуществляется в раздел "Guides"

## Компоненты системы

### Главный компонент (app/page.tsx)
```typescript
export default function AppSPA() {
  const [active, setActive] = useState("home")
  const [audioGuideData, setAudioGuideData] = useState<{
    slug: string;
    lang: string;
  } | null>(null)
  
  // Обработка QR-кодов через URL параметры
  useEffect(() => {
    const audioGuide = searchParams.get('audio-guide')
    const lang = searchParams.get('lang') || 'en'
    
    if (audioGuide) {
      setAudioGuideData({ slug: audioGuide, lang })
      setActive('audio-guide')
    }
  }, [searchParams])
}
```

### Компонент аудиогида (components/sections/AudioGuideSection.tsx)
```typescript
interface AudioGuideSectionProps {
  slug: string
  lang: string
  onClose: () => void
}

export default function AudioGuideSection({ slug, lang, onClose }: AudioGuideSectionProps) {
  // Полноэкранный компонент с собственной навигацией
  // Интегрирован с существующими UI компонентами
  // Поддерживает все функции аудиогида
}
```

### Обновленный GuidesSection
```typescript
interface GuidesSectionProps {
  onOpenAudioGuide?: (slug: string, lang: string) => void
}

export default function GuidesSection({ onOpenAudioGuide }: GuidesSectionProps) {
  // Кнопки "Start Guide" теперь вызывают onOpenAudioGuide
  // Удалены Link компоненты для внешних страниц
}
```

## Поток данных

### 1. Сценарий QR-кода
```
QR-код → URL с параметрами → useSearchParams → setAudioGuideData → AudioGuideSection
```

### 2. Сценарий из интерфейса
```
GuidesSection → onOpenAudioGuide → setAudioGuideData → AudioGuideSection
```

### 3. Возврат
```
AudioGuideSection → onClose → setActive("guides") → GuidesSection
```

## Стилистическая интеграция

### Общие принципы дизайна
- Используются те же цвета и градиенты: `purple-50`, `pink-50`, `purple-600`
- Применяются общие компоненты: `Button`, `Card`, `Badge`, `Slider`
- Сохраняется типография: `Montserrat` и `Playfair Display`
- Анимации через `framer-motion` как в остальном приложении

### Адаптивность
- Полная поддержка мобильных устройств
- Responsive дизайн с breakpoints
- Touch-friendly интерфейс

### Accessibility
- Сохранены все функции доступности
- ARIA атрибуты для screen readers
- Keyboard navigation
- High contrast и large fonts опции

## Структура компонентов

```
app/
├── page.tsx                     # Главный SPA компонент
├── layout.tsx                   # Обновлен с Suspense для useSearchParams
components/
├── sections/
│   ├── AudioGuideSection.tsx    # Интегрированный аудиогид
│   └── GuidesSection.tsx        # Обновлен для интеграции
├── ui/                          # Общие UI компоненты
└── bottom-navigation.tsx        # Условно скрывается
```

## Преимущества интеграции

### 1. Бесшовный UX
- Нет перезагрузки страницы при переходе к аудиогиду
- Сохраняется состояние приложения
- Плавные анимации переходов

### 2. Единая экосистема
- Общие компоненты и стили
- Консистентная навигация
- Единое управление состоянием

### 3. Оптимизация производительности
- Код аудиогида загружается только при необходимости
- Shared chunks для общих компонентов
- Эффективное управление памятью

### 4. Простота QR-кодов
- Прямые ссылки на конкретные объекты
- Автоматическое определение языка
- Работа без JavaScript (fallback)

## Конфигурация QR-кодов

### Формат ссылок
```
https://yourdomain.com/?audio-guide=<slug>&lang=<language>
```

### Примеры
```
https://yourdomain.com/?audio-guide=jungle-kids-center&lang=en
https://yourdomain.com/?audio-guide=jungle-kids-center&lang=ru
```

### Генерация QR-кодов
```javascript
// Используем API для генерации QR-кодов
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`
```

## Развертывание

### 1. Обновление зависимостей
```bash
npm install # Все зависимости уже настроены
```

### 2. Сборка
```bash
npm run build
```

### 3. Настройка сервера
- Убедитесь, что все роуты направляются на `index.html`
- Настройте правильные заголовки для PWA
- Включите сжатие для статических файлов

## Тестирование

### Локальное тестирование
```bash
npm run dev
# Тестируйте QR-коды через:
# http://localhost:3000/?audio-guide=jungle-kids-center&lang=en
```

### Тестирование QR-кодов
1. Откройте `/qr-demo.html` в браузере
2. Отсканируйте QR-коды камерой телефона
3. Проверьте автоматическое открытие аудиогида

## Мониторинг и аналитика

### Отслеживание использования
```javascript
// В AudioGuideSection.tsx можно добавить аналитику
useEffect(() => {
  // Отправка события открытия аудиогида
  analytics.track('audio_guide_opened', {
    slug: slug,
    language: lang,
    source: 'qr_code'
  })
}, [slug, lang])
```

### Метрики производительности
- Время загрузки аудиогида
- Процент завершения прослушивания
- Популярные языки
- Наиболее посещаемые объекты

## Заключение

Интеграция аудиогида в SPA обеспечивает:
- Современный пользовательский опыт
- Техническую эффективность
- Простоту использования QR-кодов
- Масштабируемость системы

Система готова к продакшн использованию и может быть легко расширена новыми объектами и функциями. 