"use client";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";

export default function DownloadModal({url}) {
    const router  = useRouter();
    const handleDownload = () => {
        confirm("Do you want to download this lecture note?")
        router.push(url)
      }

    return (
        <>
        <div className="absolute min-h-screen w-full h-full bg-black/40 z-40"/>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full sm:max-w-md md:max-w-lg lg:max-w-lg bg-beige rounded-lg flex flex-col items-center justify-center space-y-2 p-6">
            <h3>Click the button below to download lecture note</h3>
            <button onClick={handleDownload} className="rounded-md text-white bg-deepGreen px-4 py-3" type="button"><FaDownload className="inline-block mr-1"/>Download</button>
        </div>
        </>
    )
}