import iconSrc from "@/assets/icon.png";

type SvgProps = { className?: string };

const Svg = ({ className = "i", children }: SvgProps & { children: React.ReactNode }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

export const ArrowRight = ({ className }: SvgProps) => (
  <Svg className={className}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);

export const ArrowUp = ({ className }: SvgProps) => (
  <Svg className={className}><path d="M12 19V5M6 11l6-6 6 6" /></Svg>
);

export const Plus = ({ className }: SvgProps) => (
  <Svg className={className}><path d="M12 5v14M5 12h14" /></Svg>
);

export const Calendar = ({ className }: SvgProps) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </Svg>
);

export const Check = ({ className }: SvgProps) => (
  <Svg className={className}><path d="M20 6 9 17l-5-5" /></Svg>
);

export const Bell = ({ className }: SvgProps) => (
  <Svg className={className}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Svg>
);

export const FileIcon = ({ className }: SvgProps) => (
  <Svg className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
  </Svg>
);

export const Download = ({ className }: SvgProps) => (
  <Svg className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5M12 15V3" />
  </Svg>
);

export const StatusIcons = () => (
  <svg className="status-svg" width="54" height="11" viewBox="0 0 54 11" aria-hidden="true">
    <g fill="currentColor">
      <rect x="0" y="7" width="3" height="4" rx="1" />
      <rect x="4.5" y="5.5" width="3" height="5.5" rx="1" />
      <rect x="9" y="3.5" width="3" height="7.5" rx="1" />
      <rect x="13.5" y="1.5" width="3" height="9.5" rx="1" />
    </g>
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21.5 5.2a8.5 8.5 0 0 1 11 0" />
      <path d="M24 8a4.8 4.8 0 0 1 6 0" />
    </g>
    <circle cx="27" cy="10" r="1.4" fill="currentColor" />
    <rect x="38" y="1.5" width="14" height="8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <rect x="39.6" y="3.1" width="10" height="4.8" rx="1.4" fill="currentColor" />
    <path d="M53 4.2v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Wordmark = () => (
  <a className="wordmark" href="#top">
    <img src={iconSrc} alt="" width={22} height={22} />
    rem
  </a>
);
