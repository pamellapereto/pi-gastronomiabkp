import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';


//CLIENTE ADMINISTRATIVO (DBA)
//SOMENTE NO BACKEND
const connAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    {
        auth: {
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false
        }
    }
);

//CLIENTE COMUM
const conn = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export {
    connAdmin
};

export default conn;