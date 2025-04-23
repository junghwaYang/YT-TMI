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
  긍정수,
  부정수,
  중립수,
}: {
  긍정수: number;
  부정수: number;
  중립수: number;
}) {
  const chartData = React.useMemo(
    () => [
      { reaction: '긍정', visitors: 긍정수, fill: '#4ade80' },
      { reaction: '부정', visitors: 부정수, fill: '#f87171' },
      { reaction: '중립', visitors: 중립수, fill: '#facc15' },
    ],
    [긍정수, 부정수, 중립수]
  );

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>댓글 분석 차트</CardTitle>
        <CardDescription>가장 최신 100개 코멘트 분석표</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          해당 감정 분석은 정확하지 않을 수 있습니다.
        </div>
      </CardFooter>
    </Card>
  );
}
