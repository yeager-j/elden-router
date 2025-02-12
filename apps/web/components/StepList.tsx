"use client";

import StepListItem from "@/components/StepListItem";
import { Step } from "@/lib/convert-route";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import type { GetPathResult } from "@workspace/routing/types";

const motionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

interface StepListProps {
  routeData: GetPathResult;
  stepData: Step[];
}

export default function StepList(props: StepListProps) {
  const { routeData, stepData } = props;

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={motionVariants}
      initial="hidden"
      animate="visible"
    >
      {!routeData.isError &&
        stepData.map((step) => <StepListItem step={step} key={step.title} />)}

      {routeData.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Route Not Found</AlertTitle>
          <AlertDescription>
            A route to your destination with your selected settings does not
            exist. The shortest path has the following requirements:
            <ul className="ml-6 list-disc [&>li]:mt-2">
              {routeData.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </motion.div>
  );
}
