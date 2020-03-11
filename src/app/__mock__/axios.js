'use strict';
const faker = require('faker');

let data = [];

for (let i = 0; i < 5; i++) {
    data.push({
        title: faker.company.companyName(),
        text: faker.lorem.sentences(),
    })
}

module.exports = {
    get: () => {
        return  new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
                clearTimeout(wait);
                resolve({data});
            }, Math.floor(Math.random() * 1500) + 300)
        })
    },
};