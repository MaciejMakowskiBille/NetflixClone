import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Tooltip } from '../tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { useVideoContext } from '../../../../providers/videoProvider';

export const NextButton = () => {
    const {
        duration,
        player,
        seriesInfo,
        episodeInfo,
        timestamp,
        setTimeStamp,
    } = useVideoContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const { movieType } = useParams();

    const navigate = useNavigate();

    const handleGoToEnd = () => {
        if (duration) {
            setTimeStamp(duration);
            player?.current?.seekTo(duration);
        }
    };
    const handleNextEpisode = () => {
        if (seriesInfo && episodeInfo) {
            let indexOfEpisode = 0;
            seriesInfo.episodes.forEach((element, index) => {
                if (element.id === episodeInfo.id) {
                    indexOfEpisode = index;
                    return;
                }
            });
            if (indexOfEpisode !== seriesInfo.episodes.length - 1) {
                if (timestamp === duration) {
                    navigate(
                        `/player/s/${
                            seriesInfo.episodes[indexOfEpisode + 1].id
                        }`
                    );
                } else {
                    handleGoToEnd();
                }
            }
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
                onClick={movieType === 'm' ? handleGoToEnd : handleNextEpisode}
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
