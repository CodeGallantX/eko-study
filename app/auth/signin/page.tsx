// app/auth/signin/page.tsx
import { 
  SignIn,
  SignedIn,
  SignedOut,
  RedirectToUserProfile
} from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignedOut>
        <SignIn path="/auth/signin" routing="path" />
      </SignedOut>
      <SignedIn>
        <RedirectToUserProfile />
      </SignedIn>
    </div>
  );
}