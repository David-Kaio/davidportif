import { Image, Layers, ExternalLink } from "lucide-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { DesignWork } from "@/data/designWorks";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface WorkDetailDialogProps {
  work: DesignWork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkDetailDialog = ({ work, open, onOpenChange }: WorkDetailDialogProps) => {
  if (!work) return null;

  const typeBadge =
    work.type === "post"
      ? { label: "POST", icon: <Image className="h-3.5 w-3.5" /> }
      : { label: `${work.numberOfSlides} SLIDES`, icon: <Layers className="h-3.5 w-3.5" /> };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[min(1180px,calc(100%-1.5rem))] max-w-none overflow-hidden rounded-[2rem] border-white/10 bg-[#080a17]/95 p-0 shadow-[0_34px_120px_-54px_rgba(0,0,0,1)] backdrop-blur-2xl">
        <div className="grid max-h-[92vh] grid-cols-1 overflow-hidden lg:grid-cols-[1fr_360px]">
          <div className="min-h-0 overflow-y-auto bg-black/20 p-4 sm:p-6 lg:p-8">
            {work.type === "post" ? (
              <div className="mx-auto flex min-h-[62vh] max-w-3xl items-center justify-center">
                <img
                  src={work.images[0]}
                  alt={work.title}
                  className="max-h-[78vh] w-auto max-w-full rounded-[1.4rem] object-contain shadow-[0_24px_90px_-48px_rgba(0,0,0,1)] ring-1 ring-white/10"
                />
              </div>
            ) : (
              <Carousel
                opts={{ loop: true, align: "center" }}
                plugins={[WheelGesturesPlugin()]}
                className="mx-auto max-w-3xl focus:outline-none"
                tabIndex={0}
              >
                <CarouselContent>
                  {work.images.map((src, i) => (
                    <CarouselItem key={i}>
                      <div className="flex min-h-[62vh] items-center justify-center">
                        <img
                          src={src}
                          alt={`${work.title} — slide ${i + 1}`}
                          className="max-h-[78vh] w-auto max-w-full rounded-[1.4rem] object-contain shadow-[0_24px_90px_-48px_rgba(0,0,0,1)] ring-1 ring-white/10"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 border-white/10 bg-white/10 text-white hover:bg-white/20" />
                <CarouselNext className="right-2 border-white/10 bg-white/10 text-white hover:bg-white/20" />
              </Carousel>
            )}
          </div>

          <aside className="border-t border-white/10 bg-white/[0.035] p-6 lg:border-l lg:border-t-0 lg:p-8">
            <DialogHeader>
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                {typeBadge.icon}
                {typeBadge.label}
              </div>
              <p className="text-xs uppercase tracking-[0.26em] text-white/45">{work.company}</p>
              <DialogTitle className="mt-2 text-3xl font-semibold leading-tight text-white">{work.title}</DialogTitle>
              <DialogDescription className="pt-3 text-base leading-7 text-white/60">
                {work.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 grid gap-3 text-sm text-white/55">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span>Formato</span>
                <strong className="font-medium text-white/85">{work.type === "post" ? "Post Estático" : "Carrossel"}</strong>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span>Peças</span>
                <strong className="font-medium text-white/85">{work.numberOfSlides}</strong>
              </div>
            </div>

            {work.link && (
              <Link to={work.link} target="_blank" rel="noopener noreferrer" className="mt-8 block">
                <Button className="h-12 w-full rounded-2xl bg-white text-black hover:bg-white/90">
                  Ver publicação
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkDetailDialog;
