import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, Focus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  {
    icon: Ruler,
    title: 'Precisión Milimétrica',
    description: 'La geometría es mi pasión. Me especializo en trazos limpios, angulares y vanguardistas que transforman la mirada en una estructura arquitectónica. No uso el delineador para seguir el ojo, sino para redefinirlo.',
    image: '/images/page_5_img_1.jpeg',
    stats: [
      { label: 'Precisión', value: '99%' },
      { label: 'Técnica', value: 'Avanzada' }
    ]
  },
  {
    icon: Focus,
    title: 'Simetría Absoluta',
    description: 'Mi capacidad para combinar el trazo firme del delineado gráfico con la suavidad de las sombras me permite crear miradas tridimensionales que son, al mismo tiempo, nítidas y profundas.',
    image: '/images/page_5_img_2.jpeg',
    stats: [
      { label: 'Balance', value: '100%' },
      { label: 'Armonía', value: 'Perfecta' }
    ]
  }
];

export default function Specialties() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate specialty cards
      gsap.utils.toArray<HTMLElement>('.specialty-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100,
            rotateX: index === 0 ? -10 : 10
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="specialties" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#d4a574]/5 to-transparent rounded-full" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Expertise</span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Especialidades Técnicas</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d4a574]" />
            <span className="text-muted-foreground uppercase tracking-widest text-sm">Técnicas</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d4a574]" />
          </div>
        </motion.div>

        {/* Specialties */}
        <div className="space-y-20 lg:space-y-32">
          {specialties.map((specialty, index) => (
            <div 
              key={index}
              className={`specialty-card grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-square rounded-2xl overflow-hidden"
                >
                  <img 
                    src={specialty.image} 
                    alt={specialty.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                    {specialty.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="glass rounded-xl px-4 py-3 flex-1">
                        <div className="text-2xl font-bold text-[#d4a574]">{stat.value}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Decorative frame */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl border-2 border-[#d4a574]/10 ${
                  index % 2 === 0 ? '-bottom-4 -right-4' : '-bottom-4 -left-4'
                }`} />
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4a574]/20 to-[#c9a227]/20 flex items-center justify-center"
                >
                  <specialty.icon className="w-10 h-10 text-[#d4a574]" />
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-bold">
                  {specialty.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {specialty.description}
                </p>

                {/* Decorative elements */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#d4a574] to-[#c9a227] rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-[#d4a574]" />
                  <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute left-6 lg:left-12 bottom-12"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Page</span>
          <span className="text-2xl font-bold text-[#d4a574]">06</span>
        </div>
      </motion.div>
    </section>
  );
}
