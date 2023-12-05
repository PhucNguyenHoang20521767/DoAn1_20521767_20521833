import ImageSlider from "@/components/ImageSlider";

const slides = [
  {
    url: "/tree_banner.webp",
    title: "Save30",
    id: "1",
  },
  {
    url: "/save_40.webp",
    title: "Save40",
    id: "2",
  },
  {
    url: "/video.gif",
    title: "Tree",
    id: "3",
  },
  {
    url: "https://images.pexels.com/photos/313776/pexels-photo-313776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Phucdeptrai",
    id: "4",
  },
];

const CampaignCarousel = () => {
  return (
    <div>
      <ImageSlider slides={slides}></ImageSlider>
    </div>
  );
};

export default CampaignCarousel;
