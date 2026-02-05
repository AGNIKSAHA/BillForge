import { ButtonHTMLAttributes } from "react";

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
    />
  );
}
