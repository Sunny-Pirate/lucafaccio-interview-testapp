import React, {useEffect, useState} from 'react';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {ESGNews} from "../prisma/generated/prisma-client-js/models";
import {prisma} from "../lib/prisma-client";
import {addDays, compareDesc, differenceInCalendarDays, format, isSameDay, parse, subDays} from 'date-fns'
import {Field, Form, Formik, FormikHelpers} from "formik";

const DELAY_BETWEEN_ENDPOINT_REQUESTS = 24 * 60 * 60 * 1000;
const API_DATE_STRING_FORMAT = "dd/MM/yyyy";
const API_RESPONSE_DATE_STRING_FORMAT = "dd MMM yyyy";
const INPUT_DATE_STRING_FORMAT = "yyyy-MM-dd";
const MAX_NUMBER_OF_DAYS_TO_RETRIEVE = 100 - 31 // The max requests number minus the max number of days in a month
const MIN_ARTICLES_TO_RETRIEVE = 100
const ENDPOINT_URL = 'https://the-company-domain-api.rapidapi.com/news?companyname=Apple%20Inc.'

type NewsFeedProps = {
    news: ESGNews[]
}


// 1. Ottengo dal database l'ultima richiesta
// 2. Se la richiesta non esiste la popolo con un valore fittizzio
// 3. Se la verifica della data della richiesta che sto eseguendo è inferiore alla data della richiesta ottenuta in
//    precedenza più un giorno:
//  3.Sì - Recupero dal db le news che ho già salvato e le restituisco alla pagina
//  3.No - Interrogo le api gaialens, scrivo i dati della risposta nel db, salvo la data della nuova richiesta,
//         recupero le news dal db e le restituisco alla pagina
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    let isDbEmpty = false;

    let lastDbRequest = await prisma.apiRequestsInfo.findFirst({
        where: {
            id: {
                equals: 0
            }
        }
    });

    isDbEmpty = lastDbRequest === null;

    if (isDbEmpty) {
        let fakeDate = subDays(new Date(), MAX_NUMBER_OF_DAYS_TO_RETRIEVE)
        let fakeRequest = await prisma.apiRequestsInfo.create({
            data: {
                id: 0,
                last_request: fakeDate
            },
        })
        lastDbRequest = fakeRequest
    }

    const currentRequestDate = new Date();
    const minimumDateForANewRequest = addDays(lastDbRequest.last_request, 1)
    if (isSameDay(currentRequestDate, minimumDateForANewRequest)) {
        const news = await prisma.eSGNews.findMany();
        return {
            props: {
                news
            }
        }
    } else {
        const lastKwnownResquest = lastDbRequest.last_request
        const missingDaysToFetch = differenceInCalendarDays(currentRequestDate, lastKwnownResquest)


        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': `${process.env.RAPIDAPI_API_KEY}`,
                'X-RapidAPI-Host': `${process.env.RAPIDAPI_API_HOST}`
            }
        };


        let _dailyNews = [] as ESGNews[];
        let i = Math.min(missingDaysToFetch, MAX_NUMBER_OF_DAYS_TO_RETRIEVE);
        let dayToFetch = currentRequestDate
        while (i >= 0 || (isDbEmpty && _dailyNews.length < MIN_ARTICLES_TO_RETRIEVE && i >= 0)) {
            const formattedDateForApiEndpoint = format(dayToFetch, API_DATE_STRING_FORMAT)
            // console.log({formattedDateForApiEndpoint})

            // feature: This can be improved with a wrapper function that handle errors code too
            await fetch(`${ENDPOINT_URL}&date=${formattedDateForApiEndpoint}`, options)
                .then(async response => {
                    if (response.status === 200) {
                        let json = await response.json()
                        _dailyNews = [..._dailyNews, ...json as ESGNews[]]
                    }
                })
                .catch(err => {
                    console.error(err)
                });
            i--

            dayToFetch = subDays(dayToFetch, 1)
        }
        await prisma.eSGNews.createMany({
            data: _dailyNews,
            skipDuplicates: true
        });

        await prisma.apiRequestsInfo.update({
            where: {
                id: 0
            },
            data: {
                last_request: new Date()
            }
        })

        const news = await prisma.eSGNews.findMany();
        return {
            props: {
                news
            }
        }
    }

};

// Defines the fields on the filter component
interface ESGNewsFeedFilterValues {
    content: string;
    date: string;
    source: string;
}

const IndexPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const dbNews: ESGNews[] = props.news;

    // Stateful list of filtered news items
    const [newsFeed, setNewsFeed] = useState<ESGNews[]>([]);

    // Initial values for the filter component
    const initialFilterValues = {content: '', date: '', source: '',};

    // Used to show/hide a reset button
    const [isContentFiltered, setIsContentFiltered] = useState(false);

    // Initialize the list of news with all news retrieved server side
    useEffect(() => {
        function initNewsFeed() {
            if (dbNews.length > 0) {
                setNewsFeed(dbNews)
            }
        }

        initNewsFeed()

        return () => null;
    }, [dbNews]);

    // used for debugging porpoises
    // console.log(dbNews)
    // console.log({newsFeed})

    // filter the list of news. Parameter are provided by formik.
    function filterNewsfeed(values: ESGNewsFeedFilterValues) {
        // console.log(`These are the values from filter`, {values})
        const _comparisonDate = new Date();
        const _parsedDateFromForm = parse(values.date, INPUT_DATE_STRING_FORMAT, _comparisonDate)

        const _filteredNews = dbNews.filter((dbFetchedNews) => {
            const _parsedDateFromNews = parse(dbFetchedNews.date, API_RESPONSE_DATE_STRING_FORMAT, _comparisonDate)
            let isNewsInFilter = dbFetchedNews.title.includes(values.content)
                && dbFetchedNews.url.includes(values.source);
            if (values.date.length > 0) {
                isNewsInFilter = isNewsInFilter && isSameDay(_parsedDateFromForm, _parsedDateFromNews)
            }
            // console.log(`The news for ${dbFetchedNews.date} is in NewsFeed: ${isNewsInFilter}`)
            return isNewsInFilter
        })
        if (values.date.length > 0 || values.source.length > 0 || values.content.length > 0) {
            setIsContentFiltered(true)
        } else {
            setIsContentFiltered(false)
        }
        setNewsFeed(_filteredNews)
    }

    function handleResetFilter() {
        setIsContentFiltered(false)
        setNewsFeed(dbNews)
    }

    return <div className='company-news-feed'>

        <h1 className='company-title'>Apple Inc.</h1>

        <Formik
            initialValues={initialFilterValues}
            onSubmit={(
                values: ESGNewsFeedFilterValues,
                {setSubmitting}: FormikHelpers<ESGNewsFeedFilterValues>
            ) => {
                filterNewsfeed(values)
            }}
            onReset={values => {
                handleResetFilter()
            }}
        >{({values, handleChange, submitForm}) => (
            <Form className='filter-component'>
                <div className='filter-field'>
                    <label className='filter-label' htmlFor="content">Content Search</label>
                    <Field id="content" name="content" placeholder="Insert the title search term here..."/>
                </div>
                <div className='filter-field'>
                    <label className='filter-label' htmlFor="date">Date published</label>
                    <Field id="date" name="date" placeholder="Select the date" type={"date"}/>
                </div>
                <div className='filter-field'>
                    <label className='filter-label' htmlFor="source">Source Search</label>
                    <Field id="source" name="source" placeholder="Insert here the url you want filter..."/>
                </div>
                <div className='actions-wrapper'>
                    <button type="submit">Apply filter</button>
                    <button type="reset" disabled={!isContentFiltered}>Clear filter</button>
                </div>
            </Form>
        )}
        </Formik>

        <div className='news-list'>
            {props.news.length === 0 && <div>There is no articles for this company</div>}
            {newsFeed.length > 0
                ? newsFeed.sort((a, b) => {
                    const comparingDate = new Date();
                    const aDate = parse(a.date, API_RESPONSE_DATE_STRING_FORMAT, comparingDate)
                    const bDate = parse(b.date, API_RESPONSE_DATE_STRING_FORMAT, comparingDate)
                    return compareDesc(aDate, bDate)

                }).map((value, index) => {
                    return <div key={`article-${index}`} className='article-card'>
                        <div className='heading'>
                            <h4>{value.date}</h4>
                            <p>{value.title}</p>
                        </div>
                        <a>{value.url}</a>
                    </div>
                })

                : <div>No articles found</div>}
        </div>
    </div>
};

export default IndexPage;



