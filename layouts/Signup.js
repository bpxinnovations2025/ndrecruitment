
import AuthLayout from "./components/AuthLayout";
import Register from "./components/Register";

function Signup({ data }) {
  const { frontmatter } = data;
  const { title } = frontmatter;
  return (
    <AuthLayout>
      <Register/>
    </AuthLayout>
  );
}

export default Signup;
