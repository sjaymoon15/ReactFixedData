import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollSync, Grid } from 'react-virtualized';

import { fetchAds, fetchAdsMetrics } from '../actions'

const rowCount = 5
const colCount = 20
const cellHeight = 50
const cellWidth = 72

const headers = new Array(colCount - 1).fill(0).map((val, idx) => `H${idx + 1}`) // the fixed header that only scrolls horizontally
const makeRow = row => new Array(colCount - 1).fill(0).map((val, idx) => `R${row} C${idx + 1}`)
const rows = new Array(rowCount).fill(0).map((val, idx) => makeRow(idx)) // the main body
const fixedCol = new Array(rowCount - 1).fill(0).map((val, idx) => `R${idx + 1} C0`) // the fixed column that only scrolls vertically
const fixedCell = 'R0 C0' // The fixed cell that never moves

const Cell = ({
  columnIndex,
  key,
  rowIndex,
  style,
}) =>
  <div className='grid-cell' key={key} style={style}>
      {rows[rowIndex][columnIndex]}
  </div>

const HeaderCell = ({ columnIndex, key, style }) =>
  <div className='grid-cell' key={key} style={style}>
      {headers[columnIndex]}
  </div>

const FixedColCell = ({ rowIndex, key, style }) =>
  <div className='grid-cell' key={key} style={style}>
      {fixedCol[rowIndex]}
  </div>

const FixedCell = () => <div>{fixedCell}</div>

class AdTable extends Component {
  componentDidMount() {
    this.props.fetchAds();
    this.props.fetchAdsMetrics();
  }
  render() {
    console.log(this.props)
    return (
      <ScrollSync>
        {({ onScroll, scrollTop, scrollLeft }) =>
          <div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <Grid
                cellRenderer={FixedCell}
                columnCount={1}
                columnHeight={cellHeight}
                columnWidth={cellWidth}
                height={cellHeight}
                rowCount={1}
                rowHeight={cellHeight}
                rowWidth={cellWidth}
                width={cellWidth}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: cellHeight,
                left: 0,
              }}
            >
              <Grid
                cellRenderer={FixedColCell}
                className={'no-scroll'}
                columnCount={1}
                columnHeight={rowCount * cellHeight}
                columnWidth={cellWidth}
                height={1000}
                rowCount={rowCount - 1}
                rowHeight={cellHeight}
                rowWidth={colCount * cellWidth}
                scrollTop={scrollTop}
                width={cellWidth}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: cellWidth,
              }}
            >
              <Grid
                cellRenderer={HeaderCell}
                className={'no-scroll'}
                columnCount={colCount - 1}
                columnHeight={rowCount * cellHeight}
                columnWidth={cellWidth}
                height={cellHeight}
                rowCount={1}
                rowHeight={cellHeight}
                rowWidth={colCount * cellWidth}
                scrollLeft={scrollLeft}
                width={500}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: cellHeight,
                left: cellWidth,
              }}
            >
              <Grid
                cellRenderer={Cell}
                columnCount={colCount - 1}
                columnHeight={rowCount * cellHeight}
                columnWidth={cellWidth}
                height={250}
                onScroll={onScroll}
                rowCount={rowCount - 1}
                rowHeight={cellHeight}
                rowWidth={colCount * cellWidth}
                width={500}
              />
            </div>
          </div>
        }
      </ScrollSync>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { ads, adsMetrics } = state;
  return { ads, adsMetrics };
};

export default connect(mapStateToProps,
  { fetchAds, fetchAdsMetrics }
)(AdTable);
