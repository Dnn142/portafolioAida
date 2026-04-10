import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact info animation
      gsap.fromTo(
        '.contact-info-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+58 0424-220-9071',
      href: 'tel:+584242209071'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'makeupaida2727@gmail.com',
      href: 'mailto:makeupaida2727@gmail.com'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@Aanimorph',
      href: 'https://instagram.com/Aanimorph'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
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
          <span className="text-sm uppercase tracking-[4px] text-[#d4a574] mb-4 block">Conectemos</span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Contactos</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Después de una década transformando realidades, entiendo que cada proyecto es una oportunidad para crear algo inolvidable. Ya sea para una producción audiovisual de alto nivel, una sesión editorial o un servicio personalizado, mi enfoque garantiza resultados profesionales con una visión artística única.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">Construyamos juntos el próximo concepto visual</h3>
              <p className="text-muted-foreground leading-relaxed">
                Estoy lista para aportar mi experiencia en medios, mi dominio de la colorimetría y mi visión disruptiva a su próximo proyecto.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-info-item group flex items-center gap-4 p-4 rounded-xl glass hover:bg-[#d4a574]/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a574]/20 to-[#c9a227]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</span>
                    <p className="text-lg font-medium group-hover:text-[#d4a574] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social handles */}
            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">También en</span>
              <div className="flex gap-4">
                {['Aanimorph', 'Aidaasth'].map((handle, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full border border-[#d4a574]/30 text-[#d4a574] text-sm"
                  >
                    @{handle}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 lg:p-10 space-y-6"
          >
            <h3 className="text-xl font-semibold mb-6">Envíame un mensaje</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-[#d4a574]/20 focus:border-[#d4a574] focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-[#d4a574]/20 focus:border-[#d4a574] focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Mensaje</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-[#d4a574]/20 focus:border-[#d4a574] focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a574] to-[#c9a227] text-background font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                />
              ) : submitted ? (
                <>
                  <span>¡Mensaje enviado!</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Enviar mensaje</span>
                </>
              )}
            </motion.button>
          </form>
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
          <span className="text-2xl font-bold text-[#d4a574]">09</span>
        </div>
      </motion.div>
    </section>
  );
}
