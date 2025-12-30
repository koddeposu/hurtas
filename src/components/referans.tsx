"use client";
import { motion } from 'framer-motion';
import {
  Zap
} from 'lucide-react';

export const Referans = () => {

  return (
    <section className=" overflow-hidden relative">

      <div className='space-y-6'>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 whitespace-nowrap items-center min-w-full"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              {["GLOBAL", "VIZYON", "AKTAŞ", "MODERN", "PRESTİJ", "GÜVEN"].map((name, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-[#165b39] group-hover:border-[#165b39] transition-all">
                    <Zap size={18} />
                  </div>
                  <span className="text-5xl font-black text-slate-100 group-hover:text-slate-900 transition-all italic tracking-tighter uppercase">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-24  items-center min-w-full"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              {["GLOBAL", "VIZYON", "AKTAŞ", "MODERN", "PRESTİJ", "GÜVEN"].map((name, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-[#165b39] group-hover:border-[#165b39] transition-all">
                    <Zap size={18} />
                  </div>
                  <span className="text-5xl font-black text-slate-100 group-hover:text-slate-900 transition-all italic tracking-tighter uppercase">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

