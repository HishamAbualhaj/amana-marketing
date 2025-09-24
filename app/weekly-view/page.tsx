import { Navbar } from "../../src/components/ui/navbar";
import { Footer } from "../../src/components/ui/footer";
import LineChart from "@/src/components/ui/line-chart";
import mockup from "@/mockup.json";
import HeatMap from "@/src/components/ui/heat-map";
import {
  Campaign,
  MockupData,
  RegionalPerformance,
  WeeklyPerformance,
} from "@/src/types/marketing";
export default function WeeklyView() {
  const aggregateWeeklyData = (data: MockupData, key: string) => {
    const aggregatedData: { [key: string]: number } = {};

    data.campaigns.forEach((campaign) => {
      campaign.weekly_performance.forEach((week) => {
        if (!aggregatedData[week.week_start]) {
          aggregatedData[week.week_start] = 0;
        }
        aggregatedData[week.week_start] += week[
          key as keyof WeeklyPerformance
        ] as number;
      });
    });
    return Object.keys(aggregatedData).map((week) => ({
      week,
      value: aggregatedData[week],
    }));
  };
  const weeklyRevenueData = aggregateWeeklyData(
    mockup as MockupData,
    "revenue"
  );
  const weeklySpendData = aggregateWeeklyData(mockup as MockupData, "spend");

  return (
    <div className="flex h-screen bg-gray-900">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">Weekly View</h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6">
            <LineChart
              title="Revenue by Week"
              data={weeklyRevenueData}
              color="#3B82F6"
            />
            <LineChart
              title="Spend by Week"
              data={weeklySpendData}
              color="#10B981"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
