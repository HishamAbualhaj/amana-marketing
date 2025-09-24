import { Navbar } from "../../src/components/ui/navbar";
import { Footer } from "../../src/components/ui/footer";
import { Campaign, RegionalPerformance } from "@/src/types/marketing";
import HeatMap from "@/src/components/ui/heat-map";
import mockup from "@/mockup.json";

export default function RegionView() {
  function aggregateRegionalData(campaigns: Campaign[]) {
    const aggregation: Record<string, RegionalPerformance> = {};

    campaigns.forEach((campaign) => {
      campaign.regional_performance.forEach((rp) => {
        const key = `${rp.region}-${rp.country}`;
        if (!aggregation[key]) {
          aggregation[key] = { ...rp }; // initialize
        } else {
          // aggregate numeric fields
          aggregation[key].impressions += rp.impressions;
          aggregation[key].clicks += rp.clicks;
          aggregation[key].conversions += rp.conversions;
          aggregation[key].spend += rp.spend;
          aggregation[key].revenue += rp.revenue;

          // recalculate rates
          aggregation[key].ctr =
            aggregation[key].clicks / aggregation[key].impressions || 0;
          aggregation[key].conversion_rate =
            aggregation[key].conversions / aggregation[key].clicks || 0;
          aggregation[key].cpc =
            aggregation[key].spend / aggregation[key].clicks || 0;
          aggregation[key].cpa =
            aggregation[key].spend / aggregation[key].conversions || 0;
          aggregation[key].roas =
            aggregation[key].revenue / aggregation[key].spend || 0;
        }
      });
    });

    return Object.values(aggregation);
  }
  return (
    <div className="flex h-screen bg-gray-900">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">Region View</h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 mt-6">
            <HeatMap
              title="Regional Performance View"
              data={aggregateRegionalData(mockup.campaigns as Campaign[])}
              valueKey={"revenue"}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
