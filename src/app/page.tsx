import { redirect } from "next/navigation";

const Home = () => {
  redirect("/image-generator");
  
  return <h1>Home</h1>;
};

export default Home;
