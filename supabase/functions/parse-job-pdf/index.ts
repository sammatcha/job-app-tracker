import { encodeBase64 } from "jsr:@std/encoding/base64"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', {headers: corsHeaders})
    if (req.method!== 'POST') return new Response('Method not allowed', {status: 405, headers: corsHeaders})
    try {
        const formData = await req.formData()
        const file = formData.get('file') 

        if (!(file instanceof File)) {
            return new Response('File is required', {status: 400, headers: corsHeaders})
        }

        const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY")
        const buffer =  await file.arrayBuffer()
        const pdfBase64 = encodeBase64(new Uint8Array(buffer))
        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': anthropicApiKey ?? '',
                'anthropic-version': '2023-06-01'
            },
            method: 'POST',
            body: JSON.stringify({
                model: 'claude-haiku-4-5',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'document',
                                source: {
                                    type: 'base64',
                                    media_type: 'application/pdf',
                                    data: pdfBase64
                                },
                            },
                            {
                                type: 'text',
                                text: 'Extract company, location, position, salary, status, applied_date, contact, referral, notes as JSON. Use empty string if missing.'
                            }
                        ]
                    }
                ]
            })
        })
        const claudeJson = await claudeRes.json()
            return new Response(JSON.stringify(claudeJson), {
                status: 200, 
                headers: {...corsHeaders, 'Content-Type': 'application/json'}})
        }catch(e){ 
            const message = e instanceof Error ? e.message : String(e)
            return new Response (JSON.stringify({message}), {status:500, headers:corsHeaders})
        }
})

