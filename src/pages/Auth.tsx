import { useState } from "react";
import {Link} from "react-router"
import {supabase} from "../supabaseClient"
import { useNavigate } from 'react-router-dom';


export default function Auth(){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
   
const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if(error){
        console.error("Sign In error:", error.message)
    }else if(data.user){
      navigate('/dashboard')
    }
}
    return(
        <div className="grid mx-auto text-center h-screen px-10 py-5 md:p-20 lg:px-0 lg:py-0">
          <div>
            <div className="text-neutral-900 text-2xl md:text-3xl lg:text-5xl mb-10 md:mb-10">Sign In</div>
            <form onSubmit={handleSignIn} className="flex flex-col mx-auto max-w-[24rem] text-left ">
                <div className="mb-6 flex flex-col">
                    <label className="mb-2 text-neutral-900">
                        Email
                    </label>
                    <input
                        className="p-2 border rounded border-slate-400 placeholder:text-gray-500 text-neutral-500"
                        placeholder="name@email.com"
                        name = "email"
                        type = "email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        
                    />
                </div>
                <div className="mb-3 flex flex-col">
                     <label className="mb-2 text-neutral-900">
                        Password
                    </label>
                    <input
                        className="p-2 border rounded border-slate-400 placeholder:text-gray-500 text-neutral-500"
                        placeholder="*******"
                        type="password"
                        name = "password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div className="text-center lg:text-end mb-3">
                    <Link to="/forgot-password"
                    
                    className=" ">
                         Forgot Password?
                    </Link>
                   
                </div>
                   
               <div>
                <button type="submit"
                className=" w-full border text-center p-2 rounded border-slate-400 cursor-pointer bg-cornflowerBlue text-white font-bold hover:shadow-lg mb-3">
                      Sign In
                </button>
                  
               </div>

               <div>
                <span className="flex text-sm md:text-lg whitespace-nowrap gap-3 text-mutedGray w-full"> 
                    <p className="">Don't have an account yet?</p>
                   <Link to="/sign-up">
                   Sign Up
                   </Link>
                </span>
               
               </div>
                
            </form>
          </div>
        </div>
    )
}