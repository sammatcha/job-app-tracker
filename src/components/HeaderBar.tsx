
import type {User} from '@supabase/supabase-js'

interface HeaderProps {
    user: User;
    onLogout : () => void
}
export default function Header(props:HeaderProps){
    return(
        
            <div className='flex justify-between w-full px-6 py-4'>
                <h1 className='text-2xl lg:text-4xl'>Job Application</h1>

           <div className='flex items-center gap-3'>
                <p className='text-slate-900'>{props.user.email}</p>
                <button className='border px-2 py-1 bg-cornflowerBlue rounded ' onClick={props.onLogout} >
                    Logout
                </button>
           </div>
        </div>
    )
}