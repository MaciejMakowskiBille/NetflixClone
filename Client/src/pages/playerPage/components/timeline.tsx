import { useState } from 'react';
import { Pointer } from './pointer';
import { useVideoContext } from '../../../providers/videoProvider';

export const Timeline = () => {
    const [showPointer, setShowPointer] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(false);
    const min = 0;
    const max = 100;

    const {
        videoData,
        timestamp,
        player,
        previewPlayer,
        previewTimestamp,
        setPreviewTimeStamp,
        setTimeStamp,
    } = useVideoContext();

    function calcSliderPos(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const max = (e.target as HTMLInputElement).getAttribute('max');
        let result;
        if (max !== null) {
            result =
                (e.nativeEvent.offsetX /
                    (e.target as HTMLInputElement).clientWidth) *
                parseInt(max);
        } else {
            result = 0;
        }
        setPreviewTimeStamp(result);
        previewPlayer?.current?.seekTo(previewTimestamp);
    }

    return (
        <div className='timeline'>
            <input
                type='range'
                step={0.1}
                onMouseMove={(e) => calcSliderPos(e)}
                min={min}
                max={videoData ? videoData.duration : max}
                value={timestamp}
                onChange={(e) => {
                    setTimeStamp(Number(e.target.value));
                    player?.current?.seekTo(parseFloat(e.target.value));
                }}
                name='timeline'
                className='timeline__slider'
                style={{
                    backgroundSize:
                        ((timestamp - min) * 100) /
                            (videoData ? videoData.duration : 0 - min) +
                        '% 100%',
                }}
                onMouseEnter={() => {
                    setShowPointer(true);
                    setShowThumbnail(true);
                }}
                onMouseDown={() => setShowPointer(false)}
                onMouseUp={() => setShowPointer(true)}
                onMouseLeave={() => {
                    setShowPointer(false);
                    setShowThumbnail(false);
                }}
            />
            <Pointer showPointer={showPointer} showThumbnail={showThumbnail} />
        </div>
    );
};
