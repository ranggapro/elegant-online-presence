import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { toast } from 'sonner';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

type Mode = 'login' | 'register';

// Only allow same-origin relative paths (e.g. "/dashboard", "/.lovable/oauth/consent?...").
const sanitizeNext = (value: string | null): string | null => {
  if (!value) return null;
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  return value;
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.8 34.9 44 29.9 44 24c0-1.2-.1-2.3-.4-3.5z"/>
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  // Preserve destination through login/register/OAuth. Priority: ?next=  →  state.from  →  /dashboard.
  const nextPath = useMemo(() => {
    return (
      sanitizeNext(searchParams.get('next')) ||
      sanitizeNext((location.state as any)?.from?.pathname) ||
      '/dashboard'
    );
  }, [searchParams, location.state]);

  const absoluteNext = `${window.location.origin}${nextPath}`;

  // If already signed in, honor the preserved destination.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = absoluteNext;
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) window.location.href = absoluteNext;
    });
    return () => sub.subscription.unsubscribe();
  }, [absoluteNext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: absoluteNext,
            data: { full_name: form.fullName },
          },
        });
        if (error) throw error;
        toast.success('Akun berhasil dibuat! Cek email untuk verifikasi.');
        setMode('login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success('Login berhasil!');
        window.location.href = absoluteNext;
      }
    } catch (err: any) {
      toast.error(err?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: absoluteNext,
    });
    if (result.error) {
      toast.error('Login Google gagal');
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    window.location.href = absoluteNext;
  };


  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      {/* Left / brand panel */}
      <div className="hidden md:flex relative flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.4) 0%, transparent 40%)',
          }}
        />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <Shield className="text-cyan-400" />
            <span>CyberGuard Academy</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            Kuasai dunia<br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Cyber Security
            </span>
          </h2>
          <p className="text-white/70 max-w-md">
            Pelajari ethical hacking, network defense, cryptography, dan security operations dari
            ahli industri. Bangun karir cybersecurity Anda hari ini.
          </p>
        </div>
        <div className="relative flex gap-6 text-sm text-white/60">
          <span>✓ 50+ Kursus</span>
          <span>✓ Hands-on labs</span>
          <span>✓ Sertifikat</span>
        </div>
      </div>

      {/* Right / form panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 flex items-center gap-2 font-display font-bold text-xl">
            <Shield className="text-cyan-500" />
            <span>CyberGuard Academy</span>
          </div>

          <h1 className="text-3xl font-display font-bold mb-2">
            {mode === 'login' ? 'Selamat datang kembali' : 'Buat akun baru'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {mode === 'login'
              ? 'Masuk untuk melanjutkan perjalanan belajarmu.'
              : 'Mulai perjalanan cybersecurity-mu hari ini.'}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 mb-6 border border-border rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-60"
          >
            <GoogleIcon />
            <span>Lanjutkan dengan Google</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">atau dengan email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
            >
              {mode === 'login' ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
