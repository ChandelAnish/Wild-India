const warning = document.getElementById("warning")

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const phoneno = form.elements.phoneno.value;

    const formdata = { username, email, password, phoneno };

    let response = await signup(formdata);

    if (!response.signup) {
        return warning.innerHTML = response.msg;
    }
    console.log('sign-up successfull')
    warning.innerHTML = '';
    sessionStorage.setItem('userdetails', JSON.stringify(response.userdetails));
    window.open("../otpverification/index.html","_self");
    console.log("signed up");
})

const signup = async (formdata) => {
    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
    const data = await response.json();
    console.log(data);
    return data
}