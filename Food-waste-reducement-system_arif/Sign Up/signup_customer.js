const username = document.getElementById("Username");
const nid = document.getElementById("NID");
const email = document.getElementById("email");
const dob = document.getElementById("DOB");
const phone = document.getElementById("Phone");
const address = document.getElementById("address-dropdown");
const city = document.getElementById("city");
const district = document.getElementById("district");
const division = document.getElementById("division");
const street_no=document.getElementById("street_no");
const password = document.getElementById("Password");
const confirmpass = document.getElementById("confirm");
const form = document.querySelector('form');
const googlesignin = document.getElementById("google-signin-btn");
const submit = document.getElementById("submit");

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.value !== confirmpass.value) {
        alert("Passwords do not match");
        return;
    }

    const user = {
        name: username.value,
        nid : nid.value,
        email: email.value,
        dob: dob.value,
        
        phone: phone.value,
        city: city.value,
        district: district.value,
        division: division.value,
        streetno: street_no.value,
       
        password: password.value,
    };

    
        const response = await fetch("http://localhost:5000/users/customer_signup", {
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