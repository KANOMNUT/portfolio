import { TimelineElementStyle } from '@/types';

// ============================================================================
// Component Styles
// ============================================================================

export const componentStyles = {
  // Section styles
  section: {
    base: 'text-center font-mono mb-20 text-black',
    withSpacing: 'mb-20 sm:mb-20',
  },

  // Title styles
  title: {
    h2: 'text-3xl mb-15 text-center font-mono',
    h3: 'text-3xl font-medium capitalize mb-8 text-center',
  },

  // Button styles
  button: {
    base: 'flex p-4 hover:text-gray-950 dark:hover:text-gray-100 items-center gap-2 rounded-full hover:scale-[1.15] active:scale-105 transition-all duration-200 cursor-pointer text-black dark:text-white',
    modal: 'btn bg-slate-300 dark:bg-slate-700 text-black dark:text-white hover:text-white hover:bg-zinc-800 dark:hover:bg-zinc-600',
    copy: 'btn bg-slate-100 dark:bg-slate-800 text-black dark:text-white hover:text-white sm:visible invisible',
    copied: 'btn bg-slate-300 dark:bg-slate-700 text-black dark:text-white sm:hover:text-white sm:visible invisible',
    resume: 'group bg-white dark:bg-gray-800 px-5 py-3 flex items-center gap-2 rounded-full hover:scale-[1.15] active:scale-105 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md text-black dark:text-white',
  },

  // Skill styles
  skills: {
    section: 'text-center font-mono sm:mb-20 mb-20 text-black',
    title: 'text-3xl font-medium capitalize mb-8 text-center',
    skillList: 'flex flex-wrap justify-center gap-2 text-lg text-gray-800',
    skillItem: 'bg-white border border-black/[0.1] rounded-xl px-4 py-2 flex items-center hover:scale-[1.15]',
    icon: 'mr-2',
  },

  // Modal styles
  modal: {
    container: 'modal modal-middle sm:modal-middle',
    box: 'modal-box text-black dark:text-white bg-slate-100 dark:bg-slate-800',
    title: 'font-mono font-semibold text-2xl',
    content: 'py-4 px-4 font-mono text-lg sm:text-xl',
    action: 'modal-action',
    copyContainer: 'text-lg py-2 items-center px-2 absolute bottom-4 left-4',
  },

  // Navbar styles
  navbar: {
    base: 'flex w-full filter drop-shadow-md bg-white px-5 py-4 h-20 items-center z-50',
    sticky: 'fixed top-0',
    desktop: 'hidden md:flex text-black font-mono',
    mobileButton: 'z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden bg-transparent border-none p-0',
    link: 'mx-4 my-5',
  },

  // Footer styles
  footer: {
    base: 'bg-white text-black font-mono w-full p-2 z-50 text-sm sm:text-base transition-opacity duration-300',
    container: 'flex justify-between items-center flex-col sm:flex-row',
    copyright: 'flex items-center sm:mb-0',
    powered: 'flex items-center mt-2 sm:mt-0',
  },
} as const;

// ============================================================================
// Timeline Styles
// ============================================================================

export const timelineElementStyle: TimelineElementStyle = {
  background: 'rgb(255, 255, 255)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  textAlign: 'left',
  boxShadow: '10px 5px 5px lightgrey',
};

export const timelineArrowStyle = {
  borderRight: '7px solid rgb(255,255,255)',
};

export const timelineIconStyle = {
  background: 'rgb(255, 255, 255)',
};
