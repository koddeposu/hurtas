import { UserMenu } from "./user-menu";

interface AdminHeaderProps {
  title: string;
  description?: string;
  userName?: string;
}

export function AdminHeader({
  title,
  description,
  userName,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        <UserMenu userName={userName} />
      </div>
    </header>
  );
}
