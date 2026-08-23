import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";

export default function ContactCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <div className="rounded-3xl border border-line bg-surface p-8 sm:p-14">
          <p className="label-mono">// get in touch</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tightest text-ink">
            Have something worth building?{" "}
            <span className="text-ink-muted">Let&apos;s talk.</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-secondary">
            Looking for internships, research collaborations, and software
            engineering roles. If you&apos;re building something interesting,
            reach out. I will reply.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as={Link} to="/contact" variant="primary">
              Start a conversation
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </Button>
            <Button
              as="a"
              href="mailto:sadatahmedrafi12@gmail.com"
              variant="ghost"
            >
              sadatahmedrafi@gmail.com
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
