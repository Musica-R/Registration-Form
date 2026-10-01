import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {

    const navigate = useNavigate();

    const [fromdata, setFromdata] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        mobile_number:""
    });

    function handleonchange(e) {

        setFromdata({
            ...fromdata,
            [e.target.name]: e.target.value
        })
    }

    function handleclick(e) {
        e.preventDefault();

        fetch("http://localhost:5000/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fromdata),
        })

            .then((res) => res.json())
            .then((data) => {
                alert(data.message || "User Register")
                console.log(data);

                if (data.message === "user register successfuly") {
                   navigate("/login");
                }

            })
            .catch((error) => {
                console.error("Fetch error:", error);
                alert("Failed to reach backend!");
            })

        setFromdata({ name: "", email: "", password: "", confirm_password: "", mobile_number: "" })

    }



    return (
        <div>
            <div className="form-card1">
                <div className="form-card2">
                    <form className="form">
                        <p className="form-heading">Registration Form</p>

                        <div className="form-field">
                            <input
                                required
                                placeholder="Name"
                                className="input-field"
                                type="text" value={fromdata.name}
                                onChange={handleonchange}
                                name="name" />
                        </div>

                        <div className="form-field">
                            <input
                                required
                                placeholder="Email"
                                className="input-field"
                                type="email"
                                value={fromdata.email}
                                onChange={handleonchange}
                                name="email"
                            />
                        </div>

                        <div className="form-field">
                            <input
                                required
                                placeholder="Password"
                                className="input-field"
                                type="password"
                                value={fromdata.password}
                                onChange={handleonchange}
                                name="password"
                            />
                        </div>

                         <div className="form-field">
                            <input
                                required
                                placeholder="Confrim_Password"
                                className="input-field"
                                type="password"
                                value={fromdata.confirm_password}
                                onChange={handleonchange}
                                name="confirm_password"
                            />
                        </div>

                         <div className="form-field">
                            <input
                                required
                                placeholder="Mobile_Number"
                                className="input-field"
                                type="text"
                                value={fromdata.mobile_number}
                                onChange={handleonchange}
                                name="mobile_number"
                            />
                        </div>

                        <button className="sendMessage-btn" onClick={handleclick}>Register</button>

                        <p className="sign-up-label">
                            Already have an account?<span className="sign-up-link" onClick={() => { navigate("/login") }}>Log in</span>
                        </p>
                    </form>
                </div>
            </div>


        </div>
    )
}
