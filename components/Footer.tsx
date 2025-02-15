'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Youtube, Phone, Mail } from 'lucide-react';
import FooterBanner from './FooterBanner';

const Footer: React.FC = () => {
    return (
        <footer>
            <FooterBanner />
            <div className="bg-[#121c1a] pt-40 xl:pt-64 pb-8 text-white">
                <div className='px-10 xl:px-24 flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-28 mb-20 lg:mb-36 xl:mb-40 text-[15px] md:text-[17px] font-normal lg:font-medium'>
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-8 xl:gap-16 w-full">
                        <div className="flex flex-col gap-6 w-full">
                            <Link href="/">
                            <Image src="/yellow-logo.png" alt="EkoStudy logo" width={160} height={40} className="w-32 md:w-40" />
                            </Link>
                            <div className="flex flex-row gap-4">
                                <Link href="https://facebook.com" target="_blank"><Facebook size={20} /></Link>
                                <Link href="https://x.com" target="_blank"><Twitter size={20} /></Link>
                                <Link href="https://youtube.com" target="_blank"><Youtube size={20} /></Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <h3 className="text-[#92B76D] font-bold text-base">OUR OFFICE</h3>
                            <p>EkoStudy, 104101 Ikorodu, <br /> Lagos.</p>
                            <div className='flex flex-col gap-1 mt-2 lg:mt-0'>
                                <Link href="tel:+2348096044860" className="flex flex-row items-center">
                                    <Phone size={20} />
                                    <span className="ml-2">+234 809 604 4860</span>
                                </Link>
                                <Link href="mailto:johnayobami77@proton.me" className="flex flex-row items-center">
                                    <Mail size={20} />
                                    <span className="ml-2">johnayobami77@proton.me</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-10 lg:gap-16 xl:gap-28 w-full">
                        <div className="flex flex-col gap-6 w-full">
                            <h3 className="text-[#92B76D] font-bold text-base">ABOUT</h3>
                            <ul className="space-y-1">
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/courses">Courses</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li><Link href="/instructor">Become an Instructor</Link></li>
                                <li><Link href="/events">Events</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <h3 className="text-[#92B76D] font-bold text-base">LINKS</h3>
                            <ul className="space-y-1">
                                <li><Link href="/partners">Be a Partner</Link></li>
                                <li><Link href="/admission">Admission</Link></li>
                                <li><Link href="#">Features</Link></li>
                                <li><Link href="#">Help Center</Link></li>
                                <li><Link href="/resources">Resources</Link></li>
                                <li><Link href="/donate">Donate</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className='mx-10 xl:mx-24 mb-2 h-[1px] border-[#4C5F4E] bg-[#4C5F4E]' />
                <div className='px-10 xl:px-24 mt-4 flex flex-col lg:flex-row gap-2 lg:gap-0 items-start lg:items-center justify-between'>
                    <span>EkoStudy 2024 - <Link href="https://github.com/codegallantx" target="_blank" className="text-[#4C5F4E] hover:text-[#FFCA0D] transition-all duration-300 ease-in-out">CodeGallantX</Link></span>
                    <span className="flex flex-row gap-2 lg:gap-4">
                        <Link href="#" className="hover:text-[#FFCA0D] transition-all duration-300 ease-in-out">Privacy Policy</Link>
                        <span className='text-[#FFCA0D] text-lg font-thin'>|</span>
                        <Link href="#" className="hover:text-[#FFCA0D] transition-all duration-300 ease-in-out">Our Terms</Link>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;