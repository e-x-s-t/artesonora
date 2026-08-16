'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import CarouselCard from './CarouselCard';
import { useMediaQuery } from '../util/useMediaQuery';

const HorizontalScrollCarousel = ({ newestPosts }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const isDesktop = useMediaQuery('md');

  const x = isDesktop
    ? useTransform(scrollYProgress, [0, 1], ['0.5%', '-40%'])
    : useTransform(scrollYProgress, [0, 1], ['0.5%', '-80%']);

  return (
    <section
      ref={targetRef}
      className='relative md:w-[calc(100vw-52px)] h-[350vh] md:h-[300vh] bg-neutral-900  border-t-[1px] border-neutral-700'
    >
      <div className='sticky top-0 flex w-full h-[calc(100vh)] md:h-[calc(100vh-92px)] items-center overflow-hidden'>
        <h2 className='absolute top-20 md:top-6 left-6 mb-6 text-5xl md:text-7xl pr-10 w-full text-right text-white/20 font-chakra'>
          EM DESTAQUE
        </h2>
        <motion.div style={{ x }} className='flex mt-8 gap-4'>
          {newestPosts.map((post, i) => {
            if (!isDesktop && i > 2) return null;
            if (isDesktop && i > 3) return null;
            return <CarouselCard post={post} key={i} />;
          })}
        </motion.div>
        <div className='pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40'>
          <span className='text-xs uppercase tracking-widest font-semibold'>
            Continue rolando
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 5v14M19 12l-7 7-7-7' />
          </motion.svg>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
