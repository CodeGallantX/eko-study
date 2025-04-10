import { Testimonial, FAQ, Feature, VisionItem, Page } from '../app/types/about';
import { visionIcons } from '../components/about/VisionIcons';
import { featureIcons } from '../components/about/FeaturesIcons';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adeola Johnson",
    department: "Computer Science",
    text: "EkoStudy transformed my exam preparation. The past questions and AI study planner helped me score a 4.5 GPA last semester!",
    rating: 5
  },
  {
    id: 2,
    name: "Chinedu Okoro",
    department: "Mechanical Engineering",
    text: "The departmental resources saved me hours of searching for materials. Everything I need is in one place, perfectly organized.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatima Yusuf",
    department: "Biochemistry",
    text: "I love the video explanations for complex topics. The offline access feature is a lifesaver for my commute.",
    rating: 4
  }
];

export const faqs: FAQ[] = [
  {
    question: "Is EkoStudy free for LASUSTECH students?",
    answer: "Yes! EkoStudy offers free access to all core study materials for LASUSTECH students. Some premium features may be introduced in the future, but the essential resources will always remain free."
  },
  {
    question: "How often are new materials added to the platform?",
    answer: "We update our database continuously throughout each semester. Lecture notes are typically added within 48 hours of classes, and past questions are updated after each examination period."
  },
  {
    question: "Can I contribute my own notes to EkoStudy?",
    answer: "Absolutely! We encourage student contributions. You can submit your well-organized notes through our submission portal, where our academic team reviews them before publishing."
  },
  {
    question: "Does EkoStudy work offline?",
    answer: "Yes! Our offline mode allows you to download materials and access them without an internet connection. Perfect for studying during commutes or in areas with poor connectivity."
  }
];


export const visionItems: VisionItem[] = [
  {
    title: "Accessibility",
    description: "Making quality education accessible to every LASUSTECH student, regardless of location or economic background.",
    icon: visionIcons.accessibility
  },
  {
    title: "Innovation",
    description: "Continuously developing cutting-edge tools that address the real challenges students face in their academic journey.",
    icon: visionIcons.innovation
  },
  {
    title: "Community",
    description: "Building a supportive network where students can learn from each other and grow together.",
    icon: visionIcons.community
  }
];


export const features: Feature[] = [
  {
    title: "AI-Powered Study Assistant",
    description: "Get personalized study recommendations based on your courses and performance.",
    icon: featureIcons.twitter
  },
  {
    title: "Department-Specific Resources",
    description: "Access curated materials for your exact department and courses.",
    icon: featureIcons.user
  },
  {
    title: "Exam Preparation Suite",
    description: "Past questions, marking schemes, and timed practice tests.",
    icon: featureIcons.file
  },
  {
    title: "Offline Access",
    description: "Download materials for studying without internet connection.",
    icon: featureIcons.caretDown
  },
  {
    title: "Collaborative Learning",
    description: "Departmental discussion forums and study groups.",
    icon: featureIcons.users
  },
  {
    title: "Progress Tracking",
    description: "Monitor your study habits and improvement over time.",
    icon: featureIcons.chartLine
  }
];

export const pageData: Page = {
  title: "About",
  breadcrumb: [
    {
      name: "About",
      path: "/about",
    }
  ]
};