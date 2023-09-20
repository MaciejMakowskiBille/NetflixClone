import { faChevronLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { SoundAdjustment } from './soundAdjustment';
import { Timeline } from './timeline';
import { useNavigate, useParams } from 'react-router-dom';
import { useVideoContext } from '../../../providers/videoProvider';
import { PreviousButton } from './buttons/previousButton';
import { NextButton } from './buttons/nextButton';
import { MinimizeExpandButton } from './buttons/minimizeExpandButton';
import { BackwardsButton } from './buttons/backwardsButton';
import { ForwardsButton } from './buttons/forwardsButton';
import { PlayPauseButton } from './buttons/playPauseButton';
import { TimeLeft } from './timeLeft';
import { useIdleTimer } from 'react-idle-timer';

type ControlsProps = {
    hideControls: () => void;
};

export const Controls = ({ hideControls }: ControlsProps) => {
    const { videoData, isPlaying, seriesInfo, episodeInfo, setIsPlaying } =
        useVideoContext();
    const { movieType } = useParams();

    const navigate = useNavigate();

    useIdleTimer({
        onIdle: hideControls,
        timeout: 3_000,
        throttle: 500,
    });

    const getDescriptionOrInfo = () => {
        let seasonString: string;
        let episodeString: string;

        if (videoData) {
            if (movieType === 's' && seriesInfo && episodeInfo) {
                seasonString = `${
                    Number(seriesInfo.number) < 10
                        ? 'S0' + seriesInfo.number
                        : 'S' + seriesInfo.number
                }`;
                episodeString = `
                    ${
                        Number(episodeInfo.number) < 10
                            ? 'E0' + episodeInfo.number
                            : 'S' + episodeInfo.number
                    }
                `;
                return seasonString + episodeString;
            } else {
                return videoData.description;
            }
        }
    };

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
                    onClick={() => navigate(-1)}
                />
                <div className='controls__header--description'>
                    <h1 className='controls__header--description__title'>
                        {videoData?.title}
                    </h1>
                    <h4 className='controls__header--description__episode-info'>
                        {videoData ? getDescriptionOrInfo() : null}
                    </h4>
                </div>
            </div>
            <div
                className='controls__empty'
                onClick={() => {
                    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
                }}
            >
                {!isPlaying ? <FontAwesomeIcon icon={faPlay} /> : null}
            </div>
            <div className='controls__panel'>
                <div className='controls__panel--top-row'>
                    <div className='controls__panel--top-row__empty'></div>
                    <div className='controls__panel--top-row__buttons'>
                        <div className='controls__panel--top-row__buttons--container'>
                            <PreviousButton />
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <BackwardsButton />
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <PlayPauseButton />
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <ForwardsButton />
                        </div>
                        <div className='controls__panel--top-row__buttons--container'>
                            <NextButton />
                        </div>
                    </div>
                    <div className='controls__panel--settings'>
                        <div className='controls__panel--settings__container'>
                            <SoundAdjustment />
                        </div>
                        <div className='controls__panel--settings__container'>
                            <MinimizeExpandButton />
                        </div>
                    </div>
                </div>
                <div className='controls__panel--bottom-row'>
                    <div className='controls__panel--bottom-row__timeline'>
                        <Timeline />
                    </div>
                    <div className='controls__panel--bottom-row__time-left'>
                        <TimeLeft />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
