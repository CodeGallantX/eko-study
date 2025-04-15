import { SignInForm } from "@/components/auth/SignInForm";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 md:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 items-center">
        {/* Illustration - Hidden on mobile, visible on lg screens */}
        <div className="hidden lg:block w-full lg:w-1/2">
          <div className="relative h-[500px] w-full">
            <Image
              src="/images/signin-illustration.svg"
              alt="Sign in illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

