const username = document.getElementById("Username");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const address = document.getElementById("address-dropdown");
const City = document.getElementById("city");
const District = document.getElementById("district");
const Division = document.getElementById("division");
const StreetNo = document.getElementById("street_no");
const phone = document.getElementById("phone");

const password = document.getElementById("password");
const confirmpass = document.getElementById("confirm");
const submit = document.getElementById("submit");

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
        dob:dob.value, 
          city: City.value,
          district: District.value,
          division: Division.value,
          streetNo: StreetNo.value,
          phone: phone.value,
        password: password.value,
        
      };

      const response = await fetch("http://localhost:5000/users/volunteer_signup", {
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