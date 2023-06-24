#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const PocketBase = require("pocketbase/cjs");

const client = new PocketBase("URL");

const group1 = [
    ["Red City Hall 'Rotes Rathaus'", "Take a picture."],
    ["St. Nicholas’ Church", "Take a picture better than ours (T'was raining, so we didn't take a better one)."],
    ["Neptune Fountain", "Take a picture."],
    ["St. Maries’ Church", "Take a picture."],
    ["TV Tower 'Fernsehturm'", "Take a picture utilizing the same perspective as below."],
    ["World Clock 'Weltzeituhr'", "Take a picture where the places whose time is currently closest to midnight can be seen."],
    ["Humboldt University", "Take a picture."],
    ["Berlin Palace ('Stadtschloss') / Humboldt Forum", "Reenact the picture - duck behind anything outside or inside the forum."],
    ["underground station 'U Museumsinsel' right outside the forum", "Reenact the picture."],
    ["Berlin Cathedral 'Dom'", "Reenact the picture with at least three people."],
    ["'Altes Museum' ('Old Museum') directly behind you", "Reenact the picture with more than one person."],
    ["Brandenburg Gate", "Lets play a round of 'Where\\'s Waldo']. Take a picture with at least two people hidden in the crowd."],
    ["'Reichstag' (Seat of German Parliament)", "Reenact the picture with as many people as possible."],
    ["Victory Column", "Take a picture with all four group members and the 'Golden Lizzie' ('Goldelse'), the golden statue on top of the tower."],
    ["Bellevue Palace", "Take a picture."]
]

async function create(group, folder) {
    for (let i = 0; i < group.length; i++) {
        const type = "jpeg";
        const data = fs.readFileSync(path.join(__dirname, folder, `${i + 1}.${type}`)).toString("base64");
        const uri = `data:image/${type};base64,${data}`

        const record = {
            "place": group[i][0],
            "task": group[i][1],
            "numId": i + 1,
            "image": uri
        }

        await client.collection("questions").create(record);
    }
}

(async () => {
    await client.admins.authWithPassword("USER", "PASSWORD");

    await create(group1, "group1")
})();
