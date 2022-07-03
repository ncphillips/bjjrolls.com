import { Vimeo } from "vimeo"

export type Video = {
  name: string
  created_time: string
  status: "available" | "uploading"
  embed: {
    html: string
  }
}

export class VideoRepository {
  constructor(private userId: string, private vimeo: Vimeo) {}

  all(): Promise<Video[]> {
    return new Promise((resolve, reject) => {
      this.vimeo.request(`/users/${this.userId}/videos`, (error, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body.data)
        }
      })
    })
  }
}
