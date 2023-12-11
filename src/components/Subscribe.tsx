"use client";

import { useState } from "react";
import { Button, Input, message } from "antd";
import emailjs from "@emailjs/browser";

type Props = {};

export const Subscribe: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");

  const sendEmail = () => {
    const templateParams = {
      from_name: "My Blog",
      to_name: email,
      message: "Thank you for subscribing!",
    };

    emailjs
      .send(
        "service_o9b20ah",
        "template_az88u2d",
        templateParams,
        "DRF1f4zxgWlT-Bchp"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.error("Email failed to send:", error);
        }
      );
  };

  const handleSubscribe = () => {
    if (email) {
      sendEmail();
      message.success("Thank you for subscribing!");
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="rounded bg-[#283A61] flex flex-col px-[27px] py-[38px] gap-y-5 max-w-[382px]">
          <div className="flex flex-col items-center">
            <h3 className="text-[#FFFFFF] text-2xl font-bold w-[182px] text-center mb-1">
              Subscribe To Our Newsletter
            </h3>
            <p className="text-[#DFE6FF] font-base text-lg w-[328px] text-center font-roboto">
              Get weekly food news, articles, and videos delivered to your
              inbox.
            </p>
          </div>
          <Input
            className="w-full rounded-[3px]"
            placeholder="Email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="primary"
            className="max-w-[99px] bg-primary rounded-[3px] py-[9px] px-[18px] flex items-center justify-center"
            onClick={handleSubscribe}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
