import { Navbar } from "../../src/components/ui/navbar";
import { CardMetric } from "../../src/components/ui/card-metric";
import { Footer } from "../../src/components/ui/footer";
import {
  Users,
  UserCheck,
  TrendingUp,
  Target,
  MousePointerClick,
  DollarSign,
} from "lucide-react";
import { BarChart } from "@/src/components/ui/bar-chart";
import { Table } from "@/src/components/ui/table";
import mockup from "@/mockup.json";
import { TableColumn } from "@/src/components/ui/table";
export default function DemographicView() {
  // --- Aggregate by gender ---
  const campaigns = mockup.campaigns;

  const maleData = campaigns
    .flatMap((c) => c.demographic_breakdown)
    .filter((d) => d.gender === "Male");
  const femaleData = campaigns
    .flatMap((c) => c.demographic_breakdown)
    .filter((d) => d.gender === "Female");

  const maleClicks = maleData.reduce((sum, d) => sum + d.performance.clicks, 0);
  const maleSpend =
    campaigns.reduce((sum, c) => {
      return (
        sum +
        c.device_performance.reduce(
          (s, d) => s + d.spend * (d.impressions / c.impressions),
          0
        )
      );
    }, 0) / 2; // simplified split
  const maleRevenue = campaigns.reduce((sum, c) => sum + c.revenue * 0.4, 0);

  const femaleClicks = femaleData.reduce(
    (sum, d) => sum + d.performance.clicks,
    0
  );
  const femaleSpend = maleSpend; // same simplified split
  const femaleRevenue = campaigns.reduce((sum, c) => sum + c.revenue * 0.6, 0);

  // --- Bar Chart by Age ---
  const ageGroups = ["18-24", "25-34", "35-44"];
  const spendByAge = ageGroups.map((age) => ({
    label: age,
    value: campaigns.reduce((sum, c) => {
      const group = c.demographic_breakdown.find((d) => d.age_group === age);
      return (
        sum +
        (group ? c.spend * (group.performance.impressions / c.impressions) : 0)
      );
    }, 0),
  }));

  const revenueByAge = ageGroups.map((age) => ({
    label: age,
    value: campaigns.reduce((sum, c) => {
      const group = c.demographic_breakdown.find((d) => d.age_group === age);
      return (
        sum +
        (group
          ? c.revenue * (group.performance.impressions / c.impressions)
          : 0)
      );
    }, 0),
  }));

  // --- Table Configs ---
  const columns: TableColumn[] = [
    {
      key: "age_group",
      header: "Age Group",
      sortable: true,
      sortType: "string" as const,
    },
    {
      key: "impressions",
      header: "Impressions",
      sortable: true,
      sortType: "number" as const,
    },
    {
      key: "clicks",
      header: "Clicks",
      sortable: true,
      sortType: "number" as const,
    },
    {
      key: "conversions",
      header: "Conversions",
      sortable: true,
      sortType: "number" as const,
    },
    {
      key: "ctr",
      header: "CTR %",
      sortable: true,
      sortType: "number" as const,
    },
    {
      key: "conversion_rate",
      header: "Conversion %",
      sortable: true,
      sortType: "number" as const,
    },
  ];

  const maleTableData = maleData.map((d) => ({
    age_group: d.age_group,
    impressions: d.performance.impressions,
    clicks: d.performance.clicks,
    conversions: d.performance.conversions,
    ctr: d.performance.ctr,
    conversion_rate: d.performance.conversion_rate,
  }));

  const femaleTableData = femaleData.map((d) => ({
    age_group: d.age_group,
    impressions: d.performance.impressions,
    clicks: d.performance.clicks,
    conversions: d.performance.conversions,
    ctr: d.performance.ctr,
    conversion_rate: d.performance.conversion_rate,
  }));
  return (
    <div className="flex h-screen bg-gray-900">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-12">
          <div className="px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold">
                Demographic View
              </h1>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-8 p-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <CardMetric
                title="Male Clicks"
                value={maleClicks}
                icon={<MousePointerClick className="w-4 h-4" />}
              />
              <CardMetric
                title="Male Spend"
                value={`$${maleSpend.toFixed(2)}`}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <CardMetric
                title="Male Revenue"
                value={`$${maleRevenue.toLocaleString()}`}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <CardMetric
                title="Female Clicks"
                value={femaleClicks}
                icon={<MousePointerClick className="w-4 h-4" />}
              />
              <CardMetric
                title="Female Spend"
                value={`$${femaleSpend.toFixed(2)}`}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <CardMetric
                title="Female Revenue"
                value={`$${femaleRevenue.toLocaleString()}`}
                icon={<TrendingUp className="w-4 h-4" />}
              />
            </div>

            {/* Bar Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BarChart title="Spend by Age Group" data={spendByAge} />
              <BarChart title="Revenue by Age Group" data={revenueByAge} />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 gap-6">
              <Table
                title="Male Age Group Performance"
                columns={columns}
                data={maleTableData}
                showIndex
              />
              <Table
                title="Female Age Group Performance"
                columns={columns}
                data={femaleTableData}
                showIndex
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
