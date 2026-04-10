import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Palette, User, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const missionPoints = [
  {
    number: '01',
    icon: Award,
    title: 'Excelencia Técnica',
    description: 'Garantizar acabados impecables mediante el uso de productos de alta gama y técnicas de vanguardia, asegurando que cada maquillaje (desde el Glam hasta el FX) cumpla con los estándares de durabilidad y estética profesional.'
  },
  {
    number: '02',
    icon: Palette,
    title: 'Narrativa Visual',
    description: 'Utilizar el maquillaje como un vehículo de comunicación, donde cada color y textura sirva para contar la historia que el cliente o la producción necesitan transmitir.'
  },
  {
    number: '03',
    icon: User,
    title: 'Personalización Exclusiva',
    description: 'Adaptar cada diseño a la morfología y necesidades únicas del rostro o cuerpo del cliente, logrando que el arte potencie su identidad natural o la visión del personaje.'
  },
  {
    number: '04',
    icon: GraduationCap,
    title: 'Educación y Profesionalismo',
    description: 'Fomentar la cultura del buen maquillaje a través de la formación (clases de automaquillaje y docencia), compartiendo conocimientos técnicos que eleven el estándar de la industria.'
  }
];

export default function Mission() {
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
              y: 80,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.15
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="mission" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#d4a574]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c9a227]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Compromiso</span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Mi Misión</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cuatro pilares fundamentales que guían cada proyecto y definen mi enfoque artístico
          </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {missionPoints.map((point, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full glass rounded-2xl p-8 lg:p-10 overflow-hidden"
              >
                {/* Background number */}
                <span className="absolute -top-4 -right-4 text-8xl font-bold text-[#d4a574]/5 select-none">
                  {point.number}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4a574]/20 to-[#c9a227]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <point.icon className="w-7 h-7 text-[#d4a574]" />
                    </div>
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">
                      Punto {point.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 group-hover:text-[#d4a574] transition-colors">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/5 to-transparent" />
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 w-8 h-px bg-[#d4a574]/50" />
                  <div className="absolute bottom-4 right-4 w-px h-8 bg-[#d4a574]/50" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 lg:mt-24"
        >
          <blockquote className="text-xl lg:text-2xl text-muted-foreground italic max-w-3xl mx-auto">
            "El maquillaje es el arte de transformar no solo el rostro, sino también la percepción"
          </blockquote>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto mt-6" />
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
          <span className="text-2xl font-bold text-[#d4a574]">05</span>
        </div>
      </motion.div>
    </section>
  );
}
