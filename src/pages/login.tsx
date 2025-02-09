import AuthLayout from "@/layouts/authLayout";
import { withLayout } from "@/utils/withLayout";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <p>Masukkan email & password</p>
    </div>
  );
}

export default withLayout(LoginPage, AuthLayout);
