const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLEnumType
} = require('graphql');
const articleResolvers = require('../resolvers/article');


const ArticleCategoryType = new GraphQLEnumType({
    name: 'Category',
    values: {
        BUSINESS: { value: 'business' },
        ENTERTAINMENT: { value: 'entertainment' },
        GENERAL: { value: 'general' },
        HEALTH: { value: 'health' },
        SCIENCE: { value: 'science' },
        SPORTS: { value: 'sports' },
        TECHNOLOGY: { value: 'technology' },
    }
});

const ArticleSortByType = new GraphQLEnumType({
    name: 'sortBy',
    values: {
        RELEVANCY: { values: 'relevancy' },
        POPULARITY: { values: 'popularity' },
        PUBLISHED_AT: { values: 'publishedAt' },
    }
});


const ArticleCountryType = new GraphQLEnumType({
    name: 'Country',
    values: {
        AE: { value: 'ae' },
        AR: { value: 'ar' },
        AT: { value: 'at' },
        AU: { value: 'au' },
        BE: { value: 'be' },
        BG: { value: 'bg' },
        BR: { value: 'br' },
        CA: { value: 'ca' },
        CH: { value: 'ch' },
        CN: { value: 'cn' },
        CO: { value: 'co' },
        CU: { value: 'cu' },
        CZ: { value: 'cz' },
        DE: { value: 'de' },
        EG: { value: 'eg' },
        FR: { value: 'fr' },
        GB: { value: 'gb' },
        GR: { value: 'gr' },
        HK: { value: 'hk' },
        HU: { value: 'hu' },
        ID: { value: 'id' },
        IE: { value: 'ie' },
        IL: { value: 'il' },
        IN: { value: 'in' },
        IT: { value: 'it' },
        JP: { value: 'jp' },
        KR: { value: 'kr' },
        LT: { value: 'lt' },
        LV: { value: 'lv' },
        MA: { value: 'ma' },
        MX: { value: 'mx' },
        MY: { value: 'my' },
        NG: { value: 'ng' },
        NL: { value: 'nl' },
        NO: { value: 'no' },
        NZ: { value: 'nz' },
        PH: { value: 'ph' },
        PL: { value: 'pl' },
        PT: { value: 'pt' },
        RO: { value: 'ro' },
        RS: { value: 'rs' },
        RU: { value: 'ru' },
        SA: { value: 'sa' },
        SE: { value: 'se' },
        SG: { value: 'sg' },
        SI: { value: 'si' },
        SK: { value: 'sk' },
        TH: { value: 'th' },
        TR: { value: 'tr' },
        TW: { value: 'tw' },
        UA: { value: 'ua' },
        US: { value: 'us' },
        VE: { value: 've' },
        ZA: { value: 'za' },
    }
});

const ArticleLanguageType = new GraphQLEnumType({
    name: 'Language',
    description: 'The 2-letter ISO-639-1 code of the language you want to get headlines for.',
    values: {
        AR: { value: 'ar' },
        DE: { value: 'de' },
        EN: { value: 'en' },
        ES: { value: 'es' },
        FR: { value: 'fr' },
        HE: { value: 'he' },
        IT: { value: 'it' },
        NL: { value: 'nl' },
        NO: { value: 'no' },
        PT: { value: 'pt' },
        RU: { value: 'ru' },
        SE: { value: 'se' },
        UD: { value: 'ud' },
        ZH: { value: 'zh' },
    }
});

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: 'Article Type',
    fields: () => ({
        id: { type: GraphQLInt },
        author: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        urlToImage: { type: GraphQLString },
        publishedAt: { type: GraphQLString },
        content: { type: GraphQLString },
        source: { type: ArticleSourceType }
    })
});

const ArticleSourceType = new GraphQLObjectType({
    name: 'ArticleSource',
    description: 'Article Source Type',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString }
    })
});


module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            articles: {
                type: new GraphQLList(ArticleType),
                args: {
                    query: { 
                        type: GraphQLString,
                        description: 'Keywords or phrases to search for.'
                    },
                    pageSize: { 
                        type: GraphQLInt,
                        description: 'The number of results to return per page. 20 is the default, 100 is the maximum.'
                    },
                    page: { 
                        type: GraphQLInt,
                        description: 'Use this to page through the results.'
                    },
                    sources: { 
                        type: new GraphQLList(GraphQLString),
                        description: 'A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index.'
                    },
                    from: { 
                        type: GraphQLString,
                        description: 'A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2018-11-14 or 2018-11-14T11:03:40) Default: the oldest according to your plan.'
                    },
                    to: { 
                        type: GraphQLString,
                        description: 'A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2018-11-14 or 2018-11-14T11:03:40) Default: the newest according to your plan.'
                    },
                    domains: { 
                        type: new GraphQLList(GraphQLString),
                        description: 'A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.'
                    },
                    excludeDomains: { 
                        type: new GraphQLList(GraphQLString),
                        description: 'A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to remove from the results.'
                    },
                    sortBy: { 
                        type: ArticleSortByType,
                        description: `The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
                        relevancy = articles more closely related to q come first.
                        popularity = articles from popular sources and publishers come first.
                        publishedAt = newest articles come first.
                        Default: publishedAt`
                    },
                    language: { type: ArticleLanguageType }
                },
                resolve: (root, args) => articleResolvers.fetchArticle(args)
            },
            headlines: {
                type: new GraphQLList(ArticleType),
                args: {
                    query: { type: GraphQLString },
                    pageSize: { type: GraphQLInt},
                    page: { type: GraphQLInt},
                    sources: { type: new GraphQLList(GraphQLString) },
                    country: { type: ArticleCountryType },
                    category: { type: ArticleCategoryType },
                },
                resolve: (root, args) => articleResolvers.fetchHeadlines(args)
            }
        }),
    })
})