import { useOutletContext } from "@remix-run/react";

import type { SupabaseOutletContext } from "~/root";
import type { OAuthResponse } from "@supabase/supabase-js";
export default function Login() {
    const { supabase } = useOutletContext<SupabaseOutletContext>();
    const handleLogin = async () => {
        //const { error } =
        const oauthResponse: OAuthResponse =
            await supabase.auth.signInWithOAuth({
                provider: "github",
            });
        console.log("OAuthReponse:", JSON.stringify(oauthResponse));
        if (oauthResponse.error) {
            console.log(oauthResponse.error);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button type="button" onClick={handleLogout}>Logout</button>
            <button type="button" onClick={handleLogin}>Login</button>
        </>
    );
}