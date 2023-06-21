import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Avatar,
  Badge,
  Stack,
} from '@mui/material';
import SimpleMap from '@/components/Map'  
import { blue } from '@mui/material/colors';

const aboutus = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationFinished(true);
    }, 100);
  }, []);

  return (
    <div className='relative'>
        <h1 className={`flex justify-center text-xl pt-4 ${animationFinished ? 'opacity-100 transition-opacity duration-200' : 'opacity-10'}`}>Về chúng tôi</h1>

        <div className={`flex justify-center w-600 h-200 ${animationFinished ? 'opacity-100 transition-opacity duration-500 delay-400' : 'opacity-10'}`}>
            <SimpleMap/>
        </div>
    </div>
  )
}

export default aboutus;

        {/* <div className={`flex justify-center my-3 ${animationFinished ? 'opacity-100 transition-opacity duration-500 delay-300' : 'opacity-10'}`}>
          <Card className={`${animationFinished ? 'opacity-100 transition-opacity duration-500 delay-300' : 'opacity-0'}`} style={{width: 400}}>
            <CardContent>
              <CardMedia>
                <Avatar alt="Nguyễn Hoàng Phúc" src="https://avatars.githubusercontent.com/u/104909431?v=4" />
              </CardMedia>
              <Typography variant="h6" component="div">
                Nhà thiết kế Nguyễn Hoàng Phúc
              </Typography>
              <Typography component="div">
                MSSV: 20521767
              </Typography>
            </CardContent>
          </Card>
          <div className='w-10'></div>
          <Card className={`${animationFinished ? 'opacity-100 transition-opacity duration-500 delay-300' : 'opacity-10'}`} style={{width: 400}}>
            <CardContent>
              <CardMedia>
                <Avatar alt="Nguyễn Thanh Sang" src="https://lh3.googleusercontent.com/a/AAcHTtd7cEyJo29sFKl4Q6fyxG1263VlTR32BglWE_8D=s360-c-no" />
              </CardMedia>
              <Typography variant="h6" component="div">
                Nguyễn Thanh Sang
              </Typography>
              <Typography component="div">
                MSSV: 20521833
              </Typography>
            </CardContent>
          </Card>
        </div> */}