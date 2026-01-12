"use client";
import Logo from "@/assets/logo.webp";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Copy,
  File,
  FolderKanban,
  Home,
  Info,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  categories?: Category[];
}

const Navbar = ({ categories = [] }: NavbarProps) => {
  // Build menu items with dynamic categories
  const menuItems = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
    {
      href: "/prefabrik-evler",
      label: "Prefabrik Evler",
      icon: Building2,
      subItems: categories.map((cat) => ({
        href: `/prefabrik-evler/${cat.slug}`,
        label: cat.name,
      })),
    },
    { href: "/projelerimiz", label: "Projelerimiz", icon: FolderKanban },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/iletisim", label: "İletişim", icon: Mail },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const copyToClipboard = async (text: string, type: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-lg rounded-xl flex items-center justify-between px-4 md:px-8 py-3 w-full max-w-7xl"
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={Logo}
                alt="ctprefabrik"
                width={96}
                height={56}
                quality={60}
                priority
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-800">
            {menuItems.map((item) => (
              <li key={item.href} className="relative">
                {item.subItems ? (
                  <div
                    onMouseEnter={() => setDesktopDropdownOpen(true)}
                    onMouseLeave={() => setDesktopDropdownOpen(false)}
                  >
                    <button
                      className={`hover:text-primary transition flex items-center gap-1 ${
                        pathname.startsWith(item.href)
                          ? "text-secondary"
                          : "text-slate-800"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          desktopDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {desktopDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block px-5 py-3 hover:bg-slate-50 transition ${
                                pathname === subItem.href
                                  ? "text-secondary bg-slate-50"
                                  : "text-slate-700"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`hover:text-primary transition ${
                      isActive(item.href) ? "text-secondary" : "text-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+905375183006"
              className="bg-[linear-gradient(10deg,#49202d,hsl(150.43deg_95%_22.16%))] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:opacity-90 transition"
            >
              <Phone size={18} fill="currentColor" /> Bizi Arayın
            </a>
            <Link
              href="/katalog"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:bg-slate-800 transition"
            >
              <File size={18} /> Katalog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Menüyü aç"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <Menu size={22} />
          </button>
        </motion.nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <Image
                    src={Logo}
                    alt="Sakarya Aktaş"
                    width={150}
                    height={150}
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    if (item.subItems) {
                      return (
                        <div key={item.href}>
                          <button
                            onClick={() =>
                              setMobileDropdownOpen(!mobileDropdownOpen)
                            }
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                              pathname.startsWith(item.href)
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-transparent text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <Icon size={20} />
                              {item.label}
                            </div>
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${
                                mobileDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-2 space-y-1">
                                  {item.subItems.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`block px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                                        pathname === subItem.href
                                          ? "bg-secondary text-white"
                                          : "text-slate-600 hover:bg-slate-50"
                                      }`}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                          active
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-transparent text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Icon size={20} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6 border-t border-slate-200">
                  <a
                    href="tel:+905375183006"
                    className="bg-[linear-gradient(10deg,#49202d,hsl(150.43deg_95%_22.16%))] text-white px-5 py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition w-full"
                  >
                    <Phone size={18} fill="currentColor" />
                    Bizi Arayın
                  </a>
                  <Link
                    href="/katalog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-slate-900 text-white px-5 py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-slate-800 transition w-full"
                  >
                    <File size={18} />
                    Katalog
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-slate-200">
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      İletişim
                    </p>

                    {/* Phone */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard("+905551234567", "phone")
                        }
                        className="w-full text-left text-sm font-semibold text-slate-800 hover:text-primary transition flex items-center justify-between group bg-white rounded-lg px-3 py-2"
                      >
                        <span>📞 +90 537 518 30 06</span>
                        {copiedPhone ? (
                          <Check size={16} className="text-secondary" />
                        ) : (
                          <Copy
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400"
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {copiedPhone && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                          >
                            ✓ Kopyalandı!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard("info@sakaryaaktas.com", "email")
                        }
                        className="w-full text-left text-sm font-semibold text-slate-800 hover:text-primary transition flex items-center justify-between group bg-white rounded-lg px-3 py-2"
                      >
                        <span>📧 info@ctprefabrik.com</span>
                        {copiedEmail ? (
                          <Check size={16} className="text-secondary" />
                        ) : (
                          <Copy
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400"
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {copiedEmail && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                          >
                            ✓ Kopyalandı!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
