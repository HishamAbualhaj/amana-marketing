"use client";
import { Footer } from "@/src/components/ui/footer";
import { Navbar } from "@/src/components/ui/navbar";
import { Campaign } from "@/src/types/marketing";
import React from "react";
import mockup from "@/mockup.json";
import PieChart from "@/src/components/ui/pie-chart";
function page() {
  function aggregateDevicePerformance(campaigns: Campaign[]) {
    const deviceTotals: Record<
      string,
      { revenue: number; spend: number; clicks: number; impressions: number }
    > = {};

    campaigns.forEach((campaign) => {
      campaign.device_performance.forEach((dp) => {
        if (!deviceTotals[dp.device]) {
          deviceTotals[dp.device] = {
            revenue: 0,
            spend: 0,
            clicks: 0,
            impressions: 0,
          };
        }

        deviceTotals[dp.device].revenue += dp.revenue;
        deviceTotals[dp.device].spend += dp.spend;
        deviceTotals[dp.device].clicks += dp.clicks;
        deviceTotals[dp.device].impressions += dp.impressions;
      });
    });

    return deviceTotals;
  }

  const deviceTotals = aggregateDevicePerformance(
    mockup.campaigns as Campaign[]
  );
  const labels = Object.keys(deviceTotals);
  const values = Object.values(deviceTotals);

  return (
    <div className="flex h-screen bg-gray-900">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">Device View</h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <PieChart
            title="Total revenue"
            labels={["Desktop", "Mobile"]}
            values={[deviceTotals.Desktop.revenue, deviceTotals.Mobile.revenue]}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default page;
