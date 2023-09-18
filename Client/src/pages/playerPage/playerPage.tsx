import ReactPlayer from 'react-player';
import { Controls } from './components/controls';
import { useEffect, useState } from 'react';
import { getOneFilm } from '../../utils/Gets';
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
        setIsPlaying,
        setDuration,
        setTimeStamp,
        setVideoData,
    } = useVideoContext();
    const { id } = useParams();

    const hideControls = () => {
        setControlsVisible(false);
    };

    const showControls = () => {
        setControlsVisible(true);
    };

    const ControlsComponent = <Controls hideControls={hideControls} />;

    useEffect(() => {
        getOneFilm(Number(id)).then((response) => {
            setTimeout(() => {
                setVideoData(response);
            }, 200);
        });
    }, []);

    return (
        <div className='player' onMouseMove={() => showControls()}>
            {videoData ? (
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
                        onDuration={(duration) => setDuration(duration)}
                        onProgress={(duration) =>
                            setTimeStamp(duration.playedSeconds)
                        }
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
