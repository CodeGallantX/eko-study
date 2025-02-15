import SignUpForm from '@/components/SignUpForm';
import SignUpMobile from "@/components/SignUpMobile";

export default function SignUp()  {
  return (
    <>
    <div className="hidden sm:block">
      <SignUpForm />
    </div>
    <div className="block sm:hidden">
      <SignUpMobile />
    </div>
    </>
  );
};

