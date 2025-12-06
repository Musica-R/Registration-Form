import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/user/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            alert(data.message);
            if (res.status === 200) navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Failed to reset password");
        }
    }

    return (
        <div className="form-card">
            <div className="form-card">
                <form className="formss" onSubmit={handleSubmit}>
                    <p className="form-headings">Reset Password</p>

                    <input placeholder="New Password" type="password" required name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <input placeholder="Confirm Password" type="password" required name="confirmPassword" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}
