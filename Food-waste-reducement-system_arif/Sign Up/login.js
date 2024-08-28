

const email= document.getElementById("email");
const password= document.getElementById("password");
const volunteer= document.getElementById("volunteer");
const donor = document.getElementById("donor");
const recipient = document.getElementById("recipient");
const manager = document.getElementById("manager");
const customer = document.getElementById("customer");
const submit = document.getElementById("submit");
const form = document.querySelector('form');
const role = document.getElementById("role");


const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
        email: email.value,
        password: password.value,
        role: role.value
    };

    console.log('User Data:', userData); // Add this line to debug

    const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log('Response data:', data); // Add this line to debug

    if (response.ok) {
        localStorage.setItem('userEmail', email.value);
        const redirectionUrls = {
            'volunteer': 'signup-volunteer.html',
            'donor': 'signup-donor.html',
            'recipient': '../Recipient/Recipient_home.html',
            'customer': 'signup-customer.html',
            'manager': "/aRIF/Admin/Admin_home.html"
        };
        

        alert(data.message);
        window.location.href = redirectionUrls[userData.role];
    } else {
        alert(data.error);
    }
};




form.addEventListener("submit", handleSubmit);  
