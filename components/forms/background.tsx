"use client"

import { useTemplateStore } from "@/providers/template-store-provider"
import {
  ArrowBottomLeftIcon,
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopLeftIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  BorderAllIcon,
  DotsHorizontalIcon,
  GridIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons"

import { patterns } from "@/lib/patterns"
import {
  GradientDirection,
  GridOverlayParams,
  toBackgroundShorthand,
} from "@/lib/templates/elements/background"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ResponsivePopover } from "../responsive-popover"

const solidColors = [
  // red
  "#DC2626",
  "#EF4444",
  "#F87171",
  "#FCA5A5",
  "#E74C3C",
  "#C0392B",
  "#D14D72",
  "#FF6B6B",

  // orange
  "#EA580C",
  "#F97316",
  "#FB923C",
  "#FDBA74",
  "#FF7F50",
  "#FFA500",
  "#D3756B",
  "#F0997D",

  // yellow
  "#CA8A04",
  "#EAB308",
  "#FACC15",
  "#FDE047",
  "#FFD700",
  "#FFEB3B",
  "#F39C12",
  "#FFD966",

  // green
  "#16A34A",
  "#22C55E",
  "#4ADE80",
  "#86EFAC",
  "#27AE60",
  "#2ECC71",
  "#609966",
  "#A6BB8D",

  // cyan
  "#0891B2",
  "#06B6D4",
  "#22D3EE",
  "#67E8F9",
  "#16A085",
  "#1ABC9C",
  "#61876E",
  "#ABC4AA",

  // blue
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#3498DB",
  "#2980B9",
  "#67729D",
  "#7C93C3",

  // purple
  "#7C3AED",
  "#8B5CF6",
  "#A78BFA",
  "#C4B5FD",
  "#9B59B6",
  "#8E44AD",
  "#A084DC",
  "#B2A4FF",

  // pink
  "#DB2777",
  "#EC4899",
  "#F472B6",
  "#F9A8D4",
  "#E8A0BF",
  "#FEBBCC",
  "#FCC8D1",
  "#FFC5C5",

  // brown
  "#A16207",
  "#D97706",
  "#F59E0B",
  "#FBBF24",
  "#8D6E63",
  "#A0522D",
  "#CD853F",
  "#DEB887",

  // gray
  "#374151",
  "#4B5563",
  "#6B7280",
  "#9CA3AF",
  "#525E75",
  "#7B8FA1",
  "#95A5A6",
  "#BDC3C7",

  // black/white
  "#000000",
  "#1F2937",
  "#2C3E50",
  "#34495E",
  "#F3F4F6",
  "#F9FAFB",
  "#ECF0F1",
  "#FFFFFF",
]

const linearGradients = [
  // red
  {
    colorStops: ["rgb(239, 68, 68)", "rgb(220, 38, 38)"],
  },
  {
    colorStops: ["rgb(244, 63, 94)", "rgb(248, 113, 113)", "rgb(239, 68, 68)"],
  },
  {
    colorStops: ["rgb(253, 164, 175)", "rgb(244, 63, 94)"],
  },
  {
    colorStops: ["#B73E14", "#D65C32"],
  },
  {
    colorStops: ["#B12A5B", "#CF556C", "#FF8C7F", "#FF8177"],
  },

  // orange
  {
    colorStops: ["rgb(251, 146, 60)", "rgb(234, 88, 12)"],
  },
  {
    colorStops: ["rgb(255, 94, 77)", "rgb(255, 154, 0)"],
  },
  {
    colorStops: ["rgb(236, 72, 153)", "rgb(239, 68, 68)", "rgb(234, 179, 8)"],
  },
  {
    colorStops: [
      "rgb(251, 191, 36)",
      "rgb(252, 176, 64)",
      "rgb(245, 101, 101)",
    ],
  },
  {
    colorStops: ["rgb(255, 154, 0)", "rgb(255, 206, 84)", "rgb(255, 239, 186)"],
  },
  {
    colorStops: ["#FF8C7F", "#FF8177"],
  },
  {
    colorStops: ["#ffc3a0", "#ffafbd"],
  },
  {
    colorStops: ["#FFC796", "#FF6B95"],
  },
  {
    colorStops: [
      "rgb(254, 202, 202)",
      "rgb(252, 165, 165)",
      "rgb(254, 240, 138)",
    ],
  },
  {
    colorStops: [
      "rgb(199, 210, 254)",
      "rgb(254, 202, 202)",
      "rgb(254, 249, 195)",
    ],
  },

  // yellow
  {
    colorStops: ["rgb(202, 138, 4)", "rgb(234, 179, 8)"],
  },
  {
    colorStops: ["rgb(250, 204, 21)", "rgb(251, 191, 36)"],
  },
  {
    colorStops: ["#FBED96", "#ABECD6"],
  },
  {
    colorStops: ["#FFF1EB", "#ACE0F9"],
  },
  {
    colorStops: ["#50cc7f", "#f5d100"],
  },
  {
    colorStops: ["#e14fad", "#f9d423"],
  },
  {
    colorStops: ["#c1c161", "#c1c161", "#d4d4b1"],
  },

  // green
  {
    colorStops: ["rgb(34, 197, 94)", "rgb(21, 128, 61)"],
  },
  {
    colorStops: ["rgb(16, 185, 129)", "rgb(101, 163, 13)"],
  },
  {
    colorStops: ["rgb(187, 247, 208)", "rgb(74, 222, 128)", "rgb(34, 197, 94)"],
  },
  {
    colorStops: ["rgb(187, 247, 208)", "rgb(34, 197, 94)"],
  },
  {
    colorStops: ["rgb(153, 246, 228)", "rgb(217, 249, 157)"],
  },
  {
    colorStops: ["#009EFD", "#2AF598"],
  },
  {
    colorStops: ["#b3ffab", "#12fff7"],
  },
  {
    colorStops: ["#20E2D7", "#F9FEA5"],
  },
  {
    colorStops: ["#B7F8DB", "#50A7C2"],
  },
  {
    colorStops: ["#9EFBD3", "#57E9F2", "#45D4FB"],
  },
  {
    colorStops: ["#69EACB", "#EACCF8", "#6654F1"],
  },

  // cyan
  {
    colorStops: ["rgb(165, 243, 252)", "rgb(34, 211, 238)"],
  },
  {
    colorStops: ["rgb(129, 230, 217)", "rgb(79, 172, 254)"],
  },
  {
    colorStops: ["rgb(67, 206, 162)", "rgb(24, 90, 157)"],
  },
  {
    colorStops: ["#30CFD0", "#330867"],
  },
  {
    colorStops: ["#5ee7df", "#b490ca"],
  },
  {
    colorStops: ["#2CD8D5", "#6B8DD6", "#8E37D7"],
  },
  {
    colorStops: ["#7DE2FC", "#B9B6E5"],
  },

  // blue
  {
    colorStops: ["rgb(59, 130, 246)", "rgb(37, 99, 235)"],
  },
  {
    colorStops: [
      "rgb(219, 234, 254)",
      "rgb(147, 197, 253)",
      "rgb(59, 130, 246)",
    ],
  },
  {
    colorStops: ["rgb(14, 165, 233)", "rgb(59, 130, 246)"],
  },
  {
    colorStops: ["rgb(37, 99, 235)", "rgb(29, 78, 216)"],
  },
  {
    colorStops: ["rgb(147, 197, 253)", "rgb(59, 130, 246)", "rgb(37, 99, 235)"],
  },
  {
    colorStops: ["rgb(30, 58, 138)", "rgb(59, 130, 246)", "rgb(147, 197, 253)"],
  },
  {
    colorStops: ["#46AEF7", "#16D9E3"],
  },
  {
    colorStops: ["#3D4E81", "#5753C9", "#6E7FF3"],
  },
  {
    colorStops: ["#243949", "#517fa4"],
  },
  {
    colorStops: ["#0acffe", "#495aff"],
  },

  // purple
  {
    colorStops: ["rgb(147, 51, 234)", "rgb(126, 34, 206)"],
  },
  {
    colorStops: ["rgb(165, 180, 252)", "rgb(192, 132, 252)"],
  },
  {
    colorStops: [
      "rgb(233, 213, 255)",
      "rgb(192, 132, 252)",
      "rgb(107, 33, 168)",
    ],
  },
  {
    colorStops: ["#9B23EA", "#5F72BD"],
  },
  {
    colorStops: ["#A445B2", "#D41872", "#FF006B"],
  },
  {
    colorStops: ["#cc208e", "#6713d2"],
  },
  {
    colorStops: ["#A445B2", "#D41872", "#FF0066"],
  },

  // pink
  {
    colorStops: ["rgb(236, 72, 153)", "rgb(219, 39, 119)"],
  },
  {
    colorStops: [
      "rgb(249, 168, 212)",
      "rgb(216, 180, 254)",
      "rgb(129, 140, 248)",
    ],
  },
  {
    colorStops: ["#FECFEF", "#FF989C"],
  },
  {
    colorStops: ["#FBC8D4", "#9795F0"],
  },
  {
    colorStops: ["rgb(190, 24, 93)", "rgb(240, 78, 152)", "rgb(251, 207, 232)"],
  },
  {
    colorStops: ["#df89b5", "#bfd9fe"],
  },
  {
    colorStops: ["#2CD8D5", "#C5C1FF", "#FFBAC3"],
  },

  // multi-color/rainbow

  {
    colorStops: [
      "rgb(134, 239, 172)",
      "rgb(59, 130, 246)",
      "rgb(147, 51, 234)",
    ],
  },
  {
    colorStops: [
      "rgb(187, 247, 208)",
      "rgb(134, 239, 172)",
      "rgb(59, 130, 246)",
    ],
  },

  // gray
  {
    colorStops: ["rgb(17, 24, 39)", "rgb(75, 85, 99)"],
  },
  {
    colorStops: ["rgb(229, 231, 235)", "rgb(156, 163, 175)", "rgb(75, 85, 99)"],
  },
  {
    colorStops: ["rgb(71, 85, 105)", "rgb(148, 163, 184)"],
  },
  {
    colorStops: ["#f5f7fa", "#c3cfe2"],
  },
  {
    colorStops: ["#8baaaa", "#ae8b9c"],
  },
  {
    colorStops: ["#868f96", "#596164"],
  },
  {
    colorStops: ["#616161", "#9bc5c3"],
  },

  // dark/black
  {
    colorStops: ["rgb(31, 41, 55)", "rgb(55, 65, 81)", "rgb(107, 114, 128)"],
  },
  {
    colorStops: ["rgb(15, 23, 42)", "rgb(30, 41, 59)"],
  },
  {
    colorStops: ["rgb(17, 24, 39)", "rgb(55, 65, 81)", "rgb(209, 213, 219)"],
  },
  {
    colorStops: ["#434343", "#000000"],
  },
  {
    colorStops: ["#d7d2cc", "#304352"],
  },
  {
    colorStops: ["rgb(72, 85, 99)", "rgb(41, 50, 62)"],
  },

  // light/white
  {
    colorStops: ["#d5d4d0", "#d5d4d0", "#eeeeec", "#efeeec", "#e9e9e7"],
  },
  {
    colorStops: ["#FFFEFF", "#D7FFFE"],
  },
]

const DEFAULT_LINEAR_GRADIENT_DIRECTION: GradientDirection = "to top right"

const gridOverlayColors = ["#030712", "#6b7280", "#f9fafb"]
const gridOverlayDefault: Omit<GridOverlayParams, "pattern"> = {
  color: gridOverlayColors[0],
  opacity: 0.5,
  blurRadius: 20,
}

export function BackgroundForm() {
  const template = useTemplateStore((state) => state)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
        <CardDescription>
          Set a custom background for your image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Tabs defaultValue="linear-gradient" className="w-full">
            <TabsList>
              <TabsTrigger value="linear-gradient">Gradient</TabsTrigger>
              <TabsTrigger value="color">Solid Color</TabsTrigger>
            </TabsList>

            <TabsContent value="linear-gradient" className="space-y-4">
              <Card className="p-2">
                <RadioGroup
                  value={
                    template.background.type === "linear-gradient"
                      ? JSON.stringify(template.background.colorStops)
                      : undefined
                  }
                  onValueChange={(v) => {
                    template.setBackground({
                      type: "linear-gradient",
                      colorStops: JSON.parse(v),
                      direction:
                        // if the current background is a linear gradient, use its direction
                        // otherwise, use the default direction
                        template.background.type === "linear-gradient"
                          ? template.background.direction
                          : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                      noise: template.background.noise,
                      gridOverlay: template.background.gridOverlay,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {linearGradients.map(({ colorStops }) => (
                      <div
                        key={JSON.stringify(colorStops)}
                        className="size-9 min-h-9 min-w-9"
                      >
                        <RadioGroupItem
                          value={JSON.stringify(colorStops)}
                          id={JSON.stringify(colorStops)}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={JSON.stringify(colorStops)}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: toBackgroundShorthand({
                              type: "linear-gradient",
                              direction:
                                // if the current background is a linear gradient, use its direction
                                // otherwise, use the default direction
                                template.background.type === "linear-gradient"
                                  ? template.background.direction
                                  : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                              colorStops,
                            }),
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>

              <div className="space-y-2">
                <div className="text-sm font-medium">Gradient Direction</div>
                <Card className="p-2">
                  <RadioGroup
                    defaultValue="to top right"
                    onValueChange={(v) => {
                      if (template.background.type === "linear-gradient") {
                        template.setBackground({
                          ...template.background,
                          direction: v as GradientDirection,
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-8 gap-2">
                      <div>
                        <RadioGroupItem
                          value="to top"
                          id="to-top"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top right"
                          id="to-top-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to right"
                          id="to-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom right"
                          id="to-bottom-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom"
                          id="to-bottom"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowDownIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom left"
                          id="to-bottom-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to left"
                          id="to-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top left"
                          id="to-top-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="color">
              <Card className="p-2">
                <RadioGroup
                  value={
                    template.background.type === "color"
                      ? template.background.color
                      : undefined
                  }
                  onValueChange={(v) => {
                    template.setBackground({
                      type: "color",
                      color: v,
                      noise: template.background.noise,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {solidColors.map((color) => (
                      <div key={color} className="h-9 min-h-9 w-9 min-w-9">
                        <RadioGroupItem
                          value={color}
                          id={color}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={color}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: color,
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-2 pt-2">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Grid Overlay</div>
              {/* <Badge>New</Badge> */}
            </div>
            <ResponsivePopover
              title="Grid Overlay"
              description="Apply a grid overlay to the background."
              trigger={
                <Button variant="outline" className="justify-start">
                  {(template.background.gridOverlay?.pattern &&
                    patterns[template.background.gridOverlay?.pattern].label) ||
                    "Select a pattern"}
                </Button>
              }
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Pattern</Label>
                  <RadioGroup
                    defaultValue="none"
                    value={
                      template.background.gridOverlay
                        ? template.background.gridOverlay.pattern
                        : "none"
                    }
                    onValueChange={(v) => {
                      if (v === "none") {
                        template.setBackground({
                          ...template.background,
                          gridOverlay: undefined,
                        })
                      } else {
                        template.setBackground({
                          ...template.background,
                          gridOverlay: {
                            pattern: v as GridOverlayParams["pattern"],
                            color:
                              template.background.gridOverlay?.color ||
                              gridOverlayDefault.color,
                            opacity:
                              template.background.gridOverlay?.opacity ||
                              gridOverlayDefault.opacity,
                            blurRadius:
                              template.background.gridOverlay?.blurRadius ||
                              gridOverlayDefault.blurRadius,
                          },
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <RadioGroupItem
                          value="none"
                          id="none"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="none"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ValueNoneIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">None</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="grid"
                          id="grid"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="grid"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <GridIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Grid</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="graph-paper"
                          id="graph-paper"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="graph-paper"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <BorderAllIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Graph</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="dots"
                          id="dots"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="dots"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <DotsHorizontalIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Dots</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text-color">Color</Label>
                  <RadioGroup
                    id="text-color"
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? template.background.gridOverlay.color
                        : undefined
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          color: v,
                        } as GridOverlayParams,
                      })
                    }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {gridOverlayColors.map((color) => (
                        <div key={color} className="h-9 min-h-9 w-9 min-w-9">
                          <RadioGroupItem
                            value={color}
                            id={color}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={color}
                            className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            style={{
                              background: color,
                            }}
                          ></Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity">Opacity</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.gridOverlay?.opacity || 0}
                    </span>
                  </div>
                  <Slider
                    id="opacity"
                    max={1}
                    defaultValue={[template.background.noise]}
                    step={0.05}
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? [template.background.gridOverlay.opacity]
                        : [0]
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          opacity: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Opacity"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blur-radius">Blur Radius</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.gridOverlay?.blurRadius || 0}%
                    </span>
                  </div>
                  <Slider
                    id="blur-radius"
                    max={100}
                    defaultValue={[template.background.noise]}
                    step={5}
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? [template.background.gridOverlay.blurRadius]
                        : [0]
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          blurRadius: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Blur"
                  />
                </div>
              </div>
            </ResponsivePopover>
          </div>

          <div className="grid gap-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="noise">Noise</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.noise}
                    </span>
                  </div>
                  <Slider
                    id="noise"
                    max={1}
                    defaultValue={[template.background.noise]}
                    step={0.05}
                    value={[template.background.noise]}
                    onValueChange={(v) =>
                      template.setBackground({
                        ...template.background,
                        noise: v[0],
                      })
                    }
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Noise"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-[260px] text-sm"
                side="top"
              >
                Control the level background noise to add texture. A value
                between 0.1 to 0.25 is recommended.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
