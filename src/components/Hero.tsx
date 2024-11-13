import React from 'react';
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface PlatformIconProps {
  Icon: React.ElementType;
  color: string;
  name: string;
}

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Create stunning</span>{' '}
                <span className="block text-indigo-600 xl:inline">social media posts</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Design and generate beautiful social media posts for all your favorite platforms in seconds. No design skills required!
              </p>
              
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <PlatformIcon Icon={Twitter} color="#1DA1F2" name="Twitter" />
                <PlatformIcon Icon={Instagram} color="#E4405F" name="Instagram" />
                <PlatformIcon Icon={Facebook} color="#1877F2" name="Facebook" />
                <PlatformIcon Icon={Linkedin} color="#0A66C2" name="LinkedIn" />
                <PlatformIcon Icon={Youtube} color="#FF0000" name="YouTube" />
                <PlatformIcon Icon={MessageSquare} color="#FF4500" name="Reddit" />
              </div>

              <div className="mt-12 flex justify-center items-center space-x-2 text-sm text-gray-500">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Powered by advanced AI technology</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function PlatformIcon({ Icon, color, name }: PlatformIconProps) {
  return (
    <div className="flex flex-col items-center group">
      <div 
        className="p-4 rounded-full transition-transform transform hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{name}</span>
    </div>
  );
}