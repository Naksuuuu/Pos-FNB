import AuthLayout from "@/Components/Layouts/AuthLayout";
import LoginForm from "@/Features/Auth/Login/Components/Form/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout title="Selamat Datang" subtitle="Silahkan masukkan data anda">
      <LoginForm />
    </AuthLayout>
  );
};
export default LoginPage;
