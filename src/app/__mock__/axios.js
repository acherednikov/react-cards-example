const faker = require('faker');

let data = [];

for (let i = 0; i < 20; i++) {
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

const get = () => {
    return delayedPromise(300, 1500, data)
};

const post = () => {
    return delayedPromise(400, 800)
};

const patch = () => {
    return delayedPromise(500, 1000)
};

const _delete = () => {
    return delayedPromise(400, 800)
};


module.exports = {
    get,
    post,
    patch,
    delete: _delete,
};