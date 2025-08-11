'use client';

import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const dailyData = [
  { period: 'S', consumption: 1200 },
  { period: 'M', consumption: 2100 },
  { period: 'T', consumption: 1800 },
  { period: 'W', consumption: 2400 },
  { period: 'T', consumption: 2200 },
  { period: 'F', consumption: 1900 },
  { period: 'S', consumption: 1400 },
];

const weeklyData = [
  { period: 'Week 1', consumption: 12_500 },
  { period: 'Week 2', consumption: 14_200 },
  { period: 'Week 3', consumption: 13_800 },
  { period: 'Week 4', consumption: 15_100 },
];

const monthlyData = [
  { period: 'Jan', consumption: 45_000 },
  { period: 'Feb', consumption: 42_000 },
  { period: 'Mar', consumption: 38_000 },
  { period: 'Apr', consumption: 35_000 },
  { period: 'May', consumption: 32_000 },
  { period: 'Jun', consumption: 40_000 },
];

const chartConfig = {
  consumption: {
    label: 'Energy Consumption',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export default function Home() {
  const [activeTab, setActiveTab] = useState('daily');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getTotalConsumption = () => {
    const data = getCurrentData();
    return data.reduce((total, item) => total + item.consumption, 0);
  };

  const getUnit = () => {
    switch (activeTab) {
      case 'monthly':
        return 'kWh';
      case 'weekly':
        return 'kWh';
      default:
        return 'kWh';
    }
  };

  return (
    <div className="flex min-h-dvh w-screen items-center justify-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div>
        <Card className="rounded-4xl p-2.5">
          <CardContent className="rounded-3xl bg-white p-4">
            <Tabs
              className="w-full"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <div className="flex justify-between gap-4 lg:min-w-lg">
                <div>
                  <p>Energy Consumption</p>
                  <h3 className="font-medium text-3xl text-foreground">
                    {getTotalConsumption().toLocaleString()} ({getUnit()})
                  </h3>
                </div>

                <div>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <div>
                <TabsContent className="mt-0" value="daily">
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={dailyData}
                      margin={{ top: 20, left: 20 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        axisLine={false}
                        dataKey="period"
                        tickLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        axisLine={false}
                        domain={[0, 3000]}
                        tickFormatter={(value) => `${getUnit()}${value}`}
                        tickLine={false}
                        tickMargin={8}
                        ticks={[0, 1500, 3000]}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                        cursor={false}
                        formatter={(value) => [`${value}kWh `, 'Consumption']}
                      />
                      <Bar
                        dataKey="consumption"
                        fill="url(#greyGradient)"
                        radius={8}
                      />
                      <defs>
                        <linearGradient
                          id="greyGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="100%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent className="mt-0" value="weekly">
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={weeklyData}
                      margin={{ top: 20, left: 20 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        axisLine={false}
                        dataKey="period"
                        tickLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        axisLine={false}
                        domain={[0, 18_000]}
                        tickFormatter={(value) => `${getUnit()}${value}`}
                        tickLine={false}
                        tickMargin={8}
                        ticks={[0, 9000, 18_000]}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                        cursor={false}
                        formatter={(value) => [`${value}kWh `, 'Consumption']}
                      />
                      <Bar
                        dataKey="consumption"
                        fill="url(#greyGradient)"
                        radius={8}
                      />
                      <defs>
                        <linearGradient
                          id="greyGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="100%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent className="mt-0" value="monthly">
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={monthlyData}
                      margin={{ top: 20, left: 20 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        axisLine={false}
                        dataKey="period"
                        tickLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        axisLine={false}
                        domain={[0, 50_000]}
                        tickFormatter={(value) => `${getUnit()}${value}`}
                        tickLine={false}
                        tickMargin={8}
                        ticks={[0, 25_000, 50_000]}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                        cursor={false}
                        formatter={(value) => [`${value}kWh `, 'Consumption']}
                      />
                      <Bar
                        dataKey="consumption"
                        fill="url(#greyGradient)"
                        radius={8}
                      />
                      <defs>
                        <linearGradient
                          id="greyGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="100%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
          <CardHeader className="px-3">
            <CardDescription className="text-base">
              Used Energy <span>&#xB7;</span> This Year
            </CardDescription>
            <CardTitle className="flex items-center gap-3 font-medium">
              <span className="text-2xl text-foreground">232,000 (kwh)</span>
              <div className="flex items-center gap-1.5">
                <ArrowUp
                  className="size-5 rounded-full bg-lime-400 text-black"
                  strokeWidth={1.3}
                />
                <span className="text-xl">18%</span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
