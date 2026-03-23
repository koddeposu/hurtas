import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getContactSubmissions } from "@/actions/contactActions";
import { ContactActions } from "./actions";

export default async function ContactsPage() {
  const session = await requireAuth();
  const submissions = await getContactSubmissions();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="İletişim Mesajları"
          description="Müşteri iletişim formlarını yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="mb-6">
            <p className="text-slate-600">Toplam {submissions.length} mesaj</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>İsim</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Mesaj</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-slate-500"
                      >
                        Henüz mesaj yok
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission) => (
                      <TableRow
                        key={submission.id}
                        className={!submission.isRead ? "bg-blue-50/50" : ""}
                      >
                        <TableCell className="text-sm text-slate-500">
                          {formatDate(submission.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {submission.name}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${submission.phone}`}
                            className="text-primary hover:underline"
                          >
                            {submission.phone}
                          </a>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate text-sm text-slate-600">
                            {submission.message || "-"}
                          </p>
                        </TableCell>
                        <TableCell>
                          {!submission.isRead ? (
                            <Badge className="bg-blue-500">Yeni</Badge>
                          ) : (
                            <Badge variant="secondary">Okundu</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <ContactActions
                            id={submission.id}
                            isRead={submission.isRead}
                            name={submission.name}
                            phone={submission.phone}
                            date={formatDate(submission.createdAt)}
                            message={submission.message}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

