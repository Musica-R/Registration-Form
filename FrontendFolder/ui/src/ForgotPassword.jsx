import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/user/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Failed to send reset email");
        }
    }

    return (
        <div className="form-card">
            <div className="form-card">
                <form className="formss" onSubmit={handleSubmit}>
                    <p className="form-headings">Forgot Password</p>
                    <input placeholder="Enter your email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
}
