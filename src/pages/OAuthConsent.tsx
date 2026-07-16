import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Check, X, Loader2 } from "lucide-react";

// Beta namespace typing wrapper (auth.oauth is not yet in the public types).
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      try {
        const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message || "Failed to load authorization");
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e: any) {
        setError(e?.message || "Unexpected error");
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (error) {
        setBusy(false);
        setError(error.message);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setBusy(false);
        setError("No redirect URL returned by the authorization server.");
        return;
      }
      window.location.href = target;
    } catch (e: any) {
      setBusy(false);
      setError(e?.message || "Unexpected error");
    }
  };

  const clientName = details?.client?.name || details?.client?.client_name || "an application";
  const redirectHost = (() => {
    try {
      const u = details?.client?.redirect_uri || details?.client?.redirect_uris?.[0];
      return u ? new URL(u).host : null;
    } catch {
      return null;
    }
  })();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border p-8">
        <div className="flex items-center gap-2 mb-6 text-cyan-500 font-display font-bold">
          <Shield />
          <span>CyberGuard Academy</span>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {!error && !details && (
          <div className="flex items-center gap-3 text-muted-foreground py-8 justify-center">
            <Loader2 className="animate-spin" size={20} />
            <span>Memuat permintaan autorisasi…</span>
          </div>
        )}

        {details && !error && (
          <>
            <h1 className="text-2xl font-display font-bold mb-2">
              Hubungkan <span className="text-cyan-500">{clientName}</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              <strong>{clientName}</strong> ingin mengakses akun CyberGuard Academy Anda.
            </p>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>Menggunakan aplikasi ini atas nama Anda</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>Membaca profil & role Anda</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>Memperbarui profil Anda jika diminta</span>
              </div>
              {redirectHost && (
                <p className="text-xs text-muted-foreground pt-2">
                  Anda akan diarahkan kembali ke <code className="px-1 py-0.5 bg-muted rounded">{redirectHost}</code>
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              Kebijakan keamanan aplikasi ini tetap berlaku — {clientName} tidak bisa melewati batas akses yang Anda miliki.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => decide(false)}
                disabled={busy}
                className="flex-1 py-2.5 rounded-lg border border-border font-medium hover:bg-secondary disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X size={16} /> Tolak
              </button>
              <button
                onClick={() => decide(true)}
                disabled={busy}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                Setujui
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthConsent;
