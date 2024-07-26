const { faker } = require('@faker-js/faker');
// or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');

// const randomName = faker.person.fullName(); // Rowan Nikolaus
// const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// console.log(randomName, randomEmail);
const company = {
    name: faker.company.name().split(' ')[0].split(',')[0],
    id: faker.finance.accountNumber(5),
    phone: `(${faker.string.numeric(3)}) ${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
};
// function getCompanyName() {
// let name = faker.company.name();
// let first = name.split(' ')[0].split(',')[0];
// }
company.abbrev = (company.name[0] + company.name[Math.floor(company.name.length / 2)] + company.name.slice(-1)).toUpperCase();

const location = {
    state: faker.location.state({ abbreviated: true }),
    county: faker.location.county(),
    streetAddr: faker.location.streetAddress(),
    zip: faker.location.zipCode('#####')
}

const order = {
    id: faker.string.alphanumeric(12).toUpperCase(),
    eatIn: faker.datatype.boolean() ? "Eat In" : "Take Out",
    employee: faker.person.firstName(),
    cardNumber: faker.number.int(9999),
    authorization: faker.string.alphanumeric({ length: 6 }).toUpperCase(),
    authId: "A000000000000" + faker.number.int(99999),
}

const recent = new Date(faker.date.recent());
const time = {
    date: recent.toLocaleDateString(),
    time: recent.toLocaleTimeString()
}

const foo = [
    `${company.abbrev}-${company.id}-${location.state}-${location.county}`,
    '',
    `Restaurant #${company.id}`,
    `${location.streetAddr}`,
    `${location.county}, ${location.state} ${location.zip}`,
    `Phone ${company.phone}`,
    '',
    `${time.date} | ${time.time}`,
    `Order Id: ${order.id}`,
    `- - ${order.eatIn}`,
    `Employee: ${order.employee}`,
    ``,
    `---------------------------------`,
    ``,
    `---------------------------------`,
    ``,
    `<order info>`,
    ``,
    `  Card#: **********${order.cardNumber}`,
    `  Authorization: ${order.authorization}`,
    ``,
    `AID: ${order.authId}`,
    ``,
    `--> Order Closed <--`,
    ``,
    ``,
    `How'd we do? Scan the QR code`,
    `or visit www.${company.name}/feedback`,
    `and fill out a survey and let us know.`,
    ``,
    // UTF8
    `█████████████████████████████████
█████████████████████████████████
████ ▄▄▄▄▄ █ ▄▀▄█  ▄ █ ▄▄▄▄▄ ████
████ █   █ █ ▄▀█▄▀ ▀ █ █   █ ████
████ █▄▄▄█ █▀ ▀▄█▄▀▄ █ █▄▄▄█ ████
████▄▄▄▄▄▄▄█▄▀▄█▄█ ▀ █▄▄▄▄▄▄▄████
████  ▀█  ▄█▀▀█▀▄▀█▀▀██▄▀ ▄ ▄████
████ ██▀▀▀▄  █▀▄▀█▄▄▄█ ▄▀▄ ▀█████
████▀ ▄▀█▄▄▄▀█▄  ▀▀ ▀ ▄█▀▄▄ ▄████
███████ ▀█▄ ▀ ▀ ▀█▀▄▄██  ▄ ▀█████
████▄▄██▄█▄█▀▄  ▄▀█▄ ▄▄▄ ▄▄██████
████ ▄▄▄▄▄ █▀ ▀ ▀▄▀█ █▄█ ▀▀█▀████
████ █   █ █▄▀▀ ▄▀█▀▄   ▄▄  ▀████
████ █▄▄▄█ █▀ ▄  ██ ▄█▄▀▀ ▀ █████
████▄▄▄▄▄▄▄█▄▄██▄██▄█▄████▄▄▄████
█████████████████████████████████
█████████████████████████████████`,
    ``
];

// console.log(foo);
function render() {
    foo.forEach(line => {
        console.log(line)
    });
};
render();
// console.log(company, location, order, time)