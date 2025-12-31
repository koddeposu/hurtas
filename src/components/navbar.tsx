"use client";
import Logo from '@/assets/logo.png';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg rounded-xl flex items-center justify-between px-8 py-3 w-full max-w-7xl"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={Logo}
              alt="Sakarya Aktaş"
              width={200}
              height={200}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-800">
          <li><Link href="/" className="hover:text-red-600 transition">Ana Sayfa</Link></li>
          <li><Link href="/hakkimizda" className="hover:text-red-600 transition">Hakkımızda</Link></li>
          <li><Link href="/prefabrik-evler" className="hover:text-red-600 transition">Prefabrik Evler </Link></li>
          <li><Link href="/projelerimiz" className="hover:text-red-600 transition">Projelerimiz</Link></li>
          <li><Link href="/blog" className="hover:text-red-600 transition">Blog</Link></li>
          <li><Link href="/iletisim" className="hover:text-red-600 transition">İletişim</Link></li>
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="tel:+90..." className="bg-[linear-gradient(10deg,#49202d,hsl(150.43deg_95%_22.16%))] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:bg-red-700 transition">
            <Phone size={18} fill="currentColor" /> Bizi Arayın
          </Link>
          <Link href="/teklif-al" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:bg-slate-800 transition">
            <MessageSquare size={18} /> Teklif Al
          </Link>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
