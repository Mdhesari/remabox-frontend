import { Mail, ArrowRight, Globe2, Sparkles, Target, Box } from 'lucide-react';
import { useRef, useState } from 'react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from './components/ui/toast';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

function AppContent() {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA not initialized');
      }

      const token = await recaptchaRef.current.executeAsync();

      if (!token) {
        console.error('ReCAPTCHA execution failed: Token is null');
        setToastMessage({
          title: 'خطا در اعتبارسنجی',
          description: 'مشکلی در فرآیند اعتبارسنجی رخ داد. لطفاً صفحه را رفرش کرده و دوباره تلاش کنید.',
        });
        setIsLoading(false);
        setShowToast(true);
        return;
      }

      // Simulated API call
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, recaptcha_token: token }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API response:', data);

      setToastMessage({
        title: 'ثبت‌نام موفق',
        description: 'ایمیل شما با موفقیت ثبت شد. از اشتیاق شما برای همراهی با ما سپاسگزاریم!',
      });
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setToastMessage({
        title: 'خطا در ثبت‌نام',
        description: 'متأسفانه مشکلی در ثبت ایمیل شما پیش آمد. لطفاً دوباره تلاش کنید.',
      });
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds
    }
  };

  return (
    <ToastProvider>
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center mb-8">
              {/* <Globe2 className="w-12 h-12 text-blue-400 animate-pulse" /> */}
              {/* <Sparkles className="w-8 h-8 text-blue-300 mr-2" /> */}
              <Box className="w-12 h-12 text-violet-400 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                ریماباکس
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              داستان موفقیت دیجیتال شما از اینجا آغاز می‌شود
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">بازاریابی استراتژیک</h3>
                <p className="text-slate-400">استراتژی‌های مبتنی بر داده با نتایج قابل سنجش</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm">
                <Globe2 className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">دسترسی جهانی</h3>
                <p className="text-slate-400">اتصال برندها به مخاطبان در سراسر جهان</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">خلاقیت برتر</h3>
                <p className="text-slate-400">راهکارهای نوآورانه برای درخشش برند شما</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <h2 className="text-xl text-white mb-4">
                به‌زودی اتفاقی شگفت‌انگیز در راه است
              </h2>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  size="invisible"
                  ref={recaptchaRef}
                />
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'در حال ارسال...' : 'مرا مطلع کن'}
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <div className="relative flex-1">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white placeholder-slate-400 outline-none transition-all"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="mt-16 text-slate-400">
              <p>© {new Date().getFullYear()} ریماباکس. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>

        <ToastViewport />
        {showToast && (
          <Toast className={`${toastMessage.title === 'ثبت‌نام موفق'
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gradient-to-r from-red-500 to-red-600'
            } text-white border-none`}>
            <div className="flex flex-col items-start gap-1">
              <ToastTitle className="text-lg font-bold">{toastMessage.title}</ToastTitle>
              <ToastDescription className="text-sm">
                {toastMessage.description}
              </ToastDescription>
            </div>
          </Toast>
        )}
      </div>
    </ToastProvider>
  );
}

function App() {
  return (

    <AppContent />
  );
}

export default App;