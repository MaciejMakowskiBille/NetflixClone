import { useVideoContext } from '../../../providers/videoProvider';

export const TimeLeft = (): JSX.Element => {
    const { timestamp, duration } = useVideoContext();
    const timeLeft = duration ? duration - timestamp : 0;

    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    const x = (
        <>
            {hours ? <p>{hours < 10 ? '0' + hours : hours}:</p> : null}
            <p>{minutes < 10 ? '0' + minutes : minutes}:</p>
            <p>{seconds < 10 ? '0' + seconds : seconds}</p>
        </>
    );
    return x;
};
