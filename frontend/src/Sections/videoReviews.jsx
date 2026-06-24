import React from 'react';

// Fake video URLs (Yahan tu apni backend ya public URLs daal dena)
const videoReviews = [
  { id: 1, src: "/reviews/rev1.mp4", name: "Rahul M." },
  { id: 2, src: "/reviews/rev2.mp4", name: "Anjali S." },
  { id: 3, src: "/reviews/rev3.mp4", name: "Vikram K." },
  { id: 4, src: "/reviews/rev4.mp4", name: "Sneha P." },
];

export default function VideoReviews() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">Real Reviews from Real People</h2>
        <p className="text-xs text-neutral-400 font-medium">See what our premium community says about us</p>
      </div>

      {/* Video Grid Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoReviews.map((video) => (
          <div 
            key={video.id} 
            className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-100 shadow-md group cursor-pointer"
          >
            {/* 🎥 The Loop Video Element */}
            <video
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay for Name Branding */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <div className="flex items-center space-x-2">
                {/* Green Live/Pulse Dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-white font-bold text-xs md:text-sm tracking-wide shadow-sm">
                  {video.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}