import { AuthPageLayout } from "@/components/auth/auth-page-layout";

import { RegisterForm } from "./components/register-form";

export function RegisterPage() {
  return (
    <AuthPageLayout maxWidth={440}>
      <RegisterForm />
    </AuthPageLayout>
  );
}
