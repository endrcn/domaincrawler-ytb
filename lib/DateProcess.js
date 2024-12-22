const moment = require("moment");
const { DATE_FORMAT } = require("../config/Enum");

class DateProcess {

    static getDateQuery(date) {
        if (moment(date).isValid()) {
            date = moment(date).format(DATE_FORMAT);
        } else {
            date = moment().format(DATE_FORMAT);
        }

        return date;
    }

}

module.exports = DateProcess;