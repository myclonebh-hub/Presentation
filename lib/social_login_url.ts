export const social_url = (base_url:string,client_id: string,redirect_uri: string,response_type:string,scope: string)=>{
    const body: Record<string, string> = {
        client_id: client_id,
                redirect_uri: redirect_uri,
                response_type: response_type, // You are asking for the "Receipt"
                scope: scope
    };
    const params = new URLSearchParams(body);
    console.log(params.toString());
    return `${base_url}?${params.toString()}`
}