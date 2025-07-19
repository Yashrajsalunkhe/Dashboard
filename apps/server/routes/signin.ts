import { Request, Response } from "express";
import supabase from '../db/supabase';

export default async function signin(req: Request, res: Response) {
    const { email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
        return res.status(400).json({
            status: false,
            desc: "Email and password are required."
        });
    }

    // 2. Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    // 3. Improved Error Handling
    if (error) {
        // Log the specific error for debugging on the server
        console.error("Supabase sign-in error:", error.message);
        // Return a generic message to the client
        return res.status(401).json({
            status: false,
            desc: "Invalid email or password."
        });
    }

    // 4. Session Management: Set tokens in secure cookies
    if (data.session) {
        res.cookie('sb-access-token', data.session.access_token, {
            httpOnly: true, // The cookie is not accessible via client-side script
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
            maxAge: data.session.expires_in * 1000 // Expiration time in milliseconds
        });

        res.cookie('sb-refresh-token', data.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // Typically, the refresh token has a longer lifespan
        });
    }

    // Send a success response
    res.status(200).json({
        status: true,
        desc: "Successfully signed in",
        user: data.user // You can still send user data if needed
    });
}