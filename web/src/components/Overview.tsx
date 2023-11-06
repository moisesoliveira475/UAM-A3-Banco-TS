import { AuthContext } from "@/contexts/useAuth";
import { formatReal } from "@/utils/formatReal";
import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiCircle, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { GradientChart } from "./GradientChart";

import styles from '@/styles/animation.module.css';
import { Cell, Pie, PieChart } from 'recharts';
import { TransactionCard } from "./TransactionCard";

export function OverView() {
  const { userInformations } = useContext(AuthContext);

  const [dataPieChart, setDataPieChart] = useState<{value: number; name: string; fill: string}[]>([]);

  // const data = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  useEffect(() => {
    function updateData() {
      let totalOfDeposits = userInformations!.historicOfMovements.filter(item => item.type === 'deposit').reduce((acc, item) => acc + item.value, 0);
      let totalOfWithdraws = userInformations!.historicOfMovements.filter(item => item.type === 'withdraw').reduce((acc, item) => acc + item.value, 0);
      let totalOfTransfers = userInformations!.historicOfMovements.filter(item => item.type === 'transfer@sent' || item.type === 'transfer@received').reduce((acc, item) => acc + item.value, 0);
      let totalOfLoans = userInformations!.historicOfMovements.filter(item => item.type === 'credit@loan').reduce((acc, item) => acc + item.value, 0);

      setDataPieChart([
        {name: 'Depósitos', value: totalOfDeposits, fill: '#427de2'},
        {name: 'Saques', value: totalOfWithdraws, fill: '#e2a142'},
        {name: 'Transferências', value: totalOfTransfers, fill: '#42e2a1'},
        {name: 'Empréstimos', value: totalOfLoans, fill: '#e24242'},
      ])
    }
    updateData();
  }, [userInformations?.historicOfMovements]);

  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        padding: "3rem 2rem",
      }}
    >
      <Box style={{display: 'flex', alignItems: 'center', marginBottom: '1.7rem'}}>
        <Text style={{fontSize: '1.2rem', fontWeight: 'bold', marginRight: '1rem'}}>Overview</Text>
        <Box style={{display: 'flex', alignItems: 'center'}} className={styles.animation}>
          <FiCircle style={{width: 13, height: 13, fill: 'white'}} />
          <Text style={{fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '0.5rem'}}>Atualizando a cada 5s</Text>
        </Box>
      </Box>
      <Box style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', minHeight: '16rem'}}>
        <Box
            style={{
                display: "flex",
                height: '100%',
                flexDirection: "column",
                marginRight: '2rem',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: '1rem',
            }}
        >
            <Box
                style={{
                    display: "flex",
                    width: '14rem',
                    flexDirection: 'column',
                    padding: '1rem',
                    background: 'linear-gradient(90deg, rgba(61,122,229,1) 35%, rgba(0,212,255,1) 100%)',
                    borderRadius: '1rem',
                    borderWidth: '1px',
                    borderColor: '#3e79e5',
                }}
            >
                <Text style={{
                  fontSize: '1rem', fontWeight: 'bold'
                }} >Débito disponível</Text>
                <Text>{formatReal(userInformations?.balance || 0)}</Text>
            </Box>
            <Box
                style={{
                    display: "flex",
                    width: '14rem',
                    flexDirection: 'column',
                    padding: '1rem',
                    background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.10) 0%, rgba(250, 251, 252, 0.10) 100%), linear-gradient(90deg, rgba(240, 240, 240, 0.20) 0%, rgba(240, 240, 240, 0.00) 100%)',
                    borderRadius: '1rem',
                    borderWidth: '1px',
                    borderColor: '#3e79e5',
                }}
            >
                <Text style={{
                  fontSize: '1rem', fontWeight: 'bold'
                }} >Crédito disponível</Text>
                <Text>{formatReal(userInformations?.creditCard.availableCredit || 0)}</Text>
            </Box>
            <Box
                style={{
                    display: "flex",
                    width: '14rem',
                    flexDirection: 'column',
                    padding: '1rem',
                    background: 'linear-gradient(90deg, rgba(61,122,229,1) 35%, rgba(0,212,255,1) 100%)',
                    borderRadius: '1rem',
                    borderWidth: '1px',
                    borderColor: '#3e79e5',
                }}
            >
                <Text style={{
                  fontSize: '1rem', fontWeight: 'bold'
                }} >Total Depósitos</Text>
                <Text>{formatReal(userInformations?.totalDeposits || 0)}</Text>
            </Box>
            <Box
                style={{
                    display: "flex",
                    width: '14rem',
                    flexDirection: 'column',
                    padding: '1rem',
                    background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.10) 0%, rgba(250, 251, 252, 0.10) 100%), linear-gradient(90deg, rgba(240, 240, 240, 0.20) 0%, rgba(240, 240, 240, 0.00) 100%)',
                    borderRadius: '1rem',
                    borderWidth: '1px',
                    borderColor: '#3e79e5',
                }}
            >
                <Text style={{
                  fontSize: '1rem', fontWeight: 'bold'
                }} >Total Transferências</Text>
                <Text>{formatReal(userInformations?.totalTransfers || 0)}</Text>
            </Box>
            {/* <Button style={{
              background: 'linear-gradient(90deg, #3E79E5 0%, #01B8E3 100%)',
              borderRadius: '0.6rem',
              borderWidth: '1px',
              borderColor: '#3e79e5'
            }}
            >Fazer pagamento</Button> */}
        </Box>
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                width: '100%',
                minHeight: '22rem',
                height: '100%',
                borderRadius: '1rem',
                borderWidth: '1px',
                borderColor: '#3e79e5',
                padding: '0.8rem',
                background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.10) 0%, rgba(250, 251, 252, 0.10) 100%), linear-gradient(90deg, rgba(240, 240, 240, 0.20) 0%, rgba(240, 240, 240, 0.00) 100%)',
            }}
        >
            <Box style={{marginBottom: '0.5rem'}}>Fluxo</Box>
            <GradientChart />
        </Box>
      </Box>
      <Box style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginTop: 30
      }}>
        <Box style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginRight: 20,
        }}>
          <Text style={{fontSize: '1rem', fontWeight: 'bold', marginRight: '1rem'}}>Transações</Text>
          <Box style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 20,
          }}>
            {userInformations!.historicOfMovements.length > 0 && (<>
            <Box style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
              <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                <Box>
                  <Text style={{fontSize: '0.8rem', fontWeight: '600', color: '#3D7AE5'}}>Todos</Text>
                  <Box style={{height: '0.2rem', width: '100%', background: '#3D7AE5', borderRadius: '10rem'}} />
                </Box>
                <Box>
                  <Text style={{fontSize: '0.8rem', fontWeight: '500', color: '#A4B4CB'}}>Por vir</Text>
                </Box>
              </Box>
            </Box>
            <Box style={{width: '100%', marginTop: '1rem'}}>
              <Text style={{marginBottom: '0.5rem', fontWeight: '500', color: '#d3e1f5', fontSize: '0.7rem'}}>{new Date().toLocaleDateString()}</Text>
              <Box style={{overflowY: 'scroll', width: '100%', maxHeight: '19rem'}}>
              {userInformations?.historicOfMovements.map((item, index) => {
                return <TransactionCard key={index} data={item} />
              })}
              </Box>
            </Box>
            </>)}
          </Box>
        </Box>
        <Box style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'stretch',
          minWidth: '16rem',
        }}>
          <Text style={{fontSize: '1rem', fontWeight: 'bold', marginRight: '1rem'}}>Resumo da conta</Text>
          <Box style={{marginTop: '1rem', display: 'flex', width: '100%', alignItems: 'stretch', justifyContent: 'center', gap: '1rem'}}>
            <Box style={{
              display: "flex",
              flexDirection: 'column',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.10) 0%, rgba(250, 251, 252, 0.10) 100%), linear-gradient(90deg, rgba(240, 240, 240, 0.20) 0%, rgba(240, 240, 240, 0.00) 100%)',
              borderRadius: '1rem',
              borderWidth: '1px',
              borderColor: '#3e79e5',
            }}> 
              <Box style={{display: 'flex', alignItems: 'center'}}>
                <FiTrendingUp style={{ width: 14, height: 14, stroke: '#37DF34', strokeWidth: '3px' }} />
                <Text style={{fontSize: '0.7rem', fontWeight: '500', marginLeft: '0.5rem', color: '#D3E1F5', fontFamily: 'Sora'}}>Renda</Text>
              </Box>
              <Text style={{fontWeight: 'bold', fontSize: '1rem'}}>{formatReal(userInformations!.totalDeposits)}</Text>
            </Box>
            <Box style={{
              display: "flex",
              flexDirection: 'column',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.10) 0%, rgba(250, 251, 252, 0.10) 100%), linear-gradient(90deg, rgba(240, 240, 240, 0.20) 0%, rgba(240, 240, 240, 0.00) 100%)',
              borderRadius: '1rem',
              borderWidth: '1px',
              borderColor: '#3e79e5',
            }}> 
              <Box style={{display: 'flex', alignItems: 'center'}}>
                <FiTrendingDown style={{ width: 14, height: 14, stroke: '#DF3434', strokeWidth: '3px' }} />
                <Text style={{fontSize: '0.7rem', fontWeight: '500', marginLeft: '0.5rem', color: '#D3E1F5', fontFamily: 'Sora'}}>Despesa</Text>
              </Box>
              <Text style={{fontWeight: 'bold', fontSize: '1rem'}}>{formatReal(userInformations!.totalWithdraws)}</Text>
            </Box>
          </Box>
          <Box style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '1rem', width: '100%', background: '#FAFBFC15', borderRadius: '0.7rem', padding: '0 1rem 1rem 1rem'}}>
            <PieChart width={400} height={200}>
              <Pie
                data={dataPieChart}
                cx={200}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={10}
                dataKey="value"
              >
                {dataPieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} 
                    fill={entry.fill} 
                    strokeWidth={3}
                    stroke={entry.fill}
                  />
                ))}
              </Pie>
            </PieChart>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '0.5rem', flexWrap: 'wrap'}}>
              {dataPieChart.map((item, index) => (
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.3rem'}}>
                  <FiCircle style={{ width: 10, height: 10, fill: item.fill, stroke: 'none' }} />
                  <Text style={{color: item.fill, fontSize: '0.7rem', fontWeight: '600', marginLeft: '0.3rem'}}>{item.name}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
