'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  positive: {
    label: '긍정',
    color: 'var(--sentiment-positive)',
  },
  negative: {
    label: '부정',
    color: 'var(--sentiment-negative)',
  },
  neutral: {
    label: '중립',
    color: 'var(--sentiment-neutral)',
  },
} satisfies ChartConfig;

export function CommentChart({
  positive,
  negative,
  neutral,
}: {
  positive: number;
  negative: number;
  neutral: number;
}) {
  const chartData = React.useMemo(
    () => [
      { reaction: '긍정', visitors: positive, fill: '#4ade80' },
      { reaction: '부정', visitors: negative, fill: '#f87171' },
      { reaction: '중립', visitors: neutral, fill: '#facc15' },
    ],
    [positive, negative, neutral]
  );

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col w-full gap-2 xl:h-full">
      <CardHeader className="items-center justify-center text-center pb-0">
        <CardTitle>댓글 분석 차트</CardTitle>
        <CardDescription>가장 최신 100개 코멘트 분석표</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="reaction"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          총 댓글 수
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs">
        <div className="leading-none text-muted-foreground">
          해당 감정 분석은 정확하지 않을 수 있습니다.
        </div>
      </CardFooter>
    </Card>
  );
}
