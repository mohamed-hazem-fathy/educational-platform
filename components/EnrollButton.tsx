"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
// import { createStripeCheckout } from "@/actions/creatStripeCheckout"; // تأكد من تعديل المسار حسب مشروعك

function EnrollButton({
    courseId,
    isEnrolled,
}: { courseId: string; isEnrolled: boolean }) {
    const { user, isLoaded: isUserLoaded } = useUser();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleEnroll = async (courseId: string) => {
        startTransition(async () => {
            try {
                const userId = user?.id;
                if (!userId) return;

                // const { url } = await createStripeCheckout(userId, courseId);
                // if (url) {
                //     router.push(url);
                // }
            } catch (error) {
                console.error("Error in handleEnroll:", error);
                throw new Error("Failed to enroll in course");
            }
        });
    };

    // Show loading state while checking user is loaded
    if (!isUserLoaded || isPending) {
        return (
            <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
            </div>
        );
    }

    // Show enrolled state with link to course
    if (isEnrolled) {
        return (
            <Link
                prefetch={false}
                href={`/dashboard/courses/${courseId}`}
                className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
            >
                <span>Access Course</span>
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
        );
    }

    return (
        <button
            onClick={() => handleEnroll(courseId)}
            className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12 ${
                isPending || !user?.id
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100"
                    : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10"
            }`}
            disabled={!user?.id || isPending}
        >
            {!user?.id ? (
                <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
                    Sign in to Enroll
                </span>
            ) : (
                <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
                    Enroll Now
                </span>
            )}

            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}
        </button>
    );
}

export default EnrollButton;
