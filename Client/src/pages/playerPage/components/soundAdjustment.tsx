import {
    faVolumeXmark,
    faVolumeLow,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Tooltip } from './tooltip';
import { motion } from 'framer-motion';
import { useVideoContext } from '../../../providers/videoProvider';

type SoundAdjustmentProps = {
    min?: number;
    max?: number;
};

export const SoundAdjustment = ({
    min = 0,
    max = 100,
}: SoundAdjustmentProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showSlider, setShowSlider] = useState(false);

    const { volume, setVolume } = useVideoContext();

    const tooltip = (
        <Tooltip position='left' tooltipText='Dostosuj poziom głośności' />
    );

    let icon = faVolumeHigh;

    if (volume === 0) {
        icon = faVolumeXmark;
    } else if (volume / 100 <= 0.5) {
        icon = faVolumeLow;
    }

    return (
        <>
            {showSlider ? (
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
                    className='volume-slider'
                    onMouseLeave={() => {
                        setShowTooltip(false);
                        setShowSlider(false);
                    }}
                >
                    <input
                        max={100}
                        min={0}
                        step={1}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className='volume-slider__input'
                        type='range'
                        name='volume'
                        style={{
                            backgroundSize:
                                ((volume - min) * 100) / (max - min) + '% 100%',
                        }}
                    />
                </motion.div>
            ) : null}
            <FontAwesomeIcon
                className='volume'
                size='2xl'
                icon={icon}
                onMouseEnter={() => {
                    setShowTooltip(true);
                }}
                onMouseLeave={() => {
                    setShowTooltip(false);
                }}
                onClick={() => {
                    if (!showSlider) {
                        setShowSlider(true);
                    } else {
                        setShowSlider(false);
                        setShowTooltip(false);
                    }
                }}
            />
            {showTooltip ? tooltip : null}
        </>
    );
};
