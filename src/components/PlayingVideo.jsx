import "./PlayingVideo.css";
import React, { useContext, useEffect, useState } from 'react';
import "./PlayingVideo.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { store } from "../store/contextStore";
import { formatNumber, timeAgo } from "../store/converters";

function PlayingVideo() {
  // COLLECTING THE METHODS AND STATED FROM THE STORE
  const { videoDetails, channelData, commentData, relatedVideo, mode } = useContext(store)
  const [descriptionView, setdescriptionView] = useState("description");


  //FUNCTION TO HANDLE THE DESCRIPTION BOX VIEW
  const handleDescriptionClick = () => {
    if (descriptionView == "description") {
      setdescriptionView("description-open")
    }
    else {
      setdescriptionView("description")
    }
  }

  // TAKING THE ID FROM THE USEPARMS
  const { id } = useParams();

    // TO SCROLL THE PAGE TO THE TOP
 useEffect(()=>{
  window.scrollTo(0, 0);
 },[])


  return (
    <section className={`playingVideo-section ${mode ? "playingVideo-section-dark" : ""}`}>
      <div className="left">
        <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h2>{videoDetails?.snippet.title}</h2>
        <div className="channel-info">
          <div className="subscribe-box">
            <img src={channelData?.snippet.thumbnails.medium.url} alt="channel-logo" />
            <div className={`subs-count ${mode ? "subs-count-dark" : ""}`}>
              <h4>{videoDetails?.snippet.channelTitle}</h4>
              <span>{channelData ? formatNumber(channelData.statistics.subscriberCount) : ""} subscribers</span>
            </div>
            <button className={`subscribe-btn ${mode ? "subscribe-btn-dark" : ""}`}>Subscribe</button>
          </div>
          <div className="like-share">
            <button className="like-btn"><AiOutlineLike size={22} /><p>{videoDetails ? formatNumber(videoDetails.statistics.likeCount) : ""}</p></button>
            <button className="share-btn">
              <TbShare3 size={22} /> <p>Share</p>
            </button>
          </div>
        </div>
        <div className={`${descriptionView} ${mode ? 'description-dark' : ''} ${mode ? "description-open-dark" : ""}`}>
          <p><span>{videoDetails ? formatNumber(videoDetails.statistics.viewCount) : ""} views {videoDetails ? timeAgo(videoDetails.snippet.publishedAt) : ""}</span></p>
          <p id="desc">{videoDetails?.snippet.description}</p>
        </div>
        <button className={`viewMore-btn ${mode ? "viewMore-btn-dark" : ""}`} onClick={handleDescriptionClick}>{descriptionView == "description" ? "View more..." : "Show less..."}</button>
        <h2 id="comment-count">{videoDetails ? formatNumber(videoDetails.statistics.commentCount) : ""} comments</h2>

        {/* COMMENT SECTION */}
        {commentData?.map((comment, index) => {
          return (
            <div key={index} className="comment-box">
              <img width={40} height={40} src={comment?.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div className={`comment-msg ${mode ? "comment-msg-dark" : ""}`}>
                <p id="name">{comment.snippet.topLevelComment.snippet.authorDisplayName} <span>{timeAgo(comment.snippet.topLevelComment.snippet.publishedAt)}</span></p>
                <p id="comment">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="btns">
                  <button className={`like btn ${mode ? "btn-dark" : ""}`}><AiOutlineLike size={22} /><p>{comment.snippet.topLevelComment.snippet.likeCount}</p></button>
                  <button className={`dislike btn ${mode ? "btn-dark" : ""}`}><AiOutlineDislike size={22} /><p>0</p></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* RIGHT SECTION STARTED */}
      <div className={`right ${mode ? "right-dark" : ""}`}>
        {relatedVideo?.map((relatedVideo, index) => {
          return (
            <Link key={index} to={`/playingvideo/${relatedVideo.id}/${encodeURIComponent(relatedVideo.snippet.channelId)}/${encodeURIComponent(relatedVideo.snippet.categoryId)}`}><div className={`related-box ${mode ? "related-box-dark" : ""}`}>
              <img width={200} src={relatedVideo.snippet.thumbnails.medium.url} alt="related-video-image" />
              <div className={`related-video-text ${mode ? "related-video-text-dark" : ""}`}>
                <h3>{relatedVideo.snippet.title.slice(0, 50)}...</h3>
                <p>{relatedVideo.snippet.channelTitle}</p>
                <p>{formatNumber(relatedVideo.statistics.viewCount)} views. {timeAgo(relatedVideo.snippet.publishedAt)}</p>
              </div>
            </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default PlayingVideo