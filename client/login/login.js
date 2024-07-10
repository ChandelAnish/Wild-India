const BASE_URL = "http://localhost:5000";

const warning = document.getElementById("warning")

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    // const usertype=form.elements.usertype.value;

    const formdata = { username, password };

    let response = await login(formdata);
    if (!response.login) {
        return warning.innerHTML = response.msg;
    }
    else
    {
        console.log("login successful")
        warning.innerHTML = '';
        sessionStorage.setItem('userdetails', JSON.stringify(response.userdetails));
        return window.open("../main-page/index.html", "_parent");
    }
})

const login = async (formdata) => {
    const response =await fetch('http://localhost:5000/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
    const data = await response.json();
    // console.log(data);
    return data
}