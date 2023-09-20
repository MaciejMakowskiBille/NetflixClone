import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useVideoContext } from '../../../providers/videoProvider';
import { serverURL } from '../../../utils/links';

type PointerProps = {
    showPointer: boolean;
    showThumbnail: boolean;
};

export const Pointer = ({ showPointer, showThumbnail }: PointerProps) => {
    const [pointerPosition, setPointerPosition] = useState(0);

    const { previewPlayer, videoData } = useVideoContext();

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
                        url={`${serverURL}${videoData?.video}`}
                        playing={false}
                        controls={false}
                        height={'100px'}
                        ref={previewPlayer}
                    />
                </div>
            ) : null}
        </>
    );
};
