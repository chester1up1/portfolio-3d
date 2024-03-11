import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const formInitialValues = { name: "", email: "", message: "" };

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState(formInitialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        "service_40in5p6",
        "template_w9c22nb",
        {
          from_name: form.name,
          to_name: "Vladyslav",
          from_email: form.email,
          to_email: "vladyslav.samoylyk@gmail.com",
          message: form.message,
        },
        "g6WlnaVTzxZ6RF7Co"
      )
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm(formInitialValues);
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        };
      });
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in tuch</p>
        <h3 className={styles.heroHeadText}>Contact:</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <FormInput
            type="text"
            name="name"
            label="Your Name"
            placeholder="What's your name?"
            value={form.name}
            onChange={handleChange}
          />
          <FormInput
            type="email"
            name="email"
            label="Your Email"
            placeholder="What's your email?"
            value={form.email}
            onChange={handleChange}
          />
          <FormInput
            type="textarea"
            name="message"
            label="Your Message"
            placeholder="What do you want to say?"
            value={form.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

const FormInput = ({ type, name, label, placeholder, value, onChange }) => {
  if (type === "textarea")
    return (
      <label className="flex flex-col">
        <span className="text-white font-medium mb-4">{label}</span>
        <textarea
          rows="7"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
        />
      </label>
    );
  return (
    <label className="flex flex-col">
      <span className="text-white font-medium mb-4">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
      />
    </label>
  );
};

export default SectionWrapper(Contact, "contact");
