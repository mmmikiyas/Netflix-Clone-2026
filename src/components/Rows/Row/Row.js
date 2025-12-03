// // import React, {useEffect, useState} from 'react'
// import { useState, useEffect } from "react";
// import "./row.css";
// import axios from '../../../utils/axios';
// import movieTrailor from 'movie-trailer';
// import YouTube from 'react-youtube';
// import React from 'react'
// const Row=({title, fetchUrl, isLargeRow})=>
// {
//     const [movies , setMovie]=useState([]);
//     const [trailerUrl, setTrailerUrl]=useState("");
//     const base_url = "https://image.tmdb.org/t/p/original";
//     useEffect(() => {
// 		async function fetchData() {
// 			const request = await axios.get(fetchUrl);			
//             setMovie(request.data.results);
//             console.log(movies);
//             return request;            
// 		}
// 		fetchData();
// 	}, [fetchUrl]);
// const opts = {
// 		height: '390',
// 		width: "100%",
// 		playerVars: {
// 			autoplay:1,
// 		},
// 	}
// 	const handleClick = (movie) => {
// 		if (trailerUrl) {
// 			setTrailerUrl('')
// 		} else {
      
// 			// movieTrailor(movie?.title || movie?.name || movie?.original_name)
// 			// 	.then((url) => {
// 			// 		const urlParams = new URLSearchParams(new URL(url).search)
// 			// 		// console.log(urlParams)
// 			// 		setTrailerUrl(urlParams.get('v'));
					
// 			// })

      
// 		}
// 	}



//   return (
//     <div className="row">
//         <h1>{title}</h1>
//         <div className="row__posters">
// 				{movies?.map((movie,index) => (
// 					<img
// 						onClick={()=>handleClick(movie)}
//                     key={index} src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path}`} alt={movie.name} className={`row__poster $
//                         {isLargeRow && "row__posterLarge"}`}
                        
// 					/>
// 				))}
// 			</div>
//       <div style={{ padding: '40px' }}>
// 				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
// 			</div>
//     </div>
//   )
// }

// export default Row









import { useState, useEffect } from "react";
import "./row.css";
import axios from '../../../utils/axios';
import movieTrailor from 'movie-trailer';
import YouTube from 'react-youtube';
import React from 'react';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false); // popup toggle

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovie(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
            setIsOpen(false);
        } else {
            movieTrailor(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                    setIsOpen(true); // open modal
                });
        }
    };

    return (
        <div className="row">
            <h1>{title}</h1>

            <div className="row__posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    />
                ))}
            </div>

            {/* Popup Modal */}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Row;
