import { GetServerSideProps } from "next";
import { Vimeo } from "vimeo";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import { DefaultLayout } from "@layouts/default";

type HomeProps = {
  videos: VimeoVideoList;
};

export default function Home(props: HomeProps) {
  const uploadingCount = props.videos.data.filter(
    (video) => video.status === "uploading"
  ).length;

  return (
    <DefaultLayout>
      <h1>bjjrolls</h1>

      {uploadingCount && (
        <p>
          There are currently <strong>{uploadingCount}</strong> videos
          uploading.
        </p>
      )}

      <h2>Videos</h2>

      {props.videos.data
        .filter((video) => video.status === "available")
        .map((video, index) => (
          <VideoContainer
            key={index}
            dangerouslySetInnerHTML={{ __html: video.embed.html }}
          />
        ))}
    </DefaultLayout>
  );
}

const VideoContainer = styled.div`
  iframe {
    width: 100%;
    max-width: 450px;
    max-height: 225px;
  }
`;

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
