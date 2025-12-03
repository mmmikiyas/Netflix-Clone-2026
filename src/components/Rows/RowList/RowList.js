import React from 'react'
import Row from '../Row/Row'
import requests from '../../../utils/requests'

const RowList = () => {
  return (
    <>
  <Row title="NETFLIX ORIGINAL" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
  <Row title="Top Rated Movies "fetchUrl={requests.fetchTopRatedMovies} />
  <Row title="Treading Now "fetchUrl={requests.fetchTrending} />
  <Row title="Action Movies "fetchUrl={requests.fetchActionMovies} />
  <Row title="Comedy Movies "fetchUrl={requests.fetchComedyMovies} />
  <Row title="Horror Movies "fetchUrl={requests.fetchHorrorMovies} />
  <Row title="Romance Movies "fetchUrl={requests.fetchRomanceMovies} />
  <Row title="Tv Show "fetchUrl={requests.fetchTvShow} />
  <Row title="Documentaries "fetchUrl={requests.fetchDocumentaries} />

    </>
  )
}

export default RowList
