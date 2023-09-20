import { motion } from 'framer-motion';

type TooltipProps = {
    tooltipText: string;
    position: 'top' | 'right' | 'bottom' | 'left';
};
export const Tooltip = ({ tooltipText, position }: TooltipProps) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{ duration: 0.2 }}
            className={`tooltip tooltip-${position}`}
        >
            {tooltipText}
        </motion.div>
    );
};
