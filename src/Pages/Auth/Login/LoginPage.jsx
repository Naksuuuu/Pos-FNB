import AuthLayout from "@/Components/Layouts/AuthLayout";
import LoginForm from "@/Components/Fragments/Auth/Login/Form/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout title="Selamat Datang" subtitle="Silahkan masukkan data anda">
      <LoginForm />
    </AuthLayout>
  );
};
export default LoginPage;
