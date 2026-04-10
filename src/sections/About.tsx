import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Right content animation
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4a574]/5 to-transparent pointer-events-none" />
      
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Introducción</span>
          <h2 className="text-4xl lg:text-6xl font-bold line-decoration inline-block">Sobre Mí</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - About Me */}
          <div ref={leftContentRef} className="space-y-8">
            <div className="glass rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-[#d4a574]">Sobre mí</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Soy una <span className="text-foreground font-medium">artista integral</span> que entiende el maquillaje como un lenguaje. Con una <span className="text-foreground font-medium">década de trayectoria</span> que he fusionado mi carrera en los medios artísticos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: '10+', label: 'Años de experiencia' },
                { number: '500+', label: 'Proyectos realizados' },
                { number: '50+', label: 'Producciones' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center Image */}
          <div ref={imageRef} className="relative order-first lg:order-none">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img 
                src="images/page_2_img_1.jpeg" 
                alt="Aída Ramírez Makeup Art"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-[#d4a574]/20 rounded-3xl -z-10" />
            <div className="absolute -inset-8 border border-[#c9a227]/10 rounded-3xl -z-20" />
            
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass rounded-xl px-6 py-4"
            >
              <span className="text-sm uppercase tracking-wider text-[#d4a574]">Artista Integral</span>
            </motion.div>
          </div>

          {/* Right Content - Portfolio */}
          <div ref={rightContentRef} className="space-y-8 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="glass rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-[#c9a227]">Sobre mi portafolio</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mi estilo <span className="text-foreground font-medium">no busca simplemente embellecer, busca narrar</span>. Con una década de trayectoria, he entendido que el rostro y el cuerpo son lienzos dinámicos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mi enfoque fusiona la <span className="text-foreground font-medium">precisión técnica de la locución y la actuación</span> con la plástica del maquillaje, creando una firma estética donde el color y la estructura cuentan una historia.
              </p>
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-3">
              {['Maquillaje FX', 'Body Paint', 'Caracterización', 'Glam', 'Editorial', 'Ilusiones Ópticas'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 165, 116, 0.2)' }}
                  className="px-4 py-2 rounded-full border border-[#d4a574]/30 text-sm text-[#d4a574] cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
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
          <span className="text-2xl font-bold text-[#d4a574]">02</span>
        </div>
      </motion.div>
    </section>
  );
}
