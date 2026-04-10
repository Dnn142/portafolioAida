import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    number: '1',
    title: 'Génesis Editorial',
    description: 'Inicio en el maquillaje social y editorial, consolidando las bases de la colorimetría y la morfología del rostro.',
    image: 'images/page_7_img_1.jpeg'
  },
  {
    number: '2',
    title: 'Evolución Plástica',
    description: 'Especialización en FX y Body Paint. Comienzo de la experimentación con texturas y prótesis para cine y teatro.',
    image: 'images/page_7_img_2.jpeg'
  },
  {
    number: '3',
    title: 'Identidad Visual',
    description: 'Consolidación en el uso de colores vibrantes como herramientas de comunicación. Desde los degradados en "escamas" hasta el uso de acabados satinados que captan la luz.',
    image: 'images/page_7_img_3.jpeg'
  },
  {
    number: '4',
    title: 'Maestría Conceptual',
    description: 'Maestra del delineado gráfico y las ilusiones ópticas. 8 años de experiencia avalan una técnica depurada y una visión artística madura.',
    image: 'images/page_7_img_4.jpeg'
  }
];

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Milestone cards animation
      gsap.utils.toArray<HTMLElement>('.milestone-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -80 : 80,
            rotateY: index % 2 === 0 ? -15 : 15
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Number dots animation
      gsap.utils.toArray<HTMLElement>('.milestone-dot').forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="journey" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4a574]/5 to-transparent" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Trayectoria</span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Recorrido</h2>
          <p className="text-muted-foreground text-lg">4 Hitos que definen mi camino</p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="timeline-line origin-top w-full h-full bg-gradient-to-b from-[#d4a574] via-[#c9a227] to-[#d4a574]" />
          </div>

          {/* Mobile line */}
          <div className="absolute left-4 top-0 bottom-0 w-px lg:hidden">
            <div className="timeline-line origin-top w-full h-full bg-gradient-to-b from-[#d4a574] via-[#c9a227] to-[#d4a574]" />
          </div>

          {/* Milestones */}
          <div className="space-y-16 lg:space-y-24">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`milestone-card relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:order-2 lg:pl-16'}`}>
                  <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <span className="text-5xl lg:text-6xl font-bold text-gradient">{milestone.number}</span>
                    <div className="w-12 h-px bg-[#d4a574]/50" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Dot on timeline */}
                <div className={`milestone-dot absolute left-4 lg:left-1/2 top-0 w-8 h-8 -translate-x-1/2 rounded-full bg-[#d4a574] border-4 border-background hidden lg:flex items-center justify-center z-10`}>
                  <span className="text-xs font-bold text-background">{milestone.number}</span>
                </div>

                {/* Image */}
                <div className={`relative ${index % 2 === 0 ? 'lg:order-2 lg:pl-16' : 'lg:order-1 lg:pr-16'}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                  >
                    <img 
                      src={milestone.image} 
                      alt={milestone.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Number badge */}
                    <div className="absolute bottom-4 right-4 glass rounded-xl px-4 py-2">
                      <span className="text-2xl font-bold text-[#d4a574]">Hito {milestone.number}</span>
                    </div>
                  </motion.div>

                  {/* Decorative frame */}
                  <div className={`absolute -z-10 w-full h-full rounded-2xl border border-[#d4a574]/20 ${
                    index % 2 === 0 ? '-bottom-3 -right-3' : '-bottom-3 -left-3'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <span className="text-2xl font-bold text-[#d4a574]">07</span>
        </div>
      </motion.div>
    </section>
  );
}
