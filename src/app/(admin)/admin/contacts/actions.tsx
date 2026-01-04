"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Check, Mail, Trash2, Loader2 } from "lucide-react";
import {
  markAsRead,
  markAsUnread,
  deleteSubmission,
} from "@/actions/contactActions";
import { toast } from "sonner";

interface ContactActionsProps {
  id: string;
  isRead: boolean;
}

export function ContactActions({ id, isRead }: ContactActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleMarkRead}>
          {isRead ? (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Okunmadı İşaretle
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Okundu İşaretle
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Sil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
