//search filter
const searchFilter = document.getElementById('searchFilter')

searchFilter.addEventListener('input', (e) => {

    const usersList = document.getElementById('usersList')
    const searchword = e.target.value;

    const filteredAnimalList = allAnimalDetails.filter((item) => {
        return item.specie_name.toLowerCase().includes(searchword.toLowerCase())
    })

    usersList.innerHTML = '';
    displayAnimalDetails(filteredAnimalList)
})