import { useEffect } from "react";
import { useRouter } from "next/router";

const Ads = () => {
  const router = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [router.asPath]);

  return (
    <div>
      <ins
        className="adsbygoogle"
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        data-ad-format="auto"
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT}
        data-full-width-responsive="true"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default Ads;
