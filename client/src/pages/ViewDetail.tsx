import { DetailLayout } from "@/layouts";
import { LoadingState } from "@/components/states/LoadingState";
import { MetricCard } from "@/components/cards/MetricCard";
import { ActivityItem } from "@/components/common/ActivityItem";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, MessageSquare } from "lucide-react";
import { mockViews } from "@/mock/views";

/**
 * View Detail 页面
 *
 * 显示单个观点的详细信息。
 * 按照信息层级展示：
 * 1. View + Price + Stake（第一屏）
 * 2. Chart + Volume + Protocol Metrics（第二屏）
 * 3. Activity Feed（第三屏）
 * 4. Description（第四屏）
 * 5. Discussion（第五屏 - 预留）
 *
 * @component
 */

export default function ViewDetailPage() {
  // 从 URL 参数获取 View ID（实际应用中）
  const viewId = "1";
  const view = mockViews[0];

  if (!view) {
    return (
      <DetailLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">View not found</h1>
          <Button>Back to Discover</Button>
        </div>
      </DetailLayout>
    );
  }

  const breadcrumbs = [
    { label: "Discover", href: "/" },
    { label: view.title, href: "#", isCurrent: true },
  ];

  return (
    <DetailLayout breadcrumbs={breadcrumbs}>
      {/* First Screen: View + Price + Stake */}
      <section className="mb-12 pb-12 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* View Information */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-4">{view.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{view.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {view.description}
              </p>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
              <Avatar className="w-12 h-12">
                <AvatarImage src={view.creatorAvatar} />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{view.creator}</p>
                <p className="text-sm text-muted-foreground">Creator</p>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </div>

          {/* Price & Stake Panel */}
          <div className="space-y-4">
            {/* Price Display */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Current Price
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Long</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${view.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Short</p>
                  <p className="text-2xl font-bold text-red-500">
                    ${(1 - view.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Stake Button */}
            <Button className="w-full" size="lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Stake Conviction
            </Button>

            {/* Quick Stats */}
            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">TVL</span>
                <span className="font-semibold">
                  ${(view.tvl / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">24h Volume</span>
                <span className="font-semibold">
                  ${(view.volume24h / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Participants
                </span>
                <span className="font-semibold">{view.participants}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Screen: Chart + Volume + Protocol Metrics */}
      <section className="mb-12 pb-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Market Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="24h Change"
            value={`${view.change24h}%`}
            dataType="percentage"
            change={view.change24h}
            changeLabel="vs 7d"
          />
          <MetricCard
            label="24h Volume"
            value={`$${(view.volume24h / 1000000).toFixed(2)}M`}
            dataType="currency"
          />
          <MetricCard
            label="Total TVL"
            value={`$${(view.tvl / 1000000).toFixed(1)}M`}
            dataType="currency"
          />
          <MetricCard
            label="Participants"
            value={view.participants.toString()}
            dataType="text"
          />
        </div>

        {/* Chart Placeholder */}
        <div className="mt-8 p-12 rounded-lg bg-card border border-border text-center">
          <p className="text-muted-foreground">
            Chart will be displayed here (TradingView integration)
          </p>
        </div>
      </section>

      {/* Third Screen: Activity Feed */}
      <section className="mb-12 pb-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ActivityItem
              key={i}
              type="stake"
              actor={{ name: "0x1234...5678" }}
              action="Staked $1,234 on Long"
              timestamp="2 hours ago"
              value="$1,234"
            />
          ))}
        </div>
      </section>

      {/* Fourth Screen: Description */}
      <section className="mb-12 pb-12 border-b border-border">
        <h2 className="text-2xl font-bold mb-6">Description</h2>
        <div className="prose prose-invert max-w-none">
          <p>{view.description}</p>
          <p>
            This is a detailed description of the view. It provides context and
            background information about the conviction being expressed in this
            market.
          </p>
        </div>
      </section>

      {/* Fifth Screen: Discussion (Reserved) */}
      <section className="mb-12">
        <Tabs defaultValue="discussion" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discussion">
              <MessageSquare className="w-4 h-4 mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="discussion" className="mt-6">
            <div className="p-8 rounded-lg bg-card border border-border text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Discussion feature coming soon
              </p>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-2">Created</p>
                <p className="font-semibold">{view.createdAt}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-2">Creator</p>
                <p className="font-semibold">{view.creator}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </DetailLayout>
  );
}
