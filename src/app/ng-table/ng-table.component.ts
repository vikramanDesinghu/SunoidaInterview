import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.css']
})
export class NgTableComponent implements OnInit {
  table = [];
  header = [
    {
      displayName: 'Vision OUC',
      key: 'Vision_ouc',
      pivotOption: 'R'
    },
    {
      displayName: 'Period',
      key: 'Period',
      pivotOption: 'C'
    }, {
      displayName: 'Avg Balance',
      key: 'balance',
      pivotOption: 'V'
    }
  ];
  newHeader: string[] = [];
  // expected output
  // body2 = [
  //   {
  //     Vision_ouc: 'KE01000017',
  //     2014: '20160401',
  //     2015: '163164849.07171'
  //   }
  // ];

  body = [
    {
      Vision_ouc: 'KE01000017',
      Period: '20160401',
      balance: '163164849.07171'
    },
    {
      Vision_ouc: 'KE01000017',
      Period: '20160501',
      balance: '162366406.0121'
    },
    {
      Vision_ouc: 'KE01000018',
      Period: '20160401',
      balance: '347325574.38977'
    },
    {
      Vision_ouc: 'KE01000018',
      Period: '20160501',
      balance: '346564126.31549'
    },
    {
      Vision_ouc: 'KE01000019',
      Period: '20160401',
      balance: '183543736.37852'
    },
    {
      Vision_ouc: 'KE01000019',
      Period: '20160501',
      balance: '186111804.54701'
    }
  ];


  constructor() { }

  ngOnInit(): void {
    // get keys
    const keys = this.header.reduce((accumulator, h) => {
      if (h.pivotOption === 'C') {
        accumulator.headerKey.push(h.key);
      }
      if (h.pivotOption === 'V') {
        accumulator.valueKey.push(h.key);
      }
      if (h.pivotOption === 'R') {
        accumulator.regularKey = h.key;
      }
      return accumulator;
    }, { headerKey: [], valueKey: [], regularKey: '' });

    // get values as header
    let newHeader = [];
    this.newHeader.push(keys.regularKey);
    keys.headerKey.forEach(h => {
      const headers = _.uniq(_.map(this.body, h));
      newHeader = [...newHeader, ...headers];
    });
    this.newHeader = [...this.newHeader, ...newHeader];
    this.table = this.coll2tbl(this.body, keys.regularKey, keys.headerKey, keys.valueKey);
  }

  getProp(obj, prop) {
    return prop.split('.').reduce((o, k) => obj[k], obj);
  }

  coll2tbl(coll, regularKey, headerKey, valueKey) {
    const table = {};
    coll.forEach(a => {
      if (!table[a[regularKey]]) {
        table[a[regularKey]] = {};
        table[a[regularKey]][regularKey] = a[regularKey];
      }
      headerKey.forEach(hK => {
        valueKey.forEach(vK => {
          table[a[regularKey]][a[hK]] = a[vK];
        });
      });
    });

    const cells = [];
    for (const row in table) {
      if (table[row]) {
        cells.push(table[row]);
      }
    }

    return cells;
  }


}
