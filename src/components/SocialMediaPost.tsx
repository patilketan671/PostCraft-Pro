import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat2, 
  BookmarkPlus,
  MoreHorizontal,
  Send,
  ThumbsUp,
  Share,
  MessageSquare,
  Play,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface SocialMediaPostProps {
  platform: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  shares: number;
  imageUrl: string | null;
  profilePic: string | null;
}

export const SocialMediaPost = React.forwardRef<HTMLDivElement, SocialMediaPostProps>(
  ({ platform, username, content, timestamp, likes, shares, imageUrl, profilePic }, ref) => {
    const getPlatformStyles = () => {
      switch (platform) {
        case 'twitter':
          return 'bg-black text-white';
        case 'instagram':
          return 'bg-white border border-gray-200';
        case 'facebook':
          return 'bg-white shadow-sm';
        case 'linkedin':
          return 'bg-white border border-gray-200';
        case 'youtube':
          return 'bg-white shadow-lg';
        case 'tiktok':
          return 'bg-black text-white';
        case 'reddit':
          return 'bg-white border border-gray-200';
        default:
          return 'bg-white';
      }
    };

    const renderTwitterActions = () => (
      <div className="mt-4 flex items-center justify-between text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">24</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
          <Repeat2 size={18} />
          <span className="text-sm">{shares}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-pink-400 transition-colors">
          <Heart size={18} />
          <span className="text-sm">{likes}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
          <BookmarkPlus size={18} />
        </button>
      </div>
    );

    const renderInstagramActions = () => (
      <>
        <div className="mt-4 flex items-center justify-between text-gray-900">
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600 transition-colors">
              <Heart size={24} />
            </button>
            <button className="hover:text-gray-600 transition-colors">
              <MessageCircle size={24} />
            </button>
            <button className="hover:text-gray-600 transition-colors">
              <Send size={24} />
            </button>
          </div>
          <button className="hover:text-gray-600 transition-colors">
            <BookmarkPlus size={24} />
          </button>
        </div>
        <div className="mt-2">
          <p className="font-semibold text-sm">{likes} likes</p>
        </div>
      </>
    );

    const renderFacebookActions = () => (
      <div className="mt-4 border-t border-b border-gray-200 py-1">
        <div className="flex items-center justify-between text-gray-600">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 rounded-lg transition-colors">
            <ThumbsUp size={20} />
            <span>Like</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 rounded-lg transition-colors">
            <MessageSquare size={20} />
            <span>Comment</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Share size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    );

    const renderLinkedInActions = () => (
      <div className="mt-4 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between text-gray-600">
          <button className="flex items-center space-x-1">
            <ThumbsUp size={18} />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center space-x-1">
            <MessageSquare size={18} />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1">
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    );

    const renderYouTubeActions = () => (
      <div className="mt-4">
        <div className="flex items-center justify-between text-gray-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1">
              <ThumbsUp size={20} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1">
              <MessageSquare size={20} />
              <span>Comments</span>
            </button>
          </div>
          <button className="flex items-center space-x-1">
            <Share size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    );

    const renderTikTokActions = () => (
      <div className="mt-4 flex flex-col space-y-4 items-end text-white">
        <button className="flex flex-col items-center">
          <Heart size={24} />
          <span className="text-xs">{likes}</span>
        </button>
        <button className="flex flex-col items-center">
          <MessageCircle size={24} />
          <span className="text-xs">Comments</span>
        </button>
        <button className="flex flex-col items-center">
          <BookmarkPlus size={24} />
          <span className="text-xs">Save</span>
        </button>
        <button className="flex flex-col items-center">
          <Share2 size={24} />
          <span className="text-xs">Share</span>
        </button>
      </div>
    );

    const renderRedditActions = () => (
      <div className="mt-4 flex items-center space-x-4 text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="hover:text-orange-500">
            <ArrowUp size={20} />
          </button>
          <span className="font-medium">{likes}</span>
          <button className="hover:text-blue-500">
            <ArrowDown size={20} />
          </button>
        </div>
        <button className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded">
          <MessageSquare size={18} />
          <span className="text-sm">Comments</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded">
          <Share2 size={18} />
          <span className="text-sm">Share</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded">
          <BookmarkPlus size={18} />
          <span className="text-sm">Save</span>
        </button>
      </div>
    );

    const renderActions = () => {
      switch (platform) {
        case 'twitter':
          return renderTwitterActions();
        case 'instagram':
          return renderInstagramActions();
        case 'facebook':
          return renderFacebookActions();
        case 'linkedin':
          return renderLinkedInActions();
        case 'youtube':
          return renderYouTubeActions();
        case 'tiktok':
          return renderTikTokActions();
        case 'reddit':
          return renderRedditActions();
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={`w-[600px] rounded-xl ${getPlatformStyles()}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={profilePic || '/default-avatar.png'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  crossOrigin="anonymous"
                  loading="eager"
                />
              </div>
              <div>
                <p className={`font-bold ${platform === 'twitter' || platform === 'tiktok' ? 'text-white' : 'text-gray-900'}`}>
                  {username}
                </p>
                <p className={`text-sm ${platform === 'twitter' || platform === 'tiktok' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {timestamp}
                </p>
              </div>
            </div>
            <button className={`${platform === 'twitter' || platform === 'tiktok' ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700`}>
              <MoreHorizontal size={20} />
            </button>
          </div>

          <p className={`text-lg whitespace-pre-wrap mb-3 ${platform === 'twitter' || platform === 'tiktok' ? 'text-white' : 'text-gray-900'}`}>
            {content}
          </p>

          {imageUrl && (
            <div className={`rounded-xl overflow-hidden ${platform === 'instagram' ? 'border border-gray-200' : ''}`}>
              <img src={imageUrl} alt="Post" className="w-full h-auto" />
            </div>
          )}

          {renderActions()}
        </div>
      </div>
    );
  }
);