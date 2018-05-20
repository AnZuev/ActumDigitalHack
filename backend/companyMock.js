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

let portBasis = 3000;
let currentPortValue = portBasis;

module.exports = (item) => {
    let companyInfo = item;
    let users = {
        0: {
            firstName: "Антон",
            lastName: "Зуев",
            balance: (new Date()).getTime()%100000
        },
        1: {
            firstName: "Соня",
            lastName: "Резникова",
            balance: (new Date()).getTime()%1000 + (new Date()).getTime()%29
        },
        2: {
            firstName: "Илья",
            lastName: "Кривогузов",
            balance: (new Date()).getTime()%1000 - (new Date()).getTime()%300
        }
    };
    app.use(koaBody());

    router.get('/getCompanyInfo', (ctx) => {
        ctx.body = companyInfo;
    });

    router.get('/getBalance/:id', (ctx) => {
        const id = ctx.params.id;
        ctx.body = users[id].balance;
    });

    router.get("/checkWhetherEnough/:id/:pointsNeeded", (ctx) => {
        const id = ctx.params.id;
        console.log(ctx.params);
        ctx.body = {result: Number.parseInt(ctx.params.pointsNeeded) <= users[id].balance}
    });

    router.get("/getClientInfo/:id", (ctx) => {
        const id = ctx.params.id;
        ctx.body = users[id];
    });

    app.use(router.routes());

    app.listen(currentPortValue);
    currentPortValue = currentPortValue + 1;
    console.log(`Server is started on port ${currentPortValue - 1} for company ${companyInfo.title}`)
};




