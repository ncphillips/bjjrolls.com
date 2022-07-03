import { GetServerSideProps } from "next";
import { Vimeo } from "vimeo";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import { DefaultLayout } from "@layouts/default";
import { VideoListSection } from "@sections/video-list";
import { WelcomeSection } from "@sections/welcome";

type HomeProps = {
  videos: VimeoVideoList;
};

export default function Home(props: HomeProps) {
  const { user } = useUser();

  return (
    <DefaultLayout>
      <h1>bjjrolls</h1>

      {!user && <WelcomeSection />}
      {user && <VideoListSection videos={props.videos.data} />}
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const vimeo = new Vimeo(
    process.env.VIMEO_CLIENT_ID,
    process.env.VIMEO_CLIENT_SECRET,
    process.env.VIMEO_ACCESS_TOKEN
  );

  const client = new BjjRollsVimeo(vimeo);

  return {
    props: {
      videos: await client.videos(),
    },
  };
};

class BjjRollsVimeo {
  private userId = "user179641247";

  constructor(private vimeo: Vimeo) {}

  user(): Promise<VimeoUser> {
    return new Promise((resolve, reject) => {
      this.vimeo.request(`/users/${this.userId}`, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }

  videos(): Promise<VimeoVideoList> {
    return new Promise((resolve, reject) => {
      this.vimeo.request(`/users/${this.userId}/videos`, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}

type VimeoUser = {
  uri: string;
  name: string;
  link: string;
};

type VimeoVideoList = {
  data: VimeoVideo[];
};

type VimeoVideo = {
  embed: {
    html: string;
  };
  status: "available" | "uploading";
};
