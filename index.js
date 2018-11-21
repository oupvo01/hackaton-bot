const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 9000;

const app = express()
    .use(bodyparser.urlencoded({ extended: false }))
    .use(bodyparser.json());

app.post('/', (req, res) => {
    let text = '';
    // Case 1: When BOT was added to the ROOM
    if (req.body.type === 'ADDED_TO_SPACE' && req.body.space.type === 'ROOM') {
        text = `Thanks for adding me to ${req.body.space.displayName}`;
        // Case 2: When BOT was added to a DM
    } else if (req.body.type === 'ADDED_TO_SPACE'
        && req.body.space.type === 'DM') {
        text = `Thanks for adding me to a DM, ${req.body.user.displayName}`;
        // Case 3: Texting the BOT
    } else if (req.body.type === 'MESSAGE') {
        text = `Your message : ${req.body.message.text}`;
    }
    return res.json({ text });
});

app.listen(PORT, () => {
    console.log(`Server is running in port - ${PORT}`);
});