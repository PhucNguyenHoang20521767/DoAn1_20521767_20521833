export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  // const api: string = process.env.GOOGLE_MAP_API_KEY;
  const api = "AIzaSyCWmOxG3Js0Oj5s5QH5puY2ohr5ujUHQhw";

  return (
    // Important! Always set the container height explicitly
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15672.924961103885!2d106.78399968715821!3d10.870008899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1687184377785!5m2!1sen!2s"
      width="1200"
      height="900"
      loading="lazy"
    ></iframe>
  );
}
