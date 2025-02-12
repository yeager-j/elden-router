import { Step } from "@/lib/convert-route";
import { Bug, CornerUpRight, Hand, Swords } from "lucide-react";
import { motion } from "motion/react";

interface StepListItemProps {
  step: Step;
}

const motionVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function StepListItem(props: StepListItemProps) {
  const { step } = props;

  const StepIcon = () => {
    switch (step.type) {
      case "TRAVEL":
        return <CornerUpRight size={24} />;
      case "DEFEAT":
        return <Swords size={24} />;
      case "PICK_UP":
        return <Hand size={24} />;
      case "GLITCH":
        return <Bug size={24} />;
    }
  };

  return (
    <motion.div className="flex items-center gap-4" variants={motionVariants}>
      <div className="flex-shrink-0">
        <StepIcon />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold">{step.title}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {step.description}
        </span>
      </div>
    </motion.div>
  );
}
