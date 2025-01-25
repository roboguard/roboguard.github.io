export async function generateMetadata() {
  return {
    title: 'RoboGuard',
    description: 'Autonomous Security, Reinvented',
  };
}

export default async function Index() {
  return (
    <div className="mx-auto max-w-screen-md text-base">
      <p className="mb-8">
        RoboGuard combines advanced AI robotics with unified software platform to deliver autonomous security patrols featuring the following capabilities:
      </p>

      <div className="mb-8 bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-bold">Key Features</h2>
        <ul className="list-disc pl-5">
          <li>Mobile Surveillance on legs, adept at navigating mud, stairs, gravel, snow, and uneven ground</li>
          <li>360° View AI-based Threat Detection for comprehensive risk identification in real-time</li>
          <li>Autonomous Navigation and 24/7 surveillance with instant notifications</li>
          <li>Operator Control Takeover for human intervention on suspicious activities</li>
          <li>Two-Way Audio for interactive communication and immediate response</li>
          <li>Advanced Analytics that record and analyze footage for security insights</li>
        </ul>
      </div>

      <h2 className="mb-4 text-xl font-bold">Technology Overview</h2>
      <p className="mb-8">
        Legged robots have just reached a maturity level where real-world deployment is not only feasible but transformative.
        We leverage both quadruped and humanoid robots for security patrolling, offering much more capable solution over existing wheeled security robots at a fraction of the cost.
        We've developed robust controllers that allow these robots to easily navigate diverse terrains like mud and stairs,
        while also integrating our unified AI and software platform to enable the capabilities of a security guard.
      </p>
      <p className="mb-8">
        Thanks for unprecedented energy and effort in robotics research and development currently, we're advancing towards world foundational models that would endow robots with both cognitive and motor skills akin to humans.
      </p>
      <p className="mb-8">
        At RoboGuard, we are the first to deploy these advanced robots to handle dangerous and boring tasks, thereby not only enhancing safety & security but also creating substantial economic value.
      </p>

      {/* <h2 className="mb-4 text-xl font-bold">Currently Supporting Platforms:</h2>
      <ul className="mb-8 list-disc pl-5">
        <li>Quadruped Robot Dogs</li>
        <li>Bipedal Humanoid Robots</li>
      </ul> */}

      <h2 className="mb-4 text-xl font-bold">The Team</h2>
      <p className="mb-8">
        Founded by graduates from KAIST/Georgia Tech, experts at AI robotics, and software development.
      </p>

      {/* <button className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-900" type="button"> */}
    </div>
  );
}
