/* eslint-disable react-dom/no-missing-iframe-sandbox */

const VideoSection = ({ title, videoId, description }: { title: string; videoId: string; description?: string }) => (
  <section className="h-full">
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
    <div className="mx-auto max-w-screen-xl px-4">
      {/* Grid container with 2 columns */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <VideoSection
          title="All-Terrain Mobile Surveillance"
          videoId="your-video-id-1"
          description="Watch our robot navigate mud, stairs, gravel, snow, and uneven terrain with ease, maintaining stable surveillance operations in any environment."
        />

        <VideoSection
          title="360° AI Threat Detection"
          videoId="your-video-id-2"
          description="Our advanced AI system provides comprehensive threat detection, instantly identifying and analyzing potential security risks in real-time."
        />

        <VideoSection
          title="Autonomous Navigation & Alerts"
          videoId="your-video-id-3"
          description="Experience 24/7 autonomous surveillance with instant security alerts for continuous facility protection."
        />

        <VideoSection
          title="Operator Control Takeover"
          videoId="your-video-id-4"
          description="Seamless manual control capabilities allow security personnel to take immediate action when suspicious activities are detected."
        />

        <VideoSection
          title="Two-Way Communication"
          videoId="your-video-id-5"
          description="Interactive audio system enables direct communication between operators and on-site personnel for rapid response."
        />

        <VideoSection
          title="Security Analytics"
          videoId="your-video-id-6"
          description="Comprehensive analytics platform records and analyzes footage to provide valuable security insights and optimize operations."
        />
      </div>
    </div>
  );
};