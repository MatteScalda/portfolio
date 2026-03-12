import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Nav");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 font-mono text-6xl font-bold text-accent">404</h1>
      <p className="text-text-secondary">Page not found.</p>
    </div>
  );
}
