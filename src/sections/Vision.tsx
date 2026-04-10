import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const visionPoints = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Referente de Innovación',
    description: 'Ser reconocida como la autoridad principal en el área de Ilusiones Ópticas y Body Paint, destacando por la integración disruptiva de materiales físicos como cartulina en la creación de siluetas.',
    image: 'images/page_4_img_1.jpeg'
  },
  {
    number: '02',
    icon: Crown,
    title: 'Liderazgo en el Sector FX',
    description: 'Posicionarme como la opción predilecta para producciones cinematográficas y audiovisuales que requieran caracterización avanzada y efectos especiales de alta complejidad.',
    image: 'images/page_4_img_2.jpeg'
  }
];

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vision cards
      gsap.utils.toArray<HTMLElement>('.vision-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            rotateY: index % 2 === 0 ? -10 : 10
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
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
      id="vision" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a574" stopOpacity="0" />
              <stop offset="50%" stopColor="#d4a574" stopOpacity="1" />
              <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${20 + i * 15}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Propósito</span>
          <h2 className="text-4xl lg:text-6xl font-bold line-decoration inline-block">Mi Visión</h2>
        </motion.div>

        {/* Vision Cards */}
        <div className="space-y-16 lg:space-y-24">
          {visionPoints.map((point, index) => (
            <div 
              key={index}
              className={`vision-card grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* Number and Icon */}
                <div className="flex items-center gap-4">
                  <span className="text-6xl lg:text-8xl font-bold text-[#d4a574]/20">{point.number}</span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a574]/20 to-[#c9a227]/20 flex items-center justify-center">
                    <point.icon className="w-7 h-7 text-[#d4a574]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-4xl font-bold">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {point.description}
                </p>

                {/* Decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-[#d4a574] to-transparent rounded-full" />
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <img 
                    src={point.image} 
                    alt={point.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating number */}
                  <div className="absolute bottom-6 right-6 glass rounded-xl px-4 py-2">
                    <span className="text-3xl font-bold text-[#d4a574]">{point.number}</span>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl border border-[#d4a574]/20 ${
                  index % 2 === 0 ? '-bottom-4 -right-4' : '-bottom-4 -left-4'
                }`} />
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
          <span className="text-2xl font-bold text-[#d4a574]">04</span>
        </div>
      </motion.div>
    </section>
  );
}
