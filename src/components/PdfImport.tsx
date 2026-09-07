import { FileUp } from 'lucide-react';
import { useState, type ChangeEvent } from "react"
import {supabase} from "../supabaseClient"

type PdfImportProps = {
    onParsed?: (fields: Record<string, string>) => void;
};

export default function PdfImport(props: PdfImportProps) {
    const [file, setFile] = useState<File | null>(null);
    const [state, setState] = useState<'idle'|'loading' | 'error'>('idle');

    const handleFileChange= async (e:ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files ? e.target.files[0]:null)
        const formData = new FormData();
         if(!e.target.files || e.target.files.length === 0){
            setState('idle');
            return;
        }
        if (e.target.files && e.target.files[0]){
            formData.append('file', e.target.files[0]);
        }
         setState('loading');
       
        try{
            const response = await supabase.functions.invoke('parse-job-pdf', { body: formData });
           if (response.error) {
            setState('error');
           }else{
            const raw = response.data.content[0].text
            const start = raw.indexOf("{")
            const end = raw.lastIndexOf("}") + 1
            const fields = JSON.parse(raw.slice(start, end))
                props.onParsed?.(fields)
            setState('idle');
           }
        }catch(error){
            console.error('Error uploading file:', error);
            setState('error');
        }
    }

    return(
            <div className="border border-dotted p-8 md:p-10 mt-4 md:mt-6 w-full border-amber-400">
                <label className="cursor-pointer">
                    <input 
                    onChange={handleFileChange}
                    type="file" 
                    accept=".pdf" 
                    className= "hidden"/>
                    <div className="flex flex-col items-center justify-center ">
                        <FileUp className="size-10 text-slate-600" />
                        <p className="text-slate-900">Upload PDF</p>
                        <p className="text-slate-600">Auto-fills fields below</p>
                    {file && <p className="text-slate-600 text-sm text-center break-all">
                        {file.name}
                        </p>
                    }
                    {state === 'loading' && <p className="text-slate-800 ">Reading PDF...</p>}
                    {state === 'error' && <p className="text-red-600 ">Couldn't read PDF. Try another file.</p>}

                    </div>
                </label>
                   
            </div>
    )
}