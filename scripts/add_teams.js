#!/usr/bin/env node

const PocketBase = require("pocketbase/cjs");
const client = new PocketBase("URL");

const colors = [
    "Black",
    "White",
    "Gray",
    "Navy",
    "Teal",
    "Maroon",
    "Olive",
    "Lavender",
    "Coral",
    "Turquoise",
    "Indigo",
    "Salmon",
    "Sky",
    "Blue",
    "Slate",
    "Gray",
    "Crimson",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Cyan",
    "Magenta",
    "Brown",
    "Silver",
    "Gold"
];

const teamSize = 4;
const people = 30;

const teams = Math.ceil(people / teamSize);

(async () => {
    await client.admins.authWithPassword("USER", "PASSWORD");

    for (let i = 0; i <= teams; i++) {
        await client.collection("teams").create({
            "name": "Team " + colors[Math.floor(Math.random() * colors.length)],
            "current_question": 1,
            "code": Math.floor(Math.random() * 900000) + 100000,
        });
    }
})();
