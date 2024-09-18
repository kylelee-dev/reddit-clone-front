import InputGroup from "@/components/InputGroup";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<any>({});
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-content h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">SIGN UP</h1>
          <form>
            <InputGroup
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />

            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              GO
            </button>
          </form>
          <small>
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="ml-1 text-blue-500 uppercase">SIGN IN</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
