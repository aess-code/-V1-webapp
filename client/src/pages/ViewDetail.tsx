/**
 * View Detail Page
 *
 * 信息层级：
 * 1. View + Price + Stake（最重要）
 * 2. Chart + Volume + Protocol Metrics
 * 3. Activity Feed
 * 4. Description
 * 5. Discussion（未来）
 */

import { useParams } from "wouter";
import { useState } from "react";
import { DetailLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MetricCard } from "@/components/cards/MetricCard";
import { ActivityItem } from "@/components/common/ActivityItem";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";
import { TrendingUp, Share2, Bookmark } from "lucide-react";
import { mockViews } from "@/mock/views";

export default function ViewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock: 获取 View 详情
  const view = mockViews.find(v => v.id === id);

  if (isLoading) {
    return (
      <DetailLayout>
        <LoadingState type="skeleton" />
      </DetailLayout>
    );
  }

  if (error || !view) {
    return (
      <DetailLayout>
        <ErrorState
          title="View not found"
          message="The view you're looking for doesn't exist or has been removed."
        />
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <div className="space-y-8">
        {/* 信息层级 1: View + Price + Stake */}
        <section className="space-y-4">
          {/* View Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{view.title}</h1>
                <p className="text-lg text-muted-foreground">
                  {view.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={
                    typeof view.creator === "string"
                      ? undefined
                      : view.creator.avatar
                  }
                />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold flex items-center gap-2">
                  {typeof view.creator === "string"
                    ? view.creator
                    : view.creator.name}
                  {typeof view.creator !== "string" &&
                    view.creator.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {typeof view.creator === "string"
                    ? view.creator
                    : view.creator.address}
                </p>
              </div>
            </div>

            {/* Category & Dates */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline">{view.category}</Badge>
              <span>
                Created {new Date(view.createdAt).toLocaleDateString()}
              </span>
              <span>
                Updated {new Date(view.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Price Panel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <p className="text-xs text-muted-foreground mb-2">Long Price</p>
              <p className="text-3xl font-bold text-green-500">
                ${view.pool.longPrice.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {(view.pool.longLiquidity / 1000000).toFixed(1)}M liquidity
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
              <p className="text-xs text-muted-foreground mb-2">Short Price</p>
              <p className="text-3xl font-bold text-red-500">
                ${view.pool.shortPrice.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {(view.pool.shortLiquidity / 1000000).toFixed(1)}M liquidity
              </p>
            </div>
          </div>

          {/* Stake Button */}
          <Button className="w-full h-12 text-lg" size="lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            Stake Your Conviction
          </Button>

          {/* Quick Stats */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Liquidity
              </span>
              <span className="font-semibold">
                ${(view.metrics.tvl / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Volume</span>
              <span className="font-semibold">
                ${(view.metrics.volume24h / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Participants
              </span>
              <span className="font-semibold">{view.metrics.participants}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Change</span>
              <span
                className={`font-semibold ${
                  view.metrics.change24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {view.metrics.change24h > 0 ? "+" : ""}
                {view.metrics.change24h}%
              </span>
            </div>
          </div>
        </section>

        {/* 信息层级 2: Chart + Volume + Protocol Metrics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Market Data</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="24h Change"
              value={`${view.metrics.change24h}%`}
              dataType="percentage"
              change={view.metrics.change24h}
              changeLabel="vs 7d"
            />
            <MetricCard
              label="24h Volume"
              value={`$${(view.metrics.volume24h / 1000000).toFixed(2)}M`}
              dataType="currency"
            />
            <MetricCard
              label="Total TVL"
              value={`$${(view.metrics.tvl / 1000000).toFixed(1)}M`}
              dataType="currency"
            />
            <MetricCard
              label="Participants"
              value={view.metrics.participants.toString()}
              dataType="text"
            />
          </div>

          {/* Chart Placeholder */}
          <div className="p-8 rounded-lg bg-card border border-border flex items-center justify-center h-80">
            <p className="text-muted-foreground">Price Chart (Coming Soon)</p>
          </div>
        </section>

        {/* 信息层级 3: Activity Feed */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          <div className="space-y-3">
            {[
              {
                id: "1",
                type: "stake" as const,
                actor: "0x1234...5678",
                action: "Staked $1,234 on Long",
                timestamp: new Date(Date.now() - 3600000).toISOString(),
              },
              {
                id: "2",
                type: "stake" as const,
                actor: "0x2345...6789",
                action: "Staked $567 on Short",
                timestamp: new Date(Date.now() - 7200000).toISOString(),
              },
              {
                id: "3",
                type: "create" as const,
                actor:
                  typeof view.creator === "string"
                    ? view.creator
                    : view.creator.name,
                action: "Created this view",
                timestamp: view.createdAt,
              },
            ].map(activity => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                actor={activity.actor}
                action={activity.action}
                timestamp={activity.timestamp}
              />
            ))}
          </div>
        </section>

        {/* 信息层级 4: Description */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">About This View</h2>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {view.description}
              </p>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Staked
                  </p>
                  <p className="text-xl font-semibold">
                    ${(view.stats.totalStaked / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average Stake
                  </p>
                  <p className="text-xl font-semibold">
                    ${view.stats.averageStake.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Max Stake
                  </p>
                  <p className="text-xl font-semibold">
                    ${view.stats.maxStake.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Trade Count
                  </p>
                  <p className="text-xl font-semibold">
                    {view.stats.tradeCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
                  <span className="text-sm text-muted-foreground">
                    7d Change
                  </span>
                  <span
                    className={`font-semibold ${
                      (view.metrics.change7d || 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(view.metrics.change7d || 0) > 0 ? "+" : ""}
                    {view.metrics.change7d || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
                  <span className="text-sm text-muted-foreground">
                    30d Change
                  </span>
                  <span
                    className={`font-semibold ${
                      (view.metrics.change30d || 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(view.metrics.change30d || 0) > 0 ? "+" : ""}
                    {view.metrics.change30d || 0}%
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* 信息层级 5: Discussion (Reserved) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Discussion</h2>
          <div className="p-8 rounded-lg bg-card border border-border flex items-center justify-center h-40">
            <p className="text-muted-foreground">
              Discussion feature coming soon
            </p>
          </div>
        </section>
      </div>
    </DetailLayout>
  );
}
