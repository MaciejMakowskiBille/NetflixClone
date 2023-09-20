import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useVideoContext } from '../../../../providers/videoProvider';
import { Tooltip } from '../tooltip';

export const BackwardsButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { timestamp, player, setTimeStamp } = useVideoContext();

    const handleBackwards = () => {
        if (timestamp - 15 < 0 && player) {
            setTimeStamp(0);
            player?.current?.seekTo(0);
        } else {
            setTimeStamp(timestamp - 15);
            player?.current?.seekTo(timestamp - 15);
        }
    };
    return (
        <>
            {showTooltip ? <Tooltip position='top' tooltipText='-15s' /> : null}
            <FontAwesomeIcon
                onMouseEnter={() => {
                    setShowTooltip(true);
                }}
                onMouseLeave={() => {
                    setShowTooltip(false);
                }}
                onClick={handleBackwards}
                className='controls__panel--top-row__buttons--container__icon--backwards'
                icon={faRotateLeft}
                size='2xl'
            />
        </>
    );
};
