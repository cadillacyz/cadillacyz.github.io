export const content = {
  name: 'Joe',
  role: 'Data scientist · Economics · AI',
  introduction:
    'I build AI skills that make technology easier for everyone to understand and use.',
  about: [
    'I’m a data scientist studying economics and AI. I’m interested in bridging the gap between AI and everyday people.',
    'I create practical AI skills and explain how people can use them without having to understand every technical detail first.',
  ],
  lenses: ['Data science', 'Economics', 'AI'],
  focus: [
    {
      title: 'Make AI skills easier to use',
      description: 'Turn complicated workflows into clear steps that more people can follow.',
    },
    {
      title: 'Build personal websites with AI',
      description: 'Help people move from their own story to a website without figuring out every design decision alone.',
    },
    {
      title: 'Connect economics, data and AI',
      description: 'Explore how these fields shape the tools people use and the choices they make.',
    },
  ],
  featuredSkill: {
    name: 'Don’t Stop Go Public',
    summary:
      'An AI skill that guides students through building a personal website. It asks simple questions at each step, so students do not have to find a design or figure out the entire process by themselves.',
    detail:
      'At the beginning, users can choose guided or quick setup, then decide whether they want to learn why each step matters or focus mainly on building.',
    steps: ['Choose a path', 'Shape your story', 'Choose a look', 'Build and review'],
  },
  videos: {
    title: 'Showing the process',
    description:
      'I make videos that show people how to use the AI skills I build. I also explain how AI can make creating a personal website simpler and more approachable.',
  },
  portrait: {
    darkSrc: '/assets/portraits/joe-20260729-0251/joe-neutral-dark.webp',
    lightSrc: '/assets/portraits/joe-20260729-0251/joe-smiling-bright.webp',
    alt: 'Illustrated portrait of Joe recording a video with a microphone and camera',
  },
  visibility: {
    links: false,
    contact: false,
  },
  links: [] as Array<{ label: string; href: string }>,
  contact: {
    email: '',
  },
} as const
