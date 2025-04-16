const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Создаем директорию для изображений, если её нет
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Список изображений для скачивания с размерами
const images = [
  {
    url: 'https://picsum.photos/1920/1080',
    filename: 'nuanu-hero.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'art-exhibition.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'design-workshop.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'street-art.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'digital-art.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'music-park.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'nuanu-gallery.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'creative-tech.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'audio-architecture.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'audio-history.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'audio-artists.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'ar-murals.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'ar-future.png'
  },
  {
    url: 'https://picsum.photos/800/600',
    filename: 'ar-sculptures.png'
  }
];

// Функция для скачивания изображения
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      maxRedirects: 5
    });

    const writer = fs.createWriteStream(path.join(imagesDir, filename));
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Downloaded ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download ${url}: ${error.message}`);
  }
}

// Скачиваем все изображения
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
      // Добавляем небольшую задержку между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages(); 