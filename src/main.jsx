import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import PlayingVideo from './components/PlayingVideo.jsx';
import SearchedVideos from './components/SearchedVideos.jsx';

//SETUP THE ROUTER AND DEFINING THE PATH
const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: "/", element: <Home /> },
      { path: "/playingvideo/:id/:channelId/:categoryId", element: <PlayingVideo /> },
      { path: "/searchedvideos", element: <SearchedVideos /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
