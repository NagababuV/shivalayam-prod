// src/components/PhotoCarousel.js
import { Box, Image, Spinner, Text, VStack, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import { fetchPhotos } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import local images
import image1 from "../images/image1.jpeg";
import image2 from "../images/image2.png";
import image3 from "../images/image3.jpeg";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.jpeg";
import image6 from "../images/image6.jpeg";

export default function PhotoCarousel() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const localImages = [
      { id: "local-6", url: image6, filename: "image6.jpeg" },
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
        setPhotos(localImages); // fallback
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
    <Box>
      {/* 🖼️ Slider */}
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

      {/* ✨ Telugu Intro Below Slider */}
      <VStack spacing={3} mt={6} textAlign="center">
        <Text fontSize="lg" fontWeight="semibold" color="orange.600">
          రాజమహేంద్రవరం సమీపంలోని తోకాడ గ్రామంలో నిర్మాణంలో ఉన్న పవిత్రమైన దేవాలయం.
        </Text>
        <Text fontSize="lg" color="gray.700">
          భవిష్యత్ తరాల కోసం ఈ ఆధ్యాత్మిక ఆలయ నిర్మాణంలో మీరు కూడా భాగస్వాములు కావాలి.
        </Text>

        {/* 🙏 Donate Now Button */}
        <Button
          size="lg"
          colorScheme="orange"
          bg="saffron.500"
          _hover={{ bg: "orange.600" }}
          onClick={() => navigate("/donate")}
        >
          🙏 Donate Now
        </Button>
      </VStack>
    </Box>
  );
}
