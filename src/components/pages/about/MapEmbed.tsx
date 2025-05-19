const MapEmbed = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const lat = 49.188;
  const lng = 16.595;
  const zoom = 13;

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <iframe
      allowFullScreen
      src={src}
      title="My City Map"
      className="aspect-square h-full w-full"
    />
  );
};

export default MapEmbed;
