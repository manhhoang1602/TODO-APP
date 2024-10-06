import React, { useRef } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import AddTaskFormModal from './AddTaskFormModal';
import { statusTaskOptions } from '../../config';

interface IProps {
  onFilter: (params: undefined | { status: boolean }) => void;
}

const FilterListPage: React.FC<IProps> = ({ onFilter }) => {
  const addTaskFormModalRef = useRef<{ openModal: Function; closeModal: Function }>();

  const handleFilter = (e: any) => {
    const getParams = () => {
      if (e.target.value === statusTaskOptions[0].value) {
        return undefined;
      }

      return e.target.value === statusTaskOptions[1].value ? { status: true } : { status: false };
    };

    onFilter(getParams());
  };

  return (
    <React.Fragment>
      <div className={'grid grid-cols-4 gap-4'} style={{ marginBottom: '24px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>Todo List Page</h1>

        <div></div>
        <div></div>

        <div>
          <Select label="Select status task" className="max-w-xs" size={'sm'} onChange={handleFilter}>
            {statusTaskOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            color="success"
            size={'lg'}
            style={{ marginLeft: '12px' }}
            onClick={() => {
              addTaskFormModalRef.current && addTaskFormModalRef.current.openModal();
            }}
          >
            Add task
          </Button>
        </div>
      </div>

      <AddTaskFormModal ref={addTaskFormModalRef} />
    </React.Fragment>
  );
};

export default FilterListPage;
