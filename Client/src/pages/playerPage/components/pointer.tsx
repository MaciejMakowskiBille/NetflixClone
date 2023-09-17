import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

type PointerProps = {
    showPointer: boolean;
    showThumbnail: boolean;
};

export const Pointer = ({ showPointer, showThumbnail }: PointerProps) => {
    const [pointerPosition, setPointerPosition] = useState(0);

    const DURATION = 10;

    const throttle = (function () {
        let timeout: number | undefined = undefined;
        return function throttle(callback: () => void) {
            if (timeout === undefined) {
                callback();
                timeout = setTimeout(() => {
                    timeout = undefined;
                }, DURATION);
            }
        };
    })();

    function throttlify(callback: (arg0: any) => void) {
        return function throttlified(event: any) {
            throttle(() => {
                callback(event);
            });
        };
    }

    useEffect(() => {
        const saveMousePosition = throttlify((event) => {
            setPointerPosition(event.clientX);
        });

        document.addEventListener('mousemove', saveMousePosition);
        return () => {
            document.removeEventListener('mousemove', saveMousePosition);
        };
    }, [setPointerPosition]);

    return (
        <>
            {showPointer ? (
                <div
                    className='timeline__pointer'
                    style={{ left: `${pointerPosition - 40}px` }}
                ></div>
            ) : null}
            {showThumbnail ? (
                <div
                    className='timeline__thumbnail'
                    style={{ left: `${pointerPosition - 40}px` }}
                >
                    <ReactPlayer
                        url={`http://localhost:3001/uploads/electronic_61695_1080p_82af158824.mp4`}
                        playing={false}
                        controls={false}
                        height={'100px'}
                    />
                </div>
            ) : null}
        </>
    );
};
