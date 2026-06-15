import AuthLayout from "@/Components/Layouts/AuthLayout";
import RegisterForm from "@/Features/Auth/Register/Components/Form/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout title="Buat Akun Baru" subtitle="Silahkan masukkan data anda">
      <RegisterForm />
    </AuthLayout>
  );
};
export default RegisterPage;
