import { useState } from 'react'
import * as d3 from 'd3';

function App()
{
  let count = 1 + 50,
    durationTime = 200 / count,
    array = d3.shuffle(d3.range(1, count)),
    unsortedArray = [...array],
    sortedArray = [];

    let margin = { top: 40, right: 40, bottom: 180, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 5000 - margin.top - margin.bottom;

    let barWidth = width / count;

    let x = d3.scaleLinear().domain([0, count]).range([0, width]);

    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let rects = svg
      .append("g")
      .attr("transform", "translate(" + barWidth + ",2)")
      .selectAll("rect")
      .data(unsortedArray)
      .enter()
      .append("rect");

    let labels = svg
      .selectAll("text")
      .data(unsortedArray)
      .enter()
      .append("text");

    labels
      .attr("id", function (d) {
        return "text" + d;
      })
      .attr("transform", function (d, i) {
        return "translate(" + x(i) + ",0)";
      })
      .html(function (d) {
        return d;
      });

    rects
      .attr("id", function (d) {
        return "rect" + d;
      })
      .attr("transform", function (d, i) {
        return "translate(" + (x(i) - barWidth) + ",0)";
      })
      .attr("width", barWidth * 0.9)
      .attr("height", function (d) {
        return (d * barWidth) / 3;
      });
  
  const bubbleSort = () =>
  {
    const recurse = i =>
    {
          // exit case
      if (unsortedArray.length === 0) return
        // recursive case
      if (i <= unsortedArray.length)
      {
        if (unsortedArray[i] < unsortedArray[i - 1])
        {
          d3.select("#rect" + unsortedArray[i]).attr("class", "testing");
          d3.select("#rect", unsortedArray[i - 1]).attr("class", "testing");

          d3.timeout(() =>
          {
            d3.select("#rect" + unsortedArray[i]).attr("class", "");
            d3.select("#rect" + unsortedArray[i - 1]).attr("class", "");
          }, durationTime);

          let temp = unsortedArray[i - 1];
          unsortedArray[i - 1] = unsortedArray[i];
          unsortedArray[i] = temp;

          slide(unsortedArray[i], i + sortedArray);
          slide(unsortedArray[i - 1], i - 1 + sortedArray);

          d3.timeout(() => recurse(++i), durationTime);
        }
        else if (i == unsortedArray.length)
        {
          for (let n = i; n == unsortedArray[n - 1]; n--)
          {
            d3.select("#text" + n).attr("class", "sorted");
            unsortedArray.pop();
          }

          recurse(++i);
        } else
        {
          recurse(++i);
        }
      } else bubbleSort()
    }
      recurse(1)
  }
  
      function slide(d, i) {
        d3.select("#text" + d)
          .transition()
          .duration(durationTime)
          .attr("transform", function (d) {
            return "translate(" + x(i) + ", 0)";
          });

        d3.select("#rect" + d)
          .transition()
          .duration(durationTime)
          .attr("transform", function (d) {
            return "translate(" + x(i - 1) + ", 0)";
          });
      }
  return (
    <>
      <button onClick={bubbleSort}>Bubble Sort</button>
    </>
  )
}

export default App;
