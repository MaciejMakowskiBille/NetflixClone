import { useState } from 'react';
import { Pointer } from './pointer';

export const Timeline = () => {
    const [value, setValue] = useState(0);
    const [showPointer, setShowPointer] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(false);
    const min = 0;
    const max = 100;

    return (
        <div className='timeline'>
            <input
                type='range'
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                name='timeline'
                className='timeline__slider'
                style={{
                    backgroundSize:
                        ((value - min) * 100) / (max - min) + '% 100%',
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
