import { toPercent } from "../helper/ToPercent";

interface JobApplication {
    status: string;
    applied_date: string;
    referral: string;
}
interface StatusHistory {
    application_id:number,
    status: string,
    user_id: string,
    changed_at: string
}

interface DashboardAnalyticsProps {
    applications: JobApplication[]
    statusHistory: StatusHistory[]
}

export default function DashboardAnalytics({ applications, statusHistory}: DashboardAnalyticsProps) {
    const totalApps = applications.length;
    const applied = applications.filter(a => a.status === "Applied").length;
    const rejected = applications.filter(a => a.status === "Rejected").length;
    const responseCount = applications.filter(a => a.status !== "Applied").length;
    const interviews = new Set(statusHistory.filter(s => s.status === "Interview").map(s => s.application_id)).size;
    const offers = new Set(statusHistory.filter(s => s.status === "Offer").map(s => s.application_id)).size;
    const responseRate = toPercent(responseCount , totalApps);
    const interviewRate = toPercent(interviews, totalApps);
    const offerRate = toPercent(offers, totalApps);


    const stats = [
        {label:"Total Applications", value: totalApps},
        {label: "Response rate", value: responseRate},
        {label: "Interview Rate", value: interviewRate},
        {label: "Offer Rate", value: offerRate}
    ]
    const funnelStages = [
        {label: "Applied", count: applied , color: "bg-purple-500"},
        {label: "Interview", count: interviews, color: "bg-blue-500"},
        {label: "Offer", count: offers, color: "bg-green-500"},
        {label: "Rejected", count: rejected, color: "bg-red-500"},
    ]

    return(
        <div className="w-full ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* stats grid */}
                {stats.map((stat , index) => {
                    return(
                        <div key={index}  className="border  rounded bg-white p-3 gap-3 ">
                            <p className="text-stone-600 lg:text-sm">{stat.label}</p>
                            <p className="text-neutral-950 font-bold lg:text-2xl">{stat.value}</p>
                        </div>
                    )
                })}
            </div>
            <div>
                {/* funnel chart */}
                <div className="max-w-lg mt-3 bg-white rounded p-5 pb-5 mb-5">
                    <p className="text-neutral-950 font-bold mb-4">Pipeline Overview</p>
                    {funnelStages.map((stage, index) => {
                    return(
                            <div key={index}>
                                <div className="flex justify-between">
                                <p className="text-stone-600 mb-1">{stage.label}</p>
                                <p className="text-stone-600">{stage.count}</p>
                                </div>

                                <div  className="w-full h-2 bg-gray-100 rounded mb-3" >
                                <div className={`${stage.color} h-2 rounded `} style={{width:`${stage.count / Math.max(1,applied)*100}%`}}></div>
                            </div>
                            </div>
   
                    )
                })}
                </div>
            </div>
        </div>
    )
}