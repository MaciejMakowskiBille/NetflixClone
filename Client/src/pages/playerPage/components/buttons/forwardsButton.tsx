import { useState } from 'react';
import { useVideoContext } from '../../../../providers/videoProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../tooltip';

export const ForwardsButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { videoData, player, timestamp, setTimeStamp } = useVideoContext();

    const handleForwards = () => {
        if (videoData) {
            if (timestamp + 15 > videoData.duration && player) {
                setTimeStamp(videoData.duration);
                player.current?.seekTo(videoData.duration);
            } else {
                setTimeStamp(timestamp + 15);
                player?.current?.seekTo(timestamp + 15);
            }
        }
    };

    return (
        <>
            <FontAwesomeIcon
                onMouseEnter={() => {
                    setShowTooltip(true);
                }}
                onMouseLeave={() => {
                    setShowTooltip(false);
                }}
                onClick={handleForwards}
                className='controls__panel--top-row__buttons--container__icon--forwards'
                icon={faRotateRight}
                size='2xl'
            />
            {showTooltip ? <Tooltip position='top' tooltipText='+15s' /> : null}
        </>
    );
};
