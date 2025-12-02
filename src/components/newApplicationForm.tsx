import { useState } from "react"

interface JobApplication {
    company: string;
    location: string;
    position: string;
    salary: string;
    status: string;
    applied_date: string;
    contact:string;
    notes:string;
}
interface newAppFormProps {
    onSubmit: (newApp:JobApplication) => void
    onCancel: () => void
}

export default function NewAppForm(props:newAppFormProps){
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("Applied");
    const [contact, setContact] = useState("");
    const [notes, setNotes] = useState("");

   const handleSubmit = () => {

    const newApp = {
        company,
        location,
        position,
        salary,
        status,
        applied_date: new Date().toLocaleDateString('en'),
        contact,
        notes
    }
    props.onSubmit(newApp);
    console.log(newApp)
   }

   const handleCancel = (event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      props.onCancel();
    
   }
    return(
        <div className="border p-10 fixed inset-0 bg-black/50 z-50">
            <div className="min-w-lg md:max-w-lg bg-white mx-4 p-8 rounded-lg w-full">
                {/* Header */}
                <div>
                    <h1 className="text-slate-900 text-xl lg:text-2xl">New Job Application</h1>
                </div>
                <form className="flex flex-col w-full gap-4 space-x-4 mt-5">
                    <div>
                        <label className="text-slate-900 text-lg">Company</label>
                        <input
                        name="text"
                        type="company"
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1 focus:ring-2 focus:border-blue-600 "
                        />
                    </div>
                    <div className=" ">
                        <label className="text-slate-900">Location</label>
                         <input
                          name="location"
                        type="location"
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1 focus:ring-2 focus:border-blue-600 "
                         />
                    </div>
                    <div className="">
                        <label className="text-slate-900">Position</label>
                         <input
                        name="position"
                        type="position"
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1  focus:ring-2 focus:border-blue-600 "
                         />
                    </div>
                     <div className="">
                        <label className="text-slate-900">Salary</label>
                         <input
                        name="salary"
                        type="salary"
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1  focus:ring-2 focus:border-blue-600 "
                         />
                    </div>
                    <div className="">
                        <label className="text-slate-900">Contact Person</label>
                         <input
                        name="contact"
                        type="contact"
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1  focus:ring-2 focus:border-blue-600 "
                         />
                    </div>
                    <div className="">
                        <label className="text-slate-900">Notes</label>
                         <input
                        name="notes"
                        type="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border bg-white border-gray-200 text-slate-700 text-base md:text-lg rounded-md px-2 py-1  focus:ring-2 focus:border-blue-600 "
                         />
                    
                    </div>
                    <div className="">
                        <label className="text-slate-900">Status</label>
                         <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-slate-200 cursor-pointer rounded-md text-base md:text-lg px-3 py-2 text-slate-700 "
                         >
                         <option value="Applied">Applied</option>
                         <option value="Interview">Interview</option>
                         <option value="Offer">Offer</option>
                         <option value="Rejected">Rejected</option>
                         </select>
                        
                        {/* buttons */}
                        <div className="w-full mt-5 lg:mt-10 flex rounded gap-3  ">
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-500 w-full py-2"
                            >
                            Add Application
                            </button>
                            <button
                            type="button"
                           onClick={handleCancel}
                            className="bg-gray-300 text-black w-full"
                            >
                            Cancel
                            </button>
                        </div>
                        
                    </div>
                   
                </form>
            </div>
        </div>
    )
}