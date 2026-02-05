import { useState } from "react";
import { useLogin } from "../../features/auth/authHooks";

export default function Login() {
  const login = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="bg-white/10 p-8 rounded w-96">
        <h2 className="text-xl mb-4 text-white">Login</h2>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full p-2 mb-3 text-black"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={() => login.mutate(form)}
          className="bg-purple-600 p-2 w-full rounded text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}
