import React, { useContext } from 'react';
import { RxDotsVertical } from "react-icons/rx";
import { VscVerifiedFilled } from "react-icons/vsc";
import "./Videos.css"
import { store } from '../store/contextStore';
import { formatNumber, timeAgo } from '../store/converters';
import { Link } from 'react-router-dom';
import Loader from './Loader';

function Videos() {

  //COLLECTING THE DATA FROM THE STORE
  const { data, channelImage, loading, mode } = useContext(store);

  return (
    <>
    {loading ? <Loader /> :
      <section className={`videos-container ${mode ? "videos-container-dark" : ""}`}>
        {data?.map((video, index) => {
          return (
            <Link key={index} to={`/playingvideo/${video.id}/${encodeURIComponent(video.snippet.channelId)}/${encodeURIComponent(video.snippet.categoryId)}`}><div className={`video-box ${mode ? "video-box-dark" : ""}`}>
              <img id='thumbnail' width={320} src={video.snippet.thumbnails.medium.url} alt="thumbanil" />
              <div className='title'>
                <img id='channelImg' width={40} height={40} src={channelImage[video.snippet.channelId]} alt="channelImage" />
                <h3>{video.snippet.title.slice(0, 60)} . . .</h3>
                <RxDotsVertical size={18} />
              </div>
              <div className={`info ${mode ? "info-dark" : ""}`}>
                <p>{video.snippet.channelTitle}<VscVerifiedFilled /></p>
                <p>{formatNumber(video.statistics.viewCount)} views. {timeAgo(video.snippet.publishedAt)}</p>
              </div>
            </div>
            </Link>
          )
        })}
      </section>
}
</>
  )
}

export default Videos