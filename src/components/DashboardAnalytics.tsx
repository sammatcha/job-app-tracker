import { toPercent } from "../helper/ToPercent";

interface JobApplication {
    status: string;
    applied_date: string;
    referral: string;
    id? : number;
    rejection_interview_stage?: string | null;
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

const getRejectedStageBreakdown = (rejectedIds: number[] , statusHistory: StatusHistory[], rejectedApps: JobApplication[]) => {
   let rejectedAfterApplied = 0;
   let rejectedAfterInterview = 0;
   const byInterviewStage: Record<string, number> = {};

   for(let id of rejectedIds){
    const history = statusHistory.filter(s => s.application_id === id);

    if(history.some(s => s.status === "Interview")){
        rejectedAfterInterview++;
        const app = rejectedApps.find(app => app.id === id);
        const stage = app?.rejection_interview_stage || "Unknown";
        byInterviewStage[stage]= (byInterviewStage[stage] || 0) + 1;
    } else {
        rejectedAfterApplied++;   
    }
    
    
   }
   return { rejectedAfterApplied, rejectedAfterInterview, byInterviewStage };
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
    const rejectedApps = applications.filter(a => a.status === "Rejected");
    const rejectedIds = rejectedApps
    .map((a) => a.id)
    .filter((id): id is number => id !== undefined);

    const rejectedStageBreakdown = getRejectedStageBreakdown(rejectedIds, statusHistory, rejectedApps);


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
    const barWidthPercent = (count:number) => 
        Math.min(100, (count/ Math.max(1, applied)) * 100)
    
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
            <div className="flex w-full gap-5 mt-5">
                {/* funnel chart */}
                <div className="w-full max-w-med mt-3 bg-white rounded p-5 pb-5 mb-5">
                    <p className="text-neutral-950 font-bold mb-4">Pipeline Overview</p>
                    {funnelStages.map((stage, index) => {
                    return(
                            <div key={index}>
                                <div className="flex justify-between">
                                <p className="text-stone-600 mb-1">{stage.label}</p>
                                <p className="text-stone-600">{stage.count}</p>
                                </div>

                                <div  className="w-full h-2 bg-gray-100 rounded mb-3" >
                                <div className={`${stage.color} h-2 max-w-full rounded `} style={{width:`${barWidthPercent(stage.count)}%`}}></div>
                            </div>
                            </div>
   
                    )
                })}
                </div>
                {/* breakdown of rejected applications */}
                <div className="w-full max-w-med mt-3 bg-white rounded p-5 pb-5 mb-5">
                    <p className="text-neutral-950 font-bold mb-4 text-center">Rejected Applications Breakdown</p>
                    {/* After Applied */}
                        <div className="flex justify-between gap-2">
                            <p className="text-stone-600">Rejected after Applied</p>
                            <p className="text-stone-600">{rejectedStageBreakdown.rejectedAfterApplied }</p>
                        </div>
                        {/* After Interview */}
                        <div className="flex justify-between gap-2">
                            <p className="text-stone-600">Rejected after Interview</p>
                            <p className="text-stone-600">{rejectedStageBreakdown.rejectedAfterInterview}</p>
                        </div>
                        {/* Drop off count  */}
                        <div className="text-slate-600 font-sm ml-5">
                           {Object.entries(rejectedStageBreakdown.byInterviewStage).map(([stage, count]) => (
                                <div key={stage} className="flex justify-between">
                                    <p>{stage}</p>
                                    <p>{count}</p>
                                </div>
                            ))}
                        </div>

                </div>
            </div>
        </div>
    )
}