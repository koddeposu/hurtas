"use client";
import { useDictionary } from "@/components/i18n-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
  Phone,
  Send,
  User,
  Check,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm } from "@/actions/contactActions";

export const LeadForm = () => {
  const dict = useDictionary();
  const labelClass =
    "ml-0.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500";
  const iconClass =
    "pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-slate-200 text-slate-400 transition-colors group-focus-within:border-[#d6a94a]/50 group-focus-within:text-[#152f51]";
  const fieldClass =
    "w-full rounded-[2px] border border-slate-300 bg-white py-3.5 pl-15 pr-4 text-sm font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#152f51] focus:ring-2 focus:ring-[#d6a94a]/35";
  const textareaClass =
    "min-h-34 w-full resize-none rounded-[2px] border border-slate-300 bg-white py-3.5 pl-15 pr-4 text-sm font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#152f51] focus:ring-2 focus:ring-[#d6a94a]/35";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    website: "", // honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || shouldLoadTurnstile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadTurnstile(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldLoadTurnstile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate turnstile token
    if (!turnstileToken) {
      setError(dict.form.verifyError);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm({
        ...formData,
        turnstileToken,
      });
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", message: "", website: "" });
        setTurnstileToken("");
      } else {
        setError(dict.form.submitError);
      }
    } catch (err) {
      setError(dict.form.connectionError);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section ref={sectionRef} className="lg:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[3px] border border-slate-300 bg-[#f6f8fb] shadow-[0_22px_52px_-42px_rgba(15,23,42,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#152f51] p-8 text-white md:p-10 lg:col-span-5 lg:p-12">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-[#d6a94a]" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] [background-size:34px_34px]" />

              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-5 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f4d78d]">
                    <span className="h-px w-8 bg-[#d6a94a]" aria-hidden="true" />
                    {dict.common.companyName}
                  </div>
                  <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                    {dict.form.titleBefore}{" "}
                    <span className="text-[#f4d78d]">
                      {dict.form.titleAccent}
                    </span>{" "}
                    {dict.form.titleAfter}
                  </h2>
                  <p className="mt-4 text-sm font-medium leading-7 text-white/90">
                    {dict.form.description}
                  </p>
                </motion.div>

                <div className="space-y-4 pt-4">
                  {dict.form.benefits.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border-t border-white/10 pt-4 text-sm font-black uppercase tracking-[0.08em] text-slate-100 first:border-t-0 first:pt-0"
                    >
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-[#d6a94a]"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative bg-white p-5 md:p-10 lg:col-span-7 lg:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center space-y-5 py-10 text-center"
                  >
                    <div className="flex h-18 w-18 items-center justify-center rounded-[2px] bg-[#d6a94a] text-[#152f51]">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#152f51]">
                        {dict.form.successTitle}
                      </h3>
                      <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-slate-600">
                        {dict.form.successDescription}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="rounded-[2px] bg-[#152f51] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0d1f36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a94a] focus-visible:ring-offset-2"
                    >
                      {dict.form.newForm}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className={labelClass}>
                          {dict.form.nameLabel}
                        </label>
                        <div className="relative group">
                          <div className={iconClass}>
                            <User size={18} />
                          </div>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={dict.form.namePlaceholder}
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>
                          {dict.form.phoneLabel}
                        </label>
                        <div className="relative group">
                          <div className={iconClass}>
                            <Phone size={18} />
                          </div>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0 (5xx) 000 00 00"
                            className={fieldClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>
                        {dict.form.messageLabel}
                      </label>
                      <div className="relative group">
                        <div className="pointer-events-none absolute left-0 top-0 flex h-12 w-12 items-center justify-center border-r border-slate-200 text-slate-400 transition-colors group-focus-within:border-[#d6a94a]/50 group-focus-within:text-[#152f51]">
                          <MessageSquare size={18} />
                        </div>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={dict.form.messagePlaceholder}
                          className={textareaClass}
                        ></textarea>
                      </div>
                    </div>

                    {/* Honeypot field - hidden from humans, bots will fill it */}
                    <div
                      style={{ position: "absolute", left: "-9999px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Cloudflare Turnstile - invisible CAPTCHA */}
                    {shouldLoadTurnstile ? (
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={setTurnstileToken}
                        onError={() => setTurnstileToken("")}
                        onExpire={() => setTurnstileToken("")}
                        options={{ size: "invisible" }}
                      />
                    ) : null}

                    {error && (
                      <p className="ml-1 text-sm font-semibold text-red-600">
                        {error}
                      </p>
                    )}

                    <motion.button
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex min-h-13 w-full items-center justify-center gap-3 rounded-[2px] bg-[#152f51] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_16px_34px_-24px_rgba(21,47,81,0.75)] transition-colors hover:bg-[#0d1f36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a94a] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          {dict.form.submitting}{" "}
                          <Loader2 size={18} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          {dict.form.submit} <Send size={18} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] font-medium leading-5 text-slate-500">
                      {dict.form.kvkk}{" "}
                      <span className="cursor-pointer font-bold text-[#152f51] underline underline-offset-2">
                        {dict.form.kvkkLink}
                      </span>{" "}
                      {dict.form.kvkkEnd}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
