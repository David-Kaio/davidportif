import { Image, Layers } from "lucide-react";
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

  const typeBadge = work.type === "post"
    ? { label: "POST", color: "bg-pink-500/10 text-pink-400", icon: <Image className="w-3 h-3" /> }
    : { label: "CARROSSEL", color: "bg-blue-500/10 text-blue-400", icon: <Layers className="w-3 h-3" /> };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[calc(100%-2rem)] p-0 overflow-hidden rounded-lg">
        {/* Image area */}
        {work.type === "post" ? (
          <img
            src={work.images[0]}
            alt={work.title}
            className="w-full max-h-[500px] object-contain"
          />
        ) : (
          <div className="px-10 sm:px-16 pt-6">
            <Carousel opts={{ loop: true }} plugins={[WheelGesturesPlugin()]} className="focus:outline-none" tabIndex={0}>
              <CarouselContent>
                {work.images.map((src, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={src}
                      alt={`${work.title} — slide ${i + 1}`}
                      className="w-full rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* Info */}
        <div className="px-6 max-md:px-3 pb-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${typeBadge.color}`}>
                {typeBadge.icon}
                {typeBadge.label}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {work.company}
              </span>
            </div>
            <DialogTitle className="text-xl font-display">{work.title}</DialogTitle>
            <DialogDescription >{work.description}</DialogDescription>
            {
              work.link && (

            <Link to={work.link} target="_blank" rel="noopener noreferrer" className="!mt-5 w-full">
              <Button className=" w-full">Informações Adicionais</Button>
            </Link>
              )
            }
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkDetailDialog;
