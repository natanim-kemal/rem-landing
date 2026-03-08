import { useEffect } from "react";
import iconSrc from "@/assets/icon.png";
import { ArrowLeft, Smartphone, Globe, Download, ExternalLink, Github, ChevronRight, Puzzle, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".observe-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 w-full border-b border-border">
        <Link to="/" className="flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <img src={iconSrc} alt="rem logo" className="w-6 h-6" />
          <span className="text-xl font-semibold tracking-tight text-foreground">rem</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </header>

      <section
        className="relative py-20 px-6 lg:px-12 text-center noise-overlay overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(at 30% 20%, hsl(160 82% 39% / 0.08) 0px, transparent 50%),
            radial-gradient(at 70% 80%, hsl(160 82% 39% / 0.05) 0px, transparent 50%)
          `,
        }}
      >
        <div className="opacity-0 animate-fade-in-up animation-delay-100">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/[0.08] text-primary text-[0.65rem] font-semibold tracking-widest uppercase mb-6">
            <MonitorSmartphone className="w-3 h-3" /> Get Started
          </span>
        </div>
        <h1
          className="opacity-0 animate-fade-in-up animation-delay-200 text-foreground leading-[0.95] tracking-tight max-w-2xl mx-auto mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
          }}
        >
          Download &{" "}
          <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
            Install
          </span>{" "}
          rem
        </h1>
        <p className="opacity-0 animate-fade-in-up animation-delay-300 text-muted-foreground text-sm max-w-md mx-auto">
          rem is fully open-source. Grab the Android app or browser extension and start building your reading habit today.
        </p>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="observe-fade group border border-border rounded-xl p-8 transition-all duration-400 hover:border-primary hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, hsl(160 82% 39% / 0.06) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-[1]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-5">
                <Smartphone className="w-5 h-5" />
              </div>
              <h2
                className="text-foreground text-xl mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Android App
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Install the APK directly on your Android device. No Play Store needed — just download, enable unknown sources, and install.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Download the APK file below",
                  "Open Settings → Security → Enable \"Unknown Sources\"",
                  "Open the downloaded APK and tap Install",
                  "Launch rem and start saving content",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[0.65rem] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/natanim-kemal/rem"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs tracking-wide hover:shadow-[0_0_30px_hsl(160_82%_39%/0.3)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download APK
                </a>

                <a
                  href="https://github.com/natanim-kemal/rem"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  View Source
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="observe-fade group border border-border rounded-xl p-8 transition-all duration-400 hover:border-primary hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, hsl(160 82% 39% / 0.06) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-[1]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-5">
                <Puzzle className="w-5 h-5" />
              </div>
              <h2
                className="text-foreground text-xl mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Browser Extension
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Save articles, videos, and links directly from your browser with one click. Works with Chrome, Edge, and other Chromium-based browsers.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Download the extension ZIP below",
                  "Go to chrome://extensions and enable Developer Mode",
                  "Click \"Load unpacked\" and select the extracted folder",
                  "Pin the rem icon and start saving content",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[0.65rem] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/natanim-kemal/rem"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs tracking-wide hover:shadow-[0_0_30px_hsl(160_82%_39%/0.3)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Extension
                </a>

                <a
                  href="https://github.com/natanim-kemal/rem"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  View Source
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto observe-fade">
          <div className="rounded-xl border border-border p-8" style={{
            background: "radial-gradient(circle at 50% 100%, hsl(160 82% 15% / 0.3) 0%, transparent 70%)",
          }}>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="text-foreground text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                Open Source
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl">
              rem is completely open-source. You can inspect the code, contribute features, report bugs, or fork the project for your own use. We believe in transparency and community-driven development.
            </p>
            <a
              href="https://github.com/natanim-kemal/rem"
              className="cta-fill inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary text-primary uppercase tracking-[0.15em] text-[0.65rem] font-medium hover:text-primary-foreground transition-colors duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              View on GitHub
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 lg:px-12 py-8 text-center">
        <p className="text-muted-foreground text-[0.65rem] opacity-60">
          © 2026 rem • natanim.dev
        </p>
      </footer>
    </div>
  );
};

export default GetStarted;
