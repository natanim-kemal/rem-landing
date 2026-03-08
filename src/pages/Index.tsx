import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import iconSrc from "@/assets/icon.png";
import { ArrowRight, Upload, Archive, Clock } from "lucide-react";

const Index = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroDimmerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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

    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0.1 },
    );

    document.querySelectorAll("[data-highlight]").forEach((el) => highlightObserver.observe(el));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const limit = heroHeight * 1.2;

      if (scrollY < limit) {
        const progress = Math.min(scrollY / heroHeight, 1);
        if (heroContentRef.current) {
          heroContentRef.current.style.opacity = String(1 - progress);
          heroContentRef.current.style.transform = `translateY(${progress * 50}px)`;
        }
        if (heroDimmerRef.current) {
          heroDimmerRef.current.style.opacity = String(progress);
        }
        if (featuresRef.current) {
          const fp = Math.max(0, (scrollY - heroHeight * 0.3) / (heroHeight * 0.5));
          featuresRef.current.style.opacity = String(Math.min(fp, 1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      highlightObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section
        ref={heroRef}
        className="relative w-full min-h-dvh flex flex-col overflow-hidden noise-overlay hero-orbs"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px),
            radial-gradient(at 0% 0%, hsl(160 82% 39% / 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsl(160 82% 39% / 0.03) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsl(160 82% 39% / 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsl(160 82% 39% / 0.03) 0px, transparent 50%)
          `,
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[2] hidden md:block">
          <div className="crosshair" style={{ top: 133, left: "4rem" }} />
          <div className="crosshair" style={{ top: 133, right: "40%", transform: "translateX(50%)" }} />
          <div className="crosshair" style={{ top: 133, right: "4rem" }} />
          <div className="crosshair" style={{ bottom: 133, right: "40%", transform: "translateX(50%)" }} />
          <div className="crosshair" style={{ bottom: 133, right: "4rem" }} />
        </div>

        <div ref={heroDimmerRef} className="absolute inset-0 bg-background opacity-0 z-[3] pointer-events-none" />

        <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 w-full">
          <div className="flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
            <img src={iconSrc} alt="rem logo" className="w-6 h-6" />
            <span className="text-xl font-semibold tracking-tight text-foreground">rem</span>
          </div>

          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-6 bg-foreground/[0.04] backdrop-blur-xl px-8 py-2.5 rounded-full border border-foreground/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <a
              href="#features"
              className="text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:[text-shadow:0_0_8px_hsl(160_82%_39%/0.4)]"
            >
              Queues
            </a>
            <a
              href="#schedule"
              className="text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:[text-shadow:0_0_8px_hsl(160_82%_39%/0.4)]"
            >
              Habits
            </a>
            <a
              href="#join"
              className="text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:[text-shadow:0_0_8px_hsl(160_82%_39%/0.4)]"
            >
              Join
            </a>
          </nav>

          <div className="flex items-center gap-6 text-xs font-medium">
            <Link
              to="/get-started"
              className="flex items-center gap-2 sm:bg-foreground/[0.08] sm:pl-1 sm:pr-4 sm:py-1 rounded-full sm:border sm:border-foreground/10 font-semibold sm:hover:bg-foreground/[0.15] sm:hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0 group-hover:-rotate-45 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">Get Started</span>
            </Link>
          </div>
        </header>

        <div
          ref={heroContentRef}
          className="relative z-[5] flex-grow flex flex-col items-center justify-center px-6 lg:px-12 gap-6 lg:gap-8 text-center pb-12"
        >
          <div className="opacity-0 animate-fade-in-up animation-delay-100">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/[0.08] text-primary text-[0.65rem] font-semibold tracking-widest uppercase">
              <span className="animate-pulse">✦</span> Your content, remembered
            </span>
          </div>

          <h1
            className="opacity-0 animate-fade-in-up animation-delay-200 text-foreground leading-[0.9] tracking-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Intelligent{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
              content consumption
            </span>{" "}
            vault.
          </h1>

          <p className="opacity-0 animate-fade-in-up animation-delay-300 text-muted-foreground text-sm max-w-lg leading-relaxed font-light">
            Stop letting saved links become digital graveyards. rem turns your "read later" list into a "read now" habit
            with smart reminders and beautiful organization.
          </p>

          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <a
              href="#join"
              className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs tracking-wide hover:shadow-[0_0_30px_hsl(160_82%_39%/0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Building Your Habit
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="features"
        ref={featuresRef}
        className="relative z-20 opacity-0 rounded-t-[2rem] border-t border-border overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, hsl(160 82% 15%), hsl(var(--background)))",
        }}
      >
        <div className="py-24 px-6 lg:px-12">
          <div className="text-center max-w-lg mx-auto mb-14 observe-fade">
            <span className="text-primary uppercase tracking-[0.2em] text-[0.65rem] font-semibold block mb-3">
              The Solution
            </span>
            <h2
              className="text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
            >
              Why rem?
            </h2>
            <p className="text-muted-foreground text-sm">
              We all save content with the best intentions. But without accountability, they disappear into the void.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Upload className="w-5 h-5" />,
                title: "Save From Anywhere",
                text: "Share links, images, or text directly to rem from any app. Works with your browser, social feeds, and messaging apps.",
              },
              {
                icon: <Archive className="w-5 h-5" />,
                title: "Personal Queue",
                text: "Everything you save appears in one clean, scannable list. Rich previews show titles, images, and descriptions instantly.",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Smart Reminders",
                text: "Set daily or weekly reminders at times that work for you. rem learns your habits and suggests the perfect moment to catch up.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                data-highlight
                className="observe-fade group border border-border rounded-xl p-7 transition-all duration-400 hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg mb-2 text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-3 mb-3 rounded-xl border border-border overflow-hidden flex items-center justify-center text-center py-28 px-6"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <blockquote className="max-w-2xl observe-fade">
          <p
            className="text-foreground italic leading-snug mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            "rem respects your time. It doesn't just store links; it guarantees you'll actually enjoy them."
          </p>
        </blockquote>
      </section>

      <section id="schedule" className="mx-3 mb-3 rounded-xl overflow-hidden py-24 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
          <div className="flex-[1.5] w-full observe-fade">
            <div className="w-full aspect-[16/10] rounded-lg border border-border bg-gradient-to-br from-secondary to-background shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute bg-primary/10" style={{ top: "30%", left: 0, width: "100%", height: 1 }} />
              <div className="absolute bg-primary/10" style={{ left: "30%", top: 0, width: 1, height: "100%" }} />
              <span className="text-foreground/70 text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                READING LIST
              </span>
            </div>
          </div>

          <div className="flex-1 observe-fade">
            <span className="text-primary uppercase tracking-[0.2em] text-[0.65rem] font-semibold block mb-3">
              How It Works
            </span>
            <h2
              className="text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
            >
              Build The Habit
            </h2>

            {[
              { title: "Capture", desc: "See something interesting? Tap share and choose rem.", active: true },
              { title: "Consume", desc: "Get nudged at the right time. Snooze if busy, or dive in." },
              { title: "Track", desc: "Watch your stats grow as you clear your queue and build streaks." },
            ].map((step, i) => (
              <div
                key={i}
                data-highlight
                className={`mb-6 pl-5 border-l-2 transition-colors duration-300 ${
                  step.active ? "border-primary" : "border-border"
                }`}
              >
                <h4 className="text-base text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="join"
        className="mx-3 mb-3 rounded-xl text-center py-24 px-6 relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 100%, hsl(160 82% 15%) 0%, hsl(var(--background)) 70%)",
        }}
      >
        <h2
          className="text-foreground mb-4 observe-fade"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
        >
          Join the Journey
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6 observe-fade">
          rem is built for people who want to consume more intentionally. If that sounds like you, I'd love your
          feedback.
        </p>
        <a
          href="https://natanim.dev"
          className="cta-fill observe-fade inline-block px-8 py-3 rounded-full border border-primary text-primary uppercase tracking-[0.15em] text-xs font-medium hover:text-primary-foreground transition-colors duration-300"
        >
          Get In Touch
        </a>
      </section>

      <footer className="relative mx-3 mb-3 rounded-xl bg-card overflow-hidden px-6 lg:px-12 pt-12 pb-48">
        <div className="relative z-[1] flex flex-col md:flex-row justify-between items-start flex-wrap gap-10 max-w-4xl mx-auto">
          <div>
            <h5
              className="text-xl text-foreground mb-2 lowercase font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              rem
            </h5>
            <p className="text-muted-foreground text-xs">Your intelligent content consumption vault.</p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-foreground font-semibold text-xs">Engineering</span>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                Architecture
              </a>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                CI/CD Pipeline
              </a>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                Repository Setup
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-foreground font-semibold text-xs">Standards</span>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                Security Guidelines
              </a>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                Development Standards
              </a>
              <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                Product Requirements
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-[1] text-center mt-12 pt-6 text-muted-foreground text-[0.65rem] opacity-60">
          © 2026 rem • natanim.dev
        </div>

        <div className="footer-giant-text">rem</div>
      </footer>
    </div>
  );
};

export default Index;
