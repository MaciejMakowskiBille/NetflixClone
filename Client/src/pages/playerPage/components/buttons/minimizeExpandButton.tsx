import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Tooltip } from '../tooltip';

export const MinimizeExpandButton = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <>
            {isFullScreen ? (
                <FontAwesomeIcon
                    className='controls__panel--settings__container--minimize'
                    size='2xl'
                    icon={faCompress}
                    onClick={() => {
                        document.exitFullscreen();
                        setIsFullScreen(false);
                    }}
                    onMouseEnter={() => {
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false);
                    }}
                />
            ) : (
                <FontAwesomeIcon
                    className='controls__panel--settings__container--expand'
                    size='2xl'
                    icon={faExpand}
                    onClick={() => {
                        document.body.requestFullscreen();
                        setIsFullScreen(true);
                    }}
                    onMouseEnter={() => {
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        false;
                    }}
                />
            )}
            {showTooltip ? (
                <Tooltip
                    position='top'
                    tooltipText={`${
                        isFullScreen ? 'Tryb okienkowy' : 'Tryp pełnego ekranu'
                    }`}
                />
            ) : null}
        </>
    );
};
