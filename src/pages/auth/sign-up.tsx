import { useState } from "react";
import {supabase} from "../../supabaseClient"
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("sign up starts")
    e.preventDefault();
    const {data, error} = await supabase.auth.signUp({
        email,
        password
    });
    console.log("sign up response", data)
    if(error){
        console.error("Sign In error:", error.message)
    }else if(data.user){
      navigate('/')
    }
}
    return(
         <div className="grid mx-auto text-center h-screen px-10 py-5 md:p-20 lg:px-0 lg:py-0">
          <div>
            <div className="text-neutral-900 text-2xl md:text-3xl lg:text-5xl mb-10 md:mb-10">Sign up</div>
            <form onSubmit={handleSignUp} className="flex flex-col mx-auto max-w-[24rem] text-left ">
                 
                <div className="mb-4 flex flex-col">
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
                <div className="mb-6 flex flex-col">
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

               <div>
                <button type="submit"
                className=" w-full border text-center p-2 rounded border-slate-400 cursor-pointer bg-cornflowerBlue text-white font-bold hover:shadow-lg mb-3">
                      Sign up
                </button>
                  
               </div>
            </form>
          </div>
        </div>
    )
}