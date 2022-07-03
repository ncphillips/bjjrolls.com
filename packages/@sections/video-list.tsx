import { Video } from "@repositories/videos"
import styled from "styled-components"

type VideosProps = {
  videos: Video[]
}

export const VideoListSection = ({ videos }: VideosProps) => {
  const uploadingCount = videos.filter(
    (video) => video.status === "uploading"
  ).length

  const videosByDate: { [key: string]: Video[] } = {}

  videos
    .filter((video) => video.status === "available")
    .forEach((video) => {
      const date = video.name.match(/202.-..-../)[0]

      if (date) {
        videosByDate[date] = videosByDate[date] || []
        videosByDate[date].push(video)
      } else {
      }
    })
  return (
    <>
      <h2>Videos</h2>
      {uploadingCount > 0 && (
        <p>
          There are currently <strong>{uploadingCount}</strong> videos
          uploading.
        </p>
      )}
      {Object.keys(videosByDate)
        .sort(byValueReverse)
        .map((date) => {
          return (
            <>
              <h3>{date}</h3>
              {videosByDate[date].sort(byName).map((video, index) => {
                return (
                  <VideoContainer
                    key={index}
                    dangerouslySetInnerHTML={{ __html: video.embed.html }}
                  />
                )
              })}
            </>
          )
        })}
    </>
  )
}

function byValueReverse<T>(a: T, b: T) {
  if (a > b) {
    return -1
  } else if (a < b) {
    return 1
  }
  return 0
}

function byName<T extends { name: string }>(a: T, b: T) {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  }
  return 0
}

const VideoContainer = styled.div`
  iframe {
    width: 100%;
    max-width: 450px;
    max-height: 225px;
  }
`
