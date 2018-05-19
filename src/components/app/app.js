//@flow
import React, { Component } from "react";
import { subscribe } from "src/socket";
import style from "./styleApp.css";

const width = 1000;
const roadHeight = 10;
const rectHeight = 200;
const height = roadHeight + rectHeight;
const maxRect = 200;
const scale = d => d / maxRect * rectHeight;

export default class App extends Component<
  null,
  { queues: number[], green: boolean }
> {
  constructor() {
    super();
    this.state = {
      queues: Array(20).fill(5),
      green: false
    };
    subscribe(
      (err, { queues, green }: { queues: number[], green: boolean }) => {
        this.setState({
          queues: queues.map(d => +d),
          green
        });
      }
    );
  }
  render() {
    let green = this.state.green;
    let rectClass = style.queue + " " + (green ? style.green : style.red);
    // console.log()
    return (
      <div className={style.main}>
        <svg width={width} height={height}>
          <g>
            <rect
              className={style.road}
              width={width}
              height={roadHeight}
              y={rectHeight}
            />
            {this.state.queues.map((d, i, k) => {
              return (
                <rect
                  key={i}
                  className={rectClass}
                  transform={`translate(${i * width / k.length},${rectHeight -
                    scale(d)})`}
                  height={scale(d)}
                  width="10px"
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}
