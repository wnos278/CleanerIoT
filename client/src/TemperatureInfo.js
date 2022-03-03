import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import axios from 'axios';
import Typography from '@mui/material/Typography';

async function getTemperatureData(time_begin, time_end) {

  axios.post(`http://localhost:3000/message/room-info`, {
    "time_begin":time_begin,
    "time_end":time_end,
  })
    .then(res => {
      const homeinfos = res.data["results"];
      var temperAVG = 0;
      var count_record = 0;
      homeinfos.forEach(element => {
        temperAVG += element["temperature"];
        count_record += 1;
      })
      return temperAVG/count_record;
    })
}

export default function TemperatureInfo() {
  const theme = useTheme();
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time_begin = Date.parse(date + ' 00:00:00');
  var time_end = Date.parse(date + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
  // let datatemp = await getTemperatureData(time_begin / 1000, time_end / 1000);
  let datatemp = 20;
  return (
    <React.Fragment>
      <Title>Nhiệt độ trung bình trong ngày</Title>
      <Typography component="p" variant="h4">
        {datatemp}
      </Typography>
    </React.Fragment>
  );
}