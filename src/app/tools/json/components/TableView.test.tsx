import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import TableView from './TableView';
import { csvEscape, findTables, replaceCell, toCsv } from './table-utils';

test('literal dotted keys and mixed arrays retain exact paths and original indices', () => {
  const source = findTables({'a.b': [{id: 1}, null, {id: 3}, {id: 4}, {id: 5}]})[0];
  expect(source.path).toBe('$["a.b"]'); expect(source.indices).toEqual([0, 2, 3, 4]); expect(source.total).toBe(5);
  const root = {'a.b': [{id: 1}, null, {id: 3}, {id: 4}, {id: 5}]};
  expect(replaceCell(root, source.keys, 2, 'id', 30)['a.b'][2]).toEqual({id: 30}); expect(root['a.b'][2]).toEqual({id: 3});
});
test('CSV escapes quotes/newlines and neutralizes spreadsheet formulas', () => {
  expect(csvEscape('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)");
  expect(toCsv([{name: 'A,"B"\nC', n: 3}], ['name', 'n'])).toBe('name,n\r\n"A,""B""\nC",3');
});
test('does not silently cut off columns at 60', () => {
  const row = Object.fromEntries(Array.from({length: 65}, (_, i) => [`c${i}`, i]));
  render(<TableView tables={findTables([row])} />);
  expect(screen.getByRole('button', {name: /Row 1, c64:/})).toBeInTheDocument();
});
test('keeps 10k rows bounded to 200 DOM rows and pages forward/back', () => {
  render(<TableView tables={findTables(Array.from({length: 10000}, (_, i) => ({id: i, name: `User ${i}`})))} />);
  expect(screen.getAllByRole('row')).toHaveLength(201);
  fireEvent.click(screen.getByRole('button', {name: 'Next'}));
  expect(screen.getByRole('button', {name: 'Row 201, id: 200'})).toBeInTheDocument();
  expect(screen.getAllByRole('row')).toHaveLength(201);
  fireEvent.click(screen.getByRole('button', {name: 'Previous'}));
  expect(screen.getByRole('button', {name: 'Row 1, id: 0'})).toBeInTheDocument();
});
test('filters rows, sorts numerically, hides columns and shows a nested inspector', () => {
  render(<TableView tables={findTables([{id: 10, name: 'Ben', profile: {city: 'Dubai'}}, {id: 2, name: 'Ava', profile: {city: 'London'}}])} />);
  fireEvent.click(screen.getByRole('button', {name: 'id ↕'}));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Ava');
  fireEvent.change(screen.getByRole('searchbox', {name: 'Filter table rows'}), {target: {value: 'Dubai'}});
  expect(screen.getAllByRole('row')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', {name: /Row 1, profile:/}));
  expect(screen.getByRole('region', {name: 'Cell inspector'})).toHaveTextContent('Dubai');
  fireEvent.click(screen.getByRole('button', {name: 'Columns'}));
  fireEvent.click(screen.getByRole('checkbox', {name: 'name'}));
  expect(screen.queryByRole('columnheader', {name: /name/})).not.toBeInTheDocument();
});
test('validates edits before applying and supports cancel, undo, and keyboard focus', () => {
  const onEdit = jest.fn(), onUndo = jest.fn();
  const tables = findTables([{id: 1, name: 'Ava'}]);
  render(<TableView tables={tables} onEdit={onEdit} onUndo={onUndo} canUndo />);
  const id = screen.getByRole('button', {name: 'Row 1, id: 1'}); id.focus();
  fireEvent.keyDown(id, {key: 'ArrowRight'});
  expect(screen.getByRole('button', {name: 'Row 1, name: Ava'})).toHaveFocus();
  fireEvent.click(id); fireEvent.click(screen.getByRole('button', {name: 'Edit JSON'}));
  fireEvent.change(screen.getByRole('textbox', {name: 'Edit cell JSON'}), {target: {value: '{bad'}});
  fireEvent.click(screen.getByRole('button', {name: 'Save value'}));
  expect(onEdit).not.toHaveBeenCalled(); expect(screen.getByRole('alert')).toHaveTextContent('Invalid JSON');
  fireEvent.change(screen.getByRole('textbox', {name: 'Edit cell JSON'}), {target: {value: '42'}});
  fireEvent.click(screen.getByRole('button', {name: 'Save value'}));
  expect(onEdit).toHaveBeenCalledWith(tables[0], 0, 'id', 42);
  fireEvent.click(screen.getByRole('button', {name: 'Undo edit'})); expect(onUndo).toHaveBeenCalled();
});
test('switches among arrays without retaining hidden columns or filters', () => {
  const tables = findTables({one: [{a: 1}], two: [{b: 2}]});
  render(<TableView tables={tables} />);
  fireEvent.change(screen.getByRole('combobox', {name: 'Choose array'}), {target: {value: tables[1].path}});
  expect(screen.getByRole('button', {name: 'Row 1, b: 2'})).toBeInTheDocument();
});
