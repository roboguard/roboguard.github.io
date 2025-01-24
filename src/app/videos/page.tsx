/* eslint-disable react-dom/no-missing-iframe-sandbox */

const VideoSection = ({ title, videoId, description }: { title: string; videoId: string; description?: string }) => (
  <section>
    <h2 className="mb-4 text-base font-bold">{title}</h2>
    <div className="relative mb-4 aspect-[16/9] bg-gray-200">
      <iframe
        className="size-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`${title} Video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
    {description && <p className="text-base">{description}</p>}
  </section>
);

export default async function Videos() {
  return (
    <div className="mx-auto max-w-screen-md space-y-12 text-base">
      <VideoSection
        title="Product Overview"
        videoId="6zPvT0ig1VM"
        description="RoboGuard combines advanced AI with quadruped robotics to deliver autonomous security patrols. Our solution reduces costs while providing 24/7 coverage."
      />

      <VideoSection
        title="How It Works"
        videoId="t0yg-zeOmag"
        description="Our AI-powered platform enables autonomous navigation, threat detection, and real-time response. The dashboard provides complete control and monitoring."
      />

      <VideoSection
        title="Live Demo"
        videoId="your-video-id"
      />
    </div>
  );
};
