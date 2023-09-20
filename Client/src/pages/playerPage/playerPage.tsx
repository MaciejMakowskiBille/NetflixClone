import ReactPlayer from 'react-player';
import { Controls } from './components/controls';
import { useEffect, useState } from 'react';
import { getEpisode, getOneFilm } from '../../utils/Gets';
import { useParams } from 'react-router-dom';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useVideoContext } from '../../providers/videoProvider';
import { serverURL } from '../../utils/links';

export const PlayerPage = () => {
    const [controlsVisible, setControlsVisible] = useState(false);
    const {
        videoData,
        volume,
        isPlaying,
        player,
        setEpisodeInfo,
        setIsPlaying,
        setDuration,
        setTimeStamp,
        setVideoData,
    } = useVideoContext();
    const { movieType, id } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const hideControls = () => {
        setControlsVisible(false);
    };

    const showControls = () => {
        setControlsVisible(true);
    };

    const ControlsComponent = <Controls hideControls={hideControls} />;

    useEffect(() => {
        if (movieType === 'm') {
            getOneFilm(Number(id)).then((response) => {
                setTimeout(() => {
                    setIsPlaying(false);
                    setVideoData(response);
                    setIsLoading(false);
                }, 100);
            });
        } else {
            getEpisode(Number(id)).then((response) => {
                setTimeout(() => {
                    setIsPlaying(false);
                    setVideoData(response);
                    setEpisodeInfo(response);
                    setIsLoading(false);
                }, 1000);
            });
        }

        return () => {
            setTimeStamp(0);
        };
    }, []);

    return (
        <div className='player' onMouseMove={() => showControls()}>
            {videoData && !isLoading ? (
                <>
                    {controlsVisible ? ControlsComponent : null}
                    <ReactPlayer
                        ref={player}
                        url={`${serverURL}${videoData?.video}`}
                        playing={isPlaying}
                        controls={false}
                        height={'100vh'}
                        width={'100w'}
                        volume={volume / 100}
                        onDuration={(duration) => {
                            setDuration(duration);
                        }}
                        onProgress={(duration) => {
                            setTimeStamp(
                                parseFloat(
                                    duration.playedSeconds.toPrecision(2)
                                )
                            );
                        }}
                        onEnded={() => setIsPlaying(false)}
                    />
                </>
            ) : (
                <FontAwesomeIcon
                    className='player__loading'
                    spin
                    icon={faCircleNotch}
                    size='2xl'
                />
            )}
        </div>
    );
};
