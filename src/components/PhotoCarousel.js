import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { fetchPhotos } from "../api/api";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import local images
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.png";
import image3 from "../images/image3.jpeg";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.jpeg";

export default function PhotoCarousel() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localImages = [
      { id: "local-1", url: image1, filename: "image1.jpeg" },
      { id: "local-2", url: image2, filename: "image2.png" },
      { id: "local-3", url: image3, filename: "image3.jpeg" },
      { id: "local-4", url: image4, filename: "image4.jpeg" },
      { id: "local-5", url: image5, filename: "image5.jpeg" },
    ];

    fetchPhotos()
      .then((res) => {
        const apiImages = res.data || [];
        setPhotos([...localImages, ...apiImages]);
      })
      .catch((err) => {
        console.error(err);
        setPhotos(localImages); // Fallback to local images only
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!photos.length) return <Text>No construction photos yet.</Text>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {photos.map((p) => (
        <Box
          key={p.id}
          p={4}
          bg="gray.50"
          border="4px solid"
          borderColor="gold"
          rounded="md"
        >
          <Image
            src={p.url}
            alt={p.filename}
            mx="auto"
            maxH="400px"
            objectFit="contain"
          />
        </Box>
      ))}
    </Slider>
  );
}
