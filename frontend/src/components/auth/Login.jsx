import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link ,useNavigate  } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner"

const Login = () => {
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:""
  });

  const navigate = useNavigate();

  const ChangeEventHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const LoginSubmitHandler = async(e) =>{
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`,input, {
        headers:{
          'Content-Type':'application/json' 
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={LoginSubmitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email}  onChange={ChangeEventHandler} placeholder="udgeetbhatt271@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name="password" value={input.password} onChange={ChangeEventHandler} placeholder="enter your password." />
          </div>
          <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
             <Input type="radio" name="role" value="student" checked={input.role==="student"}  onChange={ChangeEventHandler} className="cursor-pointer"/>
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="recruiter" checked={input.role==="recruiter"} onChange={ChangeEventHandler} className="cursor-pointer"/>
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit"className="w-full my-4">Login</Button>
          <span className="text-sm">Don&apos;t have an account? <Link to='/signup' className="text-blue-400">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
