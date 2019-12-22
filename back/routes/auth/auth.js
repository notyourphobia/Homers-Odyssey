const express = require('express');
const router =  express.Router();

router.post('/sign-up', (req, res) => {
    res.send('I am in POST signup');
})

module.exports = router;