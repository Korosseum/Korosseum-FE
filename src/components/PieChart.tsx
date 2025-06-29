import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  sideACount: number;
  sideBCount: number;
  sideALabel: string;
  sideBLabel: string;
  className?: string;
}

export function PieChart({ 
  sideACount, 
  sideBCount, 
  sideALabel, 
  sideBLabel, 
  className = "" 
}: PieChartProps) {
  const total = sideACount + sideBCount;
  
  const data = [
    {
      name: sideALabel,
      value: sideACount,
      percentage: total > 0 ? Math.round((sideACount / total) * 100) : 50
    },
    {
      name: sideBLabel,
      value: sideBCount,
      percentage: total > 0 ? Math.round((sideBCount / total) * 100) : 50
    }
  ];

  const COLORS = ['#FF4D4D', '#4D79FF']; // Side A (red), Side B (blue)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value}명 ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-4 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{entry.value}</span>
            <span className="text-xs text-muted-foreground">
              ({data[index]?.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (total === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center text-muted-foreground">
          <p>아직 참여자가 없습니다</p>
          <p className="text-sm">첫 번째 참여자가 되어보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </RechartsPieChart>
      </ResponsiveContainer>
      
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">총 {total}명 참여</p>
      </div>
    </div>
  );
}