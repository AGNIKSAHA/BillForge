export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black p-6 rounded">
        {children}
      </div>
    </div>
  );
}
