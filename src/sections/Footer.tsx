import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <footer 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/10 via-transparent to-transparent" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-8"
          >
            <span className="text-gradient">Gracias</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed"
          >
            Espero que este recorrido visual sea el inicio de una futura colaboración. Estoy lista para aportar mi experiencia en medios, mi dominio de la colorimetría y mi visión disruptiva a su próximo proyecto.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed mt-6"
          >
            La piel es el lienzo más dinámico que existe, y será un honor para mí plasmar en ella su próxima gran idea.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-32 h-px mx-auto mt-12 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"
          />
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-2xl lg:text-3xl font-bold text-gradient mb-2">Aída Ramírez</p>
          <p className="text-muted-foreground uppercase tracking-[4px] text-sm">Aanimorph Makeup Artist</p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-[#d4a574]/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Aanimorph. Todos los derechos reservados.
            </p>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Hecho con <Heart className="w-4 h-4 text-[#d4a574] fill-[#d4a574]" /> y pasión por el arte
            </p>

            {/* Page indicator */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Page</span>
              <span className="text-2xl font-bold text-[#d4a574]">10</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#d4a574]/10 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-60 h-60 border border-[#c9a227]/10 rounded-full pointer-events-none"
      />
    </footer>
  );
}
