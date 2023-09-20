const express = require('express');
const shortid = require('shortid');
const URL = require('../model/url')
const hbs = require("hbs");
const isUrl = require("is-url");


async function handleURLShortner(req, res) {
    try {
        const body = req.body;
        let url = body.url;
        if (!body.url) return res.status(400).send('URL is required.');

        const shortId = shortid();
        if(!isUrl(url)){
            url = `http://${url}`;
        }

        const entry = await URL.create({
            shortId: shortId,
            redirectURL: url,
            timestamp: []
        })

        const genUrl = `http://localhost:8000/${shortId}`;
        res.render("index", { genUrl: genUrl });
    } catch (err) {
        res.send(err);
    }
}

async function getRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne(
        {
            shortId,
        }
    )

    if(entry){
        return res.redirect(entry.redirectURL);
    }

    res.status(500).send("Url not found...");
}

async function visitClickedHistory(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({
        shortId
    })

    res.json({
        clickedCount: entry.validateHistory.length,
        analytics: entry.validateHistory
    })
}

module.exports = {
    handleURLShortner,
    visitClickedHistory,
    getRedirectUrl
}