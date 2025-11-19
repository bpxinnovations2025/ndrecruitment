import AuthLayout from "./components/AuthLayout";
import Register from "./components/Register";

function Signup({ data }) {
  const { frontmatter } = data;
  const { title } = frontmatter;
  return (
    <>
      <div className="hidden md:block">
        <AuthLayout>
          <Register />
        </AuthLayout>
      </div>
      <div className="block md:hidden">
        <div className="p-1 mt-10 flex flex-col items-center justify-center">
          <Register />
        </div>
      </div>
    </>
  );
}

export default Signup;
