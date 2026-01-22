'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useAppStore } from '@/store/useAppStore';

export function D3EnhancedChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { waterQualityData } = useAppStore();

  useEffect(() => {
    if (!svgRef.current || waterQualityData.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get recent data
    const recentData = waterQualityData.slice(-7);
    const timeScale = d3.scaleTime()
      .domain(d3.extent(recentData, d => new Date(d.timestamp)) as [Date, Date])
      .range([0, width]);

    const yScaleDO = d3.scaleLinear()
      .domain([0, d3.max(recentData, d => d.dissolvedOxygen) || 10])
      .nice()
      .range([height, 0]);

    const yScalePH = d3.scaleLinear()
      .domain([0, d3.max(recentData, d => d.ph) || 10])
      .nice()
      .range([height, 0]);

    const yScaleTurbidity = d3.scaleLinear()
      .domain([0, d3.max(recentData, d => d.turbidity) || 25])
      .nice()
      .range([height, 0]);

    // Create line generators
    const lineDO = d3.line<typeof recentData[0]>()
      .x(d => timeScale(new Date(d.timestamp)))
      .y(d => yScaleDO(d.dissolvedOxygen))
      .curve(d3.curveMonotoneX);

    const linePH = d3.line<typeof recentData[0]>()
      .x(d => timeScale(new Date(d.timestamp)))
      .y(d => yScalePH(d.ph))
      .curve(d3.curveMonotoneX);

    const lineTurbidity = d3.line<typeof recentData[0]>()
      .x(d => timeScale(new Date(d.timestamp)))
      .y(d => yScaleTurbidity(d.turbidity))
      .curve(d3.curveMonotoneX);

    // Add grid lines
    const xAxisGrid = d3.axisBottom(timeScale)
      .ticks(5)
      .tickSize(-height)
      .tickFormat(() => '');

    const yAxisGrid = d3.axisLeft(yScaleDO)
      .ticks(5)
      .tickSize(-width)
      .tickFormat(() => '');

    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 1)
      .call(xAxisGrid);

    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 1)
      .call(yAxisGrid);

    // Add axes
    const xAxis = d3.axisBottom(timeScale)
      .ticks(5)
      .tickFormat(d3.timeFormat('%b %d') as any);

    const yAxis = d3.axisLeft(yScaleDO)
      .ticks(5);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#9CCFD8')
      .style('font-size', '10px');

    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .style('fill', '#9CCFD8')
      .style('font-size', '10px');

    // Add lines
    g.append('path')
      .datum(recentData)
      .attr('fill', 'none')
      .attr('stroke', '#00E6B8')
      .attr('stroke-width', 2)
      .attr('d', lineDO);

    g.append('path')
      .datum(recentData)
      .attr('fill', 'none')
      .attr('stroke', '#3CFF9E')
      .attr('stroke-width', 2)
      .attr('d', linePH);

    g.append('path')
      .datum(recentData)
      .attr('fill', 'none')
      .attr('stroke', '#FFB020')
      .attr('stroke-width', 2)
      .attr('d', lineTurbidity);

    // Add data points
    const points = g.selectAll('.point')
      .data(recentData)
      .enter()
      .append('g')
      .attr('class', 'point');

    points.append('circle')
      .attr('cx', d => timeScale(new Date(d.timestamp)))
      .attr('cy', d => yScaleDO(d.dissolvedOxygen))
      .attr('r', 3)
      .attr('fill', '#00E6B8');

    points.append('circle')
      .attr('cx', d => timeScale(new Date(d.timestamp)))
      .attr('cy', d => yScalePH(d.ph))
      .attr('r', 3)
      .attr('fill', '#3CFF9E');

    points.append('circle')
      .attr('cx', d => timeScale(new Date(d.timestamp)))
      .attr('cy', d => yScaleTurbidity(d.turbidity))
      .attr('r', 3)
      .attr('fill', '#FFB020');

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', '#fff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px');

    points.selectAll('circle')
      .on('mouseover', function(event, d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
        tooltip.html(`
          <div>DO: ${(d as any).dissolvedOxygen.toFixed(2)}</div>
          <div>pH: ${(d as any).ph.toFixed(2)}</div>
          <div>Turbidity: ${(d as any).turbidity.toFixed(2)}</div>
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition()
          .duration(200)
          .style('opacity', 0);
      });

    return () => {
      d3.select('body').selectAll('.tooltip').remove();
    };
  }, [waterQualityData]);

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        D3 Enhanced Water Quality Chart
      </h3>
      <svg ref={svgRef} className="w-full" />
      <div className="mt-3 flex gap-4 text-[11px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00E6B8' }} />
          <span style={{ color: 'var(--text-muted)' }}>DO (mg/L)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3CFF9E' }} />
          <span style={{ color: 'var(--text-muted)' }}>pH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFB020' }} />
          <span style={{ color: 'var(--text-muted)' }}>Turbidity</span>
        </div>
      </div>
    </div>
  );
}
