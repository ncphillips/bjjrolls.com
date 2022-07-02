import { GetServerSideProps } from "next";
import Head from "next/head";
import { Vimeo } from "vimeo";

type HomeProps = {
  videos: VimeoVideoList;
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <Head>
        <title>BJJ Rolls</title>
        <meta name="description" content="BJJ Rolls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <h1>bjjrolls</h1>

          {props.videos.data.map((video) => (
            <div dangerouslySetInnerHTML={{ __html: video.embed.html }} />
          ))}
        </div>
      </main>
    </div>
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
};
