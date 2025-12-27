import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReelItem {
  image: string;
  title: string;
  description?: string;
  date?: string;
  link?: string;
}

interface ReelCarouselProps {
  reels: ReelItem[];
  autoPlaySpeed?: number;
  pauseOnHover?: boolean;
  showControls?: boolean;
  className?: string;
}

export function ReelCarousel({
  reels,
  autoPlaySpeed = 4000,
  pauseOnHover = true,
  showControls = true,
  className,
}: ReelCarouselProps) {
  const [currentReel, setCurrentReel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<number | null>(null);

  const startProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    
    progressRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextReel();
          return 0;
        }
        return prev + (100 / (autoPlaySpeed / 16));
      });
    }, 16);
  };

  const stopProgress = () => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  };

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % reels.length);
    setProgress(0);
  };

  const prevReel = () => {
    setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
    setProgress(0);
  };

  const jumpToReel = (index: number) => {
    setCurrentReel(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (isPlaying && !isPaused) {
      startProgress();
    } else {
      stopProgress();
    }
    return () => stopProgress();
  }, [isPlaying, isPaused, autoPlaySpeed, currentReel]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  if (reels.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-card/50 rounded-xl">
        <p className="text-muted-foreground">No items available</p>
      </div>
    );
  }

  const currentReelData = reels[currentReel];

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReel}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={currentReelData.image}
            alt={currentReelData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-20">
        <div className="flex-1 flex gap-1">
          {reels.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden"
              onClick={() => jumpToReel(index)}
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{
                  width:
                    index === currentReel
                      ? `${progress}%`
                      : index < currentReel
                      ? '100%'
                      : '0%',
                  transition: index === currentReel ? 'none' : 'width 0.3s ease',
                }}
              />
            </div>
          ))}
        </div>

        {showControls && (
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            {currentReelData.date && (
              <motion.p
                className="text-sm text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentReelData.date}
              </motion.p>
            )}
            
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentReelData.title}
            </motion.h3>

            {currentReelData.description && (
              <motion.p
                className="text-sm sm:text-base text-white/90 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentReelData.description}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showControls && (
        <>
          <button
            onClick={prevReel}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextReel}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
