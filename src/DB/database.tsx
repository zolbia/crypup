import axios from "axios";
import {rowModel} from "../componnents/news/news";


let baseURL = 'https://xprojxb.herokuapp.com';
let pathURL = {
    URLReceiveDashboardData: '/dashboard',
    URReceiveData: '/feed',
    URLReceiveRSS: '/rss',
    URLUpdateRSS: '/rss/updaterss',
    URLAddFeed: '/feed/addfeed',
    URLReceiveNews: '/news',
    URLDeleteNews: '/news/delete',
    URLApproveNews: '/news/approve'
}

enum methodModel {
    post,
    delete,
    update,
    get,
}

function dataToStringify(data: string | object) {
    const result: string = JSON.stringify({"Data": data});
    return result;
}

function configure(method: methodModel, path: string, data: string | object) {

    path = baseURL + path;

    let me = '';

    switch (method) {
        case methodModel.post:
            me = 'post';
            break;
        case methodModel.get:
            me = 'get';
            break;
        case methodModel.delete:
            me = 'delete'
    }

    let config: object = {
        method: me,
        url: path,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    return config;

}


async function receiveRss() {

    return (await axios.get((baseURL + pathURL.URLReceiveRSS))).data;
}

async function updateRSS(RSS: string) {


    const result = await axios(configure(methodModel.post, pathURL.URLUpdateRSS, dataToStringify(RSS)));

    return result.data;

}

async function receiveData() {

    return (await axios.get((baseURL + pathURL.URReceiveData))).data;

}

async function addFeed(Feed: object) {

    const result = await axios(configure(methodModel.post, pathURL.URLAddFeed, dataToStringify(Feed)));

    return result.data;

}

async function receiveDashboardData() {

    return (await axios.get((baseURL + pathURL.URLReceiveDashboardData))).data;

}

export type filterReceiveNews = {
    showDelete: boolean, //show delete 0|1
    data: number, //Data
    skip: number
}

async function receiveNews(filter: filterReceiveNews) {

    const result = await axios(configure(methodModel.post, pathURL.URLReceiveNews, dataToStringify(filter)));

    return result.data;
}

async function deleteNews(ids: Array<rowModel>) {

    const deserialize = ids.map(s => s._id);

    const result = await axios(configure(methodModel.delete, pathURL.URLDeleteNews, dataToStringify(deserialize)));

    return result.data;

}

async function approveNews(ids: Array<rowModel>) {

    const deserialize = ids.map(s => s._id);

    const result = await axios(configure(methodModel.post, pathURL.URLApproveNews, dataToStringify(deserialize)));

    return result.data;

}

export {
    receiveRss,
    updateRSS,
    receiveData,
    addFeed,
    receiveDashboardData,
    receiveNews,
    deleteNews,
    approveNews
}