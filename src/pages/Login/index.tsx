// import { Button } from "@/components/Button";
import LoginForm from "../../components/LoginForm";
// import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="m-auto flex-1 md:w-[40rem] px-[1rem] md:py-25 py-10 ">
      <h1 className="text-[1.7rem] md:text-[2rem] font-extrabold mb-10 text-black leading-tight mx-auto text-center">
        Acesse sua conta
      </h1>
      <LoginForm />
      <div className="flex mt-[1.5rem] items-start w-[max-content]">
        {/* <Link to="/forgot-password">
          <Button type="submit" textButton="text">
            Esqueceu a senha?
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
