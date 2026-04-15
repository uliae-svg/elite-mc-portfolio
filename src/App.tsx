import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic2, 
  Star, 
  Calendar, 
  Users, 
  Award, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone,
  Menu,
  X,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Global Toast Component
const Toast = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 20, x: '-50%' }}
        className="fixed bottom-10 left-1/2 z-[100] bg-gold-600 text-black px-8 py-4 rounded-sm shadow-2xl flex items-center gap-3 min-w-[300px]"
      >
        <CheckCircle2 size={20} />
        <span className="text-sm font-medium uppercase tracking-widest">{message}</span>
        <button onClick={onClose} className="ml-auto hover:opacity-50">
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = ({ onAction }: { onAction: (msg: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  const navLinks = [
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Контакты', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 350);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transform-gpu transition-[background-color,border-color] duration-300"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-widest text-gold-400 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ALEXANDER <span className="text-white font-light">VOLKOV</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-gold-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 border border-gold-500/50 text-gold-400 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all duration-300"
          >
            Забронировать
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-lg font-serif text-white/80 hover:text-gold-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onAction }: { onAction: (msg: string) => void }) => {
  return (
    <section className="relative h-svh flex items-start md:items-center justify-center overflow-hidden pt-24 md:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fm=jpg&fit=crop&q=80&w=1600"
          alt="Stage Background"
          className="w-full h-full object-cover opacity-40 grayscale"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-500 uppercase tracking-[0.4em] text-sm mb-6 block font-medium">
            Мастер исключительных событий
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-light mb-8 leading-tight">
            Искусство <br /> 
            <span className="font-bold tracking-widest text-gold-400 uppercase">Вашего</span> Торжества
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Создаю атмосферу статуса и комфорта для тех, кто ценит безупречный стиль и интеллектуальный юмор.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border border-white/20 hover:border-gold-500/50 text-white uppercase tracking-widest transition-all"
            >
              Обсудить дату
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer scroll-indicator"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: 'Лет опыта', value: '12+' },
    { label: 'Мероприятий', value: '800+' },
    { label: 'Городов', value: '15' },
    { label: 'Счастливых пар', value: '450+' },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?fm=jpg&fit=crop&q=80&w=800"
              alt="MC Portrait"
              className="w-full h-full object-cover transition-all duration-700"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-900/20 backdrop-blur-xl border border-gold-500/20 p-6 hidden lg:block">
            <p className="font-serif italic text-gold-400 text-lg">"Каждое событие — это история, которую мы пишем вместе."</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-serif mb-8">Философия Ведения</h2>
          <div className="space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Я не просто ведущий, я архитектор атмосферы. Мой подход строится на уважении к гостям, внимании к деталям и умении чувствовать ритм события. 
            </p>
            <p>
              В моем арсенале нет места пошлым конкурсам или навязчивости. Только интеллектуальный интерактив, тонкий юмор и искренние эмоции. Я создаю пространство, где каждый чувствует себя особенным.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-serif text-gold-500 mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ onAction }: { onAction: (msg: string) => void }) => {
  const services = [
    {
      title: 'Свадебные Торжества',
      description: 'Элегантные свадьбы with акцентом на семейные ценности и современный стиль.',
      icon: <Star className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?fm=jpg&fit=crop&q=80&w=800'
    },
    {
      title: 'Корпоративные События',
      description: 'Масштабные ивенты, подчеркивающие статус компании и объединяющие команду.',
      icon: <Users className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?fm=jpg&fit=crop&q=80&w=800'
    },
    {
      title: 'Частные Приемы',
      description: 'Камерные дни рождения и юбилеи в кругу самых близких с безупречным сервисом.',
      icon: <Calendar className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?fm=jpg&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Направления</h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden bg-[#111] border border-white/5"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="text-gold-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-serif mb-4 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
                <button 
                  onClick={() => onAction("Детали услуги отправлены в мессенджер")}
                  className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-gold-500 hover:text-white transition-colors"
                >
                  Подробнее <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ onAction }: { onAction: (msg: string) => void }) => {
  const images = [
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?fm=jpg&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?fm=jpg&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?fm=jpg&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1520242739010-44e95bde329e?fm=jpg&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?fm=jpg&fit=crop&q=80&w=800',
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-serif mb-4">Мгновения</h2>
            <p className="text-white/50 font-light">Эстетика и энергия реальных событий</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden group cursor-pointer"
              onClick={() => onAction("Просмотр фото...")}
            >
              <img
                src={img}
                alt={`Portfolio ${i}`}
                className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: 'Елена и Дмитрий',
      role: 'Свадьба в Four Seasons',
      text: 'Александр сделал нашу свадьбу именно такой, о какой мы мечтали — стильной, легкой и невероятно душевной. Его чувство такта и юмор покорили всех гостей.',
    },
    {
      name: 'Михаил Котов',
      role: 'CEO "Tech Solutions"',
      text: 'Лучший ведущий для корпоративных мероприятий. Умеет держать аудиторию в 500 человек и при этом сохранять атмосферу личного общения.',
    },
    {
      name: 'Анна Сергеева',
      role: 'Юбилей 50 лет',
      text: 'Благодарю за безупречный вечер. Все было организовано на высшем уровне, программа была интересной и совсем не утомительной.',
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Отзывы</h2>
          <div className="w-24 h-[1px] bg-gold-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="relative p-8 bg-white/5 border border-white/5 rounded-sm"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold-500/20" />
              <p className="text-white/70 italic mb-8 font-light leading-relaxed">
                "{review.text}"
              </p>
              <div>
                <div className="font-serif text-gold-400">{review.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onAction }: { onAction: (msg: string) => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onAction("Заявка успешно отправлена!");
      setFormData({ name: '', phone: '', date: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="text-5xl font-serif mb-8">Давайте создадим <br /><span className="text-gold-500">Ваше событие</span></h2>
          <p className="text-white/60 mb-12 font-light max-w-md">
            Свободных дат на сезон остается все меньше. Свяжитесь со мной сегодня, чтобы обсудить детали вашего будущего торжества.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => onAction("Набираем номер...")}>
              <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Телефон</div>
                <div className="text-xl font-serif">+7 (999) 123-45-67</div>
              </div>
            </div>
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => onAction("Открываем почту...")}>
              <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</div>
                <div className="text-xl font-serif">hello@volkov-mc.ru</div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-12">
            <a href="#" onClick={(e) => { e.preventDefault(); onAction("Переход в Instagram..."); }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onAction("Переход в Facebook..."); }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="bg-white/5 p-10 border border-white/10 rounded-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Имя</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold-500 outline-none transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Телефон</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold-500 outline-none transition-colors" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Дата события</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold-500 outline-none transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Сообщение</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 focus:border-gold-500 outline-none transition-colors resize-none" 
              />
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full py-4 bg-gold-600 text-black font-medium uppercase tracking-widest hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить запрос"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-xl font-serif font-bold tracking-widest text-gold-400 mb-6">
          ALEXANDER <span className="text-white font-light">VOLKOV</span>
        </div>
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Все права защищены. Дизайн и стиль.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  return (
    <div className="min-h-svh font-sans">
      <Navbar onAction={showToast} />
      <Hero onAction={showToast} />
      <About />
      <Services onAction={showToast} />
      <Portfolio onAction={showToast} />
      <Testimonials />
      <Contact onAction={showToast} />
      <Footer />
      
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
    </div>
  );
}
