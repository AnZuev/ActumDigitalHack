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

let companyMock = require("./companyMock.js");

let companies = [
    {
        title: "Мегафон",
        description: "Оператор связи"
    },
    {
        title: "РЖД",
        description: "Железные дороги"
    },
    {
        title: "Аэрофлот",
        description: "Авиалинии"
    },
    {
        title: "Шоколадница",
        description: "Кофейня"
    },
    {
        title: "S7",
        description: "Авиалинии"
    },
    {
        title: "МТС",
        description: "Оператор связи"
    },
    {
        title: "Starbucks",
        description: "Кофейня"
    }

];

companies.forEach((item) => {
    setTimeout(() => {
        companyMock(item)
    }, 100);
});