export default function ErrorState({ message }: { message: string }) {
  return <div className="text-center text-red-400">{message}</div>;
}
