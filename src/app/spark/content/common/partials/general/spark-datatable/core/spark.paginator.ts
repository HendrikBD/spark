import { MatPaginatorIntl } from '@angular/material';

export class SparkPaginatorIntl extends MatPaginatorIntl {

  getRangeLabel = (page, pageSize, length) => {
    let startInd = page * pageSize + 1;
    startInd = (startInd >= 0) ? startInd : 0;
    let endInd = (page + 1) * pageSize;
    endInd = endInd <= length ? endInd : length;

    return `${startInd} - ${endInd} of ${length}`;
  }

}
