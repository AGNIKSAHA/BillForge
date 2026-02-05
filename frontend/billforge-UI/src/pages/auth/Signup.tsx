import { useSignup } from "../../features/auth/authHooks";

export default function Signup() {
  const signup = useSignup();

  return (
    <button
      onClick={() =>
        signup.mutate({
          name: "Test",
          email: "test@test.com",
          password: "Password@123"
        })
      }
    >
      Signup
    </button>
  );
}
