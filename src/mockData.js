import { faker } from '@faker-js/faker';

export const generateUser = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
});

export const generateProperty = () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName() + " Property",
    description: faker.lorem.paragraph(),
    address: faker.location.secondaryAddress() + ", " + faker.location.city(),
    price: faker.commerce.price({ min: 1000, max: 10000, symbol: '$' }),
    image: faker.image.urlLoremFlickr({ category: 'city' }),
});

export const generateComplaint = () => ({
    id: faker.string.uuid(),
    subject: faker.hacker.phrase(),
    description: faker.lorem.sentences(2),
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Resolved', 'Closed']),
    date: faker.date.recent().toLocaleDateString(),
});

export const mockData = {
    currentUser: generateUser(),
    properties: Array.from({ length: 6 }, generateProperty),
    complaints: Array.from({ length: 5 }, generateComplaint),
    stats: {
        totalComplaints: faker.number.int({ min: 10, max: 100 }),
        resolvedComplaints: faker.number.int({ min: 5, max: 50 }),
        activeProperties: faker.number.int({ min: 1, max: 10 }),
    }
};
