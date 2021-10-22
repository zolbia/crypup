import axios from "axios";


let baseURL = 'https://xprojxb.herokuapp.com';
let pathURL = {
    URLReceiveDashboardData: '/dashboard',
    URReceiveData: '/feed',
    URLReceiveRSS: '/rss',
    URLUpdateRSS: '/rss/updaterss',
    URLAddFeed: '/feed/addfeed',
    URLReceiveNews: '/news'
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

function Configy(method: methodModel, path: string, data: string) {

    path = baseURL + path;

    let me = '';

    switch (method) {
        case methodModel.post:
            me = 'post';
            break;
        case methodModel.get:
            me = 'get';
            break;
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

async function receiveNews() {

    const result = (await axios.get((baseURL + pathURL.URLReceiveNews))).data

    return result;

}


export {
    receiveRss,
    updateRSS,
    receiveData,
    addFeed,
    receiveDashboardData,
    receiveNews
}