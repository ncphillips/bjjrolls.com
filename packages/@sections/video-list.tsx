import { Video } from "@repositories/videos"
import styled from "styled-components"

type VideosProps = {
  videos: Video[]
}

export const VideoListSection = ({ videos }: VideosProps) => {
  const uploadingCount = videos.filter(
    (video) => video.status === "uploading"
  ).length

  return (
    <>
      <h2>Videos</h2>
      {uploadingCount > 0 && (
        <p>
          There are currently <strong>{uploadingCount}</strong> videos
          uploading.
        </p>
      )}
      {videos
        .filter((video) => video.status === "available")
        .map((video, index) => (
          <VideoContainer
            key={index}
            dangerouslySetInnerHTML={{ __html: video.embed.html }}
          />
        ))}
    </>
  )
}

const VideoContainer = styled.div`
  iframe {
    width: 100%;
    max-width: 450px;
    max-height: 225px;
  }
`
