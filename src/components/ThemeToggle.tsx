import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-foreground/[0.08] border border-foreground/10 text-foreground/80 hover:bg-foreground/[0.15] hover:border-foreground/30 hover:text-foreground hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
};

export default ThemeToggle;
