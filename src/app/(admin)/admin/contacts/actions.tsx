"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Check,
  Mail,
  Trash2,
  Loader2,
  Eye,
  User,
  Phone,
  Calendar,
} from "lucide-react";
import {
  markAsRead,
  markAsUnread,
  deleteSubmission,
} from "@/actions/contactActions";
import { toast } from "sonner";

interface ContactActionsProps {
  id: string;
  isRead: boolean;
  name: string;
  phone: string;
  date: string;
  message: string | null;
}

export function ContactActions({
  id,
  isRead,
  name,
  phone,
  date,
  message,
}: ContactActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleMarkRead = async () => {
    setIsLoading(true);
    try {
      if (isRead) {
        await markAsUnread(id);
        toast.success("Okunmadı olarak işaretlendi");
      } else {
        await markAsRead(id);
        toast.success("Okundu olarak işaretlendi");
      }
    } catch {
      toast.error("İşlem başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenView = async () => {
    setIsViewOpen(true);
    if (!isRead) {
      try {
        await markAsRead(id);
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    setIsLoading(true);
    try {
      await deleteSubmission(id);
      toast.success("Mesaj silindi");
    } catch {
      toast.error("Mesaj silinirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenView}
        className="rounded-lg h-9 px-4 gap-2 border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all font-medium"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden sm:inline">Görüntüle</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoading}
            className="h-9 w-9 p-0 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-xl border-slate-200 shadow-xl"
        >
          <DropdownMenuItem
            onClick={handleMarkRead}
            className="rounded-lg gap-2 cursor-pointer"
          >
            {isRead ? (
              <>
                <Mail className="h-4 w-4 text-slate-500" />
                <span>Okunmadı İşaretle</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4 text-slate-500" />
                <span>Okundu İşaretle</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="rounded-lg gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Sil</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
            <DialogDescription>
              İletişim formundan gönderilen mesajın detayları
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    GÖNDEREN
                  </p>
                  <p className="font-semibold text-slate-700">{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TELEFON
                  </p>
                  <a
                    href={`tel:${phone}`}
                    className="font-semibold text-slate-700 hover:text-[#165b39] hover:underline transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TARİH
                  </p>
                  <p className="font-semibold text-slate-700">{date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                MESAJ İÇERİĞİ
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl min-h-[150px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                {message || (
                  <span className="italic text-slate-400">Mesaj boş</span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="rounded-xl px-6"
                onClick={() => setIsViewOpen(false)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
