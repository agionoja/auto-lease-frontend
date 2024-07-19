import logo from "~/assets/images/auto-lease-white.svg";
import { Form, useNavigation } from "@remix-run/react";
import { Input } from "~/components/input";
import { InputMsg } from "~/utils/enum";
import { emailRegex } from "~/utils/validators";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const navigation = useNavigation();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isContacting =
    navigation.formData?.get("_action") === "contact" &&
    navigation.state === "submitting";

  const handleGetEmailValidity = (isValid: boolean) => {
    setIsEmailValid(isValid);
  };

  useEffect(() => {
    if (!isContacting) {
      formRef?.current?.reset();
    }
  }, [isContacting]);

  return (
    <footer
      className={
        "bg-off-black flex w-full flex-col items-center justify-center gap-20 py-[5.5rem]"
      }
    >
      <img
        src={logo}
        alt="Auto Lease logo"
        className={"w-[17rem] shrink-0 grow-0"}
      />
      <Form
        method={"get"}
        className={"flex flex-col items-center gap-4 md:flex-row"}
      >
        <Input
          type={"email"}
          className={"outline-white"}
          placeholder={"Enter your email"}
          name={"contact"}
          validator={{
            message: InputMsg.EMAIL,
            func: emailRegex,
          }}
          onGetIsValid={handleGetEmailValidity}
        />
        <button
          aria-label={"contact-us"}
          className={`w-36 rounded-xl bg-accent py-3 text-white ${isContacting && "btn__submitting"} ${isEmailValid && "btn_all-valid"}`}
          value={"contact"}
          name={"_action"}
        >
          Contact us
        </button>
      </Form>
    </footer>
  );
}
