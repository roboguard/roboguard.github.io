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
    <div className="mx-auto max-w-screen-xl px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <VideoSection
          title="All-Terrain Mobile Surveillance"
          videoId="AQ_ogAbccYg"
          description="Watch our robot showcase advanced parkour capabilites as it is capable of navigates stairs, uneven terrain with ease, maintaining stable surveillance operations in any environment."
        />

        <VideoSection
          title="360° AI Threat Detection"
          videoId="iX8dQpj5mdE"
          description="Our advanced AI system provides comprehensive threat detection, instantly identifying and analyzing potential security risks in real-time."
        />

        <VideoSection
          title="Security Analytics"
          videoId="vYd5IjwT5uE"
          description="Comprehensive analytics platform records and analyzes footage to provide valuable security insights and optimize operations."
        />

        <VideoSection
          title="Operator Control Takeover"
          videoId="youtu.be/RPGcojM81s0"
          description="Seamless manual control capabilities allow security personnel to take immediate action when suspicious activities are detected."
        />

        <VideoSection
          title="Two-Way Communication"
          videoId="t1kuW52HNGk"
          description="Interactive audio system enables direct communication between operators and on-site personnel for rapid response."
        />

        <VideoSection
          title="Autonomous Patrol & Response"
          videoId="_ZbnTWCrEPc"
          description="Experience autonomous 24/7 surveillance with smart route optimization and instant alert capabilities, ensuring continuous coverage of your facility."
        />
      </div>
    </div>
  );
}
