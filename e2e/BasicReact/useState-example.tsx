import React from "react";

function FormComponent() {
  // Declare state variables (React Hook forms)
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [formSubmited, setFormSubmited] = React.useState<boolean>(false);
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormSubmited(true);
    console.log("Form submited", { firstName, lastName });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {formSubmited && (
          <div>
            <h2>Form Submitted states: </h2>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
          </div>
        )}
      </form>
    </div>
  );
  //custom hooks
}
