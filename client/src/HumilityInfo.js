import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

async function getAverageHumidity(time_begin, time_end) {
  axios.post(`http://localhost:3000/message/room-info`, {
    "time_begin":time_begin,
    "time_end":time_end,
  })
    .then(res => {
      const homeinfos = res.data["results"];
      var temperAVG = 0;
      var count_record = 0;
      homeinfos.forEach(element => {
        humiAVG += element["humidity"];
        count_record += 1;
      })
      return temperAVG/count_record;
    })
}

export default function HumilityInfo() {
  let time_begin = 0;
  let time_end = 10;
  let averageHumidity = 80;
  //let averageHumidity = getAverageHumidity(time_begin, time_end);
  return (
    <React.Fragment>
      <Title>Độ ẩm hiện tại</Title>
      <Typography component="p" variant="h4">
        {averageHumidity}
      </Typography>
    </React.Fragment>
  );
}
