import { useEffect } from "react";

const Ads = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
      data-ad-format="auto"
      data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT}
      data-full-width-responsive="false"
      style={{ display: "block" }}
    />
  );
};

export default Ads;
