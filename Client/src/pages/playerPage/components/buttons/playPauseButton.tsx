import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Tooltip } from '../tooltip';
import { useVideoContext } from '../../../../providers/videoProvider';

export const PlayPauseButton = () => {
    const { isPlaying, setIsPlaying } = useVideoContext();
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <>
            {isPlaying ? (
                <FontAwesomeIcon
                    className='controls__panel--top-row__buttons--icon__play-pause'
                    icon={faPause}
                    size='2xl'
                    onClick={() => setIsPlaying(false)}
                    onMouseEnter={() => {
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false);
                    }}
                />
            ) : (
                <FontAwesomeIcon
                    className='controls__panel--top-row__buttons--icon__play-pause'
                    icon={faPlay}
                    size='2xl'
                    onClick={() => setIsPlaying(true)}
                    onMouseEnter={() => {
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false);
                    }}
                />
            )}
            {showTooltip ? (
                <Tooltip
                    position='top'
                    tooltipText={`${isPlaying ? 'Wstrzymaj' : 'Wznów'}`}
                />
            ) : null}
        </>
    );
};
