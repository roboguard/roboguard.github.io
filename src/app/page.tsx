export async function generateMetadata() {
  return {
    title: 'RoboGuard',
    description: 'Turn your robot into a security guard',
  };
}

export default async function Index() {
  return (
    <div className="mx-auto max-w-screen-md text-base">

      <p className="mb-8">
        RoboGuard combines advanced AI with quadruped robotics to deliver autonomous
        security patrols. Our solution reduces costs while providing 24/7 coverage.
      </p>

      <h2 className="mb-4 text-xl font-bold">The Market</h2>
      <p className="mb-8">
        The global commercial security market is $250B, growing 8% annually. Enterprise facilities spend $30K-50K monthly per location on security, with costs rising 15% yearly due to labor shortages.
      </p>

      <div className="mb-8 bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-bold">Our Solution</h2>
        <ul className="list-disc pl-5">
          <li>Autonomous security robots powered by our proprietary AI</li>
          <li>Military-grade threat detection and response system</li>
          <li>Cloud-based fleet management for multi-site deployment</li>
          <li>$6,500/month per robot - 75% cost reduction</li>
        </ul>
      </div>

      <p className="mb-4">RoboGuard Platform Features:</p>
      <ul className="mb-8 list-disc pl-5">
        <li>Advanced perimeter breach detection using multi-modal AI</li>
        <li>Autonomous patrol optimization with dynamic threat response</li>
        <li>Real-time situational awareness with 360° thermal + HD vision</li>
        <li>Secure command center with predictive analytics</li>
        <li>Emergency response integration with local authorities</li>
      </ul>

      <h2 className="mb-4 text-xl font-bold">Current Supporting Platform</h2>
      <ul className="mb-8 list-disc pl-5">
        <li>Unitree Robotics</li>
      </ul>

      <h2 className="mb-4 text-xl font-bold">The Team</h2>
      <p className="mb-8">
        Founded by graduates from KAIST, with experience at robotics, AI, and software development.
      </p>

      {/* <button className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-900" type="button">
        Schedule Demo
      </button> */}
    </div>
  );
}
