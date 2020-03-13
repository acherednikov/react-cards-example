const faker = require('faker');

let data = [];

for (let i = 0; i < 6; i++) {
    data.push({
        id: i + 1,
        title: faker.company.companyName(),
        text: faker.lorem.sentences(),
    })
}

const delayedPromise = (delayMin = 0, delayMax = 100, response = {}) => {
    return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
            clearTimeout(wait);
            resolve({data});
        },
        Math.floor(Math.random() * (delayMax - delayMin + 1) + delayMin)
        )
    })
};

module.exports = {
    get: () => { return delayedPromise(300, 1500, data) },
    post: () => { return delayedPromise(300, 700) },
    delete: () => { return delayedPromise(200, 500) },
};