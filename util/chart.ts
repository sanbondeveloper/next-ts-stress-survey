export function generateOptions(title: string) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    maxBarThickness: '60',
  };
}

export function generateData(
  labels: string[],
  datasets: { label: string; data: number[]; backgroundColor?: string }[],
) {
  return {
    labels,
    datasets,
  };
}
