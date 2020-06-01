import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/action/charts";

import { makeStyles, Grid, Typography, Button, LinearProgress, CircularProgress } from "@material-ui/core/";
import { GetApp, CalendarToday, ListAlt } from "@material-ui/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ResponsivePie } from "@nivo/pie";

import Card from "../components/card/card";

const useStyle = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
  },
  charts: {
    "& .recharts-surface": {
      backgroundColor: "salmon",
      width: "100%",
    },
  },
}));

const Dashboard = (props) => {
  console.log("rendr");

  const classes = useStyle();

  const dispatch = useDispatch();

  const initFetchDataLine = useCallback(() => dispatch(action.initFetchDataLine()), []);
  const initFetchDataPie = useCallback(() => dispatch(action.initFetchDataPie()), []);

  const dataLine = useSelector((state) => state.charts.line);
  const dataPie = useSelector((state) => state.charts.pie);

  const notif = new Audio("https://notificationsounds.com/soundfiles/44c4c17332cace2124a1a836d9fc4b6f/file-sounds-1147-that-was-quick.mp3");

  useEffect(() => {
    initFetchDataLine();
    initFetchDataPie();
  }, [initFetchDataLine, initFetchDataPie, dataLine, dataPie]);

  const elementLine =
    dataLine.length > 0 ? (
      <div style={{ height: 250 }}>
        <ResponsiveContainer>
          <LineChart
            data={dataLine}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <CircularProgress />
    );

  const elementPie =
    dataPie.length > 0 ? (
      <div style={{ height: 250 }}>
        <ResponsivePie
          data={dataPie}
          margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
          innerRadius={0.55}
          padAngle={3}
          colors={{ scheme: "nivo" }}
          borderWidth={2}
          borderColor={{ from: "color", modifiers: [["darker", "0.4"]] }}
          radialLabelsSkipAngle={0}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor={{ from: "color", modifiers: [] }}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={0}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    ) : (
      <CircularProgress />
    );
  return (
    <Grid container spacing={2}>
      <Grid item container sm={12} justify="space-between">
        <Typography variant="h4">Dashboard</Typography>
        <Button
          onClick={() => {
            notif.play();
          }}
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
          startIcon={<GetApp />}
        >
          Generate Report
        </Button>
      </Grid>
      <Grid item sm={12} md={6} lg={3}>
        <Card variantPrimary>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography color="primary" variant="button">
                Mantap
              </Typography>
              <Typography variant="h6">Lorem ipsum dong</Typography>
            </Grid>
            <Grid item>
              <CalendarToday color="disabled" fontSize="large" />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} lg={3}>
        <Card variantSuccess>
          <Grid container justify="space-between" alignItems="center" spacing={2}>
            <Grid item style={{ flexGrow: 1 }}>
              <Typography color="primary">Task</Typography>
              <LinearProgress value={50} variant="determinate" style={{ height: 10, borderRadius: 20 }} />
            </Grid>
            <Grid item>
              <ListAlt color="disabled" fontSize="large" />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} lg={3}>
        <Card variantWarning>Mantap</Card>
      </Grid>
      <Grid item sm={12} md={6} lg={3}>
        <Card variantError>Mantap</Card>
      </Grid>
      <Grid item sm={12} md={7}>
        <Card headerTitle="Line Chart (Recharts)">{elementLine}</Card>
      </Grid>
      <Grid item sm={12} md={5}>
        <Card headerTitle="Pie Chart (Nivo)" headerAction="tes">
          {elementPie}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
