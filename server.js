// const PORT = 8000
// const axios = require('axios').default
// const express = require('express')
// const app = express()
// const cors = require('cors')
// require('dotenv').config()
// app.use(cors())


// app.get('/flights', async (req, res) => {
//     const options = {
//         method: 'GET',
//         url: 'https://aerodatabox.p.rapidapi.com/flights/airports/iata/YYZ/2023-06-14T08:00/2023-06-14T20:00',
//         params: {
//             withLeg: 'false',
//             direction: 'Departure',
//             withCancelled: 'true',
//             withCodeshared: 'false',
//             withCargo: 'false',
//             withPrivate: 'false',
//             withLocation: 'false'
//         },
//         headers: {
//             'X-RapidAPI-Key': process.env.RAPID_API_KEY,
//             'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
//         }
//     }

//     try {
//         const response = await axios.request(options);
//         console.log(response.data)
//         res.json(response.data)
//     } catch (error) {
//         console.error(error)
//     }
// })



// app.listen(PORT, () => console.log('Running on PORT' + PORT))

const PORT = 8000;
const axios = require('axios').default;
const express = require('express');
const moment = require('moment-timezone');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());

app.get('/flights', async (req, res) => {
    const torontoTimezone = 'America/Toronto';
    const currentDate = moment().tz(torontoTimezone); // Get the current date and time in Toronto timezone
    const fromTime = currentDate.toISOString(); // Convert to ISO format
    const toTime = currentDate.add(12, 'hours').toISOString(); // Add 12 hours

    const options = {
        method: 'GET',
        url: `https://aerodatabox.p.rapidapi.com/flights/airports/iata/YYZ/${fromTime}/${toTime}`,
        params: {
            withLeg: 'false',
            direction: 'Departure',
            withCancelled: 'true',
            withCodeshared: 'false',
            withCargo: 'false',
            withPrivate: 'false',
            withLocation: 'false'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log('Running on PORT ' + PORT));
