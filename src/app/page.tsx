export async function generateMetadata() {
  return {
    title: 'RoboGuard',
    description: 'Reinventing security with advanced AI-driven autonomous robotics.',
  };
}

export default async function Index() {
  return (
    <div className="mx-auto max-w-screen-md text-base">
      <p className="mb-8">
        RoboGuard combines advanced AI robotics with a unified software platform to deliver autonomous security patrols featuring the following capabilities:
      </p>

      <div className="mb-8 bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-bold">Core Capabilities</h2>
        <ul className="list-disc pl-5">
          <li>Mobile surveillance on legs, capable of navigating mud, stairs, gravel, snow, and uneven terrain</li>
          <li>360° AI-powered threat detection for real-time risk identification</li>
          <li>Autonomous Navigation and 24/7 surveillance with instant alerts</li>
          <li>Operator Control Takeover for human intervention on suspicious activities</li>
          <li>Two-way audio for interactive communication and rapid response</li>
          <li>Advanced Analytics that record and analyze footage for security insights</li>
        </ul>
      </div>

      <h2 className="mb-4 text-xl font-bold">Technology Overview</h2>
      <p className="mb-8">
        Legged robots have reached a pivotal maturity level, enabling real-world deployments that are both feasible and transformative. At RoboGuard, we utilize advanced quadruped and humanoid robots for security patrolling, offering a more capable solution than traditional wheeled security robots—at a fraction of the cost.
      </p>
      <p className="mb-8">
        Our robust controllers empower these robots to navigate challenging terrains such as mud and stairs with ease. Coupled with our unified AI and software platform, they can perform tasks with the precision and adaptability of a skilled security guard.
      </p>
      <p className="mb-8">
        Thanks to groundbreaking advances in robotics, we’re moving toward foundational models that equip robots with human-like cognitive and motor skills. RoboGuard is at the forefront of deploying these cutting-edge technologies to tackle dangerous and monotonous tasks, enhancing safety, security, and economic value.
      </p>

      {/* <h2 className="mb-4 text-xl font-bold">Currently Supporting Platforms:</h2>
      <ul className="mb-8 list-disc pl-5">
        <li>Quadruped Robot Dogs</li>
        <li>Bipedal Humanoid Robots</li>
      </ul> */}

      <h2 className="mb-4 text-xl font-bold">The Team</h2>
      <p className="mb-8">
        Founded by graduates from KAIST and Georgia Tech, our team comprises experts in AI, robotics, and software development.
      </p>

      {/* <button className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-900" type="button"> */}
    </div>
  );
}
