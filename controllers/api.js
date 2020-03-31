const axios = require("axios")

class ApiController {
    static getPrayerTime(req, res, next) {
        let city = req.params.city
        let date = req.params.strDate //format date = yyyy-mm-dd => example: 2020-03-31
        axios.get(`https://api.banghasan.com/sholat/format/json/kota/nama/${city}`)
            .then(result => {
                const { data } = result
                const { kota } = data
                const { id } = kota[0]
                // console.log(id)
                return axios.get(`https://api.banghasan.com/sholat/format/json/jadwal/kota/${id}/tanggal/${date}`)
            })
            .then(result => {
                const { data } = result
                // console.log(data)
                res.status(200).json({
                    times: data
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static getHolidays(req, res, next) {
        const year = req.params.year
        const country = req.params.country

        axios.get("https://date.nager.at/api/v2/AvailableCountries")
            .then(result => {
                // console.log(result)
                if (result) {
                    const { data } = result
                    let code;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].value.toLowerCase() === country) {
                            code = data[i].key
                        }
                    }
                    return axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${code}`)
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
            })
            .then(result => {
                if (result) {
                    const { data } = result
                    res.status(200).json({
                        country,
                        year,
                        holidays: data
                    })
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
            })
            .catch(err => {
                return next({
                    name: err.name
                })
            })
    }
}

module.exports = ApiController