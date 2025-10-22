import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm type="signin" className="mt-8" />
      </div>
    </div>
  );
};

export default Login;
