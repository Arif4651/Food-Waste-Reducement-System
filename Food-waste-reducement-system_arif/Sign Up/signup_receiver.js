const username = document.getElementById("Username");
const email = document.getElementById("email");
const address = document.getElementById("address-dropdown");
const City = document.getElementById("city");
const District = document.getElementById("district");
const Division = document.getElementById("division");
const StreetNo = document.getElementById("street_no");
const phone = document.getElementById("phone");
const institution_name = document.getElementById("institution_name");
const institution_type = document.getElementById("institution_type");
const password = document.getElementById("password");
const confirmpass = document.getElementById("confirm");
const submit = document.getElementById("submit");
//const people = document.getElementById("people");
const form = document.querySelector('form');
const googlesign = document.getElementById("google-signin-btn");



const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.value !== confirmpass.value) {
        alert("Passwords do not match");
        return;
    }

    const user = {
        name: username.value,
        email: email.value,
          city: City.value,
          district: District.value,
          division: Division.value,
          streetNo: StreetNo.value,
          phone: phone.value,
          institution_name: institution_name.value,
          institution_type: institution_type.value,
          password: password.value,
          verified: null, // Example value for verified field
          volunteer_id: null, // Example value for volunteer_id field
          
    };


  const response = await fetch("http://localhost:5000/users/receiver_signup", {
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