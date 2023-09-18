import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Tooltip } from '../tooltip';
import { useParams } from 'react-router-dom';
import { useVideoContext } from '../../../../providers/videoProvider';

export const NextButton = () => {
    const { videoData, player, setTimeStamp } = useVideoContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const { movieType } = useParams();

    const handleGoToEnd = () => {
        if (videoData) {
            setTimeStamp(videoData.duration);
            player?.current?.seekTo(videoData.duration);
        }
    };

    return (
        <>
            <FontAwesomeIcon
                icon={faForwardStep}
                size='2xl'
                className='controls__panel--top-row__buttons--icon'
                onMouseEnter={() => {
                    setShowTooltip(true);
                }}
                onMouseLeave={() => {
                    setShowTooltip(false);
                }}
                onClick={
                    movieType === 'm' ? handleGoToEnd : () => setTimeStamp(0)
                }
            />
            {showTooltip ? (
                <Tooltip
                    position='top'
                    tooltipText={
                        movieType === 'm'
                            ? 'Skocz do końca'
                            : 'Następny odcinek'
                    }
                />
            ) : null}
        </>
    );
};
