import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const store = createContext();

function ContextProvider({ children }) {
    const { id, channelId } = useParams();

    const [mode, setMode] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [channelData, setChannelData] = useState();
    const [commentData, setCommentData] = useState();
    const [relatedVideo, setRelatedVideo] = useState();
    const [catId, setCatId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchedVideos, setSearchedvideos] = useState();
    const searchRef = useRef();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [searchedVideoCategory, setSearchedVideoCategory] = useState();
    const [maxResults, setmaxResults] = useState(50);

    //FUNCTION TO TOOGLE DARK MODE
    const handleModeClick = () => {
        if (mode == true) {
            setMode(false);
            document.body.style.color = "black";
            document.body.style.backgroundColor = "white";
        }
        else {
            setMode(true);
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
        }
    }

    // FUNCTION TO HANDLE SEARCH VALUE
    const handleSearch = () => {
        navigate("/searchedvideos")
        setSearch(searchRef.current.value);
    }

    // FUNCRION TO HANDLE SIDEBAR OPENING AND CLOSING
    const handleClickMenu = () => {
        if (sidebar == false) {
            setSidebar(true);
        }
        else {
            setSidebar(false);
        }
    }
    // FUNCTION TO HANDLE VOICE SEARCH
    const startVoiceSearch = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            let result = event.results[0][0].transcript;
            result = result.replace(".", " ");
            searchRef.current.value=result;
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };
        recognition.start();
    };

    const API_KEY = import.meta.env.VITE_API_KEY;

    // URL FOR FETCHING HOMEPAGE VIDEOS
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=IN&videoCategoryId=${catId}&key=${API_KEY}`;

    // URL FOR FETCHING SINGLE VIDEO
    const singleVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;

    // URL FOR FETCHING CHANNLE DETAILS
    const singleChannelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;

    // URL FOR FETCHING THE COMMENTS
    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=25&videoId=${id}&key=${API_KEY}`;

    // URL FOR SHOWING SEARCH RESULTS
    const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=25&q=${search}&regionCode=IN&key=${API_KEY}`;

    // RELATED VIDEOS  URL
    const relatedVideoUrl2 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${searchedVideoCategory}&key=${API_KEY}`;


    // FETCHING THE SEARCHED VIDEOS
    useEffect(() => {
        fetch(searchUrl).then((res) => {
            res.json().then((searchedVideos) => {
                // console.log(searchedVideos.items);
                setSearchedvideos(searchedVideos.items)
            })
        })
    }, [search])

    // FETCHING THE COMMENT DATA
    const fetchCommentData = () => {
        fetch(commentUrl).then((res) => {
            res.json().then((comments) => {
                // console.log(comments.items)
                setCommentData(comments.items)
            })
        })
    }
    // FETCHING THE SINGLEVIDEO
    useEffect(() => {
        fetch(singleVideoUrl).then((res) => {
            res.json().then((videoData) => {
                // console.log(videoData.items[0])
                setVideoDetails(videoData.items[0])
                setSearchedVideoCategory(videoData.items[0].snippet.categoryId)
            })
        })
        fetchCommentData();
    }, [id])

    // FETCHING THE RELATEDVIDEOS
    useEffect(() => {
        fetch(relatedVideoUrl2).then((res) => {
            res.json().then((videos) => {
                // console.log(videos);
                setRelatedVideo(videos.items)
            })
        })
    }, [id, searchedVideoCategory])


    // FETCHING THE CHANNELDATA
    useEffect(() => {
        fetch(singleChannelUrl).then((res) => {
            res.json().then((channelData) => {
                // console.log(channelData.items[0])
                setChannelData(channelData.items[0])
            })
        })
    }, [channelId])



    const [data, setData] = useState([]);
    const [channelImage, setChannelImage] = useState({});
    const [videoDetails, setVideoDetails] = useState(null);

    //FETCHING THE HOMEPAGE VIDEOS
    useEffect(() => {
        setLoading(true)
        fetch(url).then((res) => {
            res.json().then((data) => {
                // console.log(data.items)
                setData(data.items)
                setLoading(false)
            })
        })
    }, [catId, maxResults])


    // FETCHING THE CHANNLE IMAGES
    const fetchChannelImages = (channelIds) => {
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(',')}&key=${API_KEY}`;

        fetch(channelUrl)
            .then((res) => res.json())
            .then((channelData) => {
                const images = {};
                channelData.items.forEach((channel) => {
                    images[channel.id] = channel.snippet.thumbnails.default.url;
                });
                setChannelImage(images);  // Store all channel images in state
            })
    };

    useEffect(() => {
        // Extract unique channel IDs from the videos data
        const channelIds = [...new Set(data?.map((video) => video.snippet.channelId))];

        // Fetch all channel images in one API call if not already fetched
        if (channelIds.length > 0) {
            fetchChannelImages(channelIds);
        }
    }, [data]);  // Dependency on data


    const changecategory = (catId) => {
        setCatId(catId)
    }


    return (
        <store.Provider value={{ data, channelImage, handleClickMenu, sidebar, videoDetails, channelData, commentData, relatedVideo, changecategory, loading, searchedVideos, searchRef, handleSearch, mode, handleModeClick, startVoiceSearch, }}>
            {children}
        </store.Provider>
    )
}

export default ContextProvider;