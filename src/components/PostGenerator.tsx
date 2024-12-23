import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { 
  Camera, 
  Download,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageSquare,
  LucideIcon
} from 'lucide-react';
import { SocialMediaPost } from './SocialMediaPost';

type Platform = 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'reddit';

interface PlatformIcon {
  icon: LucideIcon;
  color: string;
}

const platformIcons: Record<Platform, PlatformIcon> = {
  twitter: { icon: Twitter, color: '#1DA1F2' },
  instagram: { icon: Instagram, color: '#E4405F' },
  facebook: { icon: Facebook, color: '#1877F2' },
  linkedin: { icon: Linkedin, color: '#0A66C2' },
  youtube: { icon: Youtube, color: '#FF0000' },
  reddit: { icon: MessageSquare, color: '#FF4500' }
};

export function PostGenerator() {
  const [platform, setPlatform] = useState<Platform>('twitter');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('@username');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [profileImageData, setProfileImageData] = useState<string | null>(null);
  const [defaultProfilePic, setDefaultProfilePic] = useState<string | null>(null);
  
  const postRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'post' | 'profile') => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please choose a file under 5MB.');
        return;
      }

      try {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to read file'));
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = base64Data;
        });

        if (type === 'post') {
          setImageUrl(base64Data);
        } else {
          setProfilePic(base64Data);
          setDefaultProfilePic(base64Data);
          setProfileImageData(base64Data);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try another image.');
      }
    }
  };

  const downloadPost = async () => {
    if (postRef.current) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const dataUrl = await toPng(postRef.current, {
          quality: 1.0,
          cacheBust: true,
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            visibility: 'visible',
            backgroundColor: 'white'
          },
          filter: (node) => {
            if (node instanceof HTMLImageElement) {
              return true;
            }
            return true;
          }
        });

        const link = document.createElement('a');
        link.download = `${platform}-post-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error generating image:', err);
        alert('Error generating image. Please try again.');
      }
    }
  };

  const getPlaceholderText = () => {
    switch (platform) {
      case 'twitter':
        return "What's happening?";
      case 'instagram':
        return 'Write a caption...';
      case 'facebook':
        return "What's on your mind?";
      case 'linkedin':
        return 'Share an update or article...';
      case 'youtube':
        return 'Add a description...';
      case 'reddit':
        return 'Create a post...';
      default:
        return 'Write something...';
    }
  };

  const preloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error preloading image:', error);
      return null;
    }
  };

  const preloadDefaultProfilePic = async () => {
    try {
      const response = await fetch('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setDefaultProfilePic(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error preloading default profile pic:', error);
    }
  };

  useEffect(() => {
    preloadDefaultProfilePic();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section - Left Side */}
          <div className="sticky top-12">
            <div className="flex justify-center">
              <SocialMediaPost
                ref={postRef}
                platform={platform}
                username={username}
                content={content}
                timestamp="Just now"
                likes={1234}
                shares={56}
                imageUrl={imageUrl}
                profilePic={profilePic || defaultProfilePic}
              />
            </div>
          </div>

          {/* Form Section - Right Side */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              {React.createElement(platformIcons[platform].icon, {
                className: "mr-3 h-8 w-8",
                style: { color: platformIcons[platform].color }
              })}
              Create Your {platform.charAt(0).toUpperCase() + platform.slice(1)} Post
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <div className="grid grid-cols-4 gap-4">
                  {(Object.entries(platformIcons) as [Platform, PlatformIcon][]).map(([key, { icon: Icon, color }]) => (
                    <button
                      key={key}
                      onClick={() => setPlatform(key)}
                      className={`p-4 rounded-xl transition-all ${
                        platform === key 
                          ? 'bg-indigo-50 ring-2 ring-indigo-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {React.createElement(Icon, {
                        className: "w-6 h-6 mx-auto",
                        style: { color }
                      })}
                      <span className="mt-2 block text-xs font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={platform === 'twitter' ? '@username' : 'Username'}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={getPlaceholderText()}
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'profile')}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Upload Profile Picture
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Image</label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'post')}
                      className="hidden"
                      id="post-upload"
                    />
                    <label
                      htmlFor="post-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Upload Post Image
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={downloadPost}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}