// pages/past-questions/[courseCode].tsx
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import PastQuestion from "./page";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "data", "past-questions"));
  const paths = files.map((file) => ({
    params: { courseCode: file.replace(".json", "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "past-questions", `${params.courseCode}.json`);
  const jsonData = fs.readFileSync(filePath, "utf8");
  const questions = JSON.parse(jsonData);
  return { props: { questions } };
}

export default function CoursePastQuestions({ questions }) {
  const router = useRouter();
  const { courseCode } = router.query;

  return <PastQuestion courseCode={courseCode} questions={questions} />;
}