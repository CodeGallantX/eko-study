import { SignInForm } from '../../../components/auth/SignInForm';
import { SignInMobile } from "../../../components/auth/SignInMobile";

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

