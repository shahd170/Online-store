"use client";

import { useLanguage } from "../context/LanguageContext";
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane, 
  FaInstagram, 
  FaWhatsapp, 
  FaTelegram // استبدلت تويتر بتيليجرام لأنه أكثر استخداماً في إدلب
} from "react-icons/fa";

export default function ContactPage() {
  const { lang, content } = useLanguage();
  
  // دالة التعامل مع الإرسال لمنع إعادة تحميل الصفحة أو تغيير الحالة
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'ar' ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent!");
  };

  const t = lang === 'ar' ? {
    title: "تواصل معنا",
    subtitle: "نحن في إدلب لخدمتكم، لا تترددوا في مراسلتنا",
    info_title: "معلومات الاتصال",
    form_title: "أرسل لنا رسالة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "رسالتك",
    send: "إرسال الرسالة",
    address: "سوريا، إدلب - الدوار الزراعي",
    working_hours: "السبت - الخميس: 9 صباحاً - 8 مساءً"
  } : {
    title: "Contact Us",
    subtitle: "We are in Idlib to serve you, feel free to reach out",
    info_title: "Contact Information",
    form_title: "Send us a Message",
    name: "Full Name",
    email: "Email Address",
    subject: "Subject",
    message: "Your Message",
    send: "Send Message",
    address: "Idlib, Syria - Al-Zira'a Roundabout",
    working_hours: "Sat - Thu: 9 AM - 8 PM"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      {/* Header Section */}
      <div className="bg-[#0a0a0a] text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-black mb-4">{t.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* معلومات الاتصال المعدلة لإدلب */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-dark mb-8">{t.info_title}</h2>
            
            <ContactInfoCard 
              icon={<FaEnvelope className="text-primary" />} 
              label={lang === 'ar' ? "البريد الإلكتروني" : "Email"} 
              value="idlib@shahedfatema.com" 
            />
            <ContactInfoCard 
              icon={<FaPhoneAlt className="text-primary" />} 
              label={lang === 'ar' ? "رقم الهاتف (واتساب)" : "Phone (WhatsApp)"} 
              value="+963 9xx xxx xxx" 
            />
            <ContactInfoCard 
              icon={<FaMapMarkerAlt className="text-primary" />} 
              label={lang === 'ar' ? "العنوان" : "Address"} 
              value={t.address} 
            />
            <ContactInfoCard 
              icon={<FaClock className="text-primary" />} 
              label={lang === 'ar' ? "ساعات العمل" : "Hours"} 
              value={t.working_hours} 
            />

            <div className="pt-8 flex gap-4">
                <SocialIcon icon={<FaInstagram />} link="#" />
                <SocialIcon icon={<FaWhatsapp />} link="#" />
                <SocialIcon icon={<FaTelegram />} link="#" />
            </div>
          </div>

          {/* نموذج الاتصال مع منع تغيير اللغة عند النقر */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
            <h2 className="text-2xl font-black text-dark mb-8">{t.form_title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 ml-2">{t.name}</label>
                  <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none text-dark font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 ml-2">{t.email}</label>
                  <input required type="email" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none text-dark font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">{t.subject}</label>
                <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none text-dark font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">{t.message}</label>
                <textarea required rows={5} className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none text-dark font-medium resize-none"></textarea>
              </div>
              
              {/* تأكد من أن نوع الزر submit ولا يقوم بتشغيل أي دوال أخرى */}
              <button type="submit" className="bg-primary text-white w-full md:w-fit px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all active:scale-95">
                {t.send} <FaPaperPlane className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// المكونات الفرعية تبقى كما هي مع التأكد من عدم وجود onClick غير مقصود
function ContactInfoCard({ icon, label, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-5 group hover:border-primary/30 transition-all">
      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</p>
        <p className="text-dark font-bold">{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon, link }: any) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-dark text-white rounded-xl flex items-center justify-center text-xl hover:bg-primary hover:-translate-y-1 transition-all">
      {icon}
    </a>
  );
}