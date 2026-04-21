import { AuthPageLayout } from "@/components/auth/auth-page-layout";

import { LoginForm } from "./components/login-form";

export function LoginPage() {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
}
