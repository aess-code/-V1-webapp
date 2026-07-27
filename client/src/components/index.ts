/**
 * 组件库统一导出
 *
 * 所有组件都应该通过这个文件导出，以便保持一致的导入路径。
 *
 * 使用方式：
 * import { ViewCard, CreatorCard, LoadingState } from '@/components';
 */

// Layout Components
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";

// State Components
export {
  LoadingState,
  SkeletonLoader,
  LoadingSpinner,
} from "./states/LoadingState";
export { EmptyState } from "./states/EmptyState";
export { ErrorState } from "./states/ErrorState";
export {
  CardSkeleton,
  ListSkeleton,
  DetailSkeleton,
  TableSkeleton,
  SearchResultSkeleton,
  GridSkeleton,
} from "./states/SkeletonStates";

// Card Components
export { ViewCard } from "./cards/ViewCard";
export { CreatorCard } from "./cards/CreatorCard";
export { MetricCard } from "./cards/MetricCard";

// Common Components
export { PriceDisplay } from "./common/PriceDisplay";
export { VolumeDisplay } from "./common/VolumeDisplay";
export { ActivityItem } from "./common/ActivityItem";
export { LeaderboardRow } from "./common/LeaderboardRow";
export { default as ErrorBoundary } from "./ErrorBoundary";
export { ManusDialog } from "./ManusDialog";

// UI Components (from shadcn/ui)
export { Button } from "./ui/button";
export { Input } from "./ui/input";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
export { Badge } from "./ui/badge";
export { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "./ui/select";
export { Checkbox } from "./ui/checkbox";
export { RadioGroup, RadioGroupItem } from "./ui/radio-group";
export { Label } from "./ui/label";
export { Textarea } from "./ui/textarea";
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
export { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
export { Separator } from "./ui/separator";
export { Skeleton } from "./ui/skeleton";
export { Spinner } from "./ui/spinner";
export { Toaster } from "./ui/sonner";
export { Alert, AlertTitle, AlertDescription } from "./ui/alert";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
export { Progress } from "./ui/progress";
export { Slider } from "./ui/slider";
export { Switch } from "./ui/switch";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
export { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
export { Toggle } from "./ui/toggle";

// Type Exports
export type { MetricItem, ViewCardProps } from "./cards/ViewCard";
export type { Creator, StatItem, CreatorCardProps } from "./cards/CreatorCard";
export type { MetricCardProps, MetricDataType } from "./cards/MetricCard";
export type { ActivityType } from "./common/ActivityItem";
export type { LeaderboardStat } from "./common/LeaderboardRow";
