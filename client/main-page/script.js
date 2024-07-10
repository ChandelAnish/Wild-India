const getAnimalDetails = async () => {
    const response = await fetch("http://localhost:5000/animalDetails")
    const data = await response.json()
    return data;
}

const postAnimalDetails = async (postSpecies) => {
    const response = await fetch("http://localhost:5000/animalDetails", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postSpecies)
    })
    if (response.ok) {
        const data = await response.json();
        allAnimalDetails.push(postSpecies)
        displayAnimalDetails(allAnimalDetails)
        return data;
    }
}

const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));
const user = document.getElementById('userdetails')
user.innerHTML += `<li><a>${userdetails.username}</a></li>
                <li><a>${userdetails.email}</a></li>`


let allAnimalDetails = [];

addEventListener("load", async () => {
    allAnimalDetails = await getAnimalDetails();
    // console.log(allAnimalDetails)

    displayAnimalDetails(allAnimalDetails)
})

function displayAnimalDetails(animalArray) {
    usersList.innerHTML='';
    animalArray.forEach((item, index) => {
        usersList.innerHTML += `
        <tr class="application-row" data-status="on-hold">
            <td>${item.specie_name}</td>
            <td>${item.sanctuary_name}</td>
            <td>${item.sanctuary_location}</td>
            <td>${item.status}</td>
        </tr>`
        if (item.status == "Unverified") {
            document.getElementById(`toggle-btn${index}`).disabled = true;
        }
    })
}


const form = document.getElementById('form')
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const specie_name = form.specie_name.value
    const sanctuary_name = form.sanctuary_name.value
    const sanctuary_location = form.sanctuary_location.value
    const status = form.status.value
    const postSpecies = { specie_name, sanctuary_name, sanctuary_location, status }
    // console.log(postSpecies)
    const respose = await postAnimalDetails(postSpecies);
    // console.log(respose)
    document.getElementById('closebtn').click();
})