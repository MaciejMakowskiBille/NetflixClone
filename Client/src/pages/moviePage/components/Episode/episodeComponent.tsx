import { useState } from 'react';
import { serverURL } from '../../../../utils/links';
import { useNavigate } from 'react-router-dom';

const EpisodeComponent = (props: Episode) => {
    const [tileImage, setTileImage] = useState(props.miniImg);
    const [isMouseOverTile, setIsMouseOverTile] = useState(false);

    const navigate = useNavigate();

    const handleMouseOver = () => {
        setTileImage(props.hoverImg);
        setIsMouseOverTile(true);
    };
    const handleMouseLeave = () => {
        setTileImage(props.miniImg);
        setIsMouseOverTile(false);
    };
    const handlePlayVideo = () => {
        if (props && 'video' in props && props.video) {
            navigate(`/player/s/${props.id}`);
        }
    };
    return (
        <div
            className='episode'
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className='image'
                style={{ backgroundImage: `url(${serverURL + tileImage})` }}
            >
                {isMouseOverTile && (
                    <div
                        className='icon iconButton playButton'
                        onClick={handlePlayVideo}
                    />
                )}
            </div>
            <div className='info'>
                <div className='top'>
                    <div className='title'>{props.title}</div>
                    <div className='number'>E{props.number}</div>
                </div>
                <div className='description'>{props.description}</div>
                <div className='duration'>{props.duration} min</div>
            </div>
        </div>
    );
};

export default EpisodeComponent;
