import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      {/* Newsletter Section */}
      <div className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="text-4xl">✉️</div>
            <div>
              <h2 className="text-2xl font-semibold">
                Join Our Newsletter For $10 Off
              </h2>
              <p className="text-sm mt-1 text-emerald-50">
                Subscribe to our latest newsletter get news about upcoming
                sales
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-[450px] px-4 py-3 rounded-md text-gray-700 bg-white outline-none"
              />

              <button className="bg-emerald-200 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-emerald-300 transition">
                SUBSCRIBE
              </button>
            </div>

            <label className="flex items-center gap-3 mt-4 text-sm">
              <input
                type="checkbox"
                className="w-5 h-5 border border-white"
              />
              <span>
                I agree to the terms and conditions and the privacy policy
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* About */}
          <div>
            <h3 className="font-semibold text-2xl mb-5">
              Our Information
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Welcome to our store, where we pride ourselves on providing
              exceptional products and unparalleled customer service. Our store
              is a haven for those who appreciate quality, style, and
              innovation.
            </p>

            <div className="flex gap-3">
              <img
                src="/app-store.png"
                alt="App Store"
                className="h-12 object-contain"
              />
              <img
                src="/google-play.png"
                alt="Google Play"
                className="h-12 object-contain"
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-2xl mb-5">Products</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#">Prices Drop</a></li>
              <li><a href="#">New Products</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Stores</a></li>
              <li><a href="#">Fruits</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-2xl mb-5">Your Account</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Sign In</a></li>
              <li><a href="#">Create Account</a></li>
              <li><a href="#">Credit Slip</a></li>
              <li><a href="#">Discount</a></li>
              <li><a href="#">Wishlist</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-2xl mb-5">Our Company</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Legal Notice</a></li>
              <li><a href="#">Terms And Conditions</a></li>
              <li><a href="#">Secure Payment</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-2xl mb-5">Contact Us</h3>

            <div className="space-y-5 text-gray-600">
              <div>
                <p>Cravento Demo</p>
                <p className="mt-2 leading-8">
                  99 New Theme St, XY, USA 12345,
                  <br />
                  Beside the Sun point land.
                  <br />
                  United States
                </p>
              </div>

              <p>Call us: +00 123-456-789</p>

              <p>Email us: admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Social */}
          <div className="flex gap-4">
            {[
              <FaFacebookF />,
              <FaXTwitter />,
              <FaInstagram />,
              <FaPinterestP />,
              <FaYoutube />,
            ].map((icon, index) => (
              <button
                key={index}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-center">
            Copyright © Cravento. All Rights Reserved
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <img src="/amex.png" alt="Amex" className="h-7" />
            <img src="/mastercard.png" alt="Mastercard" className="h-7" />
            <img src="/visa.png" alt="Visa" className="h-7" />
            <img src="/card.png" alt="Card" className="h-7" />
            <img src="/paypal.png" alt="Paypal" className="h-7" />
          </div>
        </div>
      </div>
    </footer>
  );
}