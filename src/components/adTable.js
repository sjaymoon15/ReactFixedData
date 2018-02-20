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
    const { headers, rows, fixedCol, fixedCell } = this.props;
    if (!headers || !rows || !fixedCol || !fixedCell) { return <div>Loading...</div>; }

    const cellHeight = 50;
    const cellWidth = 240;
    const fixedColWidth = 100;
    const tableWidth = 1000;
    const rowCount = rows.length + 1;
    const colCount = headers.length + 1;
    const tableHeight = cellHeight * rowCount;

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
                columnWidth={fixedColWidth}
                height={cellHeight}
                rowCount={1}
                rowHeight={cellHeight}
                rowWidth={fixedColWidth}
                width={fixedColWidth}
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
                columnWidth={fixedColWidth}
                height={tableHeight}
                rowCount={rowCount - 1}
                rowHeight={cellHeight}
                rowWidth={colCount * fixedColWidth}
                scrollTop={scrollTop}
                width={fixedColWidth}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: fixedColWidth,
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
                width={tableWidth}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: cellHeight,
                left: fixedColWidth,
              }}
            >
              <Grid
                cellRenderer={Cell}
                columnCount={colCount - 1}
                columnHeight={rowCount * cellHeight}
                columnWidth={cellWidth}
                height={tableHeight}
                onScroll={onScroll}
                rowCount={rowCount - 1}
                rowHeight={cellHeight}
                rowWidth={colCount * cellWidth}
                width={tableWidth}
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
