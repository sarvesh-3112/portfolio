import type { Metadata } from "next";
import ResumeView from "./ResumeView";
import Cursor from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: "Resume — Sri Sarvesh R | Software Engineer",
  description:
    "Resume of Sri Sarvesh R — CS undergraduate, Full Stack Developer, Java & Python engineer.",
};

export default function ResumePage() {
  return (
    <>
      <Cursor />
      <ResumeView />
    </>
  );
}
