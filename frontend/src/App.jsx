import { useState } from "react";

function App() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");



    const handleSubmit = async (e) => {

        e.preventDefault();

        if (phone.length !== 10) {

            setStatus("Phone number must contain 10 digits");

            return;

        }

        const customer = {

            name,
            email,
            password,
            phone

        };

        try {

            const response = await fetch(
                "http://localhost:5000/register",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(customer)

                }
            );

            const data = await response.json();

            setStatus(data.message);

            setName("");
            setEmail("");
            setPassword("");
            setPhone("");

        }

        catch (error) {

            console.log(error);

            setStatus("Server Error");

        }

    };



    return (

        <div
            className="bg-slate-950 min-h-screen flex items-center justify-center px-4 text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >

            <div className="w-full max-w-md bg-[#0f172a] border border-slate-700 border-t-4 border-t-emerald-400 rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold tracking-widest text-emerald-400">
                        CUSTOMER
                    </h1>

                    <p className="text-slate-400 mt-2 tracking-[4px] text-sm">
                        LOGIN PORTAL
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm text-slate-400 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value.replace(/[^a-zA-Z ]/g, '')
                                )
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                        />

                    </div>

                    <div>

                        <label className="block text-sm text-slate-400 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                        />

                    </div>

                    <div>

                        <label className="block text-sm text-slate-400 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                        />

                    </div>

                    <div>

                        <label className="block text-sm text-slate-400 mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            maxLength="10"
                            onChange={(e) =>
                                setPhone(
                                    e.target.value.replace(/[^0-9]/g, '')
                                )
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition duration-300 shadow-lg"
                    >

                        LOGIN

                    </button>

                </form>

                {

                    status && (

                        <div className="mt-6 bg-slate-900 border border-emerald-400 rounded-xl p-4 text-center text-sm text-emerald-300">

                            {status}

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default App;