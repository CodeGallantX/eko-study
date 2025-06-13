// app/auth/signup/page.tsx
import { 
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToUserProfile
} from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignedOut>
        <SignUp path="/auth/signup" routing="path" />
      </SignedOut>
      <SignedIn>
        <RedirectToUserProfile />
      </SignedIn>
    </div>
  );
}