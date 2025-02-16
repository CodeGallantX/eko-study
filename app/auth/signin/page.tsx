import SignInForm from '@/components/SignInForm';
import SignInMobile from "@/components/SignInMobile";

export default function SignIn()  {
  return (
    <>
    <div className="hidden sm:block">
      <SignInForm />
    </div>
    <div className="block sm:hidden">
      <SignInMobile />
    </div>
    </>
  );
};

