import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Camera, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: 'Maquillaje Glam & Social',
    description: 'Acabados de lujo para eventos, novias y galas. Pieles blindadas y técnica de "red carpet".',
    image: '/images/page_3_img_2.jpeg',
    features: ['Novias', 'Eventos', 'Galas', 'Red Carpet']
  },
  {
    icon: Camera,
    title: 'Sesiones de Fotos',
    description: 'Maquillaje diseñado para fotografía analógica y digital, cuidando la reflexión de la luz y el detalle HD.',
    image: '/images/page_3_img_3.jpeg',
    features: ['Editorial', 'Analógico', 'Digital', 'HD']
  },
  {
    icon: Film,
    title: 'FX & Caracterización',
    description: 'Creación de heridas, quemaduras, envejecimiento y personajes completos para producciones de ficción.',
    image: '/images/page_3_img_1.jpeg',
    features: ['Heridas', 'Envejecimiento', 'Personajes', 'Prótesis']
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 100,
              rotateX: 15
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.2
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
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
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Catálogo</span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Catálogo de Servicios</h2>
          <p className="text-muted-foreground text-lg">A domicilio & Set</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ y: -10, rotateX: 5 }}
                transition={{ duration: 0.4 }}
                className="relative h-full glass rounded-3xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#d4a574]/20 backdrop-blur-sm flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-[#d4a574]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 group-hover:text-[#d4a574] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, fIndex) => (
                      <span 
                        key={fIndex}
                        className="px-3 py-1 text-xs uppercase tracking-wider rounded-full bg-[#d4a574]/10 text-[#d4a574]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            ¿Tienes un proyecto en mente? Trabajemos juntos.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4a574] to-[#c9a227] text-background font-semibold"
          >
            <span>Contactar</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Page indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute right-6 lg:right-12 bottom-12"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Page</span>
          <span className="text-2xl font-bold text-[#d4a574]">03</span>
        </div>
      </motion.div>
    </section>
  );
}
