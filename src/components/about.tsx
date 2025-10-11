'use client'
import React, { useState, useCallback } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaDownload, FaGitlab } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { BiSolidPhoneCall } from 'react-icons/bi'

interface ContactInfo {
  mobile: string
  email: string
  linkedin: string
  gitlab: string
  resume: string
}

interface ModalProps {
  id: string
  title: string
  content: string
  onCopy: () => void
  isCopied: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ id, title, content, onCopy, isCopied, onClose }) => (
  <dialog id={id} className="modal modal-middle sm:modal-middle" data-testid={`modal-${id}`}>
    <div className="modal-box text-black bg-slate-100">
      <h3 className="font-mono font-semibold text-2xl">{title}</h3>
      <div className="sm:flex sm:flex-col sm:justify-center sm:gap-2">
        <p className="py-4 px-4 font-mono text-lg sm:text-xl">{content}</p>
      </div>
      <div className="modal-action">
        <form method="dialog">
          <button 
            className="btn bg-slate-300 text-black hover:text-white hover:bg-zinc-800" 
            onClick={onClose}
            data-testid="close-button"
          >
            Close
          </button>
        </form>
      </div>
      <div className='text-lg py-2 items-center px-2 absolute bottom-4 left-4'>
        {isCopied ? (
          <span 
            className="btn bg-slate-300 text-black sm:hover:text-white sm:visible invisible"
            data-testid="copied-indicator"
          >
            Copied
          </span>
        ) : (
          <button
            className="btn bg-slate-100 text-black hover:text-white sm:visible invisible"
            onClick={onCopy}
            data-testid="copy-button"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  </dialog>
)

const About: React.FC = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [copyError, setCopyError] = useState<string | null>(null)

  const contactInfo: ContactInfo = {
    mobile: "+6683-990-7607",
    email: "thanachai.tre@gmail.com",
    linkedin: "https://www.linkedin.com/in/thanachai-t-bb2622208/",
    gitlab: "https://gitlab.com/thanachai.tre/",
    resume: "https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf"
  }

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available')
      }
      
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setCopyError(null)
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to copy text'
      console.error('Error copying text:', error)
      setCopyError(errorMessage)
      setIsCopied(false)
    }
  }, [])

  const handleCloseModal = useCallback((): void => {
    setIsCopied(false)
    setCopyError(null)
  }, [])

  const openModal = useCallback((modalId: string): void => {
    const modal = document.getElementById(modalId) as HTMLDialogElement
    if (modal && typeof modal.showModal === 'function') {
      modal.showModal()
    } else {
      console.warn(`Modal with id "${modalId}" not found or showModal not supported`)
    }
  }, [])

  const buttonBaseClasses = "flex p-4 hover:text-gray-950 items-center gap-2 rounded-full hover:scale-[1.15] active:scale-105 transition cursor-pointer"

  return (
    <section id='about' className="mb-25 text-center sm:mb-25 text-black font-mono" data-testid="about-section">
      <h2 className="text-3xl mb-5 mt-7 text-center font-mono">About Me</h2>
      
      <div className="flex flex-col items-center justify-center font-mono">
        <div className="mb-5 mt-4 sm:mb-5 sm:mt-5 px-4 font-medium">
          <h1 className='text-2xl sm:text-2xl font-bold mb-2'>Hello, I'm Thanachai (Nut)</h1>
          <p className='text-lg sm:text-xl leading-relaxed'>
            Cloud DevOps Engineer with 3 years of hands-on experience managing Azure Hybrid Cloud infrastructure, 
            Google Cloud infrastructure and building DevSecOps CI/CD pipelines for Kubernetes-based deployments. 
            I enjoy streamlining processes through automation, improving observability with effective monitoring, 
            and constantly fine-tuning cloud environments to boost performance and reliability. I'm passionate 
            about solving problems and helping teams move faster and more confidently in the cloud.
          </p>
        </div>

        {/* Error display */}
        {copyError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded" data-testid="error-message">
            {copyError}
          </div>
        )}

        <div className='flex gap-2 flex-wrap justify-center'>
          {/* Email Button */}
          <button 
            className={buttonBaseClasses}
            onClick={() => openModal('email')}
            aria-label="Contact via email"
            data-testid="email-button"
          >
            <SiGmail className='text-3xl' />
          </button>

          {/* Phone Button */}
          <button 
            className={buttonBaseClasses}
            onClick={() => openModal('mobile_phone')}
            aria-label="Contact via phone"
            data-testid="phone-button"
          >
            <BiSolidPhoneCall className='text-3xl' />
          </button>

          {/* LinkedIn Link */}
          <a 
            target='_blank' 
            rel="noopener noreferrer" 
            className={buttonBaseClasses}
            href={contactInfo.linkedin}
            aria-label="Visit LinkedIn profile"
            data-testid="linkedin-link"
          >
            <BsLinkedin className='text-3xl' />
          </a>

          {/* GitLab Link */}
          <a 
            target='_blank' 
            rel="noopener noreferrer" 
            className={buttonBaseClasses}
            href={contactInfo.gitlab}
            aria-label="Visit GitLab profile"
            data-testid="gitlab-link"
          >
            <FaGitlab className='text-4xl' />
          </a>

          {/* Resume Download */}
          <a 
            target='_blank' 
            rel="noopener noreferrer" 
            className="group bg-white ml-2 px-4 py-5 sm:py-2 flex p-2 hover:text-gray-950 items-center gap-1 rounded-full hover:scale-[1.15] cursor-pointer"
            href={contactInfo.resume}
            aria-label="Download resume"
            data-testid="resume-link"
          >
            <span className='flex font-mono text-lg'>
              My Resume <FaDownload className='text-xl ml-2' />
            </span>
          </a>
        </div>
      </div>

      {/* Email Modal */}
      <Modal
        id="email"
        title="EMAIL ADDRESS"
        content={contactInfo.email}
        onCopy={() => copyToClipboard(contactInfo.email)}
        isCopied={isCopied}
        onClose={handleCloseModal}
      />

      {/* Mobile Modal */}
      <Modal
        id="mobile_phone"
        title="MOBILE NUMBER"
        content={contactInfo.mobile}
        onCopy={() => copyToClipboard(contactInfo.mobile)}
        isCopied={isCopied}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default About
