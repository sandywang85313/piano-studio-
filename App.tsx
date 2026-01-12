import React, { useState, useEffect } from 'react';
import { 
  Piano, Mail, Phone, Menu, X, PlayCircle, Star, Globe, Leaf, Feather, Sun, ArrowRight, Youtube, Instagram 
} from 'lucide-react';
import { PageType, LangType } from './types';
import { CONTENT } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<LangType>('en');
  const [showFooterWeChatQR, setShowFooterWeChatQR] = useState(false);

  useEffect(() => {
    document.title = "Sandy Wang Piano Studio | sandywangpiano.com";
  }, []);

  const t = CONTENT[lang];

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-stone-800 font-sans selection:bg-stone-200">
      {/* Footer Modal for WeChat */}
      {showFooterWeChatQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowFooterWeChatQR(false)}>
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-scale-in" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowFooterWeChatQR(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-playfair text-center mb-4 text-stone-800">Scan to add WeChat</h3>
            <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden mb-4">
              <img src={CONTENT.en.contact.socials.wechatQR} alt="WeChat QR Code" className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-sm text-stone-500 font-sans">ID: sandywang85313</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F7F5F0]/90 backdrop-blur-sm z-50 border-b border-stone-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                <Piano className="w-5 h-5 text-stone-600" />
              </div>
              <span className="text-xl md:text-2xl font-playfair font-medium tracking-wide text-stone-800">Sandy Wang Piano Studio</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {(Object.keys(t.nav) as PageType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => navigateTo(key)}
                  className={`text-sm tracking-wide transition-all duration-300 hover:text-stone-500 relative py-2 font-sans ${
                    currentPage === key ? 'text-stone-800 font-medium border-b border-stone-800' : 'text-stone-500'
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
              <button 
                onClick={toggleLang}
                className="flex items-center space-x-1 px-3 py-1 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-xs font-medium text-stone-500 uppercase tracking-wider font-sans"
              >
                <Globe size={14} />
                <span>{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button onClick={toggleLang} className="text-stone-500 text-sm font-medium font-sans">
                {lang === 'en' ? '中文' : 'EN'}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-stone-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#F7F5F0] h-screen absolute w-full z-40 animate-fade-in px-8 pt-8">
            <div className="flex flex-col space-y-6">
              {(Object.keys(t.nav) as PageType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => navigateTo(key)}
                  className="text-2xl font-playfair text-stone-800 text-left py-2 border-b border-stone-100"
                >
                  {t.nav[key]}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {currentPage === 'home' && <HomeSection onNavigate={navigateTo} t={t.home} />}
        {currentPage === 'bio' && <BioSection t={t.bio} />}
        {currentPage === 'performances' && <PerformancesSection t={t.perf} />}
        {currentPage === 'achievements' && <AchievementsSection onNavigate={navigateTo} t={t.achieve} />}
        {currentPage === 'contact' && <ContactSection t={t.contact} />}
      </main>

      <Footer t={t} navigateTo={navigateTo} setShowFooterWeChatQR={setShowFooterWeChatQR} />
    </div>
  );
};

/* --- Sub-Components --- */

const HomeSection: React.FC<{ onNavigate: (p: PageType) => void, t: any }> = ({ onNavigate, t }) => (
  <div className="animate-fade-in">
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={t.heroImage} alt="Piano Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6 tracking-wide drop-shadow-lg leading-tight">{t.heroTitle}</h1>
        <p className="text-base md:text-lg text-white/90 mb-10 font-montserrat font-light tracking-wide">{t.heroSubtitle}</p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button onClick={() => onNavigate('contact')} className="bg-stone-100/90 backdrop-blur-sm hover:bg-white text-stone-900 px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all font-serif shadow-lg">{t.ctaPrimary}</button>
          <button onClick={() => onNavigate('performances')} className="bg-black/30 backdrop-blur-md hover:bg-black/40 text-white border border-white/50 px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all font-serif">{t.ctaSecondary}</button>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1 space-y-8 animate-slide-up">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-playfair text-stone-800 tracking-widest">{t.name}</h2>
            <p className="text-base md:text-lg text-stone-500 font-light font-montserrat italic tracking-widest">{t.titles}</p>
          </div>
          <div className="w-16 h-[1px] bg-stone-300"></div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase font-serif">{t.aboutTitle}</h3>
            <h4 className="text-2xl font-serif text-stone-700">{t.aboutSubtitle}</h4>
            <p className="text-stone-600 leading-relaxed font-light text-lg font-sans">{t.aboutText}</p>
          </div>
          <button onClick={() => onNavigate('bio')} className="group flex items-center space-x-2 text-stone-800 font-medium tracking-wide uppercase text-sm border-b border-stone-800 pb-1 hover:text-stone-500 transition-all font-serif">
            <span>{t.learnMore}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
            <img src={t.portraitImage} alt="Sandy Wang Portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="absolute top-10 -right-10 w-full h-full border border-stone-200 rounded-[2rem] -z-0 hidden md:block"></div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        {Object.keys(t.features).map((key, idx) => {
          const icons = [<Feather key="f" strokeWidth={1.5} size={32} />, <Leaf key="l" strokeWidth={1.5} size={32} />, <Sun key="s" strokeWidth={1.5} size={32} />];
          return (
            <div key={key} className="group p-8 hover:bg-white rounded-3xl transition-all duration-500">
              <div className="w-16 h-16 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-serif text-stone-800 mb-4">{t.features[key].title}</h3>
              <p className="text-stone-500 font-light leading-relaxed font-sans">{t.features[key].desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  </div>
);

const BioSection: React.FC<{ t: any }> = ({ t }) => (
  <section className="py-20 px-6 max-w-6xl mx-auto animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
      <div className="relative sticky top-32">
        <div className="relative z-10 rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden shadow-xl aspect-[4/5] bg-stone-200">
          <img src={t.portraitImage} alt="Sandy Wang Bio" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <span className="text-stone-400 uppercase tracking-widest text-xs font-semibold font-serif">{t.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-medium text-stone-800 mt-3 mb-6">{t.title}</h2>
          <div className="w-16 h-[1px] bg-stone-400"></div>
        </div>
        <p className="text-lg text-stone-600 leading-8 font-light whitespace-pre-line font-sans">{t.desc}</p>
        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 mb-6">
          <h3 className="text-lg font-serif mb-4 text-stone-800">{t.eduTitle}</h3>
          <ul className="space-y-4">
            {t.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start text-stone-600 font-light font-sans">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-stone-400 rounded-full flex-shrink-0"></span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        {/* Chopin 名言：純文字優雅呈現 */}
        <p className="italic font-serif text-center text-xl leading-relaxed text-stone-500 px-4">
          {t.quote}
        </p>
      </div>
    </div>
  </section>
);

const PerformancesSection: React.FC<{ t: any }> = ({ t }) => (
  <section className="py-20 px-6 max-w-7xl mx-auto animate-fade-in">
    <div className="text-center mb-20 max-w-2xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-playfair font-medium text-stone-800 mb-4">{t.title}</h2>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-stone-500 font-light font-serif">{t.subtitle}</p>
        <a href={t.channelLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white text-stone-600 border border-stone-200 px-6 py-2 rounded-full text-sm hover:text-red-600 transition-all shadow-sm">
          <Youtube size={18} />
          <span>YouTube Channel</span>
        </a>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {t.items.map((video: any) => (
        <a key={video.id} href={video.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all">
            <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/30 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayCircle className="text-stone-800 w-6 h-6 ml-1" />
              </div>
            </div>
          </div>
          <h3 className="text-lg font-serif text-stone-800 mb-1 group-hover:text-stone-600 transition-colors">{video.title}</h3>
          <p className="text-xs tracking-wider text-stone-400 uppercase font-sans">{video.date} • {video.venue}</p>
        </a>
      ))}
    </div>
  </section>
);

const AchievementsSection: React.FC<{ t: any, onNavigate: (p: PageType) => void }> = ({ t, onNavigate }) => (
  <section className="py-20 px-6 max-w-7xl mx-auto animate-fade-in">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-playfair font-medium text-stone-800 mb-4">{t.title}</h2>
      <p className="text-stone-500 font-light font-serif">{t.subtitle}</p>
    </div>
    <div className="space-y-4 mb-24 max-w-5xl mx-auto">
      {t.items.map((item: any, index: number) => (
        <div key={index} className="flex flex-col md:flex-row items-center bg-white border border-stone-100 p-8 rounded-2xl hover:border-stone-200 transition-all">
          <div className="md:w-32 flex-shrink-0 flex justify-center md:justify-start md:border-r md:border-stone-100 md:pr-6 mb-4 md:mb-0">
            <span className="text-3xl font-playfair text-stone-300">{item.year}</span>
          </div>
          <div className="flex-grow md:pl-6 text-center md:text-left">
            <h4 className="text-xl font-medium text-stone-800 mb-2 font-serif">{item.title}</h4>
            <p className="text-stone-500 font-light text-sm font-sans">{item.student}</p>
          </div>
          <Star className="text-stone-200 hidden md:block" size={24} />
        </div>
      ))}
    </div>
    <div className="mb-24 text-center">
      <h3 className="text-3xl font-playfair text-stone-800 mb-2">{t.instaTitle}</h3>
      <p className="text-stone-500 font-serif italic mb-4">{t.instaSubtitle}</p>
      
      <a 
        href={t.instaLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center space-x-2 text-stone-600 hover:text-indigo-600 transition-colors font-serif mb-10"
      >
        <Instagram size={20} />
        <span>{t.instaHandle}</span>
      </a>

      {/* IG 圖片區：2:3 垂直比例，填滿且無邊框 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
        {t.instaImages.map((src: string, i: number) => (
          <a 
            key={i} 
            href={t.instaLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="aspect-[2/3] bg-stone-100 rounded-xl overflow-hidden shadow-sm group"
          >
            <img 
              src={src} 
              alt={`Sandy Wang Instagram Post ${i+1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </a>
        ))}
      </div>
    </div>
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch bg-[#FDFBF7] rounded-3xl p-8 border border-stone-100 shadow-sm overflow-hidden">
       <div className="order-2 md:order-1 space-y-8 flex flex-col justify-center">
          <h3 className="text-3xl font-playfair text-stone-800 tracking-wide">{t.lessonTitle}</h3>
          <p className="text-lg text-stone-700 font-serif italic whitespace-pre-line">{t.lessonSubtitle}</p>
          <div className="w-12 h-[1px] bg-stone-300"></div>
          <p className="text-stone-600 leading-relaxed font-sans text-lg">{t.lessonDesc}</p>
          <button onClick={() => onNavigate('contact')} className="bg-stone-800 text-[#FDFBF7] px-8 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-stone-700 transition-all font-serif w-fit shadow-md">
            {t.lessonButton}
          </button>
       </div>
       <div className="order-1 md:order-2 h-full min-h-[400px] relative rounded-2xl overflow-hidden">
          <img src={t.lessonImage} alt="Piano Lessons" className="absolute inset-0 w-full h-full object-cover object-bottom" />
       </div>
    </div>
  </section>
);

const ContactSection: React.FC<{ t: any }> = ({ t }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mbddjjee", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
        setFormState('idle');
      }
    } catch (error) {
      alert("Oops! There was a network error. Please check your connection.");
      setFormState('idle');
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto animate-fade-in relative">
      {showWeChatQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowWeChatQR(false)}>
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-scale-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowWeChatQR(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={24} /></button>
            <h3 className="text-xl font-playfair text-center mb-4 text-stone-800">Scan to add WeChat</h3>
            <img src={CONTENT.en.contact.socials.wechatQR} alt="WeChat QR Code" className="w-full aspect-square rounded-xl object-cover mb-4" />
            <p className="text-center text-sm text-stone-500 font-sans">ID: sandywang85313</p>
          </div>
        </div>
      )}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-playfair font-medium text-stone-800 mb-4">{t.title}</h2>
        <p className="text-stone-500 font-light font-serif">{t.subtitle}</p>
        <div className="w-12 h-[1px] bg-stone-300 mx-auto mt-6"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h3 className="text-lg font-serif mb-6 text-stone-800">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-stone-100 rounded-full group-hover:bg-stone-200 transition-colors"><Mail size={18} /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 mb-1 font-serif">{t.info.email}</p>
                  <p className="text-stone-800 font-medium font-serif">sandywang85313@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-stone-100 rounded-full group-hover:bg-stone-200 transition-colors"><Phone size={18} /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400 mb-1 font-serif">{t.info.phone}</p>
                  <p className="text-stone-800 font-medium font-serif">778-636-5313</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => setShowWeChatQR(true)} className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-[#07C160] transition-all duration-300 group">
              <img src={t.socials.wechatIcon} alt="WeChat Icon" className="w-6 h-6 object-contain" />
            </button>
            <a href={t.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-[#E1306C] hover:text-white transition-all duration-300"><Instagram size={20} /></a>
            <a href={t.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-[#FF0000] hover:text-white transition-all duration-300"><Youtube size={20} /></a>
          </div>
          <p className="p-8 bg-stone-50 rounded-2xl italic font-serif text-lg text-stone-500 border border-stone-100 leading-relaxed text-center">{t.quote}</p>
        </div>
        <div className="lg:col-span-3">
          {formState === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl p-12 border border-stone-100 shadow-lg animate-scale-in text-center">
              <div className="w-16 h-16 bg-[#EBE9E4] text-stone-600 rounded-full flex items-center justify-center mb-6">
                <Feather size={32} />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-2">{t.success.title}</h3>
              <p className="text-stone-500 mb-8 font-serif font-light">{t.success.desc}</p>
              <button onClick={() => setFormState('idle')} className="text-stone-800 border-b border-stone-800 hover:text-stone-500 hover:border-stone-500 transition-all text-sm uppercase tracking-wide font-serif">{t.success.reset}</button>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-stone-100/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-serif">{t.labels.name}</label>
                  <input required name="name" type="text" className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-stone-800 transition-colors outline-none text-stone-800 placeholder-stone-300 font-serif" placeholder={t.placeholders.name} />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-serif">{t.labels.contactMethod}</label>
                  <input required name="email" type="text" className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-stone-800 transition-colors outline-none text-stone-800 placeholder-stone-300 font-serif" placeholder={t.placeholders.contactMethod} />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-serif">{t.labels.message}</label>
                  <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-stone-800 transition-colors outline-none text-stone-800 placeholder-stone-300 resize-none font-serif" placeholder={t.placeholders.message}></textarea>
                </div>
                <button type="submit" disabled={formState === 'submitting'} className="bg-stone-800 text-[#FDFBF7] px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-stone-700 transition-all duration-300 font-serif w-full md:w-auto shadow-md disabled:opacity-50">
                  {formState === 'submitting' ? t.labels.submitting : t.labels.submit}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ t: any, navigateTo: (p: PageType) => void, setShowFooterWeChatQR: (b: boolean) => void }> = ({ t, navigateTo, setShowFooterWeChatQR }) => (
  <footer className="bg-stone-100 text-stone-600 py-16 px-4 mt-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2 space-y-6">
        <div className="flex items-center space-x-2 text-stone-800">
          <Piano className="w-6 h-6" />
          <span className="text-xl font-medium">Sandy Wang Piano Studio</span>
        </div>
        <p className="text-sm leading-relaxed max-w-sm font-light text-stone-500">{t.footer.tagline}</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-stone-800 font-medium text-lg">{t.footer.quickLinks}</h4>
        <ul className="space-y-2 text-sm font-light">
          {(['bio', 'performances', 'achievements', 'contact'] as PageType[]).map((page) => (
            <li key={page}><button onClick={() => navigateTo(page)} className="hover:text-stone-900 hover:underline underline-offset-4 decoration-stone-300 transition-all">{t.nav[page]}</button></li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-stone-800 font-medium text-lg">{t.footer.follow}</h4>
        <ul className="space-y-2 text-sm font-light">
          <li><button onClick={() => setShowFooterWeChatQR(true)} className="hover:text-stone-900 hover:underline underline-offset-4 decoration-stone-300 transition-all">WeChat</button></li>
          <li><a href={CONTENT.en.achieve.instaLink} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 hover:underline underline-offset-4 decoration-stone-300 transition-all">Instagram</a></li>
          <li><a href={CONTENT.en.perf.channelLink} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 hover:underline underline-offset-4 decoration-stone-300 transition-all">YouTube</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-200 text-center text-xs text-stone-400 font-light tracking-wide">{t.footer.rights}</div>
  </footer>
);

export default App;
