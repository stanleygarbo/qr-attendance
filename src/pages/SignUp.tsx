import { useEffect, useState, type FormEvent } from "react";
import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSnapshot(authStore);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  // To create the user with email and password
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen ">
      <form
        onSubmit={handleSignup}
        className="flex flex-col w-[360px] h-fit mx-auto gap-2 border p-5 mt-24 rounded-md border-black/10"
      >
        <h1 className="font-bold mb-2 text-xl">Create an Account</h1>
        <Input
          className="border rounded-md px-3 py-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="border rounded-md px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="bg-black rounded-md mt-2 text-white py-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
