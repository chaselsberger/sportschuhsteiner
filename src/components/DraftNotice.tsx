export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-[16px] border border-logogelb/60 bg-logogelb/10 p-4 text-sm text-text">
      <strong>Entwurf:</strong> {children}
    </div>
  );
}
