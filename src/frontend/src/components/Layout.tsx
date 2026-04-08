import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  ScanSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { DermaLogo } from "./DermaLogo";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-analysis", label: "New Scan", icon: ScanSearch },
];

export function Layout({ children, showNav = true }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setMobileOpen(false);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* AI disclaimer banner */}
      <div
        className="banner-warning text-xs md:text-sm text-center py-2 px-4"
        data-ocid="disclaimer-banner"
      >
        🤖 AI Analysis is for informational purposes only. &nbsp;⚠️ Consult a
        healthcare professional for diagnosis.
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-clinical"
        data-ocid="main-header"
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center"
          >
            <DermaLogo size="md" />
          </Link>

          {showNav && isAuthenticated && (
            <>
              {/* Desktop nav */}
              <nav
                className="hidden md:flex items-center gap-1"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                      isActive(to)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    data-ocid={`nav-${label.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive gap-1.5"
                  onClick={handleLogout}
                  data-ocid="logout-btn"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-smooth"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                data-ocid="mobile-menu-toggle"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          )}
        </div>

        {/* Mobile nav drawer */}
        {showNav && isAuthenticated && mobileOpen && (
          <div className="md:hidden border-t border-border bg-card animate-in slide-in-from-top-2 duration-200">
            <nav
              className="px-4 py-3 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                    isActive(to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  data-ocid={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-border">
                <button
                  type="button"
                  className="flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth"
                  onClick={handleLogout}
                  data-ocid="mobile-logout-btn"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background" data-ocid="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border py-4 px-4 text-center"
        data-ocid="main-footer"
      >
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
