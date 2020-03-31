const router = require("express").Router()
const ApiController = require("../controllers/api")

router.get("/prayer/:city/:strDate", ApiController.getPrayerTime)//format date (yyyy-mm-dd)
router.get("/holidays/:country/:year", ApiController.getHolidays)


module.exports = router