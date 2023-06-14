// const { response } = require("express")

const tableBody = document.getElementById('table-body')

const getFlight = () => {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {
            console.log(flights)
        })
        .catch(err => console.log(err))
}

getFlight()