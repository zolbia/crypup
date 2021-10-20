import axios from "axios";


let baseURL = 'https://xprojxb.herokuapp.com';
let pathURL = {
    URReceiveData: '/feed',
    URLReceiveRSS: '/rss',
    URLUpdateRSS: '/rss/updaterss',
    URLAddFeed: '/feeds/addfeed'
}

enum methodmodel {
    post,
    delete,
    update,
    get,
}

function dataToStringfy(data: string) {
    const result: string = JSON.stringify({"Data": data});
    return result;
}

function Configy(method: methodmodel, path: string, data: string) {

    path = baseURL + path;

    let me = '';

    switch (method) {
        case methodmodel.post:
            me = 'post';
            break;
        case methodmodel.get:
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


    const result = await axios(Configy(methodmodel.post, pathURL.URLUpdateRSS, dataToStringfy(RSS)));

    return result.data;

}

async function receiveData() {

    const result = (await axios.get((baseURL + pathURL.URReceiveData))).data


    console.log(result);


    return result;

}


export {
    receiveRss,
    updateRSS,
    receiveData
}