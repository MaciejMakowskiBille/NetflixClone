import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '../tooltip';
import { useVideoContext } from '../../../../providers/videoProvider';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const PreviousButton = () => {
    const { setTimeStamp, player } = useVideoContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const { movieType } = useParams();

    const handleGoToStart = () => {
        setTimeStamp(0);
        player?.current?.seekTo(0);
    };

    return (
        <>
            <FontAwesomeIcon
                icon={faBackwardStep}
                size='2xl'
                className='controls__panel--top-row__buttons--icon'
                onMouseEnter={() => {
                    setShowTooltip(true);
                }}
                onMouseLeave={() => {
                    setShowTooltip(false);
                }}
                onClick={handleGoToStart}
            />
            {showTooltip ? (
                <Tooltip
                    position='top'
                    tooltipText={
                        movieType === 'm'
                            ? 'Cofnij do początku'
                            : 'Poprzedni odcinek'
                    }
                />
            ) : null}
        </>
    );
};
