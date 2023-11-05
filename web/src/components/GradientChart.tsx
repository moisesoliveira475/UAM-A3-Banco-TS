import { AuthContext } from '@/contexts/useAuth';
import { fonts } from '@/styles';
import { Box, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';

export function GradientChart() {
  const { userInformations } = useContext(AuthContext);

  const [data, setData] = useState<{value: number, date: string}[]>([]);

  
  // const [activeCurve, setActiveCurve] = useState<CurveType>('basis');
  // const availableCurves = ['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter'] as CurveType[];
  // function toggleCurve() {
  //   const index = availableCurves.indexOf(activeCurve);
  //   setActiveCurve(availableCurves[index+1]);
  // }
  
  useEffect(() => {
    function updateData() {
      let dataFilter = userInformations!.historicOfBalance.map(item => {
        const dateSecondsToMilliseconds = item.date.seconds * 1000;
        const date = new Date(dateSecondsToMilliseconds);
  
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        
        return {value: item.value, date: `${month}/${day}`};
      });
      setData(dataFilter);
    }
    updateData();
  }, [data, userInformations?.balance]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(61,122,229,1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgba(0,212,255,1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeOpacity={0.2} strokeDasharray="3 9" horizontalFill={undefined} />
        <XAxis dataKey="date" style={{fill: 'white', fontSize: '0.7rem', fontFamily: fonts.Manrope_Regular}} />
        <YAxis style={{fill: 'white', fontSize: '0.7rem', fontFamily: fonts.Manrope_Regular}} dataKey="value" />
        <Tooltip
          active={true}
          content={({ active, payload, label }) => (
            <Box style={{background: '#3D7AE5', padding: '0.2rem 0.7rem', borderRadius: '0.5rem'}}>
              <Text style={{fontSize: '0.7rem'}}>{label}</Text>
            </Box>
          )}
        />
        <Area type={"bumpX"} animateNewValues={true} animationDuration={300} dataKey="value" stroke="#00d5ff" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
