import { useEffect } from "react";
import iconSrc from "@/assets/icon.png";
import { ArrowLeft, Download, ExternalLink, Github, Loader2, Puzzle, Smartphone } from "lucide-react";
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
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const latestRelease = releases?.[0];
  const apkAsset = latestRelease?.assets?.find((a) => a.name.endsWith(".apk"));
  const extensionAsset = latestRelease?.assets?.find((a) => a.name.endsWith(".zip") || a.name.includes("extension"));

  const formatSize = (bytes: number) => {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(0) + "KB";
    }
    return (bytes / (1024 * 1024)).toFixed(1) + "MB";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const cards = [
    {
      icon: Smartphone,
      title: "Android app",
      copy: "Install the APK straight on your phone. No Play Store, no account, no gatekeeping.",
      steps: [
        "Download the APK below",
        "Enable install from unknown sources",
        "Open the file and tap Install",
        "Sign in and start saving",
      ],
      asset: apkAsset,
      href: apkAsset?.browser_download_url || "https://github.com/natanim-kemal/rem/releases/latest",
      label: "Download APK",
    },
    {
      icon: Puzzle,
      title: "Browser extension",
      copy: "Save the page you are on with one click, or Ctrl + Shift + S. Works in Chrome, Edge and Brave.",
      steps: [
        "Download the extension ZIP",
        "Open chrome://extensions and enable Developer mode",
        "Choose Load unpacked and pick the folder",
        "Pin rem to your toolbar",
      ],
      asset: extensionAsset,
      href: extensionAsset?.browser_download_url || "https://github.com/natanim-kemal/rem/releases/latest",
      label: "Download extension",
    },
  ];

  return (
    <div className="get-page">
      <header className="get-nav">
        <div className="wrap get-nav-inner">
          <Link to="/" className="get-brand" aria-label="rem home">
            <img src={iconSrc} alt="" />
            <span>rem</span>
          </Link>
          <Link to="/" className="btn btn-ghost btn-sm get-back">
            <ArrowLeft size={14} />
            Back home
          </Link>
        </div>
      </header>

      <main>
        <section className="wrap get-hero">
          <p className="get-eyebrow">Get started</p>
          <h1>Download &amp; install rem</h1>
          <p className="get-lede">
            rem is open source and takes a minute to install. Grab the Android app, the browser extension, or both.
          </p>
          {latestRelease && (
            <a className="get-release" href={latestRelease.html_url} target="_blank" rel="noopener noreferrer">
              <span className="get-dot" />
              Latest <b>{latestRelease.tag_name}</b>
              <span className="get-sep" />
              Released {formatDate(latestRelease.published_at)}
            </a>
          )}
        </section>

        <section className="wrap get-grid">
          {cards.map((card) => (
            <article className="get-card" key={card.title}>
              <span className="get-ico"><card.icon size={18} /></span>
              <h2>{card.title}</h2>
              <p className="get-card-copy">{card.copy}</p>
              <ol className="get-steps">
                {card.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="get-actions">
                <a className="btn btn-primary get-download" href={card.href}>
                  {isLoading ? <Loader2 size={15} className="get-spin" /> : <Download size={15} />}
                  {card.label}
                  {card.asset && <span className="get-size">{formatSize(card.asset.size)}</span>}
                </a>
                <a className="get-source" href="https://github.com/natanim-kemal/rem" target="_blank" rel="noopener noreferrer">
                  <Github size={14} />
                  Source
                  <ExternalLink size={11} />
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="wrap">
          <div className="get-open">
            <div>
              <h2>Open source, top to bottom</h2>
              <p>Read the code, file an issue, or fork it for your own setup. rem stays yours.</p>
            </div>
            <a className="btn btn-ghost btn-sm" href="https://github.com/natanim-kemal/rem" target="_blank" rel="noopener noreferrer">
              <Github size={14} />
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="get-foot">
        <div className="wrap">
          <p>© {new Date().getFullYear()} rem · natanim.dev</p>
          <Link to="/">Back to rem</Link>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;
