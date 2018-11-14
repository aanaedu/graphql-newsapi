const fetch = require('node-fetch');
const Config = require('../config');

function getCommonParamsUrlSegment(args) {
    let url = '';
    if (args.query) {
        url += `&q=${args.query}`;
    }

    if (args.pageSize) {
        url += `&pageSize=${args.pageSize}`;
    }

    if (args.page) {
        url += `&page=${args.page}`;
    }
    
    if (args.sources) {
        url += `&sources=${args.sources}`;
    }
    return url;
}

function getArticlesUrl(args) {
    let url = `https://newsapi.org/v2/everything?apiKey=${Config.API_KEY}`;
    url += getCommonParamsUrlSegment(args);
    
    if (args.from) {
        url += `&from=${args.from}`;
    }
    
    if (args.to) {
        url += `&to=${args.to}`;
    }    
    
    if (args.domains) {
        url += `&domains=${args.domains}`;
    }
    
    if (args.excludeDomains) {
        url += `&excludeDomains=${args.excludeDomains}`;
    }

    if (args.sortBy) {
        url += `&sortBy=${args.sortBy}`;
    }
    
    if (args.language) {
        url += `&language=${args.language}`;
    }
    return url;
}

function getHeadlinesUrl(args) {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${Config.API_KEY}`;
    url += getCommonParamsUrlSegment(args);

    //  Note: you can't mix the sources param with the 'country' or 'category' params.
    if (!args.sources) {
        if (args.country) {
            url += `&country=${args.country}`;
        }
        if (args.category) {
            url += `&category=${args.category}`;
        }
    }
    return url;
}

const fetchArticle = async function (args) {
    const response = await fetch(getArticlesUrl(args));
    const data = await response.json();
    return data.articles;
}

const fetchHeadlines = async function (args) {
    const response = await fetch(getHeadlinesUrl(args));
    const data = await response.json();
    return data.articles;
}


module.exports = {
    fetchArticle,
    fetchHeadlines
}