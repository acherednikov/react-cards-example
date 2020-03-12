'use strict';
const faker = require('faker');

let data = [];

for (let i = 0; i < 6; i++) {
    data.push({
        id: i + 1,
        title: faker.company.companyName(),
        text: faker.lorem.sentences(),
    })
}

module.exports = {
    get: () => {
        return new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
                clearTimeout(wait);
                resolve({data});
            }, Math.floor(Math.random() * 1500) + 300)
        })
    },
    post: () => {
        return new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
                clearTimeout(wait);
                resolve({});
            }, Math.floor(Math.random() * 500) + 200)
        })
    }
};