//@flow
import React, { Component } from "react";
import socket, { subscribe } from "src/socket";
import style from "./styleApp.css";

const height = 300,
  width = 400,
  mar = { t: 20, l: 40, b: 30, r: 15 };
const yScale = x => height * (1 - x);
const xScale = x => width * (x-5)/20;

export default class App extends Component<
  null,
  { incoming: number, data: number[][] }
> {
  constructor() {
    super();
    this.state = {
      incoming: 5,
      data: []
    };
    subscribe((err, { incoming }: { incoming: number }) => {
      this.setState({
        incoming
      });
    });
    socket.on("laser", data => {
      console.log(data)
      this.setState({
        data: data
      });
      // fn(this.state.outgoing);
    });
  }
  render() {
    return (
      <div className={style.main}>
        <svg width={width} height={height}>
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
        </svg>
      </div>
    );
  }
}
