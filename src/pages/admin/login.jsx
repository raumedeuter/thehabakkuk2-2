import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError("Could not send reset email. Check the address and try again.");
      return;
    }

    setResetSent(true);
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-md">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-2">
            TheHabakkuk2:2
          </p>
          <h1 className="text-2xl font-bold text-brand-brown mb-2">
            Reset Password
          </h1>

          {resetSent ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-brand-brown opacity-70">
                Reset link sent to{" "}
                <span className="font-semibold opacity-100">{email}</span>.
                Check your inbox.
              </p>
              <button
                onClick={() => {
                  setForgotMode(false);
                  setResetSent(false);
                }}
                className="text-sm text-brand-brown font-semibold underline underline-offset-2 opacity-60 hover:opacity-100 transition"
              >
                Back to login
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-brand-brown opacity-50 mb-8">
                Enter your email and we'll send you a reset link.
              </p>
              <form
                onSubmit={handleForgotPassword}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-brand-brown font-semibold mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green text-white py-3 rounded-full font-semibold hover:bg-brand-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setError("");
                  }}
                  className="text-sm text-brand-brown opacity-50 hover:opacity-80 transition text-center"
                >
                  Back to login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-md">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-2">
          TheHabakkuk2:2
        </p>
        <h1 className="text-2xl font-bold text-brand-brown mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-brand-brown font-semibold mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-brand-brown font-semibold text-sm">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotMode(true);
                  setError("");
                }}
                className="text-xs text-brand-brown opacity-40 hover:opacity-80 transition underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 pr-11 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown opacity-30 hover:opacity-70 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-3 rounded-full font-semibold hover:bg-brand-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
