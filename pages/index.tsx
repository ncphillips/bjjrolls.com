import { GetServerSideProps } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import { DefaultLayout } from "@layouts/default";
import { VideoListSection } from "@sections/video-list";
import { WelcomeSection } from "@sections/welcome";
import { VideoRepository, Video } from "@repositories/videos";
import { initVimeo, VIMEO_USER_ID } from "@initializers/vimeo";

type HomeProps = {
  videos: Video[];
};

export default function Home(props: HomeProps) {
  const { user } = useUser();

  return (
    <DefaultLayout>
      <h1>bjjrolls</h1>

      {!user && <WelcomeSection />}
      {user && <VideoListSection videos={props.videos} />}
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const videos = new VideoRepository(VIMEO_USER_ID, initVimeo());

  return {
    props: {
      videos: await videos.all(),
    },
  };
};
