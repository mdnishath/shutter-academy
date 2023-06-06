import React from "react";
import Container from "./shared/Container";
import logo from "../assets/logo.svg";
import Image from "./shared/Image";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-10 bg-white dark:bg-gray-800 text-textDark dark:text-textLight">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <Image src={logo} alt="Logo" />
            <p className="mt-3 w-[400px]">
              Unleash your creative potential and master the art of photography
              with Shutter Academy.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h4 className="text-2xl">Contact Us</h4>
            <div className="flex gap-4 my-4 text-2xl">
              <FaFacebook />
              <FaLinkedin />
              <FaTwitter />
            </div>
            <div className="flex flex-col md:gap-3">
              <p>Email: info@example.com</p>
              <p>Phone: 123-456-7890</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h4 className="text-2xl">Our Location</h4>
            <div className="my-4">
              <iframe
                className="w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.01522834548!2d90.33688076344392!3d23.780771678668042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1686082759665!5m2!1sen!2sbd"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
      <div className="py-10 dark:bg-gray-700 text-textDark dark:text-textLight">
        <p className="mb-4 text-sm text-center">
          &copy; {new Date().getFullYear()} Shutter Academy. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
