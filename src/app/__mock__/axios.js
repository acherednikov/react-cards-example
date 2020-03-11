'use strict';
const faker = require('faker');

let data = [];

for (let i = 0; i < 5; i++) {
    data.push({
        title: faker.company.companyName(),
        text: faker.company.catchPhrase(),
    })
}

module.exports = {
    get: () => {
        return Promise.resolve({
            data,
        });
    }
};