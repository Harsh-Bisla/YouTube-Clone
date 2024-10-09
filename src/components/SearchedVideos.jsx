import React, { useContext } from 'react';
import "./SearchedVideos.css"
import { store } from '../store/contextStore';
import { timeAgo2 } from '../store/converters';
import { Link } from 'react-router-dom';

function SearchedVideos() {

    const { searchedVideos, mode, channelImage } = useContext(store);
        // TO SCROLL THE PAGE TO THE TOP
    window.scrollTo(0, 0);
    
    return (
        <section className={`searched-videos-container ${mode ? "searched-videos-container-dark" : ""}`}>
            {searchedVideos?.map((video, index) => {
                return (
                    <Link key={index} to={`/playingvideo/${video.id.videoId}/${encodeURIComponent(video.snippet.channelId)}/${encodeURIComponent(video.snippet.categoryId)}`}><div key={index} className={`searched-video ${mode ? "searched-video-dark" : ""}`}>
                        <img id='searchedThumbnail' width={350} src={video.snippet.thumbnails.medium.url} alt="video-image" />
                        <div className={`searchedVideo-text ${mode ? "searchedVideo-text-dark" : ""}`}>
                            <h2>{video.snippet.title}</h2>
                            <p> {timeAgo2(video.snippet.publishedAt)}</p>
                            <div className='channel-details'>
                                <img src={channelImage[video.snippet.channelId]} alt="" />
                                <p>{video.snippet.channelTitle}</p>
                            </div>
                            <p id='search-description'>Description:{video.snippet.description}</p>
                        </div>
                    </div>
                    </Link>
                )
            })}
        </section>
    )
}

export default SearchedVideos