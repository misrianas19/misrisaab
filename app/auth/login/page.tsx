"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            console.log(err);
            setError("An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#030305] p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none"></div>

            <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-neon-cyan flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>

            <div className="w-full max-w-md glass-card p-8 md:p-10 z-10">
                <h1 className="font-display text-3xl font-bold text-white text-center mb-2">WELCOME BACK</h1>
                <p className="text-gray-400 text-center mb-8">Access the MISRISAAB portal</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button type="submit" className="w-full bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all">
                        Login
                    </button>
                </form>

                <p className="text-gray-500 text-center mt-6 text-sm">
                    Don't have an account? <Link href="/auth/signup" className="text-neon-cyan hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
