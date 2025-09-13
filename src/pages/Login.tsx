import { LoginForm } from "@/components/login-form";
import { authStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const Login = () => {
  const { user } = useSnapshot(authStore);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm className="mt-8" />
      </div>
    </div>
  );
};

export default Login;
