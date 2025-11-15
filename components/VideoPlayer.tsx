import React from 'react';
import Icon from './Icon';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          aria-label="Close video player"
        >
          <Icon name="X" size={24} />
        </button>
        <div className="aspect-video">
          <video controls autoPlay className="w-full h-full">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-4 bg-gray-800">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
