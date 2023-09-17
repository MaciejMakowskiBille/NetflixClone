import {
    faBackwardStep,
    faChevronLeft,
    faCompress,
    faExpand,
    faForwardStep,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons/faRotateLeft';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SoundAdjustment } from './soundAdjustment';
import { Tooltip } from './tooltip';
import { useIdleTimer } from 'react-idle-timer';
import { Timeline } from './timeline';

type ControlsProps = {
    isPlaying: boolean;
    togglePlay: () => void;
    hideControls: () => void;
};

export const Controls = ({
    isPlaying,
    togglePlay,
    hideControls,
}: ControlsProps) => {
    const [tooltipsShown, setTooltipsShown] = useState({
        showBackwardsSeconds: false,
        showForwardsSeconds: false,
        showPlayPause: false,
        showPreviousEpisode: false,
        showNextEpisode: false,
        showVolume: false,
        showExpandShrink: false,
    });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(50);

    useIdleTimer({
        onIdle: hideControls,
        timeout: 3_000,
        throttle: 500,
    });

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
            className='controls'
        >
            <div className='controls__header'>
                <FontAwesomeIcon
                    className='controls__header--back-button'
                    icon={faChevronLeft}
                    size='2xl'
                />
                <div className='controls__header--description'>
                    <h1 className='controls__header--description__title'>
                        The walking dead
                    </h1>
                    <h4 className='controls__header--description__episode-info'>
                        S01:E01 Days Gone Bye
                    </h4>
                </div>
            </div>
            <div className='controls__panel'>
                <div className='controls__panel--top-row'>
                    <div className='controls__panel--top-row__empty'></div>
                    <div className='controls__panel--top-row__buttons'>
                        <div className='controls__panel--top-row__buttons--container'>
                            <FontAwesomeIcon
                                icon={faBackwardStep}
                                size='2xl'
                                className='controls__panel--top-row__buttons--icon'
                                onMouseEnter={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showPreviousEpisode: true,
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showPreviousEpisode: false,
                                    }));
                                }}
                            />
                            {tooltipsShown.showPreviousEpisode ? (
                                <Tooltip
                                    position='top'
                                    tooltipText='Poprzedni odcinek'
                                />
                            ) : null}
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            {tooltipsShown.showBackwardsSeconds ? (
                                <Tooltip position='top' tooltipText='-15s' />
                            ) : null}
                            <FontAwesomeIcon
                                onMouseEnter={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showBackwardsSeconds: true,
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showBackwardsSeconds: false,
                                    }));
                                }}
                                className='controls__panel--top-row__buttons--container__icon--backwards'
                                icon={faRotateLeft}
                                size='2xl'
                            />
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            {isPlaying ? (
                                <FontAwesomeIcon
                                    className='controls__panel--top-row__buttons--icon__play-pause'
                                    icon={faPause}
                                    size='2xl'
                                    onClick={() => togglePlay()}
                                    onMouseEnter={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showPlayPause: true,
                                        }));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showPlayPause: false,
                                        }));
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className='controls__panel--top-row__buttons--icon__play-pause'
                                    icon={faPlay}
                                    size='2xl'
                                    onClick={() => togglePlay()}
                                    onMouseEnter={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showPlayPause: true,
                                        }));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showPlayPause: false,
                                        }));
                                    }}
                                />
                            )}
                            {tooltipsShown.showPlayPause ? (
                                <Tooltip
                                    position='top'
                                    tooltipText={`${
                                        isPlaying ? 'Wstrzymaj' : 'Wznów'
                                    }`}
                                />
                            ) : null}
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <FontAwesomeIcon
                                onMouseEnter={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showForwardsSeconds: true,
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showForwardsSeconds: false,
                                    }));
                                }}
                                className='controls__panel--top-row__buttons--container__icon--forwards'
                                icon={faRotateRight}
                                size='2xl'
                            />
                            {tooltipsShown.showForwardsSeconds ? (
                                <Tooltip position='top' tooltipText='+15s' />
                            ) : null}
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <FontAwesomeIcon
                                icon={faForwardStep}
                                size='2xl'
                                className='controls__panel--top-row__buttons--icon'
                                onMouseEnter={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showNextEpisode: true,
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setTooltipsShown((prev) => ({
                                        ...prev,
                                        showNextEpisode: false,
                                    }));
                                }}
                            />
                            {tooltipsShown.showNextEpisode ? (
                                <Tooltip
                                    position='top'
                                    tooltipText='Następny odcinek'
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className='controls__panel--settings'>
                        <div className='controls__panel--settings__container'>
                            <SoundAdjustment volume={volume} handleVolume={setVolume}/>
                        </div>
                        <div className='controls__panel--settings__container'>
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
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showExpandShrink: true,
                                        }));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showExpandShrink: false,
                                        }));
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
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showExpandShrink: true,
                                        }));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipsShown((prev) => ({
                                            ...prev,
                                            showExpandShrink: false,
                                        }));
                                    }}
                                />
                            )}
                            {tooltipsShown.showExpandShrink ? (
                                <Tooltip
                                    position='top'
                                    tooltipText={`${
                                        isFullScreen
                                            ? 'Tryb okienkowy'
                                            : 'Tryp pełnego ekranu'
                                    }`}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='controls__panel--bottom-row'>
                    <div className='controls__panel--bottom-row__timeline'>
                        <Timeline />
                    </div>
                    <div className='controls__panel--bottom-row__time-left'>
                        43:21
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
