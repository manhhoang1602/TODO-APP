import React, { useState } from 'react';
import { Snippet, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import FilterListPage from './components/components/FilterListPage';
import { useQuery } from '@tanstack/react-query';
import { QueryEnum, TodoService } from '../../services';

const TodoListPage = () => {
  const [params, setParams] = useState<undefined | { status: boolean }>();
  const { data } = useQuery({
    queryKey: [QueryEnum.GET_LIST_TASK_QUERY, params],
    queryFn: () => TodoService.getListTask(params),
  });

  return (
    <div style={{ padding: '24px' }}>
      <FilterListPage onFilter={setParams} />
      <Table aria-label="Example static collection table" isHeaderSticky selectionMode="single">
        <TableHeader>
          <TableColumn>TASK NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>

        <TableBody emptyContent={'No task to display.'}>
          {data
            ? data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.taskName}</TableCell>
                    <TableCell>{item.description}</TableCell>

                    <TableCell>
                      {item.status ? (
                        <Snippet symbol={''} color="success">
                          Completed
                        </Snippet>
                      ) : (
                        <Snippet symbol={''} color="warning">
                          Incomplete
                        </Snippet>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            : []}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoListPage;
