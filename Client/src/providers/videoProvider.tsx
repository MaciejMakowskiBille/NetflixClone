import {
    useContext,
    createContext,
    PropsWithChildren,
    useState,
    useRef,
    RefObject,
} from 'react';
import ReactPlayer from 'react-player';

type DefaultcontextValue = {
    videoData: MovieDataType | Episode | null;
    volume: number;
    timestamp: number;
    previewTimestamp: number;
    isPlaying: boolean;
    player: RefObject<ReactPlayer> | null;
    previewPlayer: RefObject<ReactPlayer> | null;
    setIsPlaying(isPlaying: boolean): void;
    setDuration(duration: number): void;
    setTimeStamp(timestamp: number): void;
    setPreviewTimeStamp(timestamp: number): void;
    setVolume(volume: number): void;
    setVideoData(videoData: MovieDataType | Episode | null): void;
};

const defaultContextValue: DefaultcontextValue = {
    videoData: null,
    volume: 50,
    timestamp: 0,
    isPlaying: false,
    player: null,
    previewPlayer: null,
    previewTimestamp: 0,
    setIsPlaying: () => {},
    setDuration: () => {},
    setTimeStamp: () => {},
    setPreviewTimeStamp: () => {},
    setVolume: () => {},
    setVideoData: () => {},
};

const VideoContext = createContext(defaultContextValue);

export const VideoProvider: React.FC<PropsWithChildren<unknown>> = ({
    children,
}) => {
    const [videoData, setVideoData] = useState<MovieDataType | Episode | null>(
        null
    );

    const [volume, setVolume] = useState(50);
    const [timestamp, setTimeStamp] = useState(0);
    const [previewTimestamp, setPreviewTimeStamp] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const player = useRef<ReactPlayer>(null);
    const previewPlayer = useRef<ReactPlayer>(null);

    const setDuration = (duration: number) => {
        if (videoData) {
            const newData: MovieDataType | Episode = {
                ...videoData,
                duration,
            };
            setVideoData(newData);
        }
    };

    return (
        <VideoContext.Provider
            value={{
                videoData,
                volume,
                timestamp,
                isPlaying,
                player,
                previewPlayer,
                previewTimestamp,
                setPreviewTimeStamp,
                setIsPlaying,
                setDuration,
                setTimeStamp,
                setVolume,
                setVideoData,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => useContext(VideoContext);
