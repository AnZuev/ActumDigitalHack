"use strict";

/**
 * Part of ActumDigitalHack
 * Created by Anton Zuev on 20/05/2018.
 *
 * Contacts:
 * - mail: anzuev@bk.ru
 * - telegram: @anzuev
 * - github: @AnZuev
 */

"use strict";

/**
 * Part of ActumDigitalHack
 * Created by Anton Zuev on 20/05/2018.
 *
 * Contacts:
 * - mail: anzuev@bk.ru
 * - telegram: @anzuev
 * - github: @AnZuev
 */


const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();
const axios = require('axios');
let fetch = require("node-fetch");
var cors = require('koa-cors');

let compToNodeMapping = {
    'megafon': 3000,
    'RZD': 3001,
    'aeroflot': 3002,
    'shoko': 3003,
    'S7': 3004,
    'mts': 3005,
    'starbucks': 3006
};

let offers = {

};

app.use(cors());
app.use(koaBody());
app.use(async (ctx, next) => {
    console.log(ctx.request);
    await next();
});
//72.16.110.90:2999/checkBalance/window_id/companyName/points_needed


router.get('/checkBalance/:windowId/:companyName/:pointsNeeded', async (ctx) => {
    console.log(ctx.params);
    let url = `http://localhost:${compToNodeMapping[ctx.params.companyName]}/checkWhetherEnough/${ctx.params.windowId}/${ctx.params.pointsNeeded}`;
    let res =  await fetch(url);
    ctx.body = (await res.json()).result;

});

router.get('/getBalance/:companyName/:id', async (ctx) => {
    let url = `http://localhost:${compToNodeMapping[ctx.params.companyName]}/getBalance/${ctx.params.id}`;
    let res =  await fetch(url);
    ctx.body = (await res.json());
});

router.get("/getClientInfo/:companyName/:id", async (ctx) => {
    let url = `http://localhost:${compToNodeMapping[ctx.params.companyName]}/getClientInfo/${ctx.params.id}`;
    let res =  await fetch(url);
    ctx.body = (await res.json());
});


router.get("/createOffer/:id/:brandOffered/:pointsOffered/:brandWanted/:pointsWanted", async (ctx) => {
    let offer = {
        offer_id: (new Date()).getTime(),
        brand_offered: ctx.params.brandOffered,
        points_offered: ctx.params.pointsOffered,
        brand_wanted: ctx.params.brandWanted,
        points_wanted: ctx.params.pointsWanted,
        isOpen: true,
        senderId: ctx.params.id
    };
    offers[offer.offer_id] = offer;
    console.log(offers);
    ctx.body = {result: true};
});

router.get("/getOpenOffers", (ctx) => {
    let results = [];

    for (let key in offers){
        console.log(offers[key]);
        if(offers[key].isOpen){
            results.push(offers[key]);
        }
    }
    console.log(results);
    ctx.body = results;
});


//72.16.110.90:2999/acceptOffer/windowId/offerId
router.get("/acceptOffer/:id/:offerId", (ctx) => {
    let {offerId, windowId} = ctx.params;
    offers[offerId].isOpen = false;

    ctx.body = {result: true}

});


app.use(router.routes());

app.listen(2999, '0.0.0.0');
console.log(`Server is started on port 2999 hub`);





