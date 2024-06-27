'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { generateData, generateOptions } from '@/util/chart';
import { useSurveyResults } from '@/hooks/useSurveyResults';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashBoard() {
  const surveyResults = useSurveyResults();
  const counter: { [key: string]: { count: number; total: number; data: number[] } } = {};

  surveyResults.forEach((result) => {
    const target = counter[result.team];

    if (target) {
      target.count += 1;
      target.total += result.score;
      target.data = [...target.data, result.score];
    } else {
      counter[result.team] = { count: 1, total: result.score, data: [result.score] };
    }
  });

  const labels = Object.keys(counter).map((label) => (label.length > 6 ? label.slice(0, 6) + '...' : label));
  const totals = Object.values(counter).map(({ total }) => total);
  const averages = Object.values(counter).map(({ total, count }) => total / count);
  const stdDevs = Object.values(counter).map(({ total, count, data }) => {
    const avg = total / count;
    let devTotal = 0;

    data.forEach((score) => {
      const dev = score - avg;

      devTotal += dev * dev;
    });

    return Math.sqrt(devTotal / count);
  });

  return (
    <div className="grid max-w-[1500px] grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-2 xl:grid-cols-3">
      <div className="w-[430px] rounded-md bg-white px-1">
        <Bar
          options={generateOptions('팀별 총합')}
          data={generateData(labels, [{ label: '총합', data: totals, backgroundColor: 'rgba(53, 162, 235, 0.5)' }])}
        />
      </div>
      <div className="w-[430px] rounded-md bg-white px-1">
        <Bar
          options={generateOptions('팀별 평균')}
          data={generateData(labels, [{ label: '평균', data: averages, backgroundColor: 'rgba(255, 99, 132, 0.5)' }])}
        />
      </div>
      <div className="w-[430px] rounded-md bg-white px-1">
        <Bar
          options={generateOptions('팀별 표준편차')}
          data={generateData(labels, [{ label: '표준편차', data: stdDevs, backgroundColor: 'rgb(55, 151, 119, 0.5)' }])}
        />
      </div>
      <div className="w-[430px] rounded-md bg-white px-1">
        <Bar
          options={generateOptions('팀별 종합')}
          data={generateData(labels, [
            { label: '총합', data: totals, backgroundColor: 'rgba(53, 162, 235, 0.5)' },
            { label: '평균', data: averages, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
            { label: '표준편차', data: stdDevs, backgroundColor: 'rgb(55, 151, 119, 0.5)' },
          ])}
        />
      </div>
    </div>
  );
}
