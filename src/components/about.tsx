'use client';

import React, { useState, useCallback } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaDownload, FaGitlab } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { ModalProps } from '@/types';
import { contactInfo } from '@/data/contact';
import { componentStyles } from '@/constants/styles';

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  content,
  onCopy,
  isCopied,
  onClose
}) => (
  <dialog
    id={id}
    className={componentStyles.modal.container}
    data-testid={`modal-${id}`}
  >
    <div className={componentStyles.modal.box}>
      <h3 className={componentStyles.modal.title}>{title}</h3>
      <div className="sm:flex sm:flex-col sm:justify-center sm:gap-2">
        <p className={componentStyles.modal.content}>{content}</p>
      </div>
      <div className={componentStyles.modal.action}>
        <form method="dialog">
          <button
            className={componentStyles.button.modal}
            onClick={onClose}
            data-testid="close-button"
          >
            Close
          </button>
        </form>
      </div>
      <div className={componentStyles.modal.copyContainer}>
        {isCopied ? (
          <span
            className={componentStyles.button.copied}
            data-testid="copied-indicator"
          >
            Copied
          </span>
        ) : (
          <button
            className={componentStyles.button.copy}
            onClick={onCopy}
            data-testid="copy-button"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  </dialog>
);

const About: React.FC = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }

      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setCopyError(null);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to copy text';
      console.error('Error copying text:', error);
      setCopyError(errorMessage);
      setIsCopied(false);
    }
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsCopied(false);
    setCopyError(null);
  }, []);

  const openModal = useCallback((modalId: string): void => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      console.warn(`Modal with id "${modalId}" not found or showModal not supported`);
    }
  }, []);

  return (
    <section
      id="about"
      className="mb-12 text-center sm:mb-10 text-black dark:text-white font-mono pt-10 sm:pt-12"
      data-testid="about-section"
    >
      <h2 className={`${componentStyles.title.h2} dark:text-white`}>About Me</h2>

      <div className="flex flex-col items-center justify-center font-mono">
        <div className="mb-5 mt-4 sm:mb-5 sm:mt-5 px-4 font-medium">
          <h1 className="text-2xl sm:text-2xl font-bold mb-2 dark:text-white">
            Hello, I'm Thanachai (Nut)
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed dark:text-gray-300">
            Cloud DevOps Engineer with 3 years of hands-on experience managing Azure Hybrid Cloud infrastructure,
            Google Cloud infrastructure and building DevSecOps CI/CD pipelines for Kubernetes-based deployments.
            I enjoy streamlining processes through automation, improving observability with effective monitoring,
            and constantly fine-tuning cloud environments to boost performance and reliability. I'm passionate
            about solving problems and helping teams move faster and more confidently in the cloud.
          </p>
        </div>

        {copyError && (
          <div
            className="mb-4 p-2 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded"
            data-testid="error-message"
          >
            {copyError}
          </div>
        )}

        <div className="flex gap-8 flex-wrap justify-center">
          <button
            className={componentStyles.button.base}
            onClick={() => openModal('email')}
            aria-label="Contact via email"
            data-testid="email-button"
          >
            <SiGmail className="text-3xl" />
          </button>

          <button
            className={componentStyles.button.base}
            onClick={() => openModal('mobile_phone')}
            aria-label="Contact via phone"
            data-testid="phone-button"
          >
            <BiSolidPhoneCall className="text-3xl" />
          </button>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className={componentStyles.button.base}
            href={contactInfo.linkedin}
            aria-label="Visit LinkedIn profile"
            data-testid="linkedin-link"
          >
            <BsLinkedin className="text-3xl" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className={componentStyles.button.base}
            href={contactInfo.gitlab}
            aria-label="Visit GitLab profile"
            data-testid="gitlab-link"
          >
            <FaGitlab className="text-4xl" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className={componentStyles.button.resume}
            href={contactInfo.resume}
            aria-label="Download resume"
            data-testid="resume-link"
          >
            <span className="flex font-mono text-lg">
              My Resume <FaDownload className="text-xl ml-2" />
            </span>
          </a>
        </div>
      </div>

      <Modal
        id="email"
        title="EMAIL ADDRESS"
        content={contactInfo.email}
        onCopy={() => copyToClipboard(contactInfo.email)}
        isCopied={isCopied}
        onClose={handleCloseModal}
      />

      <Modal
        id="mobile_phone"
        title="MOBILE NUMBER"
        content={contactInfo.mobile}
        onCopy={() => copyToClipboard(contactInfo.mobile)}
        isCopied={isCopied}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default About;
