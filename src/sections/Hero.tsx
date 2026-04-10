import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 100,
          rotateX: -45
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.5
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { 
          opacity: 0, 
          y: 50,
          letterSpacing: '20px'
        },
        { 
          opacity: 1, 
          y: 0,
          letterSpacing: '8px',
          duration: 1.2,
          ease: "power3.out",
          delay: 1
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(images/page_1_img_1.jpeg)',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4a574]/40 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 border border-[#d4a574]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-48 h-48 border border-[#c9a227]/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6"
        style={{ opacity }}
      >
        {/* Page indicator */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute -left-4 lg:left-0 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground tracking-widest rotate-90 origin-center">PAGE</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#d4a574] to-transparent mt-4" />
            <span className="text-2xl font-bold text-[#d4a574]">01</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight mb-6"
          style={{ perspective: '1000px' }}
        >
          <span className="block text-gradient">Aanimorph</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground uppercase tracking-[8px]"
        >
          Makeup Artist
        </p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-32 h-0.5 mx-auto mt-8 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#d4a574] to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-5 noise-overlay pointer-events-none" />
    </section>
  );
}
