import { LoginForm } from "@/components/login-form";

const SignUp = () => {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm type="signup" className="mt-8" />
      </div>
    </div>
  );
};

export default SignUp;
