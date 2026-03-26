import { useEffect } from "react";
import iconSrc from "@/assets/icon.png";
import { ArrowLeft, ArrowRight, Smartphone, Globe, Download, ExternalLink, Github, ChevronRight, Puzzle, MonitorSmartphone, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
  html_url: string;
}

const GetStarted = () => {
  const { data: releases, isLoading } = useQuery<Release[]>({
    queryKey: ["github-releases"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/natanim-kemal/rem/releases");
      if (!response.ok) throw new Error("Failed to fetch releases");
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

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

  const latestRelease = releases?.[0];
  const apkAsset = latestRelease?.assets?.find(a => a.name.endsWith(".apk"));
  const extensionAsset = latestRelease?.assets?.find(a => a.name.endsWith(".zip") || a.name.includes("extension"));

  const formatSize = (bytes: number) => {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(0) + "KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + "MB";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative pt-0 pb-20 px-6 lg:px-12 text-center noise-overlay overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(at 30% 20%, hsl(160 82% 39% / 0.08) 0px, transparent 50%),
            radial-gradient(at 70% 80%, hsl(160 82% 39% / 0.05) 0px, transparent 50%)
          `,
        }}
      >
        <nav className="flex justify-between items-center py-6 mb-14">
          <Link to="/" className="flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
            <img src={iconSrc} alt="rem logo" className="w-6 h-6" />
            <span className="text-xl font-semibold tracking-tight text-foreground">rem</span>
          </Link>
          <Link
            to="/"
            // @ts-ignore
            unstable_viewTransition
            className="flex items-center gap-2 sm:bg-foreground/[0.08] sm:pl-4 sm:pr-1 sm:py-1 rounded-full sm:border sm:border-foreground/10 font-semibold sm:hover:bg-foreground/[0.15] sm:hover:border-foreground/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex-row-reverse group"
          >
            <div 
              className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0 transition-transform duration-300"
              style={{ viewTransitionName: 'header-icon' }}
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </div>
            <span 
              className="hidden sm:inline text-xs"
              style={{ viewTransitionName: 'header-text' }}
            >
              Back home
            </span>
          </Link>
        </nav>
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

        {latestRelease && (
          <div className="opacity-0 animate-fade-in-up animation-delay-400 mt-10">
            <a
              href={latestRelease.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-foreground/[0.03] text-muted-foreground text-[0.7rem] hover:border-primary/40 hover:text-foreground transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Latest version: <span className="text-foreground font-bold">{latestRelease.tag_name}</span>
              <span className="opacity-40">•</span>
              Released {formatDate(latestRelease.published_at)}
            </a>
          </div>
        )}
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
                  <div key={`android-step-${i}`} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[0.65rem] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={apkAsset?.browser_download_url || "https://github.com/natanim-kemal/rem/releases/latest"}
                  className={`btn-shimmer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all duration-300 ${apkAsset ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(160_82%_39%/0.3)] hover:-translate-y-0.5' : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'}`}
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  Download APK {apkAsset && <span className="opacity-60 font-black ml-1">({formatSize(apkAsset.size)})</span>}
                </a>

                <a
                  href="https://github.com/natanim-kemal/rem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-foreground/[0.03] text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 sm:px-0 sm:py-0 sm:rounded-none sm:border-none sm:bg-transparent sm:justify-start"
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
                  <div key={`ext-step-${i}`} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[0.65rem] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={extensionAsset?.browser_download_url || "https://github.com/natanim-kemal/rem/releases/latest"}
                  className={`btn-shimmer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all duration-300 ${extensionAsset ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(160_82%_39%/0.3)] hover:-translate-y-0.5' : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'}`}
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  Download Extension {extensionAsset && <span className="opacity-60 font-black ml-1">({formatSize(extensionAsset.size)})</span>}
                </a>

                <a
                  href="https://github.com/natanim-kemal/rem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-foreground/[0.03] text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 sm:px-0 sm:py-0 sm:rounded-none sm:border-none sm:bg-transparent sm:justify-start"
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
              target="_blank"
              rel="noopener noreferrer"
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

