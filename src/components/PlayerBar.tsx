'use client';

// import '../custom-packages/shikwasa/src/css/base.css';
// import 'shikwasa/dist/style.css';
import '../styles/player-bar.css';
import { useRef, useEffect, useContext, useState } from 'react';

// const originalLog = console.log;
// console.log = () => {};
// import { Player } from 'shikwasa';
import Player from '../custom-packages/shikwasa/src/player';
import { usePathname } from 'next/navigation';
import { MainContext } from '@/context/mainContext';
// console.log = originalLog;

// Arweave gateway URLs no longer return Content-Length/Accept-Ranges on the
// plain path, which makes <audio> report duration=Infinity (shows as "LIVE",
// no scrubber). The /raw/ path preserves those headers and supports Range
// requests, restoring seeking.
function toSeekableArweaveUrl(src: string): string {
  if (!src) return src;

  const subdomainMatch = src.match(
    /^https:\/\/[a-z0-9]+\.arweave\.net\/([a-zA-Z0-9_-]+)/
  );
  if (subdomainMatch) {
    return `https://arweave.net/raw/${subdomainMatch[1]}`;
  }

  const plainMatch = src.match(
    /^https:\/\/arweave\.net\/(?!raw\/)([a-zA-Z0-9_-]+)/
  );
  if (plainMatch) {
    return `https://arweave.net/raw/${plainMatch[1]}`;
  }

  return src;
}

export default function PlayerBar() {
  const playerRef = useRef(null);
  const pathname = usePathname();
  const { playSrc, playImg, playTitle, playArtist } = useContext(MainContext);
  const [mounted, setMounted] = useState(false);

  let player: any;

  useEffect(() => {
    // console.log('playSrc', playSrc);

    if (!pathname.includes('outstatic') && !pathname.includes('admin')) {
      player = new Player({
        container: playerRef.current,
        audio: {
          title: playTitle,
          artist: playArtist,
          // cover: '/images/couple-pizza.png',
          cover: playImg,
          // src: '/audio/audio.mp3',
          // src: 'https://s3i4vqew3cvrd6rabrqoewqqruwkhspfzca532jrm7wx6x5e7sja.arweave.net/ltHKwJbYqxH6IAxg4loQjSyjyeXIgd3pMWftf1-k_JI',
          src: toSeekableArweaveUrl(playSrc),
        },
        download: true,
        autoplay: false,
      });
      player.play();
      setMounted(true);

      //add a link in player:
      // const titleElement = document.querySelector('.shk-title');

      // if (titleElement) {
      //   const handleClick = () => {
      //     window.location.href = '/';
      //   };

      //   titleElement.addEventListener('click', handleClick);
      // }

      // Clean up function
      return () => {
        setMounted(false);
        player.destroy();
      };
    }
  }, [playSrc]);

  // if (pathname.includes('outstatic') || pathname.includes('admin')) return null;

  return (
    <div
      className='player-container fixed bottom-0 left-0 w-full h-[110px] md:h-[92px] px-20 md:pl-14 md:pr-2 md:pt-2 bg-neutral-800 z-[10000] font-chakra max-w-[100vw] border-t-[1px] border-neutral-700'
    >
      {!mounted && (
        <div className='w-full h-full flex items-center px-4 animate-pulse'>
          <div className='w-10 h-10 rounded bg-neutral-700 shrink-0' />
          <div className='ml-4 flex-1 space-y-2'>
            <div className='h-2.5 w-1/3 rounded bg-neutral-700' />
            <div className='h-2 w-1/5 rounded bg-neutral-700' />
          </div>
        </div>
      )}
      <div ref={playerRef} />
    </div>
  );
}
