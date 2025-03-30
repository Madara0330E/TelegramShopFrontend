import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Только Autoplay
import 'swiper/css'; // Базовые стили
import Image from 'next/image';

interface Banner {
  id: string;
  imgUrl: string;
  link: string;
}

interface BannerSliderProps {
  apiUrl: string;
}

const BannerSlider = ({ apiUrl }: BannerSliderProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setBanners(data.banners || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [apiUrl]);

  if (loading) return <div className="w-[95.833vw] h-[31.25vw] flex items-center justify-center">Loading...</div>;
  if (error) return <div className="w-[95.833vw] h-[31.25vw] flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!banners.length) return <div className="w-[95.833vw] h-[31.25vw] flex items-center justify-center">No banners available</div>;

  return (
    <div className="w-full p-2 pb-4 pt-4 mx-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0} // Убрали промежутки между слайдами
        slidesPerView={1}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false 
        }}
        loop
        noSwiping={false} // Разрешаем свайп
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative w-full h-[31.25vw]" >
                <Image 
                  src={banner.imgUrl} 
                  alt="Banner" 
                  fill
                  className="object-cover rounded-[2.083vw]"
                  unoptimized // Если нужна оптимизация - удалите эту строку
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;