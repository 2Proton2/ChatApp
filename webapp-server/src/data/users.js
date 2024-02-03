import bcrypt from 'bcryptjs';

export const users = [
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": bcrypt.hashSync('123456', 10),
    },
    {
        "name": "Johnny Baristow",
        "email": "johnny@example.com",
        "password": bcrypt.hashSync('123456', 10),
    },
    {
        "name": "Piyush",
        "email": "piyush@example.com",
        "password": bcrypt.hashSync('123456', 10),
    },
    {
        "name": "Guest User",
        "email": "guest@example.com",
        "password": bcrypt.hashSync('123456', 10),
    },
    {
        "name": "Anthony",
        "email": "anthony@example.com",
        "password": bcrypt.hashSync('123456', 10),
    }
]
