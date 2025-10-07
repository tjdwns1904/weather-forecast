const FB_LINK = "https://www.facebook.com/profile.php?id=100008141106316";
const INSTA_LINK = "https://www.instagram.com/tjdwns99/";
const mailto = "mailto:seongjoonhong99@gmail.com?body=Hello!"
export default function Footer() {
  return (
    <div className="py-8 text-center">
      <hr />
      <p className="text-lg text-white mt-8 mb-4">© 2025 SEONGJOON HONG. All Rights Reserved.</p>
      <div className="flex justify-center gap-2 pb-4">
        <a className="mail icon" title="Click here to send me an Email!" href={mailto}></a>
        <a className="fb icon" title="Visit my Facebook" href={FB_LINK} target="_blank"></a>
        <a className="insta icon" title="Visit my Instagram" href={INSTA_LINK} target="_blank"></a>
      </div>
    </div>
  )
}