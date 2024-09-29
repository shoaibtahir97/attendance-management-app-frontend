import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GroupAttendanceChart = ({ reportData }) => {
  const attendanceChartData = {
    series: [
      {
        name: 'Attendance Percentage',
        data: reportData.map((student) =>
          parseFloat(student.attendancePercentage)
        ),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: reportData.map((student) => student.name),
        title: {
          text: 'Students',
        },
      },
      yaxis: {
        title: {
          text: 'Attendance Percentage',
        },
        labels: {
          formatter: (value) => `${value}%`,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
      },
      title: {
        text: 'Attendance Report',
        align: 'center',
      },
    },
  };

  return (
    <ReactApexChart
      options={attendanceChartData.options}
      series={attendanceChartData.series}
      type="bar"
      height={350}
    />
  );
};

export default GroupAttendanceChart;
