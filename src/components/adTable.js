import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollSync, Grid } from 'react-virtualized';

import { fetchAds, fetchAdsMetrics } from '../actions'

class AdTable extends Component {
  componentDidMount() {
    this.props.fetchAds();
    this.props.fetchAdsMetrics();
  }

  render() {
    const cellHeight = 50;
    const cellWidth = 220;
    const fixedColWith = 100;

    const { headers, rows, fixedCol, fixedCell } = this.props;
    if (!headers || !rows || !fixedCol || !fixedCell) { return <div>Loading...</div> }
    const rowCount = rows.length + 1;
    const colCount = headers.length + 1;

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
                columnWidth={fixedColWith}
                height={cellHeight}
                rowCount={1}
                rowHeight={cellHeight}
                rowWidth={fixedColWith}
                width={fixedColWith}
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
                columnWidth={fixedColWith}
                height={1000}
                rowCount={rowCount - 1}
                rowHeight={cellHeight}
                rowWidth={colCount * fixedColWith}
                scrollTop={scrollTop}
                width={fixedColWith}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: fixedColWith,
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
                width={600}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: cellHeight,
                left: fixedColWith,
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
                width={600}
              />
            </div>
          </div>
        }
      </ScrollSync>
    );
  }
}

const mapStateToProps = (state) => {
  const { ads, adsMetrics } = state.adsData;
  if (!ads || !adsMetrics) {
    return {};
  }
  return processAdsDataForVirtualized({ ads, adsMetrics });
};

const processAdsDataForVirtualized = ({ ads, adsMetrics }) => {
  const fixedCell = 'Ad Name';
  const headers = adsMetrics.column_names;
  const fixedColRaw = ads.ads;
  const fixedCol = fixedColRaw.map(ad => ad.remote_id);
  const rowsRaw = adsMetrics.rows;
  let rows = [];
  fixedCol.forEach(ad => {
    let newRow = [];
    const selectedRow = rowsRaw.filter(row => row.remote_id === ad)[0];
    headers.forEach(headerColName => {
      let newRowElement = selectedRow[headerColName];
      if (typeof newRowElement === 'number' && newRowElement % 1 !== 0) {
        newRowElement = selectedRow[headerColName].toFixed(1);
      }
      newRow.push(newRowElement);
    })
    rows.push(newRow);
  })
  return { headers, rows, fixedCol, fixedCell };
}

export default connect(mapStateToProps,
  { fetchAds, fetchAdsMetrics }
)(AdTable);
