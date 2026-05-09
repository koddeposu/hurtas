"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Info } from "lucide-react";

interface AltTextEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAlt: string;
  currentAltEn?: string | null;
  currentAltAr?: string | null;
  onSave: (values: {
    alt: string;
    altEn?: string | null;
    altAr?: string | null;
  }) => Promise<void>;
  isLoading: boolean;
}

export function AltTextEditDialog({
  open,
  onOpenChange,
  currentAlt,
  currentAltEn = "",
  currentAltAr = "",
  onSave,
  isLoading,
}: AltTextEditDialogProps) {
  const [altText, setAltText] = useState(currentAlt);
  const [altTextEn, setAltTextEn] = useState(currentAltEn ?? "");
  const [altTextAr, setAltTextAr] = useState(currentAltAr ?? "");

  useEffect(() => {
    if (open) {
      setAltText(currentAlt);
      setAltTextEn(currentAltEn ?? "");
      setAltTextAr(currentAltAr ?? "");
    }
  }, [open, currentAlt, currentAltEn, currentAltAr]);

  const handleSave = async () => {
    await onSave({
      alt: altText,
      altEn: altTextEn,
      altAr: altTextAr,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alt Metin Düzenle</DialogTitle>
          <DialogDescription className="sr-only">
            Görsel için alternatif metin düzenleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Alt metin nedir?</p>
                <p className="text-blue-700">
                  Alt metin, görselin içeriğini tanımlar. Görme engelli
                  kullanıcılar için ekran okuyucular tarafından okunur ve
                  SEO&apos;ya yardımcı olur.
                </p>
                <p className="text-blue-600 mt-2 italic">
                  Örnek: &quot;Modern tek katlı prefabrik ev dış cephesi&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt-text">Alt Metin</Label>
            <Textarea
              id="alt-text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Görseli kısaca tanımlayın..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt-text-en">Alt Metin (İngilizce)</Label>
            <Textarea
              id="alt-text-en"
              value={altTextEn}
              onChange={(e) => setAltTextEn(e.target.value)}
              placeholder="Describe the image in English..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt-text-ar">Alt Metin (Arapça)</Label>
            <Textarea
              id="alt-text-ar"
              dir="rtl"
              value={altTextAr}
              onChange={(e) => setAltTextAr(e.target.value)}
              placeholder="صف الصورة..."
              rows={3}
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary hover:bg-[#3a1924]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              "Kaydet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
