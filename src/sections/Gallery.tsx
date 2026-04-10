import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: '/images/page_8_img_1.jpeg',
    title: 'FX Horror',
    category: 'Efectos Especiales'
  },
  {
    src: '/images/page_8_img_2.jpeg',
    title: 'Herida Realista',
    category: 'Caracterización'
  },
  {
    src: '/images/page_6_img_1.jpeg',
    title: 'Body Paint Artístico',
    category: 'Body Paint'
  },
  {
    src: '/images/page_6_img_2.png',
    title: 'Ilusión Óptica',
    category: 'Ilusiones'
  },
  {
    src: '/images/page_10_img_1.jpeg',
    title: 'Delineado Gráfico',
    category: 'Editorial'
  },
  {
    src: '/images/page_7_img_2.jpeg',
    title: 'Caracterización',
    category: 'FX'
  }
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid items animation
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: (index % 3) * 0.1
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d4a574]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Portafolio</span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 line-decoration inline-block">Maquillaje FX</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Transformo la realidad a través de la caracterización extrema. Mi dominio en FX abarca desde el realismo médico hasta el horror cinematográfico. Me especializo en el manejo de volúmenes, profundidad de color en heridas y creación de texturas complejas que desafían la percepción del espectador.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`gallery-item group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 3 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`relative ${index === 0 || index === 3 ? 'aspect-[16/9]' : 'aspect-square'} overflow-hidden`}>
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs uppercase tracking-wider text-[#d4a574] mb-1">{image.category}</span>
                  <h3 className="text-lg lg:text-xl font-semibold">{image.title}</h3>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryImages[selectedImage].src} 
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <span className="text-sm uppercase tracking-wider text-[#d4a574]">{galleryImages[selectedImage].category}</span>
                <h3 className="text-2xl font-semibold mt-1">{galleryImages[selectedImage].title}</h3>
              </div>
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2">
              <span className="text-sm">{selectedImage + 1} / {galleryImages.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute left-6 lg:left-12 bottom-12"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Page</span>
          <span className="text-2xl font-bold text-[#d4a574]">08</span>
        </div>
      </motion.div>
    </section>
  );
}
