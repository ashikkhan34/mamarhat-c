import { Facebook } from "lucide-react";
import Image from "next/image";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { DiWebplatform } from "react-icons/di";

export default function Footer() {
  return (
    <div>
      <footer className=" bg-green-500 text-white py-10 px-6 md:px-20">
        <div className="container mx-auto">
          <Image
            width={400}
            height={200}
            src="/image/logo.png"
            className="w-20 mb-12"
            alt="footer"
          ></Image>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 container mx-auto items-center justify-center">
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Collaborate</h3>
            <ul className="space-y-2 text-sm">
              <li>Careers Explore</li>
              <li>Become a rider</li>
              <li>Your Team</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Follow us on</h3>
            <div className="flex items-center gap-3 text-xl">
              <a
                className="hover:text-blue-500 "
                target="_blank"
                href="https://www.facebook.com/story.php/?id=61553457934754&story_fbid=876864877476668"
              >
                <Facebook />
              </a>
              <a
                className="hover:text-green-500"
                target="_blank"
                href="https://web.whatsapp.com/"
              >
                <FaWhatsapp />
              </a>
              <a
                className="hover:text-blue-500"
                target="_blank"
                href="https://www.linkedin.com/in/dev-ashikkhan/"
              >
                <FaLinkedin />
              </a>
              <a target="_blank" href="https://p-ashikkhan.vercel.app/">
                <DiWebplatform />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className=" bg-green-900 p-4  ">
        <div className="text-sm justify-between flex items-center text-white  mx-auto container">
          <p>© Copyright 2025 mamarhat all right reserved</p>
          <p>Privacy policy</p>
        </div>
      </div>
    </div>
  );
}
