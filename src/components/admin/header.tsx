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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 pl-16 sm:px-6 sm:pl-16 lg:pl-6">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
          {title}
        </h1>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        <UserMenu userName={userName} />
      </div>
    </header>
  );
}
