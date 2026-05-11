"use client";

import { useDictionary, useLocalizedPath } from "@/components/i18n-provider";
import { Facebook, Linkedin, Share2, Twitter, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const [copied, setCopied] = useState(false);

  // We can't access window/navigation directly in SSR, but component mounts on client.
  // Using window.location.origin would be better but simple relative path works if we construct full URL
  // Let's assume production URL or use window.location.origin dynamically

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${localizedPath(`/blog/${slug}`)}`;
    }
    return "";
  };

  const handleShare = (
    platform: "facebook" | "twitter" | "linkedin" | "copy",
  ) => {
    const url = getShareUrl();
    if (!url) return;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success(dict.common.copied);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleShare("facebook")}
        aria-label={`Facebook ${dict.blog.sharePost}`}
        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all cursor-pointer"
      >
        <Facebook size={18} />
      </button>
      <button
        onClick={() => handleShare("twitter")}
        aria-label={`Twitter ${dict.blog.sharePost}`}
        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all cursor-pointer"
      >
        <Twitter size={18} />
      </button>
      <button
        onClick={() => handleShare("linkedin")}
        aria-label={`LinkedIn ${dict.blog.sharePost}`}
        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-all cursor-pointer"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={() => handleShare("copy")}
        aria-label={dict.common.copied}
        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all cursor-pointer relative"
      >
        <div
          className={`transition-all duration-300 absolute inset-0 flex items-center justify-center ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
        >
          <Share2 size={18} />
        </div>
        <div
          className={`transition-all duration-300 absolute inset-0 flex items-center justify-center ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <Check size={18} />
        </div>
      </button>
    </div>
  );
}
