import AuthLayout from "./components/AuthLayout";
import SignIn from "./components/SignIn";

function Login({ data }) {
  const { frontmatter } = data;
  const { title } = frontmatter;



  return (
    
      <AuthLayout>
    
        <SignIn />
      </AuthLayout>
    
  );
}

export default Login;
