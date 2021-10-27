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
    URLDeleteNews: '/news/delete'
}

enum methodModel {
    post,
    delete,
    update,
    get,
}

function dataToStringfy(data: string | object) {
    const result: string = JSON.stringify({"Data": data});
    return result;
}

function Configy(method: methodModel, path: string, data: string | object) {

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

    const result = (await axios.get((baseURL + pathURL.URLReceiveRSS))).data

    return result;

}

async function updateRSS(RSS: string) {


    const result = await axios(Configy(methodModel.post, pathURL.URLUpdateRSS, dataToStringfy(RSS)));

    return result.data;

}

async function receiveData() {

    const result = (await axios.get((baseURL + pathURL.URReceiveData))).data


    console.log(result);


    return result;

}

async function addFeed(Feed: object) {

    const result = await axios(Configy(methodModel.post, pathURL.URLAddFeed, dataToStringfy(Feed)));

    return result.data;

}

async function receiveDashboardData() {

    const result = (await axios.get((baseURL + pathURL.URLReceiveDashboardData))).data

    return result;

}

export type filterReceiveNews = {
    showDelete: boolean, //show delete 0|1
    data: number, //Data
    skip: number
}

async function receiveNews(filter: filterReceiveNews) {


    const result = await axios(Configy(methodModel.get, pathURL.URLReceiveNews, dataToStringfy(filter)))

    return result.data;

}

async function deleteNews(ids: Array<rowModel>) {

    const deserialize = ids.map(s => s._id);

    const result = await axios(Configy(methodModel.delete, pathURL.URLDeleteNews, dataToStringfy(deserialize)));

    return result.data;

}

export {
    receiveRss,
    updateRSS,
    receiveData,
    addFeed,
    receiveDashboardData,
    receiveNews,
    deleteNews
}