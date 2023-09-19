import React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Badge,
  Stack,
} from "@mui/material";
import SimpleMap from "@/components/Map";
import { blue } from "@mui/material/colors";
import ScrollToTop from "@/utils/scroll_top";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <ScrollToTop />
      <div className="max-w-4xl text-center">
        <h1 className="mb-4 mt-4 text-4xl font-bold">Về chúng tôi</h1>
        <p className="text-lg">
          Tại cửa hàng nội thất của chúng tôi, bạn sẽ tìm thấy những đồ nội thất
          chất lượng cao với giá cả phải chăng. Chúng tôi tin rằng mọi người nên
          có quyền sử dụng đồ nội thất đẹp và tiện dụng giúp cải thiện ngôi nhà
          và phong cách sống của họ.
        </p>
      </div>
      <h2 className="my-1 text-3xl font-bold">Địa chỉ</h2>
      <div className="flex max-w-4xl justify-center">
        <SimpleMap />
      </div>
      <div className="max-w-4xl space-y-8">
        <div className="flex items-center space-x-4">
          <Avatar
            alt="Nguyễn Hoàng Phúc"
            src="https://avatars.githubusercontent.com/u/104909431?v=4"
          />
          <div>
            <Typography variant="h6" component="div">
              Nguyễn Hoàng Phúc
            </Typography>
            <Typography component="div">Founder and Lead Designer</Typography>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar
            style={{ marginBottom: 10 }}
            alt="Nguyễn Thanh Sang"
            src="https://lh3.googleusercontent.com/a/AAcHTtd7cEyJo29sFKl4Q6fyxG1263VlTR32BglWE_8D=s360-c-no"
          />
          <div className="mb-4">
            <Typography variant="h6" component="div">
              Nguyễn Thanh Sang
            </Typography>
            <Typography component="div">Co-founder and CEO</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
