import moment from 'moment';


function dateParse(date) {
    const momentDate = moment(date);
    if (momentDate.isValid()) return momentDate.toDate();
    return null
    // return new Date()
}

function dateFormat(date = new Date(), format = 'YYYY-MM-DD') {
    const momentDate = moment(date);
    if (momentDate.isValid()) return momentDate.format(format)
    return moment(new Date()).format(format)
}

export default {
    dateParse,
    dateFormat,
};
