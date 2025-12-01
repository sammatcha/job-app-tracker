import { useState } from "react";
import NewAppForm from "../components/newApplicationForm";

interface JobApplication {
    id: number;
    company: string;
    location: string;
    position: string;
    salary: string;
    status: string;
    appliedDate: string;

}

function getStatusColor(status: string){
    switch (status){
        case 'Applied':
            return "bg-purple-300"
        case 'Interview':
            return "bg-blue-300"
            case 'Offer':
                return "bg-green-300"
            case 'Rejected':
                return "bg-red-300"
            
    }
}
export default function Dashboard(){
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [showForm, setShowForm] = useState(false)

    const handleShowForm = () => {
        setShowForm(!showForm)
       
    }
    const handleAddApplication = (newApp: JobApplication) => {
       setApplications([...applications, newApp])
       setShowForm(false);
       console.log(newApp)
    }

    const handleCancel = () => {
       setShowForm(false);
    }

    return(
        <div className="w-full min-h-screen">
           <div className="p-6 max-w-7xl mx-auto space-y-4">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl">Job Applications</h1>
                </div>

                <div className="border p-3 rounded">
                    {/* create button */}
                    <div className="text-right flex gap-4">
                        <input className="w-full border bg-white border-gray-200 rounded">
                        </input>
                        <button onClick={handleShowForm}  
                            className="border  bg-blue-500 whitespace-nowrap px-2 py-1 "
                        >   
                            + New Application
                        </button>
                      
                    </div>
                </div>
                        {showForm && <NewAppForm onSubmit={handleAddApplication} onCancel={handleCancel}/>}

                {/* Table  */}
                <div>
                    <div>
                        <table className="w-full border border-gray-300 ">
                            <thead className="text-left ">
                                <tr className="text-slate-600 font-extralight bg-neutral-200">
                                    <th className="p-3">Company</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                    <th>Applied</th>
                                   
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 ">
                                {applications.map((app)=> (
                                    <tr key={app.id} className="text-slate-900">
                                        <td>
                                            <div className="flex flex-col px-6 py-3 rounded">
                                                <div>{app.company}</div>
                                                <div className="text-gray-600">{app.location}</div>
                                            </div>
                                            
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <div>{app.position}</div>
                                                <div className="text-gray-600">{app.salary}</div>
                                            </div>
                                            
                                        </td>
                                        
                                        <td>
                                            <span className={`px-3 py-2 rounded-full ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                            
                                            
                                        </td>
                                        <td>{app.appliedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
           </div>
        </div>
    )
}