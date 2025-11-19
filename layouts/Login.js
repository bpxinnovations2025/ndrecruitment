import AuthLayout from "./components/AuthLayout";
import SignIn from "./components/SignIn";

function Login({ data }) {
  const { frontmatter } = data;
  const { title } = frontmatter;

  return (
    <>
      <div className="hidden md:block">
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </div>
      <div className="block md:hidden">
        <div className="p-1 mt-10 flex flex-col items-center justify-center">
          <SignIn />
        </div>
      </div>
    </>
  );
}

export default Login;
