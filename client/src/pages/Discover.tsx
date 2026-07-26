import { MainLayout } from "@/layouts";
import { LoadingState } from "@/components/states/LoadingState";
import { EmptyState } from "@/components/states/EmptyState";
import { ViewCard } from "@/components/cards/ViewCard";
import { MetricCard } from "@/components/cards/MetricCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus } from "lucide-react";
import { mockViews } from "@/mock/views";

/**
 * Discover 页面
 *
 * 应用首页，展示市场中的观点。
 * 包含：Protocol Stats、Search、Trending Views、Featured Views、Categories
 *
 * @component
 */

export default function DiscoverPage() {
  const isLoading = false;
  const views = mockViews.slice(0, 6);

  return (
    <MainLayout>
      {/* Protocol Stats Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Protocol Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total TVL"
            value="$2.5M"
            dataType="currency"
            change={12.5}
            changeLabel="+12.5% (24h)"
          />
          <MetricCard
            label="24h Volume"
            value="$1.2M"
            dataType="currency"
            change={8.3}
            changeLabel="+8.3% (24h)"
          />
          <MetricCard
            label="Active Views"
            value="1,234"
            dataType="text"
            change={-2.1}
            changeLabel="-2.1% (24h)"
          />
          <MetricCard
            label="Total Creators"
            value="456"
            dataType="text"
            change={5.7}
            changeLabel="+5.7% (24h)"
          />
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="mb-12">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search views, creators, topics..."
              className="flex-1"
            />
            <Button variant="default" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create View
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">All</Badge>
            <Badge variant="secondary">Trending</Badge>
            <Badge variant="secondary">Featured</Badge>
            <Badge variant="secondary">New</Badge>
          </div>
        </div>
      </section>

      {/* Trending Views Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="text-2xl font-bold">Trending Convictions</h2>
        </div>

        {isLoading ? (
          <LoadingState type="skeleton" count={6} />
        ) : views.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {views.map((view) => (
              <ViewCard
                key={view.id}
                view={{
                  ...view,
                  creator: {
                    address: view.creator,
                    name: view.creator,
                    avatar: view.creatorAvatar,
                  },
                  longPrice: view.price,
                  shortPrice: 1 - view.price,
                }}
                metrics={[
                  { id: "price", label: "Price", value: `$${view.price}`, type: "currency" },
                  { id: "change", label: "Change 24h", value: `${view.change24h}%`, type: "percentage" },
                  { id: "tvl", label: "TVL", value: `$${(view.tvl / 1000000).toFixed(1)}M`, type: "currency" },
                  {
                    id: "volume",
                    label: "24h Volume",
                    value: `$${(view.volume24h / 1000000).toFixed(2)}M`,
                    type: "currency",
                  },
                ]}
                onClick={() => {
                  // Navigate to view detail
                  console.log("View detail:", view.id);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No views found"
            description="Be the first to create a view"
            action={{
              label: "Create View",
              onClick: () => {
                console.log("Create view");
              },
            }}
          />
        )}
      </section>

      {/* Featured Views Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Views</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {views.slice(0, 3).map((view) => (
            <ViewCard
              key={view.id}
              view={{
                ...view,
                creator: {
                  address: view.creator,
                  name: view.creator,
                  avatar: view.creatorAvatar,
                },
                longPrice: view.price,
                shortPrice: 1 - view.price,
              }}
              metrics={[
                { id: "price", label: "Price", value: `$${view.price}`, type: "currency" },
                { id: "tvl", label: "TVL", value: `$${(view.tvl / 1000000).toFixed(1)}M`, type: "currency" },
                { id: "participants", label: "Participants", value: view.participants.toString(), type: "number" },
              ]}
              onClick={() => {
                console.log("View detail:", view.id);
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "Crypto",
            "Politics",
            "Sports",
            "Finance",
            "Technology",
            "Entertainment",
          ].map((category) => (
            <button
              key={category}
              className="p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-center font-medium"
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
