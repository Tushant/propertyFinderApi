import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { capitalize } from 'utils/helper';

function evalValue(value) {
  console.log('value');
  if (Boolean(value) && value === true) {
    return <i className="icon-check-circle" />;
  }
  if (Boolean(value) && value === false) {
    return <i className="icon-close-circle" />;
  }
  if (Array.isArray(value) && value.length > 1) {
    return capitalize(value.join(', '));
  }
  return typeof value === 'string' && value.indexOf('@') > -1
    ? String(value)
    : capitalize(String(value));
}

const XcelTripTable = ({ headers, cells, data }) => {
  console.log('data', data);
  const cellToShow = data.map(datum =>
    <Table.Row key={datum._id}>
      {headers.map(header =>
        <Table.Cell key={header.key}>
          {evalValue(datum[header.field])}
        </Table.Cell>
      )}
    </Table.Row>
  );
  const headerToShow = headers.map(header =>
    <Table.HeaderCell key={header.key}>
      {header.name}
    </Table.HeaderCell>
  );
  return (
    <Table celled stackable>
      <Table.Header>
        <Table.Row>
          {headerToShow}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cellToShow}
      </Table.Body>
    </Table>
  );
};

export default XcelTripTable;
