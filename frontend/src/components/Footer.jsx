import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-pink-700 text-white py-6">
      <div className="container mx-auto flex flex-col items-center gap-4">
        
        {/* lnKarT Title */}
        <h1 className="text-2xl font-bold" title="WebSite">lnKarT</h1>

        {/* Social Media Icons */}
        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:text-pink-600"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/ln-tripathy-089378327/" className="hover:text-blue-600"><FaLinkedin /></a>
          <a href="https://x.com/LN_Tripathy" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="https://github.com/lntripathy" className="hover:text-black"><FaGithub /></a>
        </div>

        {/* Copyright */}
        <marquee scrollamount="16" className="text-sm text-gray-200">
           © {new Date().getFullYear()} lnKarT | All Rights Reserved | Designed and Developed by LN Tripathy | Follow us on LinkedIn, GitHub, Twitter, and Instagram | Innovating eCommerce, One Cart at a Time 🚀 | SHOP ON
        </marquee>
      </div>
    </footer>
  );
};

export default Footer;
