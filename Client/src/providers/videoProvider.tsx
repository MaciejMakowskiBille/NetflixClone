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
    seriesInfo: Season | null;
    episodeInfo: Episode | null;
    duration: number;
    setEpisodeInfo(episode: Episode | null): void;
    setSeriesInfo(seriesInfo: Season): void;
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
    seriesInfo: null,
    episodeInfo: null,
    duration: 0,
    setEpisodeInfo: () => {},
    setSeriesInfo: () => {},
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
    const [seriesInfo, setSeriesInfo] = useState<Season | null>(null);
    const [episodeInfo, setEpisodeInfo] = useState<Episode | null>(null);

    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [timestamp, setTimeStamp] = useState(0);
    const [previewTimestamp, setPreviewTimeStamp] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const player = useRef<ReactPlayer>(null);
    const previewPlayer = useRef<ReactPlayer>(null);

    const contextValue: DefaultcontextValue = {
        videoData,
        duration,
        volume,
        timestamp,
        isPlaying,
        player,
        previewPlayer,
        previewTimestamp,
        seriesInfo,
        episodeInfo,
        setEpisodeInfo,
        setSeriesInfo,
        setPreviewTimeStamp,
        setIsPlaying,
        setDuration,
        setTimeStamp,
        setVolume,
        setVideoData,
    };

    return (
        <VideoContext.Provider value={contextValue}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => useContext(VideoContext);
