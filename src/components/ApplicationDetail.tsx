import { useState } from "react";

interface JobApplication {
    id?:number;
    company: string;
    location: string;
    position: string;
    salary: string;
    status: string;
    applied_date: string;
    contact:string;
    referral: string;
    notes:string;
    rejection_interview_stage?: string | null;
}
interface jobDetailProps {
    app:JobApplication
    onCancel: () => void
    onSave:(updatedApp: JobApplication) => void
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

export default function AppDetail(props:jobDetailProps){
    const[isEdit, setIsEdit] = useState(false)

    const handleCancel = (event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      props.onCancel();
    
   }

   const handleOnEdit = () => {
        setIsEdit(!isEdit)
   }
    const [company, setCompany] = useState(props.app.company || "");
    const [appliedDate, setAppliedDate] = useState(props.app.applied_date || "");
    const [location, setLocation] = useState(props.app.location || "");
    const [salary, setSalary] = useState(props.app.salary || "");
    const [status, setStatus] = useState(props.app.status || "Applied");
    const [contact, setContact] = useState(props.app.contact || "");
    const [referral, setReferral] = useState(props.app.referral || "");
    const [notes, setNotes] = useState(props.app.notes || "");
    const [rejectionStage, setRejectionStage] = useState(props.app.rejection_interview_stage || "");

    const handleSave = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const updatedApp = {
        id: props.app?.id,
        company,
        location,
        position:props.app.position,
        salary,
        status,
        applied_date : appliedDate || props.app.applied_date,
        contact,
        referral,
        notes,
        rejection_interview_stage: status === "Rejected" ? rejectionStage : null
       
}
    props.onSave(updatedApp);
    setIsEdit(false);
    }

    return(
        <div className="border p-10 fixed inset-0 overflow-y-auto bg-black/50 z-50">
            <div className="min-w-lg md:max-w-lg bg-white mx-4 p-10 lg:p-12 rounded-lg w-full text-slate-900 ">
                

                {isEdit ? <input value={company} onChange={(e) =>setCompany(e.target.value)}/>
                :    <h1 className="text-slate-900">{props.app.company}</h1>
                }
                <span className="flex flex-col text-slate-900">
                    <p className="text-slate-500 mb-3">{props.app.position}</p>
                </span>
                {/* editing status & where the drop off happened */}
                {isEdit ? ( 
                <select value={status} onChange={(e) =>setStatus(e.target.value)} className="w-fit py-1.5 inline-block">
                        <option value="Applied">Applied</option>
                         <option value="Interview">Interview</option>
                         <option value="Offer">Offer</option>
                         <option value="Rejected">Rejected</option>
                </select>
                ):(
                    <>
                    <div className="flex items-center gap-2 mt-1">
                          <span className={`rounded-full w-fit px-3 py-1.5 ${getStatusColor(props.app.status)}`}>{props.app.status}</span>
                {props.app.status === "Rejected" && props.app.rejection_interview_stage && (
                    <p className="text-slate-500 text-sm mt-1">Fell off at: {props.app.rejection_interview_stage}</p>
                )}
                    </div>
                   
                    </>
               
                )}

                {isEdit && status === "Rejected" && (
                    <div className="mt-2">
                        <p className="text-slate-500">Interview Stage</p>
                    <select value={rejectionStage} onChange={(e) => setRejectionStage(e.target.value)} className="w-fit py-1.5 inline-block">
                        <option value="Phone Screen">Phone Screen</option>
                        <option value="Round 1">Round 1</option>
                        <option value="Round 2">Round 2</option>
                        <option value="Round 3">Round 3</option>
                        <option value="Round 4">Round 4</option>
                        <option value="Round 5">Round 5</option>
                    </select>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                    <span className="flex flex-col text-slate-900">
                        <p className="text-slate-500 mt-6">Location</p>
                        {isEdit ? <input value={location} onChange={(e) => setLocation(e.target.value)} />
                        :<p>{props.app.location}</p>
            }
                    </span>

                    <span className="flex flex-col text-slate-900">
                         <p className="text-slate-500 mt-6">Salary</p>
                        {isEdit ? <input value={salary} onChange={(e) => setSalary(e.target.value)} />
                    :   <p>{props.app.salary}</p> 
                    }
                    </span>

                    <span className="flex flex-col text-slate-900">
                        <p className="text-slate-500 mt-6">Applied</p>
                       {isEdit ? <input value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
                        :<p>{props.app.applied_date}</p>
            }       
                    </span>

                    <span className="flex flex-col text-slate-900">
                            <p className="text-slate-500 mt-6">Contact Person</p>
                            {isEdit ? <input value={contact} onChange={(e)=> setContact(e.target.value)} className="px-3 py-2 "/>
                            : <p>{props.app.contact}</p>
                        }
                    </span>
                    <span className="flex flex-col text-slate-900">
                        <p className="text-slate-500 mt-6">Referral</p>
                        {isEdit ? <input value={referral} onChange={(e) => setReferral(e.target.value)} />
                        : <p>{props.app.referral}</p>
                        }
                    </span>
                    <span className="flex flex-col text-slate-900 ">
                        <p className="text-slate-500 mt-6 ">Notes</p>
                        {isEdit ? <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="border p-2 bg-gray-300 "/>
                        : <p> {props.app.notes}</p>
                    }

                    </span>
                </div>

                {/* buttons */}
                <div className="flex mt-5 md:mt-10 gap-3 ">
                   
                        {isEdit ? <button type="button" onClick={handleSave} className="px-6 py-2 rounded bg-cornflowerBlue text-white hover:bg-blue-600 flex-1">Save</button> : 
                     <button
                    type="button"
                    onClick={handleOnEdit}
                    className= "text-black bg-cornflowerBlue px-6 py-2 rounded  hover:bg-blue-600 flex-1"
                    >
                        Edit
                    </button>
                    }
                    <button
                    type="button"
                    onClick={handleCancel}
                    className= "bg-gray-300 px-6 py-2 rounded flex-1 text-black"
                    >
                        Cancel
                    </button>
                    
                </div>    
            </div>
        </div>
    )
}