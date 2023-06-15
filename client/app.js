// const { table } = require("console")

const tableBody = document.getElementById('table-body')

const getFlight = () => {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {
            populateTable(flights)
        })
        .catch(err => console.log(err))
}
getFlight()

const populateTable = (flights) => {
    // console.log(flights)
    for (let i = 0; i < 6; i++) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈"
        tableRow.append(tableIcon)

        const flightDetails = {
            time: flights.departures[i].movement.scheduledTime.local || 'N/A',
            destination: flights.departures[i].movement.airport.name || 'N/A',
            flight: flights.departures[i].number || 'N/A',
            gate: flights.departures[i].movement.gate || 'N/A',
            remarks: flights.departures[i].status || 'N/A',
        }

        for (const flightDetail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail])

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')

                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableCell.append(letterElement)
                }, 100 * index)
            }
            tableRow.append(tableCell)
        }
        tableBody.append(tableRow)
    }
}