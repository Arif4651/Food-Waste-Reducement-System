const username = document.getElementById("Username");
const Email = document.getElementById("email");
const City = document.getElementById("city");
const District = document.getElementById("district");
const Division = document.getElementById("division");
const StreetNo = document.getElementById("street_no");
const Phone = document.getElementById("phone");
const InstitutionName = document.getElementById("institution_name");
const InstitutionType = document.getElementById("institution_type");
//const time = document.getElementById("time");
const Password = document.getElementById("password");
const PasswordConfirmation = document.getElementById("confirm");
const form = document.querySelector('form');
const submit = document.getElementById("submit");

const handleSubmit = async (e) => {
    e.preventDefault();


    if (Password.value !== PasswordConfirmation.value) {
        alert("Passwords do not match");
        return;
    }
    const user = {
        name: username.value,
        email: Email.value,
          city: City.value,
          district: District.value,
          division: Division.value,
          streetNo: StreetNo.value,
          phone: Phone.value,
          institution_name: InstitutionName.value,
          institution_type: InstitutionType.value,
        password: Password.value,
        verified: null, // Example value for verified field
        points: 0, // Example value for points field
        volunteer_id: null, // Example value for volunteer_id field
      };

      const response = await fetch("http://localhost:5000/users/donor_signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json()
       
    if(response.ok)
     {
      alert(data.message);
     
     }
     else{
         alert(data.error)
     }
    };



    form.addEventListener("submit", handleSubmit);