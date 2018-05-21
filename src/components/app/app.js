//@flow
import React, { Component } from "react";
import socket, { subscribe } from "src/socket";
import style from "./styleApp.css";
import Axis from "src/components/Axis";
import { format } from "d3-format";
import { scaleLinear } from "d3-scale";
const axisFormat = format(".2");

const height = 300,
  width = 400,
  mar = { t: 20, l: 40, b: 30, r: 15 };

export default class App extends Component<null, { data: number[][] }> {
  constructor() {
    super();
    this.state = {
      data: []
    };
    socket.on("data", data => {
      this.setState({
        data: data
      });
    });
  }

  render() {
    const yScale = scaleLinear()
      .range([height, 0])
      .domain([0,.5])
      // .domain([0, Math.max(...this.state.data.map(d => d[0]))]);

    const xScale = scaleLinear()
      .range([0, width])
      .domain([0,25])
      // .domain([0, Math.max(...this.state.data.map(d => d[2]))]);
    return (
      <div className={style.main}>
        <svg width={width + mar.l + mar.r} height={height + mar.t + mar.b}>
          <g transform={`translate(${mar.l},${mar.t})`}>
            <Axis
              transform={`translate(${0},${height})`}
              scale={xScale}
              orient="BOTTOM"
              format={axisFormat}
              ticks={5}
              tickPadding={9}
            />
            <Axis
              ticks={4}
              tickPadding={9}
              scale={yScale}
              orient="LEFT"
              className={"yAxis"}
              format={axisFormat}
            />
            <g>
              {this.state.data.map((d, i) => {
                return (
                  <rect
                    key={i}
                    className={style.bar}
                    width={xScale(d[2]) - xScale(d[1])}
                    x={xScale(d[1])}
                    height={height - yScale(d[0])}
                    y={yScale(d[0])}
                  />
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
