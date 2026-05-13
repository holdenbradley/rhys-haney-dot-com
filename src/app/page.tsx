import PhotoGrid from "@/components/gallery/PhotoGrid";
import { getAllGalleryImages } from "@/lib/get-gallery-images";

export default function Home() {
  const images = getAllGalleryImages();

  return (
    <PhotoGrid
      images={images}
      priorityCount={8}
      linkToCategory
      emptyMessage="Photos coming soon — drop them into public/images/portfolio/<category>/."
    />
  );
}
