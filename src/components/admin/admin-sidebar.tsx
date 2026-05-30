"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MapPin,
  Music,
  Info,
  Tag,
  Star,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";
import { businessUiCopy } from "@/content/business-defaults";
import { signOutFromApp } from "@/lib/client-auth";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, labelKey: "dashboard", exact: true },
  { href: "/admin/cars", icon: Car, labelKey: "cars" },
  { href: "/admin/bookings", icon: CalendarCheck, labelKey: "bookings" },
  { href: "/admin/places", icon: MapPin, labelKey: "places" },
  { href: "/admin/music", icon: Music, labelKey: "music" },
  { href: "/admin/travel-info", icon: Info, labelKey: "travelInfo" },
  { href: "/admin/coupons", icon: Tag, labelKey: "coupons" },
  { href: "/admin/testimonials", icon: Star, labelKey: "testimonials" },
  { href: "/admin/settings", icon: Settings, labelKey: "settings" },
];

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
}

interface SidebarContentProps {
  userEmail?: string | null;
  pathname: string;
  onNavClick: () => void;
  onSignOut: () => void;
  t: (key: string) => string;
}

function SidebarContent({
  userEmail,
  pathname,
  onNavClick,
  onSignOut,
  t,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <div className="mb-2">
          <Image
            src="/logo.png"
            alt="GeoLander Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {businessUiCopy.adminPanelTitle}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {userEmail}
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-navy text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-destructive"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card lg:block">
        <SidebarContent
          userEmail={user.email}
          pathname={pathname}
          onNavClick={() => setMobileOpen(false)}
          onSignOut={() => void signOutFromApp().then(() => window.location.assign("/"))}
          t={t}
        />
      </aside>

      {/* Mobile sidebar */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full bg-navy shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <SidebarContent
              userEmail={user.email}
              pathname={pathname}
              onNavClick={() => setMobileOpen(false)}
              onSignOut={() => void signOutFromApp().then(() => window.location.assign("/"))}
              t={t}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
