import { Vimeo } from "vimeo"

export const VIMEO_USER_ID = "user179641247"

export const initVimeo = () => {
  return new Vimeo(
    process.env.VIMEO_CLIENT_ID,
    process.env.VIMEO_CLIENT_SECRET,
    process.env.VIMEO_ACCESS_TOKEN
  )
}
