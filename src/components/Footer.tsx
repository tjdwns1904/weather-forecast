const FB_LINK = "https://www.facebook.com/profile.php?id=100008141106316";
const INSTA_LINK = "https://www.instagram.com/tjdwns99/";
const mailto = "mailto:seongjoonhong99@gmail.com?body=Hello!"
function Footer() {
    return (
        <div className="footer-container">
            <div className="contact-container">
                <a className="mail icon" title="Click here to send me an Email!" href={mailto}></a>
                <a className="fb icon" title="Visit my Facebook" href={FB_LINK} target="_blank"></a>
                <a className="insta icon" title="Visit my Instagram" href={INSTA_LINK} target="_blank"></a>
            </div>
            <div className="line"></div>
            <p>@copyright: 2023 SJH All Rights Reserved.</p>
        </div>
    )
}

export default Footer;