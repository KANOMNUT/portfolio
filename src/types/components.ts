import { ReactNode, ElementType } from 'react';

// ============================================================================
// Common Component Props
// ============================================================================

export interface NavLinkProps {
  to: string;
  children: ReactNode;
  target?: string;
}

export interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// ============================================================================
// Modal Props
// ============================================================================

export interface ModalProps {
  id: string;
  title: string;
  content: string;
  onCopy: () => void;
  isCopied: boolean;
  onClose: () => void;
}

// ============================================================================
// Skill Component Props
// ============================================================================

export interface SkillItem {
  icon: ElementType;
  name: string;
}

export interface SkillItemProps {
  Icon: ElementType;
  name: string;
}

export interface SkillSectionProps {
  title: string;
  items: SkillItem[];
}

// ============================================================================
// Experience/Timeline Props
// ============================================================================

export interface TimelineElementProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

export interface TimelineElementStyle {
  background: string;
  border: string;
  textAlign: 'left' | 'center' | 'right';
  boxShadow: string;
}
