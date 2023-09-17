import ReactPlayer from 'react-player';
import { Controls } from './components/controls';
import { useState } from 'react';

export const PlayerPage = () => {
    const [controlsVisible, setControlsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const hideControls = () => {
        setControlsVisible(false);
    };

    const showControls = () => {
        setControlsVisible(true);
    };

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const ControlsComponent = (
        <Controls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            hideControls={hideControls}
        />
    );

    return (
        <div className='player' onMouseMove={() => showControls()}>
            {controlsVisible ? ControlsComponent : null}
            <ReactPlayer
                url={`http://localhost:3001/uploads/electronic_61695_1080p_82af158824.mp4`}
                playing={isPlaying}
                controls={false}
                height={'100vh'}
                width={'100w'}
            />
        </div>
    );
};
