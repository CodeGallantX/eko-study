import { SignUpForm } from '../../../components/auth/SignUpForm';
import { SignUpMobile } from "../../../components/auth/SignUpMobile";

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

