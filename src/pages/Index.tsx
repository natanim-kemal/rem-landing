import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/rem.css";
import {
  ArrowRight,
  Calendar,
  Check,
  Download,
  FileIcon,
  Plus,
  StatusIcons,
  Wordmark,
} from "@/components/rem/Icons";
import youtube from "@/assets/rem/brands/youtube.svg";
import xIcon from "@/assets/rem/brands/x.svg";
import reddit from "@/assets/rem/brands/reddit.svg";
import github from "@/assets/rem/brands/github.svg";
import medium from "@/assets/rem/brands/medium.svg";
import substack from "@/assets/rem/brands/substack.svg";
import notion from "@/assets/rem/brands/notion.svg";
import tileBooks from "@/assets/rem/tile-books.jpg";
import tileBook from "@/assets/rem/tile-book.jpg";
import howBg from "@/assets/rem/how-bg.jpg";
import ctaSky from "@/assets/rem/cta-sky.jpg";
import remLogo from "@/assets/icon.png";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
type Brand = { name: string; icon: string; color: string; bg: string };

const B: Record<string, Brand> = {
  youtube: { name: "YouTube", icon: youtube, color: "#ff0033", bg: "#fff" },
  x: { name: "X", icon: xIcon, color: "#111113", bg: "#fff" },
  reddit: { name: "Reddit", icon: reddit, color: "#ff4500", bg: "#fff" },
  github: { name: "GitHub", icon: github, color: "#181717", bg: "#fff" },
  medium: { name: "Medium", icon: medium, color: "#111113", bg: "#fff" },
  substack: { name: "Substack", icon: substack, color: "#ff6719", bg: "#fff" },
  notion: { name: "Notion", icon: notion, color: "#111113", bg: "#fff" },
};

const flowLeft = [B.youtube, B.reddit, B.medium, B.substack, B.x, B.github, B.notion];
const flowRight = [B.github, B.substack, B.x, B.medium, B.youtube, B.reddit, B.notion];

const status = (
  <div className="status">
    <span>9:41</span>
    <span className="island" />
    <span className="status-icons"><StatusIcons /></span>
  </div>
);

export default function Index() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roll, setRoll] = useState(0);
  const [jump, setJump] = useState(false);
  const [lIdx, setLIdx] = useState([0, 1, 2, 3]);
  const [rIdx, setRIdx] = useState([0, 1, 2, 3]);
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    document.documentElement.classList.add("js");
    document.body.classList.add("rem-body");
    const items = document.querySelectorAll(".rem-page .reveal");
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((item) => observer?.observe(item));
    } else {
      items.forEach((item) => item.classList.add("is-in"));
    }
    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove("js");
      document.body.classList.remove("rem-body");
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setRoll((value) => (value < 4 ? value + 1 : value));
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (roll !== 4) return;
    const id = window.setTimeout(() => {
      setJump(true);
      setRoll(0);
    }, 900);
    return () => window.clearTimeout(id);
  }, [roll]);

  useEffect(() => {
    if (!jump) return;
    const id = requestAnimationFrame(() => setJump(false));
    return () => cancelAnimationFrame(id);
  }, [jump]);

  useEffect(() => {
    const flow = flowRef.current;
    const hero = flow?.closest(".hero") as HTMLElement | null;
    const title = hero?.querySelector("#hero-title") as HTMLElement | null;
    const phone = hero?.querySelector(".hero-stage .phone") as HTMLElement | null;
    if (!flow || !hero || !title || !phone) return;
    if (!CSS.supports("offset-path", 'path("M 0 0 L 1 1")')) return;

    const svg = flow.querySelector(".flow-lines") as SVGSVGElement;
    const paths = {
      l: flow.querySelector('.flow-path[data-side="l"]') as SVGPathElement,
      r: flow.querySelector('.flow-path[data-side="r"]') as SVGPathElement,
    };
    const tiles = Array.from(flow.querySelectorAll<HTMLElement>(".flow-tile"));
    const f = (n: number) => n.toFixed(1);

    const layout = () => {
      const H = hero.getBoundingClientRect();
      const T = title.getBoundingClientRect();
      const stage = phone.parentElement!.getBoundingClientRect();
      const pl = stage.left + (stage.width - phone.offsetWidth) / 2 - H.left;
      const pr = pl + phone.offsetWidth;
      const pt = stage.top - H.top + parseFloat(getComputedStyle(phone.parentElement!).paddingTop);
      const W = H.width;
      const narrow = W < 800;

      const ly0 = narrow ? pt - 10 : T.top - H.top + T.height * 0.3;
      const ry0 = narrow ? pt - 50 : T.bottom - H.top - 20;
      const ly1 = pt + (narrow ? 130 : 150);
      const ry1 = pt + (narrow ? 100 : 120);
      const lx1 = pl + 26;
      const rx1 = pr - 26;
      const d = {
        l: `M ${f(-70)} ${f(ly0)} C ${f(pl * 0.45)} ${f(ly0 + 10)} ${f(pl - 60)} ${f(ly1 - 170)} ${f(lx1)} ${f(ly1)}`,
        r: `M ${f(W + 70)} ${f(ry0)} C ${f(W - (W - pr) * 0.4)} ${f(ry0 + 10)} ${f(pr + 70)} ${f(ry1 - 150)} ${f(rx1)} ${f(ry1)}`,
      };
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H.height));
      svg.setAttribute("viewBox", `0 0 ${f(W)} ${f(H.height)}`);
      paths.l.setAttribute("d", d.l);
      paths.r.setAttribute("d", d.r);
      tiles.forEach((tile) => {
        const side = tile.dataset.side as "l" | "r";
        tile.style.offsetPath = `path("${d[side]}")`;
      });
      flow.classList.add("is-ready");
    };

    let queued = false;
    const relayout = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        layout();
      });
    };

    layout();
    window.addEventListener("resize", relayout);
    document.fonts?.ready.then(relayout);
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        flow.classList.toggle("is-paused", !entry.isIntersecting);
      });
      observer.observe(hero);
    }
    return () => {
      window.removeEventListener("resize", relayout);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;
    const target = 42;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(target);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1100, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const how = howRef.current;
    if (!how) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting && !manual),
      { threshold: 0.45 },
    );
    observer.observe(how);
    return () => observer.disconnect();
  }, [manual]);

  const advance = (side: "l" | "r", index: number) => {
    if (side === "l") {
      setLIdx((previous) => previous.map((value, i) => (i === index ? (value + 4) % 7 : value)));
    } else {
      setRIdx((previous) => previous.map((value, i) => (i === index ? (value + 4) % 7 : value)));
    }
  };

  const selectStep = (index: number, focus = false) => {
    setStep(index);
    setManual(true);
    setPlaying(false);
    if (focus) stepRefs.current[index]?.focus();
  };

  const onStepKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    let next: number | undefined;
    if (delta) next = (index + delta + 3) % 3;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 2;
    if (next === undefined) return;
    event.preventDefault();
    selectStep(next, true);
  };

  const rollStyle = { transform: `translateY(${-roll * 100}%)`, transition: jump ? "none" : undefined };
  const chipBrands = [B.youtube, B.x, B.reddit, B.github, B.youtube];

  return (
    <div className="rem-page">
      <a className="skip" href="#main">Skip to content</a>

      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <Wordmark />
          <nav className="nav-links" aria-label="Primary">
            <a href="#features">Product</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link className="btn btn-primary btn-sm nav-cta" to="/get-started">Get rem</Link>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            onClick={() => setMenu((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="wrap mobile-nav" id="mobile-nav" hidden={!menu}>
          <a href="#features" onClick={() => setMenu(false)}>Product</a>
          <a href="#how-it-works" onClick={() => setMenu(false)}>How it works</a>
          <a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
          <Link className="btn btn-primary mobile-cta" to="/get-started" onClick={() => setMenu(false)}>Get rem</Link>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap hero-copy">
            <h1 id="hero-title" className="hero-title reveal">
              Every <span className="hchip hchip-app" aria-hidden="true"><span className="hchip-in"><span className="hchip-win"><span className="hroll" style={rollStyle}>
                {chipBrands.map((brand, index) => (
                  <span key={index} className="app-face"><img src={brand.icon} alt="" /></span>
                ))}
              </span></span></span></span> saved link.<br />
              One <span className="hchip hchip-date" aria-hidden="true"><span className="hchip-in">
                <span className="cal">
                  <span className="cal-m">Queue</span>
                  <span className="cal-d"><span className="hroll" style={rollStyle}>
                    <span>12</span><span>14</span><span>9</span><span>11</span><span>12</span>
                  </span></span>
                </span>
                <span className="hchip-label"><span className="hroll" style={rollStyle}>
                  <span>unread</span><span>queued</span><span>saved</span><span>to read</span><span>unread</span>
                </span></span>
              </span></span> calm queue.
            </h1>
            <p className="lede reveal">rem saves what you mean to read, strips the noise, and keeps the queue honest. Self-hosted, private by default, and yours to export.</p>
            <div className="hero-actions reveal">
              <Link className="btn btn-primary" to="/get-started">Get rem</Link>
              <a className="btn btn-ghost" href="#how-it-works">How it works <ArrowRight /></a>
            </div>
          </div>

          <div className="flow" ref={flowRef} aria-hidden="true">
            <svg className="flow-lines"><path className="flow-path" data-side="l" /><path className="flow-path" data-side="r" /></svg>
            <div className="flow-tiles">
              {(["l", "r"] as const).map((side) => [0, 1, 2, 3].map((k) => {
                const index = side === "l" ? lIdx[k] : rIdx[k];
                const brand = (side === "l" ? flowLeft : flowRight)[index];
                return (
                  <span
                    key={`${side}${k}`}
                    className="flow-tile"
                    data-side={side}
                    style={{ "--k": k } as CSSVars}
                    onAnimationIteration={() => advance(side, k)}
                  >
                    <img src={brand.icon} alt="" />
                  </span>
                );
              }))}
            </div>
          </div>

          <div className="hero-stage" role="img" aria-label="The rem home screen on a phone: a library of saved items with priorities, sources and read times">
            <div className="phone">
              <div className="phone-screen">
                {status}
                <div className="ph">
                  <div className="ph-apphead">
                    <span className="ph-logo"><img src={remLogo} alt="" /></span>
                    <b className="ph-word">rem</b>
                    <span className="ph-head-actions">
                      <span className="ph-sync"><i />Syncing</span>
                      <span className="ph-add"><Plus /></span>
                    </span>
                  </div>
                  <div className="ph-searchrow">
                    <span className="ph-search">
                      <svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><circle cx="7" cy="7" r="4.2" /><path d="m10.2 10.2 3.3 3.3" /></svg>
                      Search your vault...
                    </span>
                    <span className="ph-filter">
                      <svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M2.5 5h11M4.5 8h7M6.5 11h3" /></svg>
                    </span>
                  </div>
                  <div className="ph-chips">
                    <span className="is-on">All</span>
                    <span><svg viewBox="0 0 12 12" className="phcg" aria-hidden="true"><path d="M4.7 6.3 7 4a1.65 1.65 0 0 1 2.3 2.3L8 7.6" /><path d="M7.3 5.7 5 8a1.65 1.65 0 0 1-2.3-2.3L4 4.4" /></svg>Links</span>
                    <span><svg viewBox="0 0 12 12" className="phcg" aria-hidden="true"><rect x="1.6" y="2.2" width="8.8" height="7.6" rx="1.6" /><circle cx="4.4" cy="4.9" r=".9" /><path d="m2.2 8.4 2.6-2.2 2 1.6 1.6-1.3 1.4 1.2" /></svg>Images</span>
                    <span><svg viewBox="0 0 12 12" className="phcg" aria-hidden="true"><circle cx="6" cy="6" r="4.6" /><path d="M5 4.3 7.6 6 5 7.7z" fill="currentColor" stroke="none" /></svg>Videos</span>
                    <span><svg viewBox="0 0 12 12" className="phcg" aria-hidden="true"><path d="M6 3.2C4.9 2.4 3 2.2 1.8 2.4v7.1c1.2-.2 3.1 0 4.2.8 1.1-.8 3-1 4.2-.8V2.4C8.9 2.2 7.1 2.4 6 3.2Z" /><path d="M6 3.2v7.1" /></svg>Books</span>
                  </div>
                  <p className="ph-lib">LIBRARY <span>128</span></p>
                  <div className="ph-items">
                    <div className="ph-item">
                      <div className="ph-item-main"><p><i className="ph-pri is-high" /><span>How CPUs actually work</span></p><small>youtube.com · Today · 14 min</small></div>
                      <span className="ph-thumb"><img src={youtube} alt="" /></span>
                    </div>
                    <div className="ph-item">
                      <div className="ph-item-main"><p><i className="ph-pri" /><span>A quiet web</span></p><small>medium.com · 2d · 9 min</small></div>
                      <span className="ph-thumb is-photo"><img src={tileBook} alt="" /></span>
                    </div>
                    <div className="ph-item">
                      <div className="ph-item-main"><p><i className="ph-pri is-high" /><span>The design of everyday things</span></p><small>Books · 4d · 6 hr</small></div>
                      <span className="ph-thumb is-photo"><img src={tileBooks} alt="" /></span>
                    </div>
                    <div className="ph-item">
                      <div className="ph-item-main"><p><i className="ph-pri" /><span>coraza/coraza</span></p><small>github.com · 3d · 18 min</small></div>
                      <span className="ph-thumb"><img src={github} alt="" /></span>
                    </div>
                    <div className="ph-item">
                      <div className="ph-item-main"><p><i className="ph-pri is-high" /><span>The slow feed</span></p><small>substack.com · 5d · 11 min</small></div>
                      <span className="ph-thumb is-photo"><img src={ctaSky} alt="" /></span>
                    </div>
                  </div>
                  <div className="ph-dock">
                    <span className="is-on"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M2.6 7.2 8 2.6l5.4 4.6v6.2H9.6V9.6H6.4v3.8H2.6z" fill="currentColor" /></svg>Home</span>
                    <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8 2.6c3.1 0 5.6 2 5.6 4.6 0 2.6-2.5 4.6-5.6 4.6-.6 0-1.2-.1-1.8-.2l-2.9 1.2.8-2.5C3.2 9.4 2.4 8.4 2.4 7.2c0-2.6 2.5-4.6 5.6-4.6Z" fill="currentColor" /></svg>Chat</span>
                    <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M3 13V9M8 13V3.5M13 13V6.5" strokeWidth="1.8" strokeLinecap="round" /></svg>Stats</span>
                    <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><circle cx="8" cy="5.4" r="2.6" fill="currentColor" /><path d="M2.8 13.2c.5-2.4 2.6-3.6 5.2-3.6s4.7 1.2 5.2 3.6" fill="currentColor" /></svg>You</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 id="features-title">Your reading,<br />finally in order.</h2>
              <p className="section-lede">One quiet queue for everything worth keeping, with sources, read time and highlights kept where you can find them.</p>
            </div>

            <div className="bento">
              <article className="tile tile-wide reveal">
                <div className="tile-visual visual-list photo-blocks" style={{ "--photo": `url(${tileBooks})` } as CSSVars}>
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Queue</span><span className="panel-meta">12 unread</span><span className="btn-mini"><Plus />Add</span></div>
                    <div className="qrow qhead"><span>Item</span><span>Source</span><span>Added</span><span>Length</span></div>
                    <div className="qrow"><span className="cell-name"><span className="logo logo-sm"><img src={B.youtube.icon} alt="" /></span>How CPUs actually work</span><span>YouTube</span><span className="accent-text">Today</span><span>14 min</span></div>
                    <div className="qrow"><span className="cell-name"><span className="logo logo-sm"><img src={B.medium.icon} alt="" /></span>A quiet web</span><span>Medium</span><span>2d</span><span>9 min</span></div>
                    <div className="qrow"><span className="cell-name"><span className="logo logo-sm"><img src={B.github.icon} alt="" /></span>coraza/coraza</span><span>GitHub</span><span>3d</span><span>18 min</span></div>
                    <div className="qrow"><span className="cell-name"><span className="logo logo-sm"><img src={B.x.icon} alt="" /></span>Local models, explained</span><span>X thread</span><span>4d</span><span>6m</span></div>
                    <div className="qrow"><span className="cell-name"><span className="logo logo-sm"><img src={B.substack.icon} alt="" /></span>The slow feed</span><span>Substack</span><span>5d</span><span>11 min</span></div>
                  </div>
                </div>
                <div className="tile-copy"><h3>Every source, one queue.</h3><p>Links, threads, videos and papers land side by side, each with its source and length intact.</p></div>
              </article>

              <article className="tile reveal">
                <div className="tile-visual visual-notifs">
                  <div className="notif notif-back"><span className="logo logo-notif"><img src={B.github.icon} alt="" /></span><div><p className="notif-app">rem <span>2d</span></p><p className="notif-title">Digest delivered, 6 items</p></div></div>
                  <div className="notif"><span className="logo logo-notif"><img src={B.youtube.icon} alt="" /></span><div><p className="notif-app">rem <span>now</span></p><p className="notif-title">Saved from YouTube</p><p className="notif-body">How CPUs actually work · 14 min</p></div></div>
                </div>
                <div className="tile-copy"><h3>A digest, not a feed.</h3><p>One quiet nudge a day with what is worth your time. No streaks, no red badges.</p></div>
              </article>

              <article className="tile reveal">
                <div className="tile-visual visual-split">
                  <div className="split-total"><span>Read this week</span><b><span ref={countRef} data-count="42">42</span> items</b></div>
                  <div className="split-bar" aria-hidden="true"><i style={{ "--w": "52%" } as CSSVars} /><i style={{ "--w": "30%" } as CSSVars} /><i style={{ "--w": "18%" } as CSSVars} /></div>
                  <ul className="split-legend">
                    <li><i />Articles<b>52%</b></li>
                    <li><i />Videos<b>30%</b></li>
                    <li><i />Threads<b>18%</b></li>
                  </ul>
                </div>
                <div className="tile-copy"><h3>See what you really read.</h3><p>Counts by source and by week, so the queue reflects your habits instead of gaming them.</p></div>
              </article>

              <article className="tile reveal">
                <div className="tile-visual visual-form photo-spiral" style={{ "--photo": `url(${tileBook})` } as CSSVars}>
                  <div className="segmented" aria-hidden="true"><i className="seg-thumb" /><span className="is-on">Daily</span><span>Weekly</span><span>Off</span></div>
                  <div className="field"><span>Next digest</span><b><Calendar />6:30 AM</b></div>
                  <div className="field"><span>Digest size</span><b>6 items</b></div>
                </div>
                <div className="tile-copy"><h3>Your pace, your rules.</h3><p>Choose when rem nudges you, how much it sends, or turn reminders off for good.</p></div>
              </article>

              <article className="tile reveal">
                <div className="tile-visual visual-backup">
                  <div className="file-row">
                    <span className="file-icon"><FileIcon /></span>
                    <div><b>rem-export.json</b><small>1,284 items · highlights + notes</small></div>
                    <span className="btn-mini btn-mini-dark btn-export"><span className="exp-a"><Download />Export</span><span className="exp-b"><Check />Saved</span></span>
                  </div>
                  <p className="file-note"><Check />Plain JSON. No lock-in.</p>
                </div>
                <div className="tile-copy"><h3>Nothing locked in.</h3><p>Every save, highlight and note exports as clean JSON whenever you want.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-tint" id="how-it-works" aria-labelledby="how-title">
          <div
            className={`wrap how${playing ? " is-playing" : ""}${held ? " is-held" : ""}`}
            ref={howRef}
            onAnimationEnd={(event) => {
              if (event.animationName === "how-fill" && !manual) setStep((current) => (current + 1) % 3);
            }}
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
          >
            <div className="how-left">
              <div className="section-head reveal">
                <h2 id="how-title">Set it up once.<br />Read calmly for months.</h2>
              </div>
              <div className="how-steps reveal" role="tablist" aria-label="How rem works" aria-orientation="vertical">
                {[
                  { title: "Save anything", body: "Share sheet, extension, or a pasted URL. rem grabs the title, source and read time for you." },
                  { title: "It comes in clean", body: "Priority, tags and read time land on every item, with a short summary at the top." },
                  { title: "Ask your library", body: "Chat with everything you saved. Answers cite the exact item they came from." },
                ].map((item, index) => (
                  <button
                    key={item.title}
                    ref={(node) => { stepRefs.current[index] = node; }}
                    className="how-step"
                    role="tab"
                    id={`how-tab-${index}`}
                    aria-selected={step === index}
                    aria-controls="how-panel"
                    tabIndex={step === index ? 0 : -1}
                    onClick={() => selectStep(index)}
                    onKeyDown={(event) => onStepKey(event, index)}
                  >
                    <span className="step-num">0{index + 1}</span>
                    <span className="how-step-text"><b>{item.title}</b><span className="how-step-desc"><span>{item.body}</span></span></span>
                    <i className="how-progress" aria-hidden="true"><span /></i>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="how-visual reveal"
              id="how-panel"
              role="tabpanel"
              aria-labelledby={`how-tab-${step}`}
              style={{ "--photo": `url(${howBg})` } as CSSVars}
            >
              <p className="sr-only" id="how-caption">
                {step === 0 && "The add item sheet, filled in for a YouTube video at 14 minutes."}
                {step === 1 && "The item detail, showing the source, priority, tags and a short summary."}
                {step === 2 && "Chat with the library, answering with two saved sources cited."}
              </p>
              <div className="phone phone-how" aria-hidden="true">
                <div className="phone-screen">
                  {status}
                  <div className={`screen screen-sheet${step === 0 ? " is-active" : ""}`} data-screen="0">
                    <div className="sheet-bg" aria-hidden="true">
                      <div className="sb-head">
                        <span className="sb-logo"><img src={remLogo} alt="" /></span>
                        <b>rem</b>
                        <span className="sb-sync"><i />Synced</span>
                        <span className="sb-plus"><Plus /></span>
                      </div>
                      <div className="sb-search">
                        <svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><circle cx="7" cy="7" r="4.2" /><path d="m10.2 10.2 3.3 3.3" /></svg>
                        <span>Search your vault...</span>
                      </div>
                      <div className="sb-chips"><span className="is-on">All</span><span>Links</span><span>Images</span><span>Videos</span></div>
                      <span className="sb-card" />
                      <span className="sb-card" />
                    </div>
                    <div className="sheet">
                      <span className="sheet-grab" />
                      <div className="sheet-head">
                        <b>Add item</b>
                        <span className="sheet-x"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg></span>
                      </div>
                      <p className="field-label">URL</p>
                      <div className="field">
                        <svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M6.4 9.6a2.4 2.4 0 0 0 3.4 0l2-2a2.4 2.4 0 1 0-3.4-3.4l-1.1 1.1" /><path d="M9.6 6.4a2.4 2.4 0 0 0-3.4 0l-2 2a2.4 2.4 0 1 0 3.4 3.4l1.1-1.1" /></svg>
                        <span className="field-value">https://www.youtube.com/watch?v=8bJ</span><i className="field-caret" />
                      </div>
                      <p className="field-label">Title <span className="field-opt">(optional)</span></p>
                      <div className="field"><span className="field-value">How CPUs actually work</span></div>
                      <p className="field-label">Type</p>
                      <div className="seg">
                        <span className="is-on"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M6.4 9.6a2.4 2.4 0 0 0 3.4 0l2-2a2.4 2.4 0 1 0-3.4-3.4l-1.1 1.1" /><path d="M9.6 6.4a2.4 2.4 0 0 0-3.4 0l-2 2a2.4 2.4 0 1 0 3.4 3.4l1.1-1.1" /></svg>Link</span>
                        <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="2" /><circle cx="6" cy="7" r="1.2" /><path d="m3.4 11 3.4-2.9 2.5 2 2-1.6L13.4 11" /></svg>Image</span>
                        <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M6.7 5.8 10.4 8 6.7 10.2z" fill="currentColor" stroke="none" /></svg>Video</span>
                        <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8 4.2C6.6 3.2 3.9 3 2.5 3.2v9.9c1.4-.2 4.1 0 5.5 1 1.4-1 4.1-1.2 5.5-1V3.2c-1.4-.2-4.1 0-5.5 1Z" /><path d="M8 4.2v9.9" /></svg>Book</span>
                      </div>
                      <p className="field-label">Priority</p>
                      <div className="seg">
                        <span><i className="dot dot-hi" />High</span>
                        <span className="is-on">Medium</span>
                        <span>Low</span>
                      </div>
                      <p className="field-label">Tags</p>
                      <div className="tag-row-add">
                        <div className="field"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8.2 2H3v5.2L8.4 12a1.6 1.6 0 0 0 2.3 0l2.4-2.4a1.6 1.6 0 0 0 0-2.3z" /><circle cx="6" cy="5" r=".9" /></svg><span className="field-value field-ph">Add a tag...</span></div>
                        <span className="tag-plus"><Plus /></span>
                      </div>
                      <span className="save-btn">Save to Vault</span>
                    </div>
                  </div>

                  <div className={`screen screen-detail${step === 1 ? " is-active" : ""}`} data-screen="1">
                    <div className="cover">
                      <span className="cover-cloud"><svg viewBox="0 0 48 30" aria-hidden="true"><path d="M13 21a6.5 6.5 0 0 1-.8-12.9A9.5 9.5 0 0 1 30.3 4.4 8.1 8.1 0 0 1 38.5 7 6.5 6.5 0 0 1 37.5 20z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/></svg></span>
                      <span className="cover-pill">Developer Docs</span>
                      <div className="cover-bar">
                        <span className="cover-btn"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg></span>
                        <span className="cover-acts">
                          <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8 3.2c3.4 0 6 1.9 6 4.4 0 2.5-2.6 4.4-6 4.4-.5 0-1-.1-1.5-.2L3.9 13l.8-2.5C3.8 9.5 2 8.7 2 7.6 2 5.1 4.6 3.2 8 3.2Z" fill="none" /></svg></span>
                          <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M3 6.5 8 3l5 3.5M4.5 6.5v6M8 6.5v6M11.5 6.5v6M3.5 13h9" /></svg></span>
                          <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M6 8.5 10 5M6 5.5 10 8M11.5 9v2.5a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1V10" /></svg></span>
                          <span><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M3 4h10M6.5 4V2.8h3V4M5 4l.7 9.2a1 1 0 0 0 1 .8h2.6a1 1 0 0 0 1-.8L11 4" /></svg></span>
                        </span>
                      </div>
                    </div>
                    <div className="detail-body">
                      <div className="detail-row">
                        <span className="detail-type">LINK</span>
                        <span className="detail-chips">
                          <span className="dc dc-hi"><i />HIGH<svg viewBox="0 0 12 12" className="phg" aria-hidden="true"><path d="M3 5l3 3 3-3" /></svg></span>
                          <span className="dc"><svg viewBox="0 0 12 12" className="phg" aria-hidden="true"><circle cx="6" cy="6" r="4.2" /></svg>UNREAD<svg viewBox="0 0 12 12" className="phg" aria-hidden="true"><path d="M3 5l3 3 3-3" /></svg></span>
                        </span>
                      </div>
                      <h3 className="detail-title">Browser Run</h3>
                      <p className="detail-meta"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="1.6" /><path d="M2 6.5h12M5 1.8v2.6M11 1.8v2.6" /></svg>Added 8/7/2026 <span>·</span> 1 min read</p>
                      <div className="detail-url"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M6.4 9.6a2.4 2.4 0 0 0 3.4 0l2-2a2.4 2.4 0 1 0-3.4-3.4l-1.1 1.1" /><path d="M9.6 6.4a2.4 2.4 0 0 0-3.4 0l-2 2a2.4 2.4 0 1 0 3.4 3.4l1.1-1.1" /></svg>https://developers.cloudflare.com/browser-run/</div>
                      <div className="detail-tags">
                        <svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8.2 2H3v5.2L8.4 12a1.6 1.6 0 0 0 2.3 0l2.4-2.4a1.6 1.6 0 0 0 0-2.3z" /><circle cx="6" cy="5" r=".9" /></svg>
                        <span className="dt-pill"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8.2 2H3v5.2L8.4 12a1.6 1.6 0 0 0 2.3 0l2.4-2.4a1.6 1.6 0 0 0 0-2.3z" /></svg>cloudflare</span>
                        <svg viewBox="0 0 16 16" className="phg dt-chev" aria-hidden="true"><path d="M6.5 3.5 11 8l-4.5 4.5" /></svg>
                      </div>
                      <div className="detail-actions">
                        <span className="da-primary"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><circle cx="8" cy="8" r="5.6" /><path d="M10.2 6 8.8 8.4 6.4 9.4 7.4 6.9z" /></svg>Open Original</span>
                        <span className="da-text"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M8 3v8M4.8 8 8 11.2 11.2 8" /><circle cx="8" cy="8" r="6.4" /></svg>Load Content</span>
                      </div>
                    </div>
                  </div>

                  <div className={`screen screen-chat${step === 2 ? " is-active" : ""}`} data-screen="2">
                    <div className="chat-bar">
                      <span className="chat-back"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg></span>
                      <span className="chat-head"><b>How Compaction Works in Pi</b><small>Chat about this item</small></span>
                      <span className="chat-filter"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M2.8 5h10.4M5 8h6M6.8 11h2.4" /></svg></span>
                    </div>
                    <div className="chat-body">
                      <div className="bubble-me">dive deep into this article</div>
                      <div className="bubble-ai">
                        <h4>Deep Dive: How Compaction Works in Pi</h4>
                        <p><b>The core problem: context window limits.</b> A model can only see so much input, and a long session blows straight past it. A coding agent carries both its history and fresh instructions, so older context has to be compressed away.</p>
                        <p className="ai-h"><b>How a coding agent conversation grows</b></p>
                        <ul>
                          <li><b>System prompt</b> stays pinned.</li>
                          <li><b>Tool definitions</b> ride along every turn.</li>
                          <li><b>Conversation history</b> grows until it must be summarized or dropped.</li>
                        </ul>
                        <p className="ai-key"><b>Key insight:</b> every turn resends the full conversation, so quality decays as the load grows.</p>
                      </div>
                    </div>
                    <div className="chat-input"><span>Ask about this item...</span><span className="send"><svg viewBox="0 0 16 16" className="phg" aria-hidden="true"><path d="M3 8 13 3.5 8.8 13 6.8 9z" fill="currentColor" /></svg></span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq">
            <div className="reveal"><h2 id="faq-title">Questions,<br />answered.</h2></div>
            <div className="faq-list">
              <details><summary>What is rem?<span className="faq-icon" aria-hidden="true" /></summary><p>rem is a self-hosted read-later and bookmark manager. Save links, threads, videos and papers, and rem keeps them in one quiet queue with the source and length intact.</p></details>
              <details><summary>Where does my data live?<span className="faq-icon" aria-hidden="true" /></summary><p>On your machine. rem runs locally, stores everything in one SQLite file, and never sends your saves to a third party.</p></details>
              <details><summary>Do I need an account?<span className="faq-icon" aria-hidden="true" /></summary><p>No. There is no cloud account. Install rem, point it at a folder, and start saving.</p></details>
              <details><summary>Can I export everything?<span className="faq-icon" aria-hidden="true" /></summary><p>Yes. The queue, highlights and notes export as plain JSON. The archive stays yours, with or without rem.</p></details>
            </div>
          </div>
        </section>

        <section className="wrap cta-wrap" aria-labelledby="cta-title">
          <div className="cta reveal">
            <h2 id="cta-title">Read what you saved.</h2>
            <p>One calm queue for everything worth keeping. Self-hosted, private, yours.</p>
            <Link className="btn btn-accent" to="/get-started">Get rem</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-top">
          <div className="footer-brand">
            <Wordmark />
            <p>Read it later, on your terms.</p>
          </div>
          <nav className="footer-cols" aria-label="Footer navigation">
            <div><p className="footer-h">Product</p><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a></div>
            <div><p className="footer-h">Get started</p><Link to="/get-started">Get rem</Link><a href="#top">Back to top</a></div>
          </nav>
        </div>
        <div className="wrap footer-bottom"><p className="footer-legal">Â© {new Date().getFullYear()} rem · Self-hosted, no tracking</p></div>
        <div className="footer-giant" style={{ "--photo": `url(${howBg})` } as CSSVars} aria-hidden="true">rem</div>
      </footer>
    </div>
  );
}
