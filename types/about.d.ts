import { ReactNode } from 'react';

export interface Page {
  title: string;
  breadcrumb: {
    name: string;
    path: string;
  }[];
}

export interface Testimonial {
  id: number;
  name: string;
  department: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface VisionItem {
  title: string;
  description: string;
  icon: ReactNode;
}