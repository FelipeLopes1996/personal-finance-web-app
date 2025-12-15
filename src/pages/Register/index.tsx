import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  return (
    <div className="m-auto flex-1 md:w-[40rem] px-[1rem] md:py-25 py-10 ">
      <h1 className="text-[1.7rem] md:text-[2rem] font-extrabold mb-10 text-black leading-tight mx-auto text-center">
        Registre sua conta
      </h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
