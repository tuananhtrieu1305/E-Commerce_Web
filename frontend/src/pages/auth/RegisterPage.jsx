import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Auth_Cover from "./Auth_Cover";

import { Button, Checkbox, Form, Input } from "antd";

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="relative w-screen h-screen">
      <Auth_Cover />

      <div className="absolute top-0 right-0 bottom-0 left-0 px-[20px] lg:px-0 lg:left-1/2 flex items-center justify-center flex-col">
        <div className="max-w-[460px]">
          <Logo />
          <h1 className="mt-[50px] poppins-medium text-3xl text-center">
            Sign Up
          </h1>
          <div className="mt-[10px] mb-[60px] poppins-medium text-[15px] leading-[22px] text-[#9E9DA8] text-center">
            Let’s create your account and Shop like a pro and save money.
          </div>
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                className="h-[50px] poppins-medium text-[18px] leading-[26px]"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                className="h-[50px] poppins-medium text-[18px] leading-[26px]"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="h-[50px] poppins-medium text-[18px] leading-[26px]"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-transparent! border-[1px]! border-[#000]! text-[#1A162E]! h-[50px]! rounded-[10px] poppins-medium text-[18px] leading-[26px] w-full hover:bg-[#da9e08]!"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-[110px] poppins-regular text-[#9E9DA8] text-[18px] text-center">
            You have an account yet?{" "}
            <Link
              to={"/login"}
              className="text-[#0071DC] poppins-semibold cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
