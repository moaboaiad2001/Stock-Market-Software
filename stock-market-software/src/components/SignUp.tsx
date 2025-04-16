import { useState } from "react";
import "../styling/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../utils/BackendClientAPI"; // Import the createUser function

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    idNumber: "",
    idType: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await createUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        date_of_birth: formData.dateOfBirth,
        id_number: formData.idNumber,
        id_type: formData.idType,
        address_line1: formData.address,
        address_line2: "", // optional
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: formData.country,
      });

      console.log("Signup successful:", response);
      alert("Signup successful!");
      navigate("/login");
    } catch (err: unknown) {
      // Narrow the type of `err` to `unknown`
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Signup failed:", errorMessage);
      alert("Signup failed: " + errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="input-group" key={key}>
              <input
                type={
                  key.includes("password")
                    ? "password"
                    : key === "dateOfBirth"
                    ? "date"
                    : "text"
                }
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required
                placeholder={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              />
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
